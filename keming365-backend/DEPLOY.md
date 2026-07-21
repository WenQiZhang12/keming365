# 后端部署说明

当前项目已经迁移为前后端同级的单仓库结构，生产部署入口位于仓库根目录：

- `../docker-compose.yml`
- `../.env.example`
- `../DEPLOY.md`

请不要再从后端目录单独启动旧 Compose；完整部署必须同时构建 Vue 前端、Django 后端、MySQL 和 Redis。
