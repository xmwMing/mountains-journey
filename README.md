# 山行记 - 登山打卡应用

山行记是一款专为登山爱好者设计的打卡应用，帮助用户记录登山历程，追踪打卡进度，分析登山数据。

## 功能特性

### 🗺️ 地图功能
- 显示全国著名山峰位置
- 支持按名称、省份、城市搜索筛选
- 山峰标记显示海拔信息
- 点击山峰查看详细信息

### ✅ 打卡功能
- 登山打卡记录
- 打卡成功动画效果
- 打卡记录历史查看
- 支持删除单条打卡记录

### 📊 统计分析
- 已打卡山峰数量
- 打卡占比统计
- 累计爬升海拔
- 山峰海拔排名TOP10
- 打卡时间轴
- 已打卡山峰列表

### 🔍 搜索筛选
- 支持按山峰名称搜索
- 支持省份筛选
- 支持城市筛选
- 动态更新筛选结果

### 📱 响应式设计
- 适配桌面端和移动端
- 移动端优化的交互体验

## 技术栈

- **前端框架**: Vue 3 + TypeScript + Vite
- **状态管理**: Pinia
- **后端服务**: Supabase
- **地图服务**: AMap (高德地图)
- **数据可视化**: ECharts
- **样式设计**: CSS3 + 自定义动画

## 安装与运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装步骤

1. 克隆项目
```bash
git clone <repository-url>
cd mountains-trae
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
   - 复制 `.env.example` 为 `.env`
   - 填写 Supabase 和 AMap 的 API 密钥

4. 启动开发服务器
```bash
npm run dev
```

5. 构建生产版本
```bash
npm run build
```

## 项目结构

```
src/
├── components/          # Vue 组件
│   ├── AmapView.vue    # 地图组件
│   ├── CheckinHistory.vue  # 打卡记录组件
│   ├── Navbar.vue      # 导航栏组件
│   ├── PeakInfo.vue    # 山峰信息组件
│   ├── PeakSearch.vue  # 搜索组件
│   └── StatsOverview.vue   # 统计概览组件
├── config/             # 配置文件
│   └── supabase.ts     # Supabase 配置
├── views/              # 页面视图
│   ├── MapView.vue     # 地图页面
│   └── StatsView.vue   # 统计页面
├── store/              # Pinia 状态管理
│   ├── auth.ts         # 认证状态
│   └── mountains.ts    # 山峰和打卡数据
├── types/              # TypeScript 类型定义
│   └── index.ts        # 类型声明
├── App.vue             # 根组件
└── main.ts             # 入口文件
```

## 主要功能说明

### 地图页面
- 显示所有山峰标记
- 支持搜索和筛选
- 点击山峰查看详细信息
- 支持打卡操作
- 显示打卡记录历史

### 统计页面
- 统计概览卡片
- 已打卡山峰海拔排名TOP10柱状图
- 打卡时间轴折线图
- 已打卡山峰名称标签云

### 搜索筛选功能
- 实时搜索山峰名称
- 动态省份筛选
- 动态城市筛选（根据省份自动更新）
- 重置筛选条件

### 打卡记录管理
- 查看所有打卡记录
- 按时间倒序排序
- 支持删除单条记录
- 删除前确认提示

## 开发指南

### 代码规范
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 Vue 3 最佳实践
- 优先使用 Composition API

### 提交规范
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 代码重构
- test: 测试代码
- chore: 构建或配置修改

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎联系项目维护者。
