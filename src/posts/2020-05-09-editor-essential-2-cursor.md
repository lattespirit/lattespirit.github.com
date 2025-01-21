---
title: 编辑器基操勿6 (2) - 光标
description: 良好的键盘移动光标习惯是可以大幅度提升效率的，鼠标能胜任移动光标的大部分工作，但是把手移动到鼠标，甚至是上下左右的方向键，都可以认为是一种时间的浪费或者体力的消耗
featuredImage: ../images/post/keyboard.jpg
---

良好的键盘移动光标习惯是可以大幅度提升效率的，鼠标能胜任移动光标的大部分工作，但是把手移动到鼠标，甚至是 ↑↓←→ 的方向键，都可以认为是一种时间的浪费或者体力的消耗。在这篇文章里，好好聊一聊光标，包括移动，多光标编辑等操作。

#### 使用快捷键进行页面滚动 👇

假设当前光标在整个屏幕的最上/下方，这时想看上/下面更多内容而不想改变光标所在行位置时，做法往往是用鼠标的滚轮上下滑动即可，但编辑器一般都提供了键盘快捷键来实现这样的效果，该快捷键一般是 **Ctrl + Up/Down**，Vim 的是 [Ctrl-Y](http://vimdoc.sourceforge.net/htmldoc/scroll.html#CTRL-Y) 和 [Ctrl-U](http://vimdoc.sourceforge.net/htmldoc/scroll.html#CTRL-U)，当然都可以通过配置文件对快捷键进行更改，关键字是 **scroll**，像 JetBrains 的是 **scrollUp**，VSCode 的是 **scrollLineUp**，Sublime Text 的是 **scroll_lines**，而且还能设置每次滚动的行数。

![Scroll](/images/scroll.gif)

#### 多光标 👇

多光标编辑简直是杀手级的功能，应用在处理文本，批量修改变量名等操作上，效率可以成倍的提升，此外，配合上 Vim 模拟器的光标移动模式，更是搭上了火箭。

受到 Vim 模式的影响，我在每个编辑器都会安装相应的 Vim 模拟器插件，而尝试过众多的模拟器后，发现 Subilme Text 下，多光标加上 Vim 模式操作起来是最友好的，所以如果有复杂的文本要处理，我会选择在 Sublime Text 中进行，配合上一些插件，例如[Text-Pastry](https://github.com/duydao/Text-Pastry) 和 [CaseConversion](https://github.com/jdavisclark/CaseConversion)，能对文本进行排序，添加序号，大小写转换， **camelCase** / **PascalCase** / **dash-case** / **dot.case** / **snake_case** 转换，几乎能满足现有的文本转换需求。

![Multiple Cursor](/images/multiple-cursor.gif)

#### EasyMotion👇

最初了解到这特性是 [vim-easymotion](https://github.com/easymotion/vim-easymotion) 的插件，该功能可以将光标极速移动到当前页面任何一个字符位置，其他编辑器也能找到对应的实现，使用频率极高。

![EasyMotion](/images/easymotion.gif)

#### 窗口间跳转 👇

先声明一下，这里的窗口是指编辑器中打开的页面，当前的编辑器可以“分屏”显示多个窗口，因为不同编辑器中的叫法不一样，有 window, editor, pane，所以有必要做一下说明。

多窗口显示代码是常有的事情，对于阅读和编写代码都有很大的帮助，使用编辑器提供的快捷键进行光标在不同窗口间跳转实际上也是消除将手移动到鼠标这个不必要的动作。

![Cursor Between Window](/images/cursor-between-windows.gif)

#### 行间跳转 👇

查看程序报错的时候经常能定位到文件的具体行数，搜索该文件并直接跳转至该行则是一个高效的工作流。

![Cursor Between Lines](/images/cursor-between-lines.gif)

#### 变量，方法间跳转 👇

当前打开的窗口里包含了大量的变量名和方法名，输入字符将它们列出并过滤最终要跳转的结果，相信这是大家都在用的功能。

![Cursor Between Symbols](/images/cursor-between-symbols.gif)

#### 全局 symbol 搜索 👇

Symbol 指的是一个文件包含的变量，方法名，类名等等的数据，IDE 或者编辑器在打开一个项目时，会对项目中所有文件的 symbol 进行索引，方便进行查找和跳转等等操作。

以下演示的是，假设 **app/Models/Alert.php** 文件中有一个 **project()** 方法，当前光标在一个空文件，进行全局搜索 project 这个 symbol，然后会列出所有包含 project 这个 symbol 的文件，最后输入关键字进行过滤并跳转至 **project()** 方法所在行数。

![Cursor to Global Symbol](/images/cursor-to-global-symbol.gif)

下一篇将会聊到**窗口**。
