# 贡献指南 / Contributing Guide

感谢你对山行记 (Mountain Trekker) 项目的关注！我们欢迎任何形式的贡献。

## 🤝 如何贡献

### 报告 Bug

如果你发现了 bug，请：

1. 在 [Issues](https://github.com/xmwMing/mountains-journey/issues) 中搜索是否已有相同问题
2. 如果没有，创建新的 Issue
3. 在 Issue 中包含：
   - 清晰的标题和描述
   - 复现步骤
   - 预期行为和实际行为
   - 截图（如果适用）
   - 环境信息（浏览器、操作系统等）

### 提出新功能

如果你有新功能建议：

1. 在 [Issues](https://github.com/xmwMing/mountains-journey/issues) 中搜索是否已有相同建议
2. 如果没有，创建新的 Issue
3. 在 Issue 中描述：
   - 功能的用途和价值
   - 实现思路
   - 可能的实现方案

### 提交代码

如果你想直接贡献代码：

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📝 开发规范

### 代码风格

- 使用 TypeScript 编写代码
- 遵循 Vue 3 Composition API 最佳实践
- 使用 ESLint 和 Prettier 进行代码格式化
- 编写有意义的变量和函数名
- 添加必要的注释

### 提交信息规范

使用语义化的提交信息：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试代码
- `chore`: 构建或配置修改

示例：
```
feat: add peak elevation filter
fix: resolve map marker display issue
docs: update deployment guide
```

### Pull Request 规范

在提交 PR 时，请确保：

1. PR 标题清晰描述更改内容
2. PR 描述中包含：
   - 更改的目的
   - 实现的方式
   - 相关的 Issue 编号
   - 测试结果
3. 代码通过类型检查 (`npm run build`)
4. 代码风格符合项目规范
5. 更新相关文档

## 🧪 测试

在提交代码前，请确保：

1. 本地运行 `npm run build` 确保类型检查通过
2. 测试你的更改是否影响现有功能
3. 在不同浏览器中测试（Chrome、Firefox、Safari、Edge）
4. 测试移动端响应式布局

## 📚 文档

如果你的更改影响了用户界面或功能，请更新相关文档：

- [README.md](README.md) - 项目主文档
- [README_EN.md](README_EN.md) - 英文版文档
- [DEPLOYMENT.md](DEPLOYMENT.md) - 部署指南
- [CODEBUDDY.md](CODEBUDDY.md) - 开发者指南

## 🌍 国际化

项目支持中英文双语，请确保：

- 新增功能同时更新中英文文档
- 用户界面文本考虑国际化
- 代码注释使用英文

## 📧 联系方式

如有任何问题，欢迎：

- 提交 [Issue](https://github.com/xmwMing/mountains-journey/issues)
- 发起 [Discussion](https://github.com/xmwMing/mountains-journey/discussions)
- 联系项目维护者

## 📄 许可证

通过贡献代码，你同意你的贡献将根据项目的 [MIT License](LICENSE) 进行许可。

---

再次感谢你的贡献！🎉
