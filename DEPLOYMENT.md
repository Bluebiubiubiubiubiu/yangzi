# 部署指南

本文档提供详细的部署说明，帮助你将网站部署到生产环境。

## 🚀 快速部署到 Vercel（推荐）

### 方式1: 通过 Git 仓库部署

1. **将代码推送到 GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: 杨紫星际档案"
   git remote add origin https://github.com/your-username/yangzi-star.git
   git push -u origin main
   ```

2. **连接到 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 导入你的 Git 仓库
   - Vercel 会自动检测 Next.js 项目并配置

3. **环境变量配置**（可选）
   - 在 Vercel Dashboard 中设置环境变量
   - 添加 `NEXT_PUBLIC_SITE_URL` 等

4. **部署**
   - 点击 "Deploy"
   - 等待构建完成
   - 获得你的生产URL: `https://your-project.vercel.app`

### 方式2: 通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 部署到生产环境
vercel --prod
```

## 🌐 自定义域名

### 在 Vercel 中添加域名

1. 进入项目的 "Settings" → "Domains"
2. 添加你的域名（如 `yangzi.fan`）
3. 按照指示配置 DNS 记录：
   - **A Record**: `76.76.21.21`
   - 或 **CNAME**: `cname.vercel-dns.com`
4. 等待 DNS 生效（可能需要几分钟到24小时）

### SSL 证书
Vercel 会自动为你的域名配置免费的 SSL 证书（Let's Encrypt）

## 📦 其他部署平台

### Netlify

1. 连接 Git 仓库
2. 构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
3. 部署

### Docker 部署

创建 `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

# 安装依赖
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 构建应用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 生产运行
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

构建和运行：

```bash
docker build -t yangzi-star .
docker run -p 3000:3000 yangzi-star
```

### VPS/云服务器部署

#### 1. 准备服务器（Ubuntu/Debian）

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 PM2（进程管理器）
sudo npm install -g pm2
```

#### 2. 部署应用

```bash
# 克隆代码
git clone https://github.com/your-username/yangzi-star.git
cd yangzi-star

# 安装依赖
npm ci

# 构建
npm run build

# 使用 PM2 启动
pm2 start npm --name "yangzi-star" -- start

# 设置开机自启
pm2 startup
pm2 save
```

#### 3. 配置 Nginx 反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/yangzi-star /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 4. 配置 SSL（使用 Let's Encrypt）

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 🔧 构建优化

### 环境变量

创建 `.env.production`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CDN_URL=https://cdn.your-domain.com
```

### 图片优化

建议使用 CDN 服务：
- **Cloudflare Images**
- **Cloudinary**
- **阿里云 OSS**
- **腾讯云 COS**

在 `next.config.ts` 中配置：

```typescript
const config = {
  images: {
    domains: ['cdn.your-domain.com'],
    formats: ['image/webp'],
  },
};
```

### 性能优化建议

1. **启用压缩**
   ```typescript
   // next.config.ts
   const config = {
     compress: true,
   };
   ```

2. **图片懒加载** - 已在代码中实现

3. **代码分割** - Next.js 自动处理

4. **缓存策略**
   ```nginx
   # Nginx 配置
   location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

## 📊 监控与分析

### Google Analytics

1. 安装依赖：
   ```bash
   npm install @next/third-parties
   ```

2. 在 `layout.tsx` 中添加：
   ```typescript
   import { GoogleAnalytics } from '@next/third-parties/google'
   
   export default function RootLayout() {
     return (
       <html>
         <body>
           {children}
           <GoogleAnalytics gaId="G-XXXXXXXXXX" />
         </body>
       </html>
     )
   }
   ```

### Vercel Analytics

在 Vercel Dashboard 中一键启用。

## 🔒 安全建议

1. **设置安全头**
   ```typescript
   // next.config.ts
   const config = {
     async headers() {
       return [
         {
           source: '/(.*)',
           headers: [
             {
               key: 'X-Frame-Options',
               value: 'DENY',
             },
             {
               key: 'X-Content-Type-Options',
               value: 'nosniff',
             },
           ],
         },
       ];
     },
   };
   ```

2. **使用 HTTPS**
3. **定期更新依赖**
   ```bash
   npm audit
   npm update
   ```

## 📝 部署检查清单

- [ ] 代码推送到 Git 仓库
- [ ] 环境变量配置完成
- [ ] 图片资源已上传
- [ ] 测试所有功能正常
- [ ] 配置自定义域名
- [ ] 启用 HTTPS/SSL
- [ ] 配置 CDN（可选）
- [ ] 设置监控和分析
- [ ] 性能测试通过
- [ ] SEO 优化检查

## 🆘 常见问题

### 构建失败

1. 检查 Node.js 版本（需要 18.17+）
2. 清除缓存：`rm -rf .next node_modules && npm install`
3. 查看构建日志找出具体错误

### 图片无法显示

1. 检查图片路径是否正确
2. 确认图片文件已上传到 `public/images/`
3. 检查 Next.js Image 配置

### 页面加载慢

1. 使用 CDN 加速静态资源
2. 优化图片大小
3. 启用服务器端缓存
4. 使用 Vercel Edge Network（自动）

## 📞 获取帮助

- Vercel 文档: https://vercel.com/docs
- Next.js 文档: https://nextjs.org/docs
- 社区支持: https://github.com/vercel/next.js/discussions

---

部署愉快！🚀

