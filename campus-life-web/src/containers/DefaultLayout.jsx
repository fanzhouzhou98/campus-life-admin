import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, BackTop, message, Modal, Input, Form, Col, Row } from 'antd'
import routes from '@/routes'
import { menuToggleAction } from '@/store/actionCreators'
import echarts from 'echarts/lib/echarts'
import avatar from '@/assets/images/user.jpg'
import menu from './menu'
import '@/style/layout.scss'
import { changePassword } from '@/api/api'
import AppHeader from './AppHeader.jsx'
import AppAside from './AppAside.jsx'
import AppFooter from './AppFooter.jsx'

const { Content } = Layout

class DefaultLayout extends Component {
    state = {
        avatar,
        show: true,
        visible: false,
        rePassword: '',
        oldPassword: '',
        newPassword: '',
        userName: '',
        menu: []
    }

    isLogin = () => {
        let name = JSON.parse(sessionStorage.getItem('userInfo'))
            ? JSON.parse(sessionStorage.getItem('userInfo')).name
            : ''
        if (!name) {
            this.props.history.push('/login')
        } else {
            let { name } = JSON.parse(sessionStorage.getItem('userInfo'))
            this.setState({
                userName: name,
                menu: this.getMenu(menu)
            })
        }
    }

    loginOut = () => {
        localStorage.clear()
        sessionStorage.clear()
        this.props.history.push('/login')
        message.success('登出成功!')
    }
    getMenu = menu => {
        let newMenu,
            auth = JSON.parse(localStorage.getItem('user')).auth
        if (!auth) {
            return menu
        } else {
            newMenu = menu.filter(res => res.auth && res.auth.indexOf(auth) !== -1)
            return newMenu
        }
    }

    componentDidMount() {
        this.isLogin()
    }

    componentDidUpdate() {
        let { pathname } = this.props.location

        // 菜单收缩展开时 echarts 图表的自适应
        if (pathname === '/' || pathname === '/index') {
            this.timer = setTimeout(() => {
                echarts.init(document.getElementById('bar')).resize()
                echarts.init(document.getElementById('line')).resize()
                echarts.init(document.getElementById('pie')).resize()
            }, 500)
        } else {
            this.timer = null
        }
    }
    changePassword = async () => {
        if (!this.state.newPassword) {
            message.warning('请输入新密码！')
            return false
        }
        if (!this.state.oldPassword) {
            message.warning('输入旧密码！')
            return false
        }
        if (!this.state.rePassword) {
            message.warning('请再次确认密码！')
            return false
        }
        if (this.state.newPassword !== this.state.rePassword) {
            message.warning('两次密码不一致！')
            this.setState({
                newPassword: '',
                rePassword: ''
            })
            return false
        }
        let { name } = JSON.parse(sessionStorage.getItem('userInfo'))
        let params = {
            username: name,
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        }
        let data = await changePassword({ ...params })
        if (data.data.data.status === true) {
            message.success(data.data.data.message)
            this.setState({
                rePassword: '',
                oldPassword: '',
                newPassword: ''
            })
            this.loginOut()
        } else {
            message.error(data.data.data.message)
            this.setState({
                rePassword: '',
                oldPassword: '',
                newPassword: ''
            })
        }
    }
    onChangenewPassword = e => {
        let { value } = e.target
        this.setState({
            newPassword: value
        })
    }
    onChangeOldPassword = e => {
        let { value } = e.target
        this.setState({
            oldPassword: value
        })
    }
    onChangeRePassword = e => {
        let { value } = e.target
        this.setState({
            rePassword: value
        })
    }
    passwordShow = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = () => {
        this.setState({
            visible: false
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        let { menuClick, menuToggle } = this.props
        let { auth } = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : ''
        return (
            <Layout className='app'>
                <BackTop />
                <AppAside menuToggle={menuToggle} menu={this.state.menu} />
                <Layout style={{ marginLeft: menuToggle ? '80px' : '200px', minHeight: '100vh' }}>
                    <AppHeader
                        menuToggle={menuToggle}
                        menuClick={menuClick}
                        avatar={this.state.avatar}
                        show={this.state.show}
                        loginOut={this.loginOut}
                        passwordShow={this.passwordShow}
                        userName={this.state.userName}
                    />
                    <Content className='content'>
                        <Switch>
                            {routes.map(item => {
                                return (
                                    <Route
                                        key={item.path}
                                        path={item.path}
                                        exact={item.exact}
                                        render={props =>
                                            !auth ? (
                                                <item.component {...props} />
                                            ) : item.auth && item.auth.indexOf(auth) !== -1 ? (
                                                <item.component {...props} />
                                            ) : (
                                                // 这里也可以跳转到 403 页面
                                                <Redirect to='/404' {...props} />
                                            )
                                        }></Route>
                                )
                            })}
                            <Redirect to='/404' />
                        </Switch>
                        <Modal
                            cancelText='取消'
                            okText='确定'
                            title='修改密码'
                            visible={this.state.visible}
                            onOk={this.changePassword}
                            onCancel={this.handleCancel}>
                            <Form className='ant-advanced-search-form'>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item label='旧密码' labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                            <Input.Password
                                                placeholder='请输入旧密码'
                                                value={this.state.oldPassword}
                                                onChange={this.onChangeOldPassword}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label='新密码' labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                            <Input.Password
                                                placeholder='新密码'
                                                value={this.state.newPassword}
                                                onChange={this.onChangenewPassword}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label='确认密码' labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                            <Input.Password
                                                placeholder='确认新密码'
                                                value={this.state.rePassword}
                                                onChange={this.onChangeRePassword}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>
                    </Content>
                    <AppFooter />
                </Layout>
            </Layout>
        )
    }
}

const stateToProp = state => ({
    menuToggle: state.menuToggle
})

const dispatchToProp = dispatch => ({
    menuClick() {
        dispatch(menuToggleAction())
    }
})

export default withRouter(connect(stateToProp, dispatchToProp)(DefaultLayout))
