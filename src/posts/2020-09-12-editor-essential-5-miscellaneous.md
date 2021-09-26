---
title: 编辑器基操勿6 (5) - 其他
description: 这篇文章介绍的是编辑器中一些有胜于无的功能，至此，也是编辑器基操勿6系列的最后一篇。
featuredImage: ../images/post/keyboard.jpg
---

这篇文章介绍的是编辑器中一些有胜于无的功能，至此，也是**编辑器基操勿 6**系列的最后一篇。

##### 集成终端 👇

这是最基本的功能了，像 VSCode，JetBrains 全家桶等默认就支持，当然还能根据用户需要配置默认终端 **zsh**, **bash** 和 Windows 下的 **cmd** 或者 **git-bash**

##### 项目管理 👇

对项目管理的要求不仅仅是增删改查和在多个项目间进行切换，还要求能对特定项目进行定制，比如:

- **设置编译环境**，假设我们设置了快捷键 **Ctrl + B** 对当前打开的文件进行编译和运行，就可以根据不同项目设置对应编程语言的编译环境，而且，对于同一种语言还要能设置不同版本的编译环境
- **设置项目窗口颜色**，这个设置先是在 VSCode 里学到的，根据不同项目设置窗口颜色，比较容易区分项目

##### 格式化 JSON 内容 👇

对 JSON 内容进行格式化，压缩，必要时能在 JSON 与 XML 间转化

![Pretty JSON](./images/pretty-json.gif)

##### 高级代码片段 👇

代码片段比较基础的用法是输入指定的字符，然后直接会输出对应的代码片段，比如输入 **met** 指定输出一个公共方法的代码片段

![Basic Snippet](./images/basic-snippet.gif)

更深入的用法是，对用户输入的内容进行大小写化，正则替换文本内容的操作，例如在使用 Test Driven Development 方式进行开发时需要写大量的测试方法，该方法名字一般是 **it_must_login_before_paying** 这种带有下划线的，在输入方法名时要键入大量的下划线就显得特别麻烦，这时就可以对代码片段进行正则化处理，期望的用法是，输入 **it must login before paying** 后，代码自动变成 **it_must_login_before_paying**

![Advanced Snippet](./images/advanced-snippet.gif)

编辑器的日常操作已介绍完毕，如有更加有效率的操作，欢迎留言。
