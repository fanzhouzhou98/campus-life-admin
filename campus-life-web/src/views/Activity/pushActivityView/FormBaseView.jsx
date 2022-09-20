import React, { Component } from 'react'
import { Alert, Layout, Row, Col, Divider, Form, Button, Input, InputNumber, DatePicker, notification } from 'antd'
import '@/style/view-style/form.scss'
import { addActivity, getActivityById, updateActivityById } from '@/api/api'
import qs from 'querystring'
import moment from 'moment'
class FromView extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        visible: true,
        activityName: '',
        clubName: '',
        score: '',
        count: '',
        principal: '',
        principalName: '',
        createdTime: '',
        endTime: '',
        type: '',
        id: '',
        title: '发布'
    }

    handleClose = () => {
        this.setState({ visible: false })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
            if (err) return
            const values = {
                ...fieldsValue,
                createdTime: fieldsValue['createdTime'] ? fieldsValue['createdTime'].format('YYYY-MM-DD') : '',
                endTime: fieldsValue['endTime'] ? fieldsValue['endTime'].format('YYYY-MM-DD') : ''
            }
            if (this.state.type !== 'edit') {
                let data = await addActivity(values)
                if (data.status === 200) {
                    notification.success({
                        message: '成功',
                        description: '活动发布完成'
                    })
                }
                this.props.form.setFieldsValue({
                    activityName: '',
                    clubName: '',
                    score: '',
                    count: '',
                    principal: '',
                    principalName: '',
                    createdTime: '',
                    endTime: ''
                })
            }
            if (this.state.type === 'edit') {
                let data = await updateActivityById({ ...values, id: this.state.id })
                if (data.status === 200) {
                    notification.success({
                        message: '成功',
                        description: '活动修改完成'
                    })
                }
                this.props.form.setFieldsValue({
                    activityName: '',
                    clubName: '',
                    score: '',
                    count: '',
                    principal: '',
                    principalName: '',
                    createdTime: '',
                    endTime: ''
                })
            }
        })
    }
    getActivity = async params => {
        this.setState({ loading: true })
        let data = await getActivityById(params).catch(() => {
            this.setState({ loading: false })
        })
        if (data.data.data) {
            console.log(data.data.data)
            let {
                activityName,
                clubName,
                score,
                count,
                principal,
                principalName,
                createdTime,
                endTime
            } = data.data.data.data
            this.props.form.setFieldsValue({
                activityName,
                clubName,
                score,
                count,
                principal,
                principalName,
                createdTime: moment(createdTime),
                endTime: moment(endTime)
            })
        }
    }
    componentDidMount() {
        const { search } = this.props.location
        const { type, id } = qs.parse(search.slice(1))
        this.setState({ loading: false, type, id })
        console.log(type, id)
        if (type === 'edit') {
            this.setState({
                title: '修改'
            })
            this.getActivity({ id })
        }
    }

    componentWillUnmount() {}
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 16 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 10 }
            }
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 16,
                    offset: 0
                },
                sm: {
                    span: 10,
                    offset: 6
                }
            }
        }
        return (
            <Layout className='animated fadeIn'>
                <Row>
                    <Col>
                        <div className='base-style'>
                            <div>
                                {this.state.visible ? (
                                    <Alert
                                        message='你最好认真的填写活动信息!'
                                        type='warning'
                                        closable
                                        banner
                                        afterClose={this.handleClose}
                                    />
                                ) : null}
                            </div>
                            <Divider orientation='center'> {this.state.title}活动</Divider>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label={<span>活动名称&nbsp;</span>}>
                                    {getFieldDecorator('activityName', {
                                        rules: [{ required: true, message: '请输入' }]
                                    })(<Input placeholder='请输入' style={{ width: '60%' }} />)}
                                </Form.Item>

                                <Form.Item label='社团名称'>
                                    {getFieldDecorator('clubName', {
                                        rules: [{ required: true, message: '请输入' }]
                                    })(<Input placeholder='请输入' style={{ width: '60%' }} />)}
                                </Form.Item>
                                <Form.Item label='活动人数'>
                                    {getFieldDecorator('count', {
                                        rules: [{ required: true, message: '请输入' }]
                                    })(<InputNumber placeholder='请输入' style={{ width: '60%' }} />)}
                                </Form.Item>

                                <Form.Item label='分数'>
                                    {getFieldDecorator('score', {
                                        rules: [{ required: true, message: '请输入' }]
                                    })(<Input placeholder='请输入' style={{ width: '60%' }} />)}
                                </Form.Item>
                                <Form.Item label='负责人'>
                                    {getFieldDecorator('principal', {
                                        rules: [{ required: true, message: '请输入' }]
                                    })(<Input placeholder='请输入' style={{ width: '60%' }} />)}
                                </Form.Item>
                                <Form.Item label='负责人电话'>
                                    {getFieldDecorator('principalName', {
                                        rules: [{ required: true, message: '请输入' }]
                                    })(<Input placeholder='请输入' style={{ width: '60%' }} />)}
                                </Form.Item>
                                <Form.Item label='活动开始时间'>
                                    {getFieldDecorator('createdTime', {
                                        rules: [{ type: 'object', required: true, message: '请选择日期' }]
                                    })(
                                        <DatePicker
                                            style={{ width: '60%' }}
                                            placeholder='请选择日期'
                                            format='YYYY-MM-DD'
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item label='活动结束时间'>
                                    {getFieldDecorator('endTime', {
                                        rules: [{ type: 'object', required: true, message: '请选择日期' }]
                                    })(
                                        <DatePicker
                                            style={{ width: '60%' }}
                                            placeholder='请选择日期'
                                            format='YYYY-MM-DD'
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button type='primary' htmlType='submit'>
                                        {this.state.title}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(FromView)

export default WrappedNormalLoginForm
