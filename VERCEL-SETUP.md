# Vercel 后端部署说明

这个版本不再使用 Supabase magic link 登录。公开访客只能看；你和伴侣输入共享编辑密码后，网页会通过 Vercel 后端写入 Supabase。

## 你需要准备

- 一个 Vercel 账号
- 当前 GitHub 仓库
- Supabase 项目里的 `SUPABASE_URL`
- Supabase 项目里的 `Secret key` / `service_role` key
- 一个你们自己定的编辑密码

## Vercel 环境变量

在 Vercel 项目的 Environment Variables 里新增：

```text
SUPABASE_URL=https://你的项目.supabase.co
SUPABASE_SERVICE_ROLE_KEY=你的 Supabase Secret key / service_role key
TRIP_EDIT_PASSWORD=你们的共享编辑密码
```

注意：`SUPABASE_SERVICE_ROLE_KEY` 只能放在 Vercel 环境变量里，不能放进网页代码，也不要发给别人。不要填 publishable key，要填 Supabase 后台标为 Secret key 或 service_role 的那个。

## 部署步骤

1. 登录 Vercel。
2. Import 当前 GitHub 仓库。
3. Framework Preset 选择 `Other` 或保持自动识别。
4. Build Command 留空。
5. Output Directory 留空。
6. 填好上面的 3 个环境变量。
7. Deploy。

部署完成后，用 Vercel 给你的网址打开网站。旧的 GitHub Pages 地址没有后端 API，不适合继续做编辑。

## 使用方式

1. 打开 Vercel 网站。
2. 点“输入编辑密码”。
3. 输入 `TRIP_EDIT_PASSWORD` 对应的密码。
4. 状态变成“共享可编辑”后，就可以新增、删除、勾选、调整行前准备和保存小贴士。

## 数据位置

数据仍然保存在原来的 Supabase `trip_items` 和 `prep_todos` 表里。后端只负责安全读写，不会清空已有数据。
