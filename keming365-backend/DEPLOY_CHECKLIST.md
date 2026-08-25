# 生产部署检查清单

生产部署统一在仓库根目录执行，完整说明见 `../DEPLOY.md`。

## 配置

- 已从根目录 `.env.example` 创建 `.env`
- 已替换数据库、Django、云平台和 AI 服务密钥
- `DJANGO_ALLOWED_HOSTS` 已填写生产域名
- `CORS_ALLOWED_ORIGINS` 和 `CSRF_TRUSTED_ORIGINS` 已填写完整 HTTPS 来源
- HTTPS 环境下三个安全开关均为 `true`

## 数据

- 已导入旧 `new365` 数据库结构和数据
- 
- 已确认关键 legacy 表存在
- 已备份数据库和媒体文件

## 构建与验证

```powershell
docker compose --env-file .env config
docker compose build backend frontend
docker compose up -d
docker compose ps
docker compose exec backend python manage.py check --deploy --settings=config.settings.prod
docker compose exec backend python manage.py test
```

## 上线

- HTTPS 反向代理已传递 `X-Forwarded-Proto`
- 首页、登录、管理后台和课程资源已验证
- `/api/`、`/media/`、`/static/`、`/ws/` 路径可访问
- 日志、数据库备份和媒体备份策略已启用
