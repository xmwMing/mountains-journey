# 部署指南 / Deployment Guide

## 🚀 支持的部署平台

### Vercel 部署

- **特点**: 自动部署、边缘网络、无服务器函数支持
- **配置文件**: 可选 `vercel.json`
- **环境变量**: 在 Vercel 项目设置中配置

### Netlify 部署

- **特点**: 持续部署、表单处理、重定向规则
- **配置文件**: 可选 `netlify.toml`
- **环境变量**: 在 Netlify 站点设置中配置

### 其他平台
- **GitHub Pages**: 静态站点托管
- **Cloudflare Pages**: 全球 CDN 分发
- **任何支持静态站点的托管服务**

## 🔧 环境变量配置

部署前需要配置以下环境变量：

```env
# Supabase 配置
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# 高德地图配置
VITE_AMAP_KEY=your_amap_api_key
```

### 获取 API 密钥

#### Supabase
1. 访问 [Supabase](https://supabase.com/) 并创建账户
2. 创建新项目
3. 在项目设置中获取 API URL 和 anon key
4. 确保启用了所需的认证和数据库功能

#### 高德地图
1. 访问 [高德开放平台](https://lbs.amap.com/)
2. 注册并创建应用
3. 选择 Web 端 (JS API)
4. 获取 API Key
5. 配置域名白名单（如果需要）

## 📋 部署步骤

### Vercel 部署步骤

#### 方式一：通过 Vercel 仪表板

1. **Fork 项目**到你的 GitHub 账户
2. **登录 Vercel**并连接 GitHub
3. **导入项目**：选择 fork 的仓库
4. **配置构建设置**：
   - Framework Preset: Vue
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. **配置环境变量**：
   - 添加 `VITE_SUPABASE_URL`
   - 添加 `VITE_SUPABASE_ANON_KEY`
   - 添加 `VITE_AMAP_KEY`
6. **部署**：Vercel 会自动构建和部署

#### 方式二：一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/xmwMing/mountains-journey&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY,VITE_AMAP_KEY&envDescription=Supabase%20and%20AMap%20API%20keys)

#### Vercel 配置文件（可选）

创建 `vercel.json` 文件：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Netlify 部署步骤

#### 方式一：通过 Netlify 仪表板

1. **Fork 项目**到你的 GitHub 账户
2. **登录 Netlify**并连接 GitHub
3. **新建站点**：选择 fork 的仓库
4. **构建设置**：
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18` 或 `20`
5. **环境变量**：
   - 添加 `VITE_SUPABASE_URL`
   - 添加 `VITE_SUPABASE_ANON_KEY`
   - 添加 `VITE_AMAP_KEY`
6. **部署**：Netlify 会自动构建和部署

#### 方式二：一键部署

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/xmwMing/mountains-journey)

#### Netlify 配置文件（可选）

创建 `netlify.toml` 文件：

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### GitHub Pages 部署步骤

1. **Fork 项目**到你的 GitHub 账户
2. **修改 vite.config.ts**，添加 base 路径：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/mountains-journey/', // 替换为你的仓库名
})
```

3. **创建 GitHub Actions 工作流**：

在 `.github/workflows/deploy.yml` 中创建：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_AMAP_KEY: ${{ secrets.VITE_AMAP_KEY }}

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

4. **配置 GitHub Secrets**：
   - 进入仓库 Settings > Secrets and variables > Actions
   - 添加 `VITE_SUPABASE_URL`
   - 添加 `VITE_SUPABASE_ANON_KEY`
   - 添加 `VITE_AMAP_KEY`

5. **启用 GitHub Pages**：
   - 进入仓库 Settings > Pages
   - Source 选择 GitHub Actions

## 🛠️ 自定义域名

### Vercel 自定义域名

1. 在 Vercel 项目设置中选择 **Domains**
2. 添加你的域名
3. 按照提示配置 DNS 记录：
   - A 记录指向 Vercel 提供的 IP
   - 或 CNAME 记录指向 `cname.vercel-dns.com`

### Netlify 自定义域名

1. 在 Netlify 站点设置中选择 **Domain management**
2. 添加自定义域名
3. 配置 DNS 记录或使用 Netlify DNS：
   - A 记录指向 Netlify 提供的 IP
   - 或 CNAME 记录指向 `your-site.netlify.app`

### GitHub Pages 自定义域名

1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容为你的域名（如 `www.example.com`）
3. 在域名 DNS 设置中添加：
   - CNAME 记录指向 `xmwMing.github.io`
4. 等待 DNS 生效

## 🔄 自动部署

### Vercel 自动部署
- **推送到主分支**：自动触发生产环境部署
- **推送到其他分支**：创建预览部署
- **Pull Request**：自动创建预览部署
- **支持**：Git 集成、GitHub App

### Netlify 自动部署
- **推送到主分支**：自动触发生产环境部署
- **推送到其他分支**：创建分支部署
- **Pull Request**：自动创建部署预览
- **支持**：Git 集成、GitHub App

### GitHub Pages 自动部署
- **推送到主分支**：自动触发 GitHub Actions 工作流
- **工作流完成**：自动部署到 GitHub Pages
- **支持**：GitHub Actions

## 📊 监控和分析

### Vercel Analytics

1. 在 Vercel 项目设置中启用 Vercel Analytics
2. 安装 Analytics SDK（可选）
3. 查看页面性能和用户访问数据

### Netlify Analytics

1. 升级到付费计划以使用 Netlify Analytics
2. 在站点设置中启用 Analytics
3. 查看流量统计和性能指标

### 其他监控工具

- **Google Analytics**: 添加到项目中
- **Sentry**: 错误追踪和监控
- **LogRocket**: 用户会话录制

## 🚨 故障排除

### 常见问题

#### 1. 构建失败

**症状**: 部署时构建失败

**解决方案**:
- 检查环境变量是否正确配置
- 确保 Node.js 版本兼容（推荐 18+）
- 查看构建日志中的错误信息
- 本地运行 `npm run build` 测试

#### 2. 页面 404

**症状**: 刷新页面时出现 404 错误

**解决方案**:
- 确保配置了 SPA 重定向规则
- Vercel: 检查 `vercel.json` 中的 rewrites 配置
- Netlify: 检查 `netlify.toml` 中的 redirects 配置
- GitHub Pages: 确保 `base` 路径配置正确

#### 3. API 调用失败

**症状**: Supabase 或 AMap API 调用失败

**解决方案**:
- 检查 API 密钥是否正确
- 验证 API 密钥权限
- 检查 CORS 设置（Supabase）
- 验证域名白名单（AMap）
- 查看浏览器控制台错误信息

#### 4. 地图不显示

**症状**: 地图组件无法加载

**解决方案**:
- 检查 AMap API Key 是否有效
- 确认域名已添加到白名单
- 检查网络连接
- 验证 AMap JS API 是否正确加载

#### 5. 认证失败

**症状**: 用户无法登录或注册

**解决方案**:
- 检查 Supabase URL 和 anon key
- 验证 Supabase 项目设置
- 检查邮箱验证设置
- 查看 Supabase 日志

### 调试步骤

1. **查看构建日志**
   - 检查构建过程中的错误和警告
   - 确认依赖安装是否成功

2. **检查环境变量**
   - 确认所有必需的环境变量已设置
   - 验证变量值是否正确

3. **本地测试**
   - 本地运行 `npm run build`
   - 使用 `npm run preview` 测试构建结果

4. **检查网络和 API 连接**
   - 测试 Supabase 连接
   - 测试 AMap API 连接
   - 检查 CORS 设置

5. **浏览器控制台**
   - 打开浏览器开发者工具
   - 查看 Console 和 Network 标签
   - 检查 JavaScript 错误和网络请求

## 🔐 安全建议

### 环境变量安全
- 永远不要在代码中硬编码 API 密钥
- 使用平台提供的环境变量功能
- 定期轮换 API 密钥
- 使用最小权限原则

### Supabase 安全
- 启用 Row Level Security (RLS)
- 配置适当的访问策略
- 使用 service role key 仅在服务器端
- 定期备份重要数据

### 域名和 HTTPS
- 始终使用 HTTPS
- 配置适当的 CORS 策略
- 使用安全头（CSP, HSTS）
- 定期更新 SSL 证书

## 📞 支持

如果遇到部署问题，可以：

1. **查看项目 Issues**
   - 搜索类似问题
   - 提交新的 Issue

2. **参考官方文档**
   - [Vercel 文档](https://vercel.com/docs)
   - [Netlify 文档](https://docs.netlify.com/)
   - [GitHub Pages 文档](https://docs.github.com/en/pages)
   - [Supabase 文档](https://supabase.com/docs)
   - [高德地图文档](https://lbs.amap.com/api/javascript-api/summary)

3. **社区支持**
   - Vue.js 社区
   - Supabase Discord
   - Stack Overflow

4. **提交新的 Issue**
   - 描述问题详情
   - 提供错误日志
   - 说明复现步骤
   - 包含环境信息

## 🎯 最佳实践

### 部署前检查清单

- [ ] 所有环境变量已配置
- [ ] 本地构建成功（`npm run build`）
- [ ] 数据库表结构正确
- [ ] API 密钥有效且有足够权限
- [ ] 域名 DNS 配置正确
- [ ] HTTPS 证书已配置
- [ ] 监控和分析工具已设置
- [ ] 备份策略已制定

### 持续集成

- 使用 GitHub Actions 进行自动化测试
- 在合并前运行测试和构建
- 使用代码审查流程
- 保持依赖更新

### 性能优化

- 启用 CDN 缓存
- 压缩静态资源
- 使用懒加载
- 优化图片和字体
- 启用 Gzip/Brotli 压缩

---

**祝部署顺利！** 🚀
