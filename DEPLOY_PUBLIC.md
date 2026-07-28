# Public Deployment

This Compose stack serves the application through Caddy on ports 80 and 443.
Caddy obtains and renews TLS certificates automatically. The frontend's port
8080 is bound to the Docker host only and is not a public entry point.

## Before Starting

1. Point every name in `PUBLIC_DOMAINS` to the server's public IPv4/IPv6 address.
2. Open TCP ports 80 and 443 and UDP port 443 in the host and cloud firewalls.
3. Copy `.env.example` to `.env` and replace every example password, key,
   domain, and email address. Do not commit `.env`.
4. Set the same public names in `PUBLIC_DOMAINS` and `DJANGO_ALLOWED_HOSTS`.
   Set their HTTPS origins in `CORS_ALLOWED_ORIGINS` and
   `CSRF_TRUSTED_ORIGINS`.
5. Generate a Django key with at least 50 characters, for example:

```powershell
python -c "import secrets; print(secrets.token_urlsafe(64))"
```

## Start And Verify

```powershell
docker compose config
docker compose up -d --build
docker compose ps
docker compose logs -f caddy
```

After Caddy reports certificate issuance, verify the public site with:

```powershell
curl.exe -I https://your-domain.example/
curl.exe -I https://your-domain.example/api/docs/
```

The backend rejects a missing, example, or short Django secret, and rejects
non-HTTPS cookie and redirect settings at startup. Do not enable HSTS preload
until every current and future subdomain is confirmed to support HTTPS.

The `/ws/` endpoint is intentionally disabled in the public Nginx config. The
current Channels consumers do not yet enforce user authentication and
per-user authorization, so exposing them would allow unauthorized
subscriptions. Add those controls before enabling WebSocket proxying.

## Troubleshooting

- Certificate issuance fails when DNS does not resolve to this server, when a
  CDN proxy blocks ACME validation, or when ports 80/443 are unavailable.
- Existing host Nginx, IIS, Apache, or another service cannot occupy ports 80
  or 443 while Caddy is running.
- Back up MySQL and the `media_data` volume before upgrades. Test restoration
  in an isolated database before replacing production data.
