import { Exercise } from '../types/content';

export const exercisesData: Record<string, Exercise> = {
  'html-basic-1': {
    id: 'html-basic-1',
    type: 'editor',
    title: 'HTML 基础练习 - 创建个人简介页面',
    description: '使用 HTML 标签创建一个包含标题、段落、列表和链接的个人简介页面',
    difficulty: 'easy',
    initialCode: {
      html: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>我的简介</title>
</head>
<body>
  <!-- 请在这里编写你的代码 -->
  <h1>我的简介</h1>
  
</body>
</html>`,
      css: `body {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
}

h1 {
  color: #0ea5e9;
  border-bottom: 2px solid #0ea5e9;
  padding-bottom: 10px;
}`,
      javascript: '',
    },
    hints: [
      '使用 h1-h6 标签创建标题',
      '使用 p 标签创建段落',
      '使用 ul 或 ol 标签创建列表',
      '使用 a 标签创建链接',
    ],
    referenceAnswer: {
      html: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>我的简介</title>
</head>
<body>
  <h1>张三的个人简介</h1>
  
  <h2>关于我</h2>
  <p>我是一名前端开发工程师,热爱编程和学习新技术。</p>
  
  <h2>技能</h2>
  <ul>
    <li>HTML5</li>
    <li>CSS3</li>
    <li>JavaScript</li>
    <li>React</li>
  </ul>
  
  <h2>联系方式</h2>
  <p>邮箱: <a href="mailto:zhangsan@example.com">zhangsan@example.com</a></p>
  <p>GitHub: <a href="https://github.com/zhangsan" target="_blank">@zhangsan</a></p>
</body>
</html>`,
      css: `body {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
}

h1 {
  color: #0ea5e9;
  border-bottom: 2px solid #0ea5e9;
  padding-bottom: 10px;
}

h2 {
  color: #333;
  margin-top: 30px;
}

ul {
  list-style-type: square;
  padding-left: 20px;
}

a {
  color: #0ea5e9;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}`,
    },
  },
  'css-flexbox-1': {
    id: 'css-flexbox-1',
    type: 'editor',
    title: 'CSS Flexbox 布局练习 - 导航栏',
    description: '使用 Flexbox 创建一个水平导航栏,导航项均匀分布',
    difficulty: 'medium',
    initialCode: {
      html: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>导航栏</title>
</head>
<body>
  <nav class="navbar">
    <div class="nav-brand">我的网站</div>
    <ul class="nav-menu">
      <li><a href="#home">首页</a></li>
      <li><a href="#about">关于</a></li>
      <li><a href="#services">服务</a></li>
      <li><a href="#contact">联系</a></li>
    </ul>
  </nav>
</body>
</html>`,
      css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

.navbar {
  background-color: #0ea5e9;
  padding: 1rem 2rem;
  /* 在这里使用 Flexbox */
  
}

.nav-brand {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-menu {
  list-style: none;
  /* 在这里使用 Flexbox */
  
}

.nav-menu li {
  margin: 0 1rem;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-menu a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}`,
      javascript: '',
    },
    hints: [
      '在 .navbar 上使用 display: flex',
      '使用 justify-content 控制主轴对齐',
      '使用 align-items 控制交叉轴对齐',
      '在 .nav-menu 上也使用 display: flex',
    ],
    referenceAnswer: {
      css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

.navbar {
  background-color: #0ea5e9;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-menu {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.nav-menu li {
  /* margin 可以移除,使用 gap 代替 */
}

.nav-menu a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-menu a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}`,
    },
  },
  'js-dom-1': {
    id: 'js-dom-1',
    type: 'editor',
    title: 'JavaScript DOM 操作 - 计数器',
    description: '创建一个简单的计数器,包含增加、减少和重置按钮',
    difficulty: 'easy',
    initialCode: {
      html: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>计数器</title>
</head>
<body>
  <div class="container">
    <h1>计数器</h1>
    <div class="counter">
      <span id="count">0</span>
    </div>
    <div class="buttons">
      <button id="decrease">-</button>
      <button id="reset">重置</button>
      <button id="increase">+</button>
    </div>
  </div>
</body>
</html>`,
      css: `.container {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #0ea5e9;
}

.counter {
  font-size: 4rem;
  font-weight: bold;
  margin: 30px 0;
  color: #333;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  font-size: 1.5rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

#decrease {
  background-color: #ef4444;
  color: white;
}

#reset {
  background-color: #6b7280;
  color: white;
}

#increase {
  background-color: #10b981;
  color: white;
}

button:hover {
  opacity: 0.8;
  transform: scale(1.05);
}`,
      javascript: `// 获取元素
const countElement = document.getElementById('count');
const decreaseBtn = document.getElementById('decrease');
const resetBtn = document.getElementById('reset');
const increaseBtn = document.getElementById('increase');

// 初始化计数
let count = 0;

// 编写事件处理函数
// 提示: 使用 addEventListener 添加点击事件
`,
    },
    hints: [
      '使用 getElementById 获取元素',
      '使用 addEventListener 添加点击事件',
      '使用 textContent 或 innerHTML 更新文本',
      '记得更新 count 变量的值',
    ],
    referenceAnswer: {
      javascript: `// 获取元素
const countElement = document.getElementById('count');
const decreaseBtn = document.getElementById('decrease');
const resetBtn = document.getElementById('reset');
const increaseBtn = document.getElementById('increase');

// 初始化计数
let count = 0;

// 更新显示
function updateDisplay() {
  countElement.textContent = count;
  
  // 根据数值改变颜色
  if (count > 0) {
    countElement.style.color = '#10b981';
  } else if (count < 0) {
    countElement.style.color = '#ef4444';
  } else {
    countElement.style.color = '#333';
  }
}

// 增加
increaseBtn.addEventListener('click', () => {
  count++;
  updateDisplay();
});

// 减少
decreaseBtn.addEventListener('click', () => {
  count--;
  updateDisplay();
});

// 重置
resetBtn.addEventListener('click', () => {
  count = 0;
  updateDisplay();
});

console.log('计数器已初始化');`,
    },
  },
  'js-array-1': {
    id: 'js-array-1',
    type: 'challenge',
    title: 'JavaScript 数组方法 - 数据处理',
    description: '使用数组方法处理学生成绩数据',
    difficulty: 'medium',
    initialCode: {
      javascript: `// 学生成绩数据
const students = [
  { name: '张三', score: 85 },
  { name: '李四', score: 92 },
  { name: '王五', score: 78 },
  { name: '赵六', score: 95 },
  { name: '孙七', score: 88 }
];

// TODO: 1. 找出所有成绩大于等于 90 分的学生
const excellentStudents = null;

// TODO: 2. 计算所有学生的平均分
const averageScore = null;

// TODO: 3. 获取所有学生的姓名数组
const studentNames = null;

// TODO: 4. 按成绩从高到低排序
const sortedStudents = null;

// 输出结果
console.log('优秀学生:', excellentStudents);
console.log('平均分:', averageScore);
console.log('学生姓名:', studentNames);
console.log('排序后:', sortedStudents);`,
    },
    testCases: [
      {
        id: 'test-1',
        description: '筛选优秀学生',
        input: students,
        expectedOutput: [
          { name: '李四', score: 92 },
          { name: '赵六', score: 95 },
        ],
      },
    ],
    hints: [
      '使用 filter() 方法筛选数组',
      '使用 reduce() 方法计算总和',
      '使用 map() 方法转换数组',
      '使用 sort() 方法排序数组',
    ],
    referenceAnswer: {
      javascript: `// 学生成绩数据
const students = [
  { name: '张三', score: 85 },
  { name: '李四', score: 92 },
  { name: '王五', score: 78 },
  { name: '赵六', score: 95 },
  { name: '孙七', score: 88 }
];

// 1. 找出所有成绩大于等于 90 分的学生
const excellentStudents = students.filter(student => student.score >= 90);

// 2. 计算所有学生的平均分
const averageScore = students.reduce((sum, student) => sum + student.score, 0) / students.length;

// 3. 获取所有学生的姓名数组
const studentNames = students.map(student => student.name);

// 4. 按成绩从高到低排序
const sortedStudents = [...students].sort((a, b) => b.score - a.score);

// 输出结果
console.log('优秀学生:', excellentStudents);
console.log('平均分:', averageScore);
console.log('学生姓名:', studentNames);
console.log('排序后:', sortedStudents);`,
    },
  },
};

// 按类别组织的练习列表
export const exercisesByCategory = {
  html: ['html-basic-1'],
  css: ['css-flexbox-1'],
  javascript: ['js-dom-1', 'js-array-1'],
};
