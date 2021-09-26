---
title: 编辑器基操勿6 (4) - 文件管理
description: 不管是用 Markdown 写文章还是编辑各种语言的代码，都离不开文件，既然使用频率极高，那么就有必要对它下手，想办法在这方面提高效率，在此聊一聊编辑器中文件的管理。
featuredImage: ../images/post/keyboard.jpg
---

不管是用 Markdown 写文章还是编辑各种语言的代码，都离不开文件，既然使用频率极高，那么就有必要对它下手，想办法在这方面提高效率，在此聊一聊编辑器中文件的管理。

##### 快速创建

这个功能是文件管理中最基本的操作，功能强大的 IDE 甚至可以根据文件类型生成指定的模板。而且，创建一个 **empty**/**blank** 的空文件也是最基本的要求，常见的编辑器都有这种功能，但似乎还没发现 JetBrains 全家桶中支持

##### 快速删除 👇

这个操作往往可以通过鼠标在文件侧边栏右键点击文件并选择删除，如果文件所在目录层级太深，所消耗的时间也是很多的。所以，通过编辑器本身提供的指令进行删除能节省不少时间。

![Delete File](./images/delete-file.gif)

##### 快速复制 👇

在已打开一个文件的情况下，复制当前的文件，并能指定路径，加分项是如果指定的路径目录不存在，则自动创建路径所包含的目录

![Copy File](./images/copy-file.gif)

##### 快速移动 👇

与快速复制的操作类似，可以移动当前文件到指定的路径，当然也是希望能自动创建路径所包含的路径

![Move File](./images/move-file.gif)

##### 快速(模糊)搜索 👇

在一个有着成千上万文件的项目里，快速查找到目标文件，是最最基本的需求了。这个基本需求有两个加分项：

- **支持模糊搜索**(Fussy Search)，例如对于这样目录结构的一个文件 **Il**l**u**minate/**Fou**ndation/**App**lication.php，在搜索时输入 llufouapp.php (即 Illuminate, Foundation, Application 各选取一部分字符进行输入) 也能最佳匹配到该文件
- **支持目录分割搜索**，例如有下面个文件，在搜索时输入 i/f/application.php 能定位到 **I**lluminate/**F**oundation/**A**pplication.php

![Fussy Search File](./images/fussy-search-file.gif)

##### 复制文件路径 👇

文件的名字，相对路径，绝对路径等偶尔需要被快速复制

![Copy File Path](./images/copy-file-path.gif)

下一篇将会聊到**其他**零散的技能。
