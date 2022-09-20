const menu = [
    {
        key: '/index',
        title: '首页',
        icon: 'home',
        auth: [1]
    },
    {
        title: '学生管理',
        key: '/public',
        icon: 'appstore',
        auth: [1],
        subs: [
            { title: '学生', key: '/public/button', icon: '' },
            { title: '班级', key: '/public/icon', icon: '' }
        ]
    },
    {
        title: '宿舍管理',
        key: '/nav',
        icon: 'bulb',
        subs: [
            { title: '宿舍信息', key: '/nav/dropdown', icon: '' },
            { title: '宿舍报修管理', key: '/nav/menu', icon: '' }
        ]
    },
    {
        title: '活动管理',
        key: '/form',
        icon: 'form',
        subs: [
            { title: '发布活动', key: '/form/base-form', icon: '' },
            { title: '活动管理', key: '/form/step-form', icon: '' }
        ]
    },
    {
        title: '互助信息管理',
        key: '/show/table',
        icon: 'pie-chart'
    },
    {
        title: '关于',
        key: '/about',
        icon: 'user',
        auth: [1]
    }
]

export default menu
