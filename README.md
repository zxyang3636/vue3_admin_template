# 🚀 ZZY 企业级后台管理系统

<div align="center">

![Vue](https://img.shields.io/badge/Vue-3.5.13-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Element Plus](https://img.shields.io/badge/Element%20Plus-2.10.2-409EFF?style=flat-square&logo=element&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0.3-FFD700?style=flat-square&logo=pinia&logoColor=white)

**一个基于 Vue 3 + TypeScript + Vite 的现代化企业级中后台管理系统模板**

[📖 在线文档](#) | [🎯 在线预览](#) | [🐛 报告问题](https://github.com/your-repo/issues) | [💡 功能建议](https://github.com/your-repo/issues)

</div>

---

## 📋 项目概述

这是一个**开箱即用**的企业级中后台解决方案，采用最新的前端技术栈构建。项目注重**开发体验**、**代码质量**和**系统可维护性**，为中小型企业提供快速搭建管理系统的最佳实践模板。

### ✨ 核心亮点

- 🎯 **开箱即用** - 完整的业务功能模块，克隆即可开发
- ⚡ **极速开发** - Vite HMR 提供毫秒级热更新体验  
- 🛡️ **类型安全** - 全面的 TypeScript 支持，编译时错误检查
- 🎨 **现代UI** - Element Plus 组件库，精美的界面设计
- 🔐 **权限完备** - 页面级+按钮级权限控制，路由守卫保护
- 📱 **响应式** - 完美适配桌面端、平板和移动端
- 🔧 **工程化** - 标准化的代码规范、Git提交规范
- 🚀 **高性能** - 代码分割、懒加载、构建优化

---

## 🎯 功能特性

### 🏗️ 基础设施
- **用户认证** - 登录/登出、Token自动刷新、路由守卫
- **布局管理** - 响应式侧边栏、面包屑导航、标签页
- **权限控制** - 基于角色的访问控制(RBAC)
- **状态管理** - Pinia 集中式状态管理
- **主题定制** - 暗黑模式、主题色切换

### 📊 业务模块
- **首页概览** - 数据统计、图表展示
- **数据大屏** - 可视化数据展示大屏
- **权限管理**
  - 👥 用户管理 - 用户CRUD、状态管理
  - 🎭 角色管理 - 角色权限分配
  - 📋 菜单管理 - 动态菜单配置
- **商品管理**
  - 🏷️ 品牌管理 - 商品品牌维护
  - 🏗️ 属性管理 - 商品属性配置
  - 📦 SPU管理 - 标准产品单元
  - 🎯 SKU管理 - 库存单品管理

### 🛠️ 开发工具
- **Mock数据** - 本地模拟接口，独立开发
- **请求拦截** - 统一错误处理、Token管理
- **代码规范** - ESLint + Prettier + Stylelint
- **Git规范** - Commitlint + Husky 提交检查

---

## 🧰 技术栈

| 技术 | 版本 | 描述 |
|------|------|------|
| **核心框架** |
| Vue.js | `3.5.13` | 渐进式 JavaScript 框架 |
| TypeScript | `5.8.3` | JavaScript 的超集，提供静态类型 |
| Vite | `6.3.5` | 下一代前端构建工具 |
| **状态管理** |
| Pinia | `3.0.3` | Vue 官方推荐的状态管理库 |
| Vue Router | `4.5.1` | Vue.js 官方路由管理器 |
| **UI组件** |
| Element Plus | `2.10.2` | 基于 Vue 3 的桌面端组件库 |
| @element-plus/icons-vue | `2.3.1` | Element Plus 图标库 |
| **HTTP客户端** |
| Axios | `1.10.0` | Promise 基的 HTTP 库 |
| **开发工具** |
| ESLint | `9.29.0` | JavaScript 代码检查工具 |
| Prettier | `3.5.3` | 代码格式化工具 |
| Stylelint | `16.21.0` | CSS 代码检查工具 |
| Husky | `8.0.0` | Git hooks 工具 |
| Commitlint | `19.8.1` | Git 提交信息规范检查 |
| **构建工具** |
| Sass | `1.89.2` | CSS 预处理器 |
| TypeScript | `5.8.3` | 类型检查和编译 |
| **开发辅助** |
| vite-plugin-mock | `3.0.2` | Vite Mock 插件 |
| vite-plugin-svg-icons | `2.0.1` | SVG 图标插件 |
| nprogress | `0.2.0` | 页面加载进度条 |

---

## 📁 项目结构

```
vue3_admin_template/
├── 📂 public/                    # 静态资源
│   ├── logo.png                  # 应用图标
│   └── vite.svg                  # Vite图标
├── 📂 src/
│   ├── 📂 api/                   # API接口管理
│   │   └── user/                 # 用户相关接口
│   ├── 📂 assets/                # 项目资源
│   │   ├── icons/                # SVG图标
│   │   └── images/               # 图片资源
│   ├── 📂 components/            # 全局组件
│   │   └── SvgIcon/              # SVG图标组件
│   ├── 📂 layout/                # 布局组件
│   │   ├── index.vue             # 主布局
│   │   ├── logo/                 # Logo组件
│   │   ├── menu/                 # 菜单组件
│   │   ├── main/                 # 内容区域
│   │   └── tabbar/               # 顶部导航栏
│   ├── 📂 router/                # 路由配置
│   │   ├── index.ts              # 路由实例
│   │   └── routes.ts             # 路由定义
│   ├── 📂 store/                 # Pinia状态管理
│   │   ├── index.ts              # Store入口
│   │   └── modules/              # Store模块
│   │       ├── user.ts           # 用户状态
│   │       ├── setting.ts        # 设置状态
│   │       └── types/            # TypeScript类型
│   ├── 📂 styles/                # 全局样式
│   │   ├── index.scss            # 样式入口
│   │   ├── reset.scss            # 重置样式
│   │   ├── variable.scss         # SCSS变量
│   │   └── element-plus.scss     # Element Plus定制
│   ├── 📂 utils/                 # 工具函数
│   │   ├── request.ts            # HTTP请求封装
│   │   ├── token.ts              # Token管理
│   │   └── times.ts              # 时间工具
│   ├── 📂 views/                 # 页面组件
│   │   ├── login/                # 登录页
│   │   ├── home/                 # 首页
│   │   ├── screen/               # 数据大屏
│   │   ├── 404/                  # 404页面
│   │   ├── acl/                  # 权限管理
│   │   │   ├── user/             # 用户管理
│   │   │   ├── role/             # 角色管理
│   │   │   └── permission/       # 菜单管理
│   │   └── product/              # 商品管理
│   │       ├── trademark/        # 品牌管理
│   │       ├── attr/             # 属性管理
│   │       ├── spu/              # SPU管理
│   │       └── sku/              # SKU管理
│   ├── App.vue                   # 根组件
│   ├── main.ts                   # 应用入口
│   ├── permission.ts             # 路由守卫
│   └── setting.ts                # 全局配置
├── 📂 mock/                      # Mock数据
│   └── user.ts                   # 用户Mock接口
├── 📂 scripts/                   # 脚本文件
│   └── preinstall.js             # 预安装脚本
├── .env.development              # 开发环境变量
├── .env.test                     # 测试环境变量
├── package.json                  # 项目配置
├── vite.config.ts                # Vite配置
├── tsconfig.json                 # TypeScript配置
├── eslint.config.js              # ESLint配置
└── README.md                     # 项目文档
```

---

## 🚀 快速开始

### 📋 环境要求

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0 (推荐)
- **现代浏览器**: 支持 ES2020+

### 📦 安装与运行

```bash
# 1. 克隆项目
git clone https://github.com/your-username/vue3_admin_template.git
cd vue3_admin_template

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm run dev

# 4. 浏览器访问
http://localhost:5173
```

### 🔧 可用脚本

```bash
# 🚀 开发
pnpm run dev              # 启动开发服务器

# 🏗️ 构建
pnpm run build            # 生产环境构建
pnpm run build:test       # 测试环境构建
pnpm run build:pro        # 生产环境构建
pnpm run preview          # 预览构建结果

# 🔍 代码质量
pnpm run lint             # 检查代码规范
pnpm run fix              # 自动修复代码问题
pnpm run format           # 格式化所有文件
pnpm run lint:eslint      # ESLint检查并修复
pnpm run lint:style       # Stylelint检查并修复

# 📝 Git规范
pnpm run commitlint       # 检查提交信息格式
```

---

## 🎯 核心功能说明

### 🔐 权限系统
项目采用基于**角色的访问控制(RBAC)**，支持：
- **页面级权限**: 通过路由守卫控制页面访问
- **按钮级权限**: 通过指令控制操作按钮显示
- **菜单级权限**: 动态生成侧边栏菜单

### 🔄 Token管理
实现了完整的Token生命周期管理：
- **自动刷新**: Token过期时自动使用RefreshToken刷新
- **请求重试**: Token刷新成功后自动重试失败的请求
- **并发控制**: 防止多个请求同时触发Token刷新

### 📱 响应式布局
- **桌面端**: 侧边栏+主内容区域布局
- **移动端**: 抽屉式侧边栏，手势操作
- **自适应**: 根据屏幕尺寸自动调整组件布局

### 🎨 主题定制
- **暗黑模式**: 一键切换亮色/暗色主题
- **主题色**: 支持自定义品牌色
- **组件样式**: Element Plus组件深度定制

---

## 📊 默认账号

开发环境提供以下测试账号：

| 用户名 | 密码 | 角色 | 权限 |
|--------|------|------|------|
| `admin` | `111111` | 平台管理员 | 所有权限 |
| `system` | `111111` | 系统管理员 | 部分权限 |

---

## 🛠️ 开发规范

### 📝 代码提交规范

本项目采用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Type 类型：**
- `feat`: ✨ 新功能
- `fix`: 🐛 Bug修复  
- `docs`: 📚 文档更新
- `style`: 💄 代码格式化
- `refactor`: ♻️ 代码重构
- `perf`: ⚡ 性能优化
- `test`: ✅ 测试相关
- `chore`: 🔧 构建/工具变更

**示例：**
```bash
git commit -m "feat(user): 新增用户管理页面"
git commit -m "fix(auth): 修复token刷新失败问题"
git commit -m "docs: 更新README文档"
```

### 🎯 代码风格

项目配置了完整的代码质量检查工具：

- **ESLint**: JavaScript/TypeScript语法检查
- **Prettier**: 代码格式化
- **Stylelint**: CSS/SCSS样式检查
- **Husky**: Git hooks自动化

### 📁 文件命名规范

- **组件文件**: PascalCase (如: `UserTable.vue`)
- **工具文件**: camelCase (如: `formatDate.ts`)
- **页面文件**: kebab-case (如: `user-list.vue`)
- **样式文件**: kebab-case (如: `user-table.scss`)

---

## 🔧 配置说明

### 🌍 环境变量

项目支持多环境配置：

```bash
# .env.development (开发环境)
NODE_ENV = 'development'
VITE_APP_TITLE = 'ZZY后台管理'
VITE_APP_BASE_API = '/api'
VITE_SERVE = 'http://127.0.0.1:8070'

# .env.test (测试环境)
NODE_ENV = 'test'
VITE_APP_TITLE = 'ZZY后台管理(测试)'
VITE_APP_BASE_API = '/api'
VITE_SERVE = 'http://test.example.com'

# .env.production (生产环境)
NODE_ENV = 'production'
VITE_APP_TITLE = 'ZZY后台管理'
VITE_APP_BASE_API = '/api'
VITE_SERVE = 'http://prod.example.com'
```

### ⚙️ Vite配置特性

- **代理配置**: 开发环境API代理
- **Mock服务**: 本地数据模拟
- **SVG图标**: 自动导入SVG文件
- **路径别名**: `@` 指向 `src` 目录
- **SCSS变量**: 全局SCSS变量注入

---

## 📚 开发指南

### 🎯 添加新页面

1. **创建页面组件**
```bash
# 在 src/views 下创建新页面
src/views/example/index.vue
```

2. **配置路由**
```typescript
// src/router/routes.ts
{
  path: '/example',
  name: 'Example',
  component: () => import('@/views/example/index.vue'),
  meta: { title: '示例页面', hidden: false, icon: 'Example' }
}
```

3. **添加权限控制**
```typescript
// 在用户权限中添加对应的路由权限
routes: ['example']
```

### 🔌 添加新接口

1. **定义类型**
```typescript
// src/api/example/type.ts
export interface ExampleRequest {
  id: number
  name: string
}

export interface ExampleResponse {
  data: ExampleData[]
  total: number
}
```

2. **创建接口**
```typescript
// src/api/example/index.ts
import request from '@/utils/request'
import type { ExampleRequest, ExampleResponse } from './type'

export const getExampleList = (params: ExampleRequest) => 
  request.get<any, ExampleResponse>('/example/list', { params })
```

### 🎨 自定义主题

1. **修改SCSS变量**
```scss
// src/styles/variable.scss
$primary-color: #3370FF;
$menu-width: 260px;
```

2. **覆盖Element Plus样式**
```scss
// src/styles/element-plus.scss
.el-button--primary {
  background-color: $primary-color;
}
```

---

## 🚀 部署指南

### 📦 构建生产版本

```bash
# 构建生产环境
pnpm run build:pro

# 构建测试环境  
pnpm run build:test

# 预览构建结果
pnpm run preview
```

### 🌐 部署到服务器

```bash
# 1. 构建项目
pnpm run build:pro

# 2. 上传 dist 文件夹到服务器

# 3. 配置 Nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://your-backend-api;
    }
}
```

### 🐳 Docker部署

```dockerfile
# Dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 🐛 报告问题
1. 确保问题不是重复的
2. 提供详细的重现步骤
3. 包含环境信息(浏览器、Node版本等)

### 💡 提交功能
1. Fork 本仓库
2. 创建功能分支: `git checkout -b feature/AmazingFeature`
3. 提交更改: `git commit -m 'feat: 添加某个功能'`
4. 推送分支: `git push origin feature/AmazingFeature`
5. 提交 Pull Request

### 📋 代码审查标准
- 遵循项目代码规范
- 通过所有ESLint检查
- 添加必要的单元测试
- 更新相关文档

---

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

---

## 🙏 致谢

感谢以下优秀的开源项目：

- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Element Plus](https://element-plus.org/) - Vue 3组件库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/) - Vue状态管理
- [TypeScript](https://www.typescriptlang.org/) - JavaScript超集

---

## 📞 联系我们

- **作者**: ZZY
- **邮箱**: 1753632810@qq.com
- **项目主页**: https://github.com/zxyang3636/vue3_admin_template

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给它一个Star！⭐**

[⬆ 回到顶部](#-zzy-企业级后台管理系统)

</div>
