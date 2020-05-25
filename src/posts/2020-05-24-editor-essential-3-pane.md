---
title: 编辑器基操勿6 (3) - 窗口
description: 一个编辑器经常会打开多个文件，同时查看多个文件也是家常便饭，多窗口也是编辑器的标配，这种情况下，窗口的有效管理也成为了一门功课。
featuredImage: ../images/post/keyboard.jpg
---

一个编辑器经常会打开多个文件，同时查看多个文件也是家常便饭，多窗口也是编辑器的标配，这种情况下，窗口的有效管理也成为了一门功课。

##### 创建空窗口 👇

这应该是最基本的操作了，还可以分为水平和垂直创建

![Create Empty Pane](./images/create-empty-pane.gif)

##### 克隆窗口 👇

将当前窗口克隆一份，然后水平或者垂直地创建在新的窗口，这个操作在阅读源码时使用频率很高。

![Clone Pane](./images/clone-pane.gif)

##### 移动窗口 👇

将当前窗口进行水平或者垂直地移动至邻近窗口

![Move Pane](./images/move-pane.gif)

##### 调整窗口大小 👇

指的是存在多个窗口时，对当前窗口大小进行调整。如果显示器尺寸不大，或者窗口显示的内容过长或过短的情况下，这是一个很常用的操作，当然了，可以直接用鼠标搞定，快捷键自然会高效很多，像 Sublime Text 下的 [Origami](https://github.com/SublimeText/Origami) 插件甚至可以调整窗口的比例。我最常用的快捷键是 **11**, **22**, **33**, **44**, **55**，分别代表将当前窗口比例大小设置为**10%**，**25%**，**50%**，**75%**，**90%**，具体的配置在[这里](https://github.com/lattespirit/sublime-settings/blob/master/Default.sublime-keymap#L201-L235)。 VS Code 里扩大和缩小窗口对应的指令分别是 **workbench.action.increaseViewSize** 和 **workbench.action.decreaseViewSize**，有兴趣的可以自行配置。

![Resize Pane](./images/resize-pane.gif)

##### 窗口搜索跳转 👇

设想一下，当前编辑器打开了很多文件，这些文件甚至分布在多窗口中，此时想从当前正在编辑的文件跳转至其他窗口中未显示的文件，这时候即得用到鼠标点击目标文件的标签才能达到目的了。这种情况好比在一个浏览器中，打开了十几个标签，从一个标签直接跳到另一个标签。

期望的效果是这样，**用户可以根据当前打开文件的文件名进行过滤，选择并跳转至该文件**，这样的操作显然是高效的，但目前我还没发现有哪个编辑器默认支持这一效果(如果有，请留言评论，不胜感激)，最类似的一个实现是 JetBrains 家的 IDE 下，可以打开一个面板，显示最近打开的文件，并能输入文件名跳转至该文件。还有，使用这个[插件](https://github.com/lattespirit/sublime-tab-jumper)，Sublime Text 下能完美实现期望的效果

![Tab Jumper](./images/tab-jumper.gif)

##### 侧边栏显示文件树结构 👇

对于当前打开的文件，可以**选择性**地在侧边栏显示文件的目录树结构，**选择性**的目的在于，有些编辑器的侧边栏默认是实时展示当前文件的目录树结构的，即每编辑一个文件，侧边栏则对应地显示树结构，这对于一部分人来说有些烦人，期望的效果是想它展示的时候触发即可。

![Reveal in sidebar](./images/reveal-in-sidebar.gif)

下一篇将会聊到**文件管理**。
