#!/bin/sh
set -eu

python manage.py collectstatic --settings=config.settings.prod --noinput

exec "$@"
