# 科明365 AI+VR 数智教学云平台

本仓库采用前后端分离的单仓库结构：

```text
keming365/
├── keming365-frontend/   Vue 3 + TypeScript + Vite
├── keming365-backend/    Django REST Framework
├── docker-compose.yml    生产容器编排入口
├── .env.example          生产环境变量模板
└── DEPLOY.md             完整部署说明
```

## 本地开发

后端：

```powershell
cd D:\ZWQProject\keming365\keming365-backend
python manage.py runserver 0.0.0.0:8000
```

前端：

```powershell
cd D:\ZWQProject\keming365\keming365-frontend
npm install
npm run dev
```

本机访问 `http://localhost:5173/`；局域网访问使用 `http://本机局域网IP:5173/`。

## 质量检查

```powershell
cd keming365-frontend
npm run build

cd ..\keming365-backend
python manage.py test
python manage.py check
```

## Docker 部署

根目录是唯一推荐的部署入口：

```powershell
Copy-Item .env.example .env
# 编辑 .env，替换所有密码、密钥和域名
docker compose up -d --build
```

默认入口为 `http://localhost:8080/`。数据库初始化、HTTPS、备份和更新步骤见 [DEPLOY.md](DEPLOY.md)。
