# git-down-repo

![](https://img.shields.io/npm/dm/git-down-repo.svg)
![](https://img.shields.io/npm/v/git-down-repo.svg)
![](https://img.shields.io/npm/l/git-down-repo.svg)
# 配置

打开 https://github.com/settings/tokens

1.点击新增token

![](http://cloud.qiufengh.com/git-downgit-down1.png)

2.随意填写内容

![](http://cloud.qiufengh.com/git-downgit-down2.png)



3.这里不需要填写

![](http://cloud.qiufengh.com/git-downgit-down3.png)

4.复制(记得保存下key,key只会显示一次)

![](http://cloud.qiufengh.com/git-downgit-down4.png)



# 开始

```Shell
npm install git-down-repo -g // 安装全局

gitdown set key // 刚才复制的key(key 保存在本地目录)

// test 
gitdown https://github.com/hua1995116/webchat  // 下载整个仓库（默认master）

gitdown https://github.com/hua1995116/webchat dev // 下载某个仓库的dev分支

gitdown https://github.com/hua1995116/webchat/tree/master/config // 下载仓库某个文件夹

gitdown https://github.com/hua1995116/webchat/blob/master/config/dev.env.js // 下载某个文件
```



