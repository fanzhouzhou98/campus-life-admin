import React, { Component } from 'react'
import { Layout, Input, Icon, Form, Button, Divider, message, notification, Radio } from 'antd'
import { withRouter } from 'react-router-dom'
import axios from '@/api'
import { API } from '@/api/config'
import { getInfoByUserName } from '@/api/api'
import '@/style/view-style/login.scss'

class Login extends Component {
    state = {
        loading: false,
        isLogin: true
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { username, password, userType } = values
                if (!userType) {
                    axios
                        .post(`${API}/user/login`, { username, password })
                        .then(async res => {
                            console.log(res)
                            if (res.data.data.status === true) {
                                localStorage.setItem('user', JSON.stringify(username))
                                localStorage.setItem('token', res.data.data.token)
                                let data = await getInfoByUserName({ username })
                                if (data.status === 200) {
                                    sessionStorage.setItem('userInfo', JSON.stringify(data.data.data.data))
                                }
                                this.props.history.push('/')
                                message.success(res.data.data.message)
                            } else {
                                // 这里处理一些错误信息
                                message.error(res.data.data.message)
                            }
                        })
                        .catch(err => {})
                } else {
                    axios
                        .post(`${API}/user/register`, { username, password, userType })
                        .then(res => {
                            console.log(res)
                            if (res.data.data.status === true) {
                                this.setState({
                                    isLogin: true
                                })
                                message.success(res.data.data.message)
                            } else {
                                // 这里处理一些错误信息
                                message.error(res.data.data.message)
                            }
                        })
                        .catch(err => {})
                }
            }
        })
    }

    componentDidMount() {
        notification.open({
            message: '欢迎使用数智校园生活平台',
            duration: null
            // description: '账号 admin(管理员) 其他(游客) 密码随意'
        })
    }
    changeIsLogin = () => {
        if (this.state.isLogin) {
            this.setState({
                isLogin: false
            })
        } else {
            this.setState({
                isLogin: true
            })
        }
    }
    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Layout className='login animated fadeIn'>
                <div className='model'>
                    {this.state.isLogin ? (
                        <div className='login-form'>
                            <h3>数智校园生活平台</h3>
                            <Divider />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请输入用户名!' }]
                                    })(
                                        <Input
                                            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder='用户名'
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入密码' }]
                                    })(
                                        <Input
                                            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type='password'
                                            placeholder='密码'
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        className='login-form-button'
                                        loading={this.state.loading}>
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                            <div style={{ width: 60, color: 'red' }} onClick={this.changeIsLogin}>
                                注册？
                            </div>
                        </div>
                    ) : (
                        <div className='login-form'>
                            <h3>数智校园生活平台</h3>
                            <Divider />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请输入用户名!' }]
                                    })(
                                        <Input
                                            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder='用户名'
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入密码' }]
                                    })(
                                        <Input
                                            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type='password'
                                            placeholder='密码'
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('userType', {
                                        rules: [{ required: true, message: '请选择用户类型' }]
                                    })(
                                        <Radio.Group>
                                            <Radio value={1}>管理员</Radio>
                                            <Radio value={2}>普通用户</Radio>
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        className='login-form-button'
                                        loading={this.state.loading}>
                                        注册
                                    </Button>
                                </Form.Item>
                            </Form>
                            <div style={{ width: 60, color: 'red' }} onClick={this.changeIsLogin}>
                                登录？
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(Login))
