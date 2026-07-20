"""
一次性脚本：在 SQLite 数据库中创建所有 managed=False 的表
用法：python scripts\create_tables.py
"""
import os
import sys
import django

# 设置 Django 环境
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from django.apps import apps
from django.db import connection

# 获取所有 managed=False 的模型
unmanaged_models = [
    model for model in apps.get_models()
    if not model._meta.managed
]

print(f"找到 {len(unmanaged_models)} 个 managed=False 的模型")

with connection.schema_editor() as schema_editor:
    for model in unmanaged_models:
        table_name = model._meta.db_table
        # 检查表是否已存在
        if table_name in connection.introspection.table_names():
            print(f"  跳过（已存在）: {table_name}")
            continue
        try:
            schema_editor.create_model(model)
            print(f"  创建成功: {table_name}")
        except Exception as e:
            print(f"  创建失败: {table_name} - {e}")

print("\n完成！")
