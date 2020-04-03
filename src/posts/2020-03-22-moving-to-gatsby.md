---
title: 拥抱 Gatsby
description: 年初重整 UI 时，意识到 Jekyll 进行页面热更新的痛苦，现在要对它下手了。
---

年初重整 UI 时，意识到 **Jekyll** 进行页面热更新的痛苦，现在要对它下手了。

告别 Jekyll 的理由有两个，需要 Ruby 环境以及页面热更新慢。前者可以单独安装或者使用 Docker，但也是一个繁琐的步骤，后者对于前端页面热更新大行其道的今天，会影响到热更新速度的步骤都有理由被埋怨，在网上看到有人也有和我类似的<a href="https://www.gatsbyjs.org/blog/2017-11-08-migrate-from-jekyll-to-gatsby" target="_blank">想法</a>，所以就开始着手寻找代替的工具了。对于新的工具有点点要求，能继续使用 markdown 以及所用的环境最好是与前端页面开发一体的，调研之后发现有不少优秀的工具，如 **Hexo**，**Hugo**，**VuePress**，**Gatsby** 等等，综合了一下，考虑到能尝试使用 React，最终选择了生态环境健壮和活跃的 <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a>，

Gatsby 里数据的获取主要通过 **GraphQL**，没有接触过的话还是需要花点时间了解。这次重构中，大部分的时间都是用在处理文章数据和图片上，也正是依靠官方详细的文档和丰富的插件系统，目前所遇到的问题都能顺利解决，并且只用了不到半个月的时间就完成了迁移，这过程中了解到不少新的概念。很圆满。

接下来就是追求性能上的优化，提升浏览的体验，看到官方的 <a href="https://www.gatsbyjs.org/packages/gatsby-plugin-offline" target="_blank">Offline Plugin</a> 似乎有点意思(**现已添加**)。
