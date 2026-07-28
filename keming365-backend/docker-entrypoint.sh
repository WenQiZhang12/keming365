#!/bin/sh
set -eu

if [ "${DJANGO_SECRET_KEY:-}" = "" ] || [ "${#DJANGO_SECRET_KEY}" -lt 50 ]; then
    echo "DJANGO_SECRET_KEY must be set and contain at least 50 characters." >&2
    exit 1
fi

case "$DJANGO_SECRET_KEY" in
    django-insecure-*|replace-with-*)
        echo "DJANGO_SECRET_KEY must not use a development or example value." >&2
        exit 1
        ;;
esac

if [ "${SECURE_SSL_REDIRECT:-}" != "true" ] \
    || [ "${SESSION_COOKIE_SECURE:-}" != "true" ] \
    || [ "${CSRF_COOKIE_SECURE:-}" != "true" ]; then
    echo "HTTPS redirect and secure cookie settings must be true for the public deployment." >&2
    exit 1
fi

python manage.py collectstatic --settings=config.settings.prod --noinput

exec "$@"
