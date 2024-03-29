import loadable from '@/utils/loadable'

const Index = loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index'))

const ButtonView = loadable(() => import(/* webpackChunkName: 'button' */ '@/views/Student/Student'))
const IconView = loadable(() => import(/* webpackChunkName: 'icon' */ '@/views/Student/Classes'))

// 导航
const DropdownView = loadable(() => import(/* webpackChunkName: 'dropdown' */ '@/views/Dormitory/mangerDormitory'))
const MenuView = loadable(() => import(/* webpackChunkName: 'menu' */ '@/views/Dormitory/repaireDormitory'))

// 表单
const FormBaseView = loadable(() => import(/* webpackChunkName: 'formBase' */ '@/views/Activity/pushActivityView'))
const FormStepView = loadable(() => import(/* webpackChunkName: 'formStep' */ '@/views/Activity/mangerActivityView'))

// 展示
const TableView = loadable(() => import(/* webpackChunkName: 'table' */ '@/views/Help/Table'))
// 其它
const ProgressView = loadable(() => import(/* webpackChunkName: 'progress' */ '@/views/Others/Progress'))
const AnimationView = loadable(() => import(/* webpackChunkName: 'animation' */ '@/views/Others/Animation'))
const EditorView = loadable(() => import(/* webpackChunkName: 'editor' */ '@/views/Others/Editor'))
const UploadView = loadable(() => import(/* webpackChunkName: 'upload' */ '@/views/Others/Upload'))

const About = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/About'))

const routes = [
    { path: '/index', exact: true, name: 'Index', component: Index, auth: [1] },
    { path: '/public/button', exact: false, name: '按钮', component: ButtonView, auth: [1] },
    { path: '/public/icon', exact: false, name: '图标', component: IconView, auth: [1] },
    { path: '/nav/dropdown', exact: false, name: '下拉菜单', component: DropdownView },
    { path: '/nav/menu', exact: false, name: '下拉菜单', component: MenuView },
    { path: '/form/base-form', exact: false, name: '表单', component: FormBaseView },
    { path: '/form/step-form', exact: false, name: '表单', component: FormStepView },
    { path: '/show/table', exact: false, name: '表格', component: TableView },
    { path: '/others/progress', exact: false, name: '进度条', component: ProgressView, auth: [1] },
    { path: '/others/animation', exact: false, name: '动画', component: AnimationView, auth: [1] },
    { path: '/others/editor', exact: false, name: '富文本', component: EditorView, auth: [1] },
    { path: '/others/upload', exact: false, name: '上传', component: UploadView, auth: [1] },
    { path: '/about', exact: false, name: '关于', component: About, auth: [1] }
]

export default routes
