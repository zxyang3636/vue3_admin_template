# Vue3 后台管理系统 🚀

## 项目概述 💼

这是一个企业级中后台解决方案，采用前沿技术栈构建，具备以下特点：

- 🛠 开箱即用：预置最佳实践配置，无需复杂初始化
 
- 🚀 极致性能：Vite 构建工具带来闪电般开发体验
 
- 📱 响应式布局：完美适配桌面/平板/移动端

- 🔒 权限控制：完善的页面级/功能级权限管理方案

- 📊 数据可视化：集成Echarts实现数据图表展示

- ✨ UI统一：Element Plus提供一致的设计语言

- 📦 模块化架构：高内聚低耦合的组件设计

## 🧩 技术栈亮点

| 技术 |	版本	| 功能
|-----|-----|-----|
| ​​Vue 3​ |​	3.4+ |	渐进式JavaScript框架 |
| ​​TypeScript​​|	5.x	| 类型安全的JavaScript超集   |
| ​​Vite​​ |	5.x | 	极速开发服务器与构建工具   |
| ​​Pinia​​ |	2.x	| 现代化的Vue状态管理   |
| ​​Vue Router |​​	4.x | 	官方路由解决方案   |
| ​​Element Plus |​​	2.5+ | 	企业级UI组件库   |
| ​​ESLint​ |​	9.x | 	JavaScript/TypeScript代码检查   |
| ​​Prettier​ |​	3.x	| 代码格式化工具   |
| ​​Stylelint​ |​	16.x | 	CSS/SCSS样式检查   |
| ​​Husky​​ |	9.x	| Git钩子管理   |
| ​​Commitlint |​​	19.x	| Git提交信息规范   |


## ✨ 核心特性

​​1. 🦄 极致开发体验​​
- Vite驱动的极速HMR
- 基于浏览器的原生ES模块
- 闪电般的热更新速度

​2. ​🔒 企业级开发规范​​
- TypeScript静态类型检查
- 严格的代码质量保障（ESLint + Prettier + Stylelint）
- Git提交规范化（Commitizen + Commitlint）

​​3. 📦 高效依赖管理​​
- PNPM作为核心包管理器

4. ​​📂 模块化架构
```
src/
├── assets/          # 静态资源
├── components/      # 全局组件
├── layouts/         # 页面布局
├── router/          # 路由配置
├── stores/          # Pinia状态管理
├── styles/          # 全局样式
├── utils/           # 工具函数
├── views/           # 页面视图
└── App.vue          # 根组件
```

5. 🎨 高级主题系统

- ​​双模式主题支持
- 🌙 优雅的暗黑模式
- ☀️ 明亮的日间模式
- ⚡ 一键无缝切换

​- ​全局自定义色彩系统
- 🖌️ 基于CSS变量的动态色彩管理
- 🌈 实时预览色彩变化效果

## 🚀 快速开始
### 安装依赖
```bash
pnpm install
```

### 开发环境
```bash
pnpm run dev
```
### 代码检查与修复
```
pnpm run lint          # 检查所有代码
```

### 代码格式化
```
pnpm format        # 格式化所有文件
```

## 📋 开发规范
### 代码提交规范（Commitlint）

**提交类型示例​​:**

- feat: 新增功能
- fix: 修复bug
- docs: 文档更新
- style: 样式调整
- refactor: 代码重构
- test: 测试相关
- chore: 构建/工具变更

