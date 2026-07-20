"""Transactional cleanup for deleting a tb_user account and its history."""

from django.db import connection, transaction


DELETE_RULES = (
    ('jwtinfo', (('userId', 'id'),)),
    ('log', (('user_id', 'id'), ('user_name', 'username'))),
    ('process_table', (('user_id', 'id'), ('user_name', 'username'))),
    ('tb_experiment_record', (('user_Id', 'id'),)),
    ('tb_experiment_report', (
        ('user_id', 'id'), ('user_id', 'username'), ('user_id', 'telephone'),
        ('user_id', 'id_card'), ('un', 'username'),
    )),
    ('tb_experiment_score', (
        ('user_id', 'id'), ('user_id', 'username'), ('user_id', 'telephone'),
        ('user_id', 'id_card'), ('un', 'username'), ('id_card', 'id_card'),
    )),
    ('tb_experiment_usetime', (('user_Id', 'id'),)),
    ('tb_item_comment', (('userid', 'id'),)),
    ('tb_mechanic_user_score', (('uid', 'id'), ('un', 'username'))),
    ('tb_mechanic_user', (('un', 'username'),)),
    ('tb_middle', (('user_id', 'id'),)),
    ('tb_person_score', (('user_id', 'id'),)),
    ('user_curriculum', (('user_id', 'id'),)),
    ('user_experiment', (('user_id', 'id'),)),
    ('orders', (('user_id', 'id'),)),
)


def delete_user_with_history(user):
    """Delete all direct user history and finally the account itself."""
    values = {
        'id': str(user.pk),
        'username': str(user.username or ''),
        'telephone': str(user.telephone or ''),
        'id_card': str(user.idCard or ''),
    }
    deleted = {}
    updated = {}

    with transaction.atomic():
        existing_tables = set(connection.introspection.table_names())
        with connection.cursor() as cursor:
            required_columns = {
                'tb_user': {'id', 'username', 'telephone', 'id_card'},
                'tb_class_info': {'teacher_id'},
                'tb_item_comment': {'userid', 'update_id'},
                'tb_weight_info': {'create_id', 'update_id'},
                'news': {'userid'},
            }
            for table, matches in DELETE_RULES:
                required_columns.setdefault(table, set()).update(column.lower() for column, _ in matches)

            for table, expected_columns in required_columns.items():
                if table not in existing_tables:
                    continue
                actual_columns = {
                    field.name.lower()
                    for field in connection.introspection.get_table_description(cursor, table)
                }
                missing_columns = {column.lower() for column in expected_columns} - actual_columns
                if missing_columns:
                    missing = ', '.join(sorted(missing_columns))
                    raise RuntimeError(f'用户删除预检失败：表 {table} 缺少字段 {missing}')

            for value_key, column in (
                ('username', 'username'),
                ('telephone', 'telephone'),
                ('id_card', 'id_card'),
            ):
                if not values[value_key]:
                    continue
                cursor.execute(
                    f'SELECT COUNT(*) FROM `tb_user` WHERE `{column}` = %s',
                    [values[value_key]],
                )
                if cursor.fetchone()[0] != 1:
                    # Legacy tables sometimes store these identifiers instead
                    # of the user UUID. Never use an ambiguous identifier.
                    values[value_key] = ''

            # Keep shared records, but remove references to the deleted account.
            if 'tb_class_info' in existing_tables:
                cursor.execute(
                    'UPDATE `tb_class_info` SET `teacher_id` = NULL WHERE `teacher_id` = %s',
                    [values['id']],
                )
                updated['tb_class_info'] = cursor.rowcount

            if 'tb_item_comment' in existing_tables:
                cursor.execute(
                    'UPDATE `tb_item_comment` SET `update_id` = NULL '
                    'WHERE `update_id` = %s AND (`userid` IS NULL OR `userid` <> %s)',
                    [values['id'], values['id']],
                )
                updated['tb_item_comment'] = cursor.rowcount

            if 'tb_weight_info' in existing_tables:
                cursor.execute(
                    'UPDATE `tb_weight_info` SET `update_id` = NULL '
                    'WHERE `update_id` = %s AND (`create_id` IS NULL OR `create_id` <> %s)',
                    [values['id'], values['id']],
                )
                updated['tb_weight_info'] = cursor.rowcount
                cursor.execute('DELETE FROM `tb_weight_info` WHERE `create_id` = %s', [values['id']])
                deleted['tb_weight_info'] = cursor.rowcount

            numeric_user_id = int(values['id']) if values['id'].isdigit() else None
            if numeric_user_id is not None and 'news' in existing_tables:
                cursor.execute('UPDATE `news` SET `userid` = 0 WHERE `userid` = %s', [numeric_user_id])
                updated['news'] = cursor.rowcount

            for table, matches in DELETE_RULES:
                if table not in existing_tables:
                    continue
                valid_matches = [
                    (column, values[value_key])
                    for column, value_key in matches
                    if values[value_key]
                ]
                if not valid_matches:
                    continue
                where_clause = ' OR '.join(f'`{column}` = %s' for column, _ in valid_matches)
                cursor.execute(
                    f'DELETE FROM `{table}` WHERE {where_clause}',
                    [value for _, value in valid_matches],
                )
                deleted[table] = cursor.rowcount

            cursor.execute('DELETE FROM `tb_user` WHERE `id` = %s', [values['id']])
            if cursor.rowcount != 1:
                raise RuntimeError('用户主记录删除失败，已回滚关联数据清理')
            deleted['tb_user'] = cursor.rowcount

    return {'deleted': deleted, 'updated': updated}
