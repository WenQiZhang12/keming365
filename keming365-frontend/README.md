# 科明365前端

Vue 3、TypeScript 和 Vite 项目，与 Django 后端分目录维护。

## 本地开发

先在 `D:\ZWQProject\keming365\keming365-backend` 启动后端：

```powershell
python manage.py runserver 0.0.0.0:8000 --settings=config.settings.dev
```

再在当前前端目录启动 Vite：

```powershell
npm install
npm run dev
```

本机访问 `http://localhost:5173/`，局域网同事使用 `http://本机局域网IP:5173/`。开发服务器会将 `/api` 和 `/media` 请求代理到 `http://localhost:8000`。

## 构建

```powershell
npx vite build
```

`npm run build` 会额外执行 TypeScript 类型检查，需先处理项目现有的类型错误。
