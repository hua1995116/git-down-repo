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
```

# 版本

## 2018.7.16
v2.3.0

1.优化体验，当本地存在需下载目录时候，可以选择是否继续覆盖
