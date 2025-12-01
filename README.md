# 杨紫星际档案 - 明星个人站 (v2.0 Design Upgrade)

> 记录光芒，见证成长 | 探索无限可能

一个融合**未来科技感**与**高端时尚美学**的沉浸式个人档案网站。采用极致的深色玻璃拟态风格，专为展示明星的演艺历程与商业价值打造。

## ✨ 设计亮点 (Design Highlights)

### 🌌 视觉美学
- **Cyberpunk Neon**: 全新的霓虹配色系统（#b026ff 紫色光晕），营造赛博朋克氛围。
- **Deep Space Texture**: 动态网格背景 + 噪点纹理，打造深邃的星际空间感。
- **Glassmorphism 2.0**: 极致的玻璃拟态组件，悬浮感与通透感并存。

### 🚀 交互体验
- **Micro-Interactions**: 精心设计的 Hover 光效、3D 倾斜、边框流光动画。
- **Immersive Layout**: 杂志级的大号排版，高对比度的信息展示。
- **Smooth Motion**: 全局平滑过渡与视差滚动效果。

## ⚡ 核心功能升级

### 🏠 首页 (Dashboard)
- **Magazine Hero**: 杂志封面级的大图轮播，配合动态文字遮罩与进度指示器。
- **Holographic Stats**: 悬浮的全息数据卡片，数字跳动伴随霓虹光晕。
- **Live News Ticker**: 科技感十足的动态新闻流，类似 HUD 的信息展示。
- **3D Highlights**: 具有 3D 视差效果的高光时刻展示卡片。

### 🎬 作品殿堂 (Works)
- **Tech Cards**: 重新设计的作品卡片，带有 Glitch 故障风 Hover 效果。
- **Smart Tags**: 高对比度的状态标签与数据浮层。
- **Data Visualization**: 更加直观的实绩数据展示。

（其余功能模块保持核心逻辑不变，视觉风格全面同步升级）

## 🛠️ 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4 (使用 CSS Variables 实现动态主题)
- **字体**: Geist Sans & Geist Mono (现代无衬线字体)
- **部署**: Vercel

## 📦 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 体验全新的视觉效果。

## 🎨 自定义指南

### 修改主题色
在 `src/app/globals.css` 中修改 CSS 变量：
```css
:root {
  --neon-purple: #b026ff; /* 主色调 */
  --neon-blue: #00f3ff;   /* 辅助色1 */
  --neon-pink: #ff0099;   /* 辅助色2 */
}
```

### 添加背景图
将你的高清背景图放入 `public/images/`，并在 `globals.css` 或组件中引用。

---

**Made with 💜 for Fans**
