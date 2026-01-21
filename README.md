# ⛰️ 山行记 - 登山打卡应用

> 🚀 **Vibe Coding**
> 通过 Trae 编辑器，实现了从需求分析、架构设计到代码实现的全流程开发。
> [English](./README_EN.md) | 中文

山行记是一款专为登山爱好者设计的打卡应用，帮助用户记录登山历程，追踪打卡进度，分析登山数据。支持全国著名山峰的地图展示、打卡记录、数据统计分析等功能。

[![GitHub](https://img.shields.io/badge/GitHub-mountains--journey-black?style=for-the-badge&logo=github)](https://github.com/xmwMing/mountains-journey)
[![Vue](https://img.shields.io/badge/Vue-3.5+-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.90+-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

## 🚀 核心功能

### 🗺️ 地图功能
- **全国山峰展示** - 显示全国著名山峰位置和海拔信息
- **智能搜索** - 支持按山峰名称、省份、城市搜索筛选
- **详细信息** - 点击山峰查看地理位置、海拔、难度等详细信息
- **实时更新** - 动态更新筛选结果，快速定位目标山峰

### ✅ 打卡功能
- **登山打卡** - 记录登山时间和备注信息
- **打卡动画** - 成功打卡时的精美动画效果
- **历史记录** - 查看完整的打卡历史记录
- **记录管理** - 支持删除单条打卡记录，带确认提示

### 📊 统计分析
- **数据概览** - 已打卡山峰数量、打卡占比、累计爬升海拔
- **海拔排名** - 已打卡山峰海拔排名 TOP10 柱状图
- **时间轴** - 打卡时间轴折线图，展示登山历程
- **标签云** - 已打卡山峰名称标签云展示
- **数据可视化** - 基于 ECharts 的专业图表展示

### 🔍 搜索筛选
- **实时搜索** - 输入山峰名称实时过滤
- **省份筛选** - 按省份快速定位山峰
- **城市筛选** - 根据省份自动更新城市选项
- **一键重置** - 快速清除所有筛选条件

### 🔐 用户认证
- **安全登录** - 基于 Supabase Auth 的用户认证系统
- **会话管理** - 自动检测和恢复用户会话
- **数据隔离** - 每个用户的打卡数据独立存储

### 📱 响应式设计
- **多端适配** - 完美适配桌面端和移动端
- **移动优化** - 移动端优化的交互体验和触摸操作
- **流畅动画** - 精心设计的过渡动画和加载效果

## 🛠️ 技术栈

### 前端技术
- **框架**: Vue 3.5+ (Composition API)
- **语言**: TypeScript 5.9+
- **构建工具**: Vite 7.2+
- **路由**: Vue Router 4.6+
- **状态管理**: Pinia 3.0+
- **本地存储**: LocalForage 1.10+

### 后端服务
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **实时订阅**: Supabase Realtime

### 地图与可视化
- **地图服务**: 高德地图 AMap
- **数据可视化**: ECharts 6.0+

### 开发工具
- **类型检查**: TypeScript Compiler
- **代码规范**: ESLint + Prettier

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 本地开发

```bash
# 克隆项目
git clone https://github.com/xmwMing/mountains-journey.git
cd mountains-journey

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，添加你的 API 密钥

# 启动开发服务器
npm run dev
```

### 构建部署

```bash
# 类型检查 + 构建
npm run build

# 预览构建结果
npm run preview
```

## 🔧 环境变量配置

在项目根目录创建 `.env` 文件，配置以下环境变量：

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

#### 高德地图
1. 访问 [高德开放平台](https://lbs.amap.com/)
2. 注册并创建应用
3. 选择 Web 端 (JS API)
4. 获取 API Key

## 📁 项目结构

```
src/
├── components/          # 通用组件
│   ├── AmapView.vue        # 地图组件
│   ├── AuthForm.vue        # 登录/注册表单
│   ├── CheckinHistory.vue  # 打卡记录组件
│   ├── Navbar.vue          # 导航栏组件
│   ├── PeakInfo.vue        # 山峰信息组件
│   └── PeakSearch.vue      # 搜索筛选组件
├── config/              # 配置文件
│   └── supabase.ts         # Supabase 客户端配置
├── store/               # 状态管理
│   ├── auth.ts             # 认证状态管理
│   └── mountains.ts        # 山峰和打卡数据管理
├── types/               # TypeScript 类型定义
│   └── index.ts            # 核心类型声明
├── views/               # 页面视图
│   ├── LoginView.vue       # 登录页面
│   ├── MapView.vue         # 地图页面
│   └── StatsView.vue       # 统计页面
├── App.vue              # 根组件
└── main.ts              # 应用入口
```

### 核心模块说明

#### 1. 认证系统 (`store/auth.ts`)
- 基于 Supabase Auth 的用户认证
- 自动会话检测和恢复
- 登录/注册/登出功能
- 会话状态持久化

#### 2. 山峰数据管理 (`store/mountains.ts`)
- 山峰数据的加载和缓存
- 打卡记录的增删改查
- 统计数据的实时计算
- 数据的本地缓存优化

#### 3. 地图组件 (`components/AmapView.vue`)
- 高德地图集成
- 山峰标记展示
- 点击交互处理
- 地图缩放和平移

#### 4. 统计可视化 (`views/StatsView.vue`)
- ECharts 图表集成
- 多维度数据展示
- 响应式图表适配
- 数据动画效果

## 🚀 部署指南

### Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/xmwMing/mountains-journey&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY,VITE_AMAP_KEY&envDescription=Supabase%20and%20AMap%20API%20keys)

### Netlify 部署

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/xmwMing/mountains-journey)

> 📖 详细部署指南请参考：[DEPLOYMENT.md](./DEPLOYMENT.md)

## 📊 数据库设计

### 表结构

#### `peaks` 表
```sql
CREATE TABLE peaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  province VARCHAR(100),
  city VARCHAR(100),
  elevation INTEGER,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  description TEXT,
  difficulty VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `checkins` 表
```sql
CREATE TABLE checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  peak_id UUID REFERENCES peaks(id) ON DELETE CASCADE,
  checkin_date TIMESTAMP DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎯 开发指南

### 添加新山峰

1. 在 Supabase 数据库的 `peaks` 表中添加山峰数据
2. 确保包含正确的经纬度坐标
3. 设置合适的海拔和难度等级

### 扩展统计功能

1. 在 `store/mountains.ts` 中添加新的计算属性
2. 在 `views/StatsView.vue` 中添加新的图表组件
3. 使用 ECharts API 配置图表样式

### 自定义地图样式

1. 在 `components/AmapView.vue` 中修改地图配置
2. 调整标记样式和信息窗口
3. 添加自定义图层或控件

## 📈 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=xmwMing/mountains-journey&type=Date)](https://www.star-history.com/#xmwMing/mountains-journey&Date)

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Supabase](https://supabase.com/) - 开源 Firebase 替代方案
- [高德地图](https://lbs.amap.com/) - 专业地图服务
- [ECharts](https://echarts.apache.org/) - 强大的数据可视化库
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库

## 📄 许可证

MIT License

## 📞 联系方式

如有问题或建议，欢迎：
- 提交 [Issue](https://github.com/xmwMing/mountains-journey/issues)
- 发起 [Pull Request](https://github.com/xmwMing/mountains-journey/pulls)
- 联系项目维护者

---

**⛰️ 山行记** - 记录每一次攀登，见证成长足迹
