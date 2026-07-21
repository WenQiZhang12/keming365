# 科明365生产部署

## 1. 环境要求

- Docker Engine 24+ 或 Docker Desktop
- Docker Compose v2
- 现有 `new365` MySQL 数据库备份，或可访问的现有数据库
- 生产域名与 HTTPS 反向代理

## 2. 配置

在仓库根目录执行：

```powershell
Copy-Item .env.example .env
```

必须修改：

- `MYSQL_ROOT_PASSWORD`
- `DB_PASSWORD`
- `DJANGO_SECRET_KEY`
- `DJANGO_ALLOWED_HOSTS`
- `CORS_ALLOWED_ORIGINS`
- `CSRF_TRUSTED_ORIGINS`
- 云平台和 AI 服务所需密钥

`.env` 已被 Git 忽略，不得提交。

## 3. 数据库

项目大量模型使用 `managed=False` 对接旧系统表，Django migration 不会创建这些业务表。首次部署必须导入原 `new365` 数据库结构和数据。

先启动基础服务：

```powershell
docker compose up -d mysql redis
```

导入前先确认备份文件编码和目标库名称。示例：

```powershell
Get-Content .\backup.sql -Raw | docker compose exec -T mysql mysql -u root -p新ROOT密码 new365
```

导入后至少确认存在 `tb_user`、`tb_curriculum`、`tb_experiment` 和 `tb_experiment_score`。

## 4. 构建与启动

```powershell
docker compose up -d --build backend frontend
docker compose ps
```

默认访问地址：`http://服务器IP:8080/`。

架构：

```text
Browser -> frontend (Nginx + Vue)
                |-- /api, /ws -> backend (Gunicorn + Django)
                |-- /media    -> shared media volume
                `-- /static   -> shared static volume
backend -> MySQL + Redis
```

后端容器每次启动都会执行 `collectstatic`，然后启动 Gunicorn。Vue 在前端镜像构建阶段执行完整 TypeScript 检查和生产构建。

## 5. HTTPS

推荐在 Docker 主机前增加 Caddy、Nginx 或云负载均衡，将 HTTPS 转发到 `127.0.0.1:8080`。启用 HTTPS 后修改 `.env`：

```dotenv
DJANGO_ALLOWED_HOSTS=keming365.com,www.keming365.com
CORS_ALLOWED_ORIGINS=https://keming365.com,https://www.keming365.com
CSRF_TRUSTED_ORIGINS=https://keming365.com,https://www.keming365.com
SECURE_SSL_REDIRECT=true
SESSION_COOKIE_SECURE=true
CSRF_COOKIE_SECURE=true
```

上游代理必须传递 `X-Forwarded-Proto: https`。

## 6. 更新

```powershell
git pull
docker compose build backend frontend
docker compose up -d backend frontend
docker compose ps
```

## 7. 日志与检查

```powershell
docker compose logs -f backend
docker compose logs -f frontend
docker compose exec backend python manage.py check --deploy --settings=config.settings.prod
docker compose exec backend python manage.py test
```

## 8. 备份

数据库和媒体文件必须分别备份：

```powershell
docker compose exec -T mysql mysqldump -u root -p新ROOT密码 new365 > new365-backup.sql
docker run --rm -v keming365_media_data:/data -v ${PWD}:/backup alpine tar czf /backup/media-backup.tar.gz -C /data .
```

恢复前先停止写入，并验证备份文件可正常读取。
