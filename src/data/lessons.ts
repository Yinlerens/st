import { LessonContent } from '../types/content';

export const lessonsData: Record<string, LessonContent> = {
  'html-intro': {
    id: 'html-intro',
    title: 'HTML 文档结构',
    content: `# HTML 文档结构

## 什么是 HTML?

HTML (HyperText Markup Language) 超文本标记语言是用于创建网页的标准标记语言。HTML 描述了网页的结构,使用标签来标记不同类型的内容。

## HTML 文档的基本结构

一个标准的 HTML 文档包含以下基本结构:

\`\`\`html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
</head>
<body>
    <h1>这是一个标题</h1>
    <p>这是一个段落。</p>
</body>
</html>
\`\`\`

## 结构说明

### 1. DOCTYPE 声明

\`<!DOCTYPE html>\` 声明告诉浏览器这是一个 HTML5 文档。它必须位于文档的第一行。

### 2. html 标签

\`<html>\` 标签是 HTML 文档的根元素,包含整个 HTML 文档的内容。\`lang="zh-CN"\` 属性指定了页面的主要语言。

### 3. head 标签

\`<head>\` 标签包含文档的元数据(metadata),这些内容不会直接显示在页面上,但对浏览器和搜索引擎很重要:

- **charset**: 指定字符编码为 UTF-8,支持中文等多语言字符
- **viewport**: 控制页面在移动设备上的显示方式
- **title**: 定义页面标题,显示在浏览器标签页上

### 4. body 标签

\`<body>\` 标签包含页面的所有可见内容,如文本、图片、链接、表格等。

## 实践要点

1. **正确的文档声明**: 始终在文档开头添加 DOCTYPE 声明
2. **语义化标签**: 使用有意义的标签来描述内容结构
3. **字符编码**: 确保设置正确的字符编码,避免乱码
4. **viewport 设置**: 对于移动端适配至关重要

## 下一步

理解了 HTML 的基本结构后,接下来我们将学习常用的 HTML 标签和它们的语义化使用。`,
    keywords: ['HTML', '文档结构', 'DOCTYPE', 'HTML5'],
  },
  'html-tags': {
    id: 'html-tags',
    title: '常用标签和语义化',
    content: `# 常用标签和语义化

## 标题标签

HTML 提供了六个级别的标题标签:

\`\`\`html
<h1>一级标题 - 最重要</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题 - 最不重要</h6>
\`\`\`

**使用建议**: 
- 一个页面通常只有一个 h1 标签
- 标题标签应该按层级顺序使用,不要跳级

## 段落和文本标签

\`\`\`html
<p>这是一个段落。段落标签用于包含文本块。</p>

<strong>这是粗体强调文本</strong>
<em>这是斜体强调文本</em>
<mark>这是高亮文本</mark>
<small>这是小字体文本</small>
<del>这是删除线文本</del>
<ins>这是下划线文本</ins>
\`\`\`

## 语义化容器标签

HTML5 引入了语义化标签,使文档结构更清晰:

\`\`\`html
<header>
    <nav>
        <ul>
            <li><a href="#home">首页</a></li>
            <li><a href="#about">关于</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <h2>文章标题</h2>
        <p>文章内容...</p>
    </article>
    
    <section>
        <h3>章节标题</h3>
        <p>章节内容...</p>
    </section>
</main>

<aside>
    侧边栏内容
</aside>

<footer>
    页脚信息
</footer>
\`\`\`

## 语义化标签说明

- **header**: 页眉区域
- **nav**: 导航链接区域
- **main**: 主要内容区域
- **article**: 独立的文章内容
- **section**: 文档中的节
- **aside**: 侧边栏或附加信息
- **footer**: 页脚区域

## 列表标签

### 无序列表

\`\`\`html
<ul>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
</ul>
\`\`\`

### 有序列表

\`\`\`html
<ol>
    <li>第一步</li>
    <li>第二步</li>
    <li>第三步</li>
</ol>
\`\`\`

## 链接和图片

\`\`\`html
<!-- 链接 -->
<a href="https://example.com" target="_blank">访问网站</a>

<!-- 图片 -->
<img src="image.jpg" alt="图片描述" width="300" height="200">
\`\`\`

## 为什么要使用语义化标签?

1. **提高可读性**: 让代码更容易理解和维护
2. **SEO 优化**: 搜索引擎更好地理解页面结构
3. **无障碍访问**: 屏幕阅读器能更好地解析内容
4. **代码质量**: 体现专业的开发习惯

## 练习建议

尝试创建一个简单的博客页面,使用语义化标签来构建完整的页面结构。`,
    keywords: ['HTML标签', '语义化', 'HTML5'],
  },
  'css-selectors': {
    id: 'css-selectors',
    title: 'CSS 选择器',
    content: `# CSS 选择器

## 什么是 CSS 选择器?

CSS 选择器用于选择需要添加样式的 HTML 元素。掌握选择器是学习 CSS 的基础。

## 基本选择器

### 1. 元素选择器

选择所有指定类型的元素:

\`\`\`css
p {
    color: blue;
    font-size: 16px;
}
\`\`\`

### 2. 类选择器

选择具有特定 class 属性的元素:

\`\`\`css
.highlight {
    background-color: yellow;
}
\`\`\`

\`\`\`html
<p class="highlight">这段文字有黄色背景</p>
\`\`\`

### 3. ID 选择器

选择具有特定 id 属性的元素:

\`\`\`css
#header {
    background-color: #333;
    color: white;
}
\`\`\`

\`\`\`html
<div id="header">这是页眉</div>
\`\`\`

### 4. 通配符选择器

选择所有元素:

\`\`\`css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
\`\`\`

## 组合选择器

### 后代选择器

选择元素的所有后代元素:

\`\`\`css
div p {
    color: red;
}
\`\`\`

### 子元素选择器

只选择直接子元素:

\`\`\`css
div > p {
    color: green;
}
\`\`\`

### 相邻兄弟选择器

选择紧接在另一元素后的元素:

\`\`\`css
h1 + p {
    font-weight: bold;
}
\`\`\`

### 通用兄弟选择器

选择所有后续兄弟元素:

\`\`\`css
h1 ~ p {
    color: gray;
}
\`\`\`

## 伪类选择器

伪类用于定义元素的特殊状态:

\`\`\`css
/* 鼠标悬停 */
a:hover {
    color: red;
}

/* 第一个子元素 */
li:first-child {
    font-weight: bold;
}

/* 最后一个子元素 */
li:last-child {
    color: blue;
}

/* 第 n 个子元素 */
li:nth-child(2n) {
    background-color: #f0f0f0;
}
\`\`\`

## 伪元素选择器

伪元素用于样式化元素的特定部分:

\`\`\`css
/* 首字母 */
p::first-letter {
    font-size: 2em;
    color: red;
}

/* 首行 */
p::first-line {
    font-weight: bold;
}

/* 在元素前插入内容 */
h1::before {
    content: "★ ";
}

/* 在元素后插入内容 */
h1::after {
    content: " ★";
}
\`\`\`

## 属性选择器

根据元素的属性选择:

\`\`\`css
/* 具有 title 属性的元素 */
[title] {
    color: blue;
}

/* title 属性值为 "hello" 的元素 */
[title="hello"] {
    color: green;
}

/* class 属性值包含 "btn" 的元素 */
[class*="btn"] {
    padding: 10px;
}
\`\`\`

## 选择器优先级

CSS 选择器有不同的优先级(从高到低):

1. !important (避免使用)
2. 内联样式
3. ID 选择器
4. 类选择器、属性选择器、伪类
5. 元素选择器、伪元素
6. 通配符选择器

## 实践技巧

- 优先使用类选择器,便于复用
- ID 选择器一般用于 JavaScript 操作
- 合理使用组合选择器,提高选择精度
- 避免过度嵌套,影响性能和可维护性`,
    keywords: ['CSS', '选择器', '伪类', '优先级'],
  },
  'js-variables': {
    id: 'js-variables',
    title: 'JavaScript 变量和数据类型',
    content: `# JavaScript 变量和数据类型

## 什么是变量?

变量是用于存储数据的容器。在 JavaScript 中,我们使用 \`var\`、\`let\` 或 \`const\` 来声明变量。

## 变量声明方式

### let - 块级作用域

\`\`\`javascript
let name = '张三';
let age = 25;
let isStudent = true;

// 可以重新赋值
age = 26;
\`\`\`

### const - 常量

\`\`\`javascript
const PI = 3.14159;
const MAX_SIZE = 100;

// 不能重新赋值
// PI = 3.14; // 报错!
\`\`\`

### var - 函数作用域(不推荐)

\`\`\`javascript
var oldWay = '旧方法';
// 现代 JavaScript 应使用 let 和 const
\`\`\`

## 数据类型

### 基本数据类型

#### 1. Number (数字)

\`\`\`javascript
let integer = 42;          // 整数
let decimal = 3.14;        // 小数
let negative = -10;        // 负数
let infinity = Infinity;   // 无限
let notANumber = NaN;      // 非数字
\`\`\`

#### 2. String (字符串)

\`\`\`javascript
let single = '单引号';
let double = "双引号";
let template = \`模板字符串: \${name}\`;

// 字符串操作
let greeting = 'Hello' + ' ' + 'World';
let length = greeting.length; // 11
\`\`\`

#### 3. Boolean (布尔值)

\`\`\`javascript
let isTrue = true;
let isFalse = false;

// 布尔运算
let result = isTrue && isFalse;  // false
let result2 = isTrue || isFalse; // true
\`\`\`

#### 4. Undefined

\`\`\`javascript
let undefinedVar;
console.log(undefinedVar); // undefined
\`\`\`

#### 5. Null

\`\`\`javascript
let emptyValue = null;
\`\`\`

### 复杂数据类型

#### Object (对象)

\`\`\`javascript
let person = {
  name: '张三',
  age: 25,
  isStudent: true
};

console.log(person.name);  // '张三'
console.log(person['age']); // 25
\`\`\`

#### Array (数组)

\`\`\`javascript
let fruits = ['苹果', '香蕉', '橙子'];
let numbers = [1, 2, 3, 4, 5];

console.log(fruits[0]);    // '苹果'
console.log(fruits.length); // 3
\`\`\`

## 类型检查

\`\`\`javascript
typeof 42;           // "number"
typeof "hello";      // "string"
typeof true;         // "boolean"
typeof undefined;    // "undefined"
typeof null;         // "object" (这是一个历史bug)
typeof {};           // "object"
typeof [];           // "object"

// 检查是否为数组
Array.isArray([]);   // true
\`\`\`

## 类型转换

### 隐式转换

\`\`\`javascript
let result = "5" + 2;      // "52" (字符串拼接)
let result2 = "5" - 2;     // 3 (数字计算)
let result3 = "5" * "2";   // 10
\`\`\`

### 显式转换

\`\`\`javascript
// 转为数字
let num = Number("123");     // 123
let num2 = parseInt("123");  // 123
let num3 = parseFloat("3.14"); // 3.14

// 转为字符串
let str = String(123);       // "123"
let str2 = (123).toString(); // "123"

// 转为布尔值
let bool = Boolean(1);       // true
let bool2 = Boolean(0);      // false
\`\`\`

## 命名规范

\`\`\`javascript
// 推荐: 驼峰命名
let firstName = '张';
let lastName = '三';
let fullName = firstName + lastName;

// 常量: 大写下划线
const MAX_COUNT = 100;
const API_URL = 'https://api.example.com';

// 避免使用
let a = 1;        // 名字太短
let data = 123;   // 名字不明确
\`\`\`

## 实践建议

1. **优先使用 const**: 如果值不会改变,使用 const
2. **其次使用 let**: 如果值需要改变,使用 let
3. **避免使用 var**: 现代 JavaScript 不推荐使用
4. **清晰命名**: 使用有意义的变量名
5. **类型一致**: 保持变量类型的一致性

## 小结

理解变量和数据类型是 JavaScript 编程的基础。掌握了这些知识,你就可以开始编写更复杂的程序了!。`,
    keywords: ['JavaScript', '变量', '数据类型', 'let', 'const'],
  },
