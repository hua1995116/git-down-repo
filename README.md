# git-down-repo

<p algin="center">
    <a href="https://npmcharts.com/compare/git-down-repo?minimal=true" rel="nofollow"><img src="https://img.shields.io/npm/dm/git-down-repo.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/git-down-repo" rel="nofollow"><img src="https://img.shields.io/npm/v/git-down-repo.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/git-down-repo" rel="nofollow"><img src="https://img.shields.io/npm/l/git-down-repo.svg" style="max-width:100%;"></a>
</p>

# 开始

```Shell
npm install git-down-repo -g // 安装全局

// test 
gitdown https://github.com/hua1995116/webchat  // 下载整个仓库（默认master）

gitdown https://github.com/hua1995116/webchat dev // 下载某个仓库的dev分支

gitdown https://github.com/hua1995116/webchat/tree/master/config // 下载仓库某个文件夹

gitdown https://github.com/hua1995116/webchat/blob/master/config/dev.env.js // 下载某个文件

gitdown https://github.com/hua1995116/webchat/blob/master/config/dev.env.js https://github.com/hua1995116/webpack-plugin-inner-script/blob/master/index.js // 下载多个项目（空格分隔）
```

# node-modules

```
cnpm i git-down-repo
```
```
test.js

const gitdown = require('git-down-repo');

const gitdownFunc = gitdown();

gitdownFunc(['https://github.com/hua1995116/webchat/blob/master/.eslintrc.js']);

```

# 版本

## 2018.7.21
v2.4.2
1.修复commongJS导致的bug

v2.4.1
1.支持以commonJs方式引入至项目中

## 2018.7.18
v2.3.1

1.支持多个链接形式
2.修复单个文件下载多余文件情况

## 2018.7.16
v2.3.0

1.优化体验，当本地存在需下载目录时候，可以选择是否继续覆盖
