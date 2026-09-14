export type Post = {
  id: string
  title: string
  excerpt: string
  cover: string
  category: string
  date: string
  readTime: string
  tags: string[]
}

export type Moment = {
  id: string
  content: string
  time: string
  location?: string
  mood: string
}

export type Good = {
  id: string
  name: string
  category: string
  price: string
  rating: number
  reason: string
  emoji: string
}

export type Task = {
  id: string
  title: string
  done: boolean
  tag: '工作' | '学习' | '生活' | '健康'
}

export type Habit = {
  id: string
  name: string
  streak: number
  target: number
  done: number
}

export type Course = {
  id: string
  name: string
  teacher: string
  location: string
  day: number // 1-7
  start: number // slot index
  span: number
  color: string
}

export const profile = {
  name: '片刻',
  bio: '记录生活里的每一个片刻',
  location: '杭州 · 中国',
  role: '独立开发者 / 写作爱好者',
  avatar: '/avatar.png',
}

export const stats = [
  { label: '文章', value: 18 },
  { label: '动态', value: 42 },
  { label: '好物', value: 12 },
  { label: '在线', value: '529 天' },
]

export const posts: Post[] = [
  {
    id: 'p1',
    title: '在信息洪流中，重新学会专注',
    excerpt:
      '我们每天被无数通知包围。这篇文章记录了我如何用一套简单的方法，重新夺回自己的注意力，让深度工作重新成为可能。',
    cover: '/cover-desk.png',
    category: '思考',
    date: '2026-09-10',
    readTime: '6 分钟',
    tags: ['专注', '效率', '生活方式'],
  },
  {
    id: 'p2',
    title: '城市黄昏漫步：我最爱的三条路线',
    excerpt:
      '傍晚是一天中最柔软的时刻。分享三条我常走的城市漫步路线，以及沿途那些容易被忽略的风景。',
    cover: '/cover-city.png',
    category: '生活',
    date: '2026-09-02',
    readTime: '4 分钟',
    tags: ['散步', '城市', '摄影'],
  },
  {
    id: 'p3',
    title: '一次说走就走的近郊露营',
    excerpt:
      '不需要很远，也能逃离城市。记录一次周末近郊露营的完整装备清单与心得，附带我的踩坑经验。',
    cover: '/cover-nature.png',
    category: '旅行',
    date: '2026-08-24',
    readTime: '8 分钟',
    tags: ['露营', '户外', '周末'],
  },
]

export const initialMoments: Moment[] = [
  {
    id: 'm1',
    content: '今天终于把拖了两周的博客重构做完了，看着干净的代码有种莫名的满足感。',
    time: '2 小时前',
    location: '杭州',
    mood: '满足',
  },
  {
    id: 'm2',
    content: '傍晚去河边跑了 5 公里，风很舒服。坚持运动第 12 天。',
    time: '昨天',
    location: '钱塘江畔',
    mood: '轻松',
  },
  {
    id: 'm3',
    content: '读完了《深度工作》，最大的收获是：专注本身就是一种稀缺的能力。',
    time: '3 天前',
    mood: '收获',
  },
]

export const goods: Good[] = [
  {
    id: 'g1',
    name: '机械键盘 · 静音红轴',
    category: '数码',
    price: '¥499',
    rating: 5,
    reason: '手感顺滑，深夜码字也不会吵到家人，用了半年依然稳定。',
    emoji: '⌨️',
  },
  {
    id: 'g2',
    name: '手冲咖啡套装',
    category: '生活',
    price: '¥289',
    rating: 4,
    reason: '每天早晨的仪式感，从磨豆到注水的过程本身就很治愈。',
    emoji: '☕',
  },
  {
    id: 'g3',
    name: '轻量化露营椅',
    category: '户外',
    price: '¥199',
    rating: 5,
    reason: '折叠后只有水瓶大小，近郊露营和公园放空都离不开它。',
    emoji: '🪑',
  },
  {
    id: 'g4',
    name: '电子墨水阅读器',
    category: '数码',
    price: '¥1299',
    rating: 5,
    reason: '护眼且专注，通勤路上读完了好几本一直想读的书。',
    emoji: '📖',
  },
  {
    id: 'g5',
    name: '香薰蜡烛 · 雪松',
    category: '家居',
    price: '¥128',
    rating: 4,
    reason: '写作时点上，木质香气让人很快静下心来。',
    emoji: '🕯️',
  },
  {
    id: 'g6',
    name: '颈部按摩仪',
    category: '健康',
    price: '¥359',
    rating: 4,
    reason: '久坐党救星，每天用十分钟，肩颈明显放松不少。',
    emoji: '💆',
  },
]

export const initialTasks: Task[] = [
  { id: 't1', title: '完成博客首页重构', done: true, tag: '工作' },
  { id: 't2', title: '复习数据结构第 5 章', done: false, tag: '学习' },
  { id: 't3', title: '晚上跑步 5 公里', done: false, tag: '健康' },
  { id: 't4', title: '给绿植浇水', done: true, tag: '生活' },
  { id: 't5', title: '整理本周读书笔记', done: false, tag: '学习' },
]

export const habits: Habit[] = [
  { id: 'h1', name: '早起', streak: 12, target: 30, done: 12 },
  { id: 'h2', name: '阅读', streak: 8, target: 30, done: 21 },
  { id: 'h3', name: '运动', streak: 12, target: 30, done: 18 },
  { id: 'h4', name: '写作', streak: 5, target: 30, done: 14 },
]

export const timeSlots = [
  '08:00',
  '09:50',
  '10:00',
  '13:30',
  '15:20',
  '19:00',
]

export const courses: Course[] = [
  {
    id: 'c1',
    name: '高等数学',
    teacher: '李老师',
    location: '教三 201',
    day: 1,
    start: 0,
    span: 1,
    color: 'primary',
  },
  {
    id: 'c2',
    name: '计算机网络',
    teacher: '王老师',
    location: '实验楼 B305',
    day: 1,
    start: 3,
    span: 1,
    color: 'chart-2',
  },
  {
    id: 'c3',
    name: '英语口语',
    teacher: 'Anna',
    location: '外语楼 108',
    day: 2,
    start: 1,
    span: 1,
    color: 'chart-3',
  },
  {
    id: 'c4',
    name: '数据结构',
    teacher: '赵老师',
    location: '教二 405',
    day: 3,
    start: 0,
    span: 1,
    color: 'chart-4',
  },
  {
    id: 'c5',
    name: '操作系统',
    teacher: '陈老师',
    location: '实验楼 A201',
    day: 3,
    start: 4,
    span: 1,
    color: 'chart-5',
  },
  {
    id: 'c6',
    name: '线性代数',
    teacher: '李老师',
    location: '教三 201',
    day: 4,
    start: 2,
    span: 1,
    color: 'primary',
  },
  {
    id: 'c7',
    name: '软件工程',
    teacher: '周老师',
    location: '教二 302',
    day: 5,
    start: 1,
    span: 1,
    color: 'chart-2',
  },
  {
    id: 'c8',
    name: '选修 · 摄影',
    teacher: '孙老师',
    location: '艺术楼 105',
    day: 5,
    start: 5,
    span: 1,
    color: 'chart-3',
  },
]

export const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
