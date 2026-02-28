# Bangumi Copy Title

## 特性
[x] 在`Bangumi`的条目页、人物页、角色页、专辑等页面上，点击按钮即可将标题复制到剪贴板。

[x] 一键复制主标题（不一定是日文）和中文、罗马音标题。 

[x] 持续化存储用户设置，刷新后不变（不随云同步）。

[x] 支持移动端和PC主流浏览器。

## 开发

1. 克隆仓库并进入目录：

   ```bash
   git clone https://github.com/flynncao/bangumi-plugin-boilerplate.git
   cd bangumi-plugin-boilerplate
    ```
2. 安装依赖：
    ```bash
    npm install
    ```
3. 构建项目：
    ```bash
    npm run build
    ```
4. 构建完成后，生成的`index.user.js`文件位于`dist`目录下。将该文件加载到浏览器中即可使用插件。

提示：`/src/metadata.json`中的`updateURL`和`downloadURL`字段需要指向你托管打包后userscript的URL（这里为github.io），以便用户能够自动更新插件；`version`字段需要在每次发布新版本时更新，以确保油猴插件用户能够正确更新。

## 反馈

如果你有任何建议或发现了问题，请随时在GitHub仓库中提交issue。

## License
MIT
