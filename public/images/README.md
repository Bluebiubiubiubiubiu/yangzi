# 图片资源说明

本目录用于存放网站所需的所有图片资源。

## 📁 目录结构

```
images/
├── banner/          # 首页轮播图
├── works/           # 作品海报
├── highlights/      # 高光时刻
├── brands/          # 品牌代言
├── magazines/       # 杂志封面
└── gallery/         # 图库图片
```

## 🎨 图片规格建议

### Banner (轮播图)
- **尺寸**: 1920x1080 或更高
- **格式**: JPG/WEBP
- **比例**: 16:9
- **质量**: 高清（文件大小建议 < 500KB）

### 作品海报
- **尺寸**: 600x800 或 2:3 比例
- **格式**: JPG/PNG
- **质量**: 高清

### 品牌代言图片
- **主图尺寸**: 800x1000
- **Logo尺寸**: 200x200 (透明背景PNG)
- **格式**: JPG/PNG

### 杂志封面
- **尺寸**: 600x800 或 3:4 比例
- **格式**: JPG
- **质量**: 高清

### 图库
- **原图**: 1200x1200 或更大
- **缩略图**: 400x400
- **格式**: JPG/WEBP
- **优化**: 建议使用工具压缩

## 🔧 使用占位图

在开发阶段，可以使用以下占位图服务：

### Unsplash
```
https://images.unsplash.com/photo-{id}?w=800&h=1000&fit=crop
```

### Placeholder.com
```
https://via.placeholder.com/800x1000/9333ea/ffffff?text=Image
```

### Lorem Picsum
```
https://picsum.photos/800/1000
```

## 📝 命名规范

- 使用小写字母和连字符
- 避免使用中文和特殊字符
- 示例：`yangzi-dior-2024.jpg`

## ⚠️ 注意事项

1. **版权**: 确保所有图片拥有使用权限
2. **优化**: 发布前使用工具压缩图片
3. **备份**: 保存原图备份
4. **CDN**: 生产环境建议使用CDN加速

## 🛠️ 图片优化工具

- **在线工具**: TinyPNG, Squoosh
- **命令行**: ImageMagick, Sharp
- **Next.js内置**: Image组件自动优化

## 📦 批量处理脚本

可以创建脚本批量生成缩略图：

```bash
# 使用ImageMagick批量生成缩略图
for file in gallery/img-*.jpg; do
  convert "$file" -resize 400x400^ -gravity center -extent 400x400 "gallery/thumb-${file##*/}"
done
```

