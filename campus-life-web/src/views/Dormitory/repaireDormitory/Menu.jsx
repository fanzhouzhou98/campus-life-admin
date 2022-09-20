import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import '@/style/view-style/button.scss'
import { withRouter } from 'react-router-dom'
import { Layout, Table, Form, Input, Row, Col, Modal, Button, notification, Select, message } from 'antd'
import {
    addMaintain,
    getMaintainByPage,
    updateMaintainById,
    deleteMaintainById,
    updateMaintainStatusById
} from '@/api/api'
import { dateFormat } from '@/utils/dateFromat'
const { confirm } = Modal
const { Option } = Select
const { userType, userID } = JSON.parse(sessionStorage.getItem('userInfo'))
class ButtonView extends Component {
    state = {
        reason: '',
        pusher: '',
        repairer: '',
        phone: '',
        status: '',
        createdTime: '',
        id: '',
        repairers: '',
        loading: false,
        iconLoading: false,
        statusVisible: false,
        columns: [
            {
                title: '报修原因',
                dataIndex: 'reason',
                key: 'reason',
                render: text => <span>{text}</span>
            },
            {
                title: '上报时间',
                dataIndex: 'createdTime',
                key: 'createdTime',
                render: text => <span>{dateFormat(text, 'yyyy-MM-dd hh:mm:ss')}</span>
            },
            {
                title: '上报人',
                dataIndex: 'pusher',
                key: 'pusher'
            },
            {
                title: '修理人',
                dataIndex: 'repairer',
                key: 'repairer'
            },
            {
                title: '上报人手机号',
                key: 'phone',
                dataIndex: 'phone'
            },
            {
                title: '处理状态',
                key: 'status',
                dataIndex: 'status',
                render: text => <span>{text === '0' ? '未处理' : '已处理'}</span>
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) =>
                    (userType === 1 || userID === record.userID) && (
                        <div>
                            <Button type='primary' onClick={() => this.showModal(2, record)} icon='eye' size='small'>
                                修改
                            </Button>
                            {userType === 1 && (
                                <Button
                                    type='primary'
                                    onClick={() => this.showModal1(record)}
                                    disabled={record.status === '2' ? true : false}
                                    icon='edit'
                                    size='small'>
                                    处理
                                </Button>
                            )}
                            <Button
                                type='danger'
                                onClick={() => this.showConfirm(record.id)}
                                icon='delete'
                                size='small'>
                                删除
                            </Button>
                        </div>
                    )
            }
        ],
        data: []
    }
    showConfirm(id) {
        let that = this
        confirm({
            cancelText: '取消',
            okText: '确定',
            title: '提示',
            content: '是否确认删除该条记录？',
            onOk() {
                deleteMaintainById({ id })
                    .then(data => {
                        if (data.status === 200) {
                            notification.success({
                                message: '成功',
                                description: '删除成功'
                            })
                            that.getMaintain()
                        }
                    })
                    .catch(() => {})
            },
            onCancel() {}
        })
    }
    showModal = (type, record) => {
        if (type === 2) {
            let { reason, pusher, phone, id } = record
            this.setState({ id })
            setTimeout(() => {
                this.props.form.setFieldsValue({
                    reason,
                    pusher,
                    phone
                })
            }, 100)
            this.setState({
                visible: true,
                title: '修改报修信息',
                type
            })
        } else {
            this.setState({
                visible: true,
                title: '添加报修信息',
                type
            })
        }
    }
    showModal1 = record => {
        this.setState({
            statusVisible: true,
            id: record.id
        })
    }

    handleOk = e => {
        e.preventDefault()
        console.log(e)
        if (this.state.type === 1) {
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    let { reason, pusher, phone } = values
                    let data = await addMaintain({ reason, pusher, phone, userID })
                    if (data.data) {
                        notification.success({
                            message: '成功',
                            description: '添加报修完成'
                        })
                        this.getMaintain()
                        this.props.form.setFieldsValue({
                            reason: '',
                            pusher: '',
                            phone: ''
                        })
                    }
                }
            })
        }
        if (this.state.type === 2) {
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    let { reason, pusher, phone } = values
                    this.updateMaintainById({ reason, pusher, phone, id: this.state.id })
                    this.props.form.setFieldsValue({
                        reason: '',
                        pusher: '',
                        phone: ''
                    })
                }
            })
        }
        this.setState({
            visible: false,
            id: ''
        })
    }
    updateMaintainById = async params => {
        let data = await updateMaintainById(params).catch(() => {})
        if (data.status === 200) {
            notification.success({
                message: '成功',
                description: '修改完成'
            })
            this.getMaintain()
        }
    }
    getMaintain = async params => {
        this.setState({ loading: true })
        let data = await getMaintainByPage(params).catch(() => {
            this.setState({ loading: false })
        })
        if (data.data.data) {
            this.setState({
                data: data.data.data.data.rows ? data.data.data.data.rows : []
            })
            this.setState({ loading: false })
        }
        this.setState({ loading: false })
    }
    handleCancel = e => {
        console.log(e)
        this.setState({
            visible: false,
            statusVisible: false,
            repairers: '',
            id: ''
        })
        this.props.form.setFieldsValue({
            reason: '',
            pusher: '',
            phone: ''
        })
    }
    onChangePhone = e => {
        let { value } = e.target
        this.setState({
            phone: value
        })
    }
    onChangePusher = e => {
        let { value } = e.target
        this.setState({
            pusher: value
        })
    }
    onChangeRepairer = e => {
        let { value } = e.target
        this.setState({
            repairer: value
        })
    }
    onChangeStatus = val => {
        this.setState({
            status: val
        })
    }
    onChangeRepairers = e => {
        let { value } = e.target
        this.setState({
            repairers: value
        })
    }
    handleStatus = async () => {
        let data = await updateMaintainStatusById({ id: this.state.id, repairer: this.state.repairers })
        if (data.data) {
            message.success('已处理')
            this.setState({
                visible: false,
                statusVisible: false,
                repairers: '',
                id: ''
            })
            this.getMaintain()
        }
    }
    resetSearch = () => {
        this.setState({
            pusher: '',
            repairer: '',
            phone: '',
            status: ','
        })
    }
    onQuery = () => {
        console.log(111)
        let params = {
            pusher: this.state.pusher,
            repairer: this.state.repairer,
            phone: this.state.phone,
            status: this.state.status
        }
        this.getMaintain(params)
    }
    componentDidMount() {
        this.getMaintain()
    }

    componentWillUnmount() {}
    enterLoading = () => {
        this.setState({ loading: true })
    }

    enterIconLoading = () => {
        this.setState({ iconLoading: true })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Layout className='button animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['宿舍管理', '宿舍报修']}></CustomBreadcrumb>
                </div>
                <div className='gutter-example'>
                    <Form className='ant-advanced-search-form'>
                        <Row gutter={16}>
                            <Col span={5}>
                                <Form.Item label='上报人' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入'
                                        value={this.state.pusher}
                                        onChange={this.onChangePusher}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label='维修人' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入'
                                        value={this.state.repairer}
                                        onChange={this.onChangeRepairer}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label='手机号' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入'
                                        value={this.state.phone}
                                        onChange={this.onChangePhone}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label='维修状态' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Select
                                        placeholder='请选择'
                                        value={this.state.status}
                                        onChange={this.onChangeStatus}>
                                        <Option value='0'>未处理</Option>
                                        <Option value='2'>已处理</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Button type='primary' onClick={this.onQuery}>
                                    查询
                                </Button>
                                <Button onClick={this.resetSearch}>清空</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                ,
                <div>
                    <Button type='primary' onClick={() => this.showModal(1)}>
                        上报维修
                    </Button>
                </div>
                ,
                <Modal
                    cancelText='取消'
                    okText='确定'
                    width='50%'
                    title={this.state.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <div className='gutter-example'>
                        <Form className='ant-advanced-search-form'>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item label='维修原因' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('reason', {
                                            rules: [{ required: true, message: '请输入!' }]
                                        })(<Input placeholder='请输入' />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='上报人' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('pusher', {
                                            rules: [{ required: true, message: '请输入!' }]
                                        })(<Input placeholder='请输入' />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='上报人手机号' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('phone', {
                                            rules: [{ required: true, message: '请输入!' }]
                                        })(<Input placeholder='请输入' />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal>
                <Modal
                    width='20%'
                    title='分配维修人员'
                    visible={this.state.statusVisible}
                    onOk={this.handleStatus}
                    onCancel={this.handleCancel}>
                    <div className='gutter-example'>
                        <Row gutter={16}>
                            <Col span={18}>
                                <div>
                                    维修人：&nbsp;&nbsp;
                                    <Input
                                        placeholder='请输入'
                                        value={this.state.repairers}
                                        onChange={this.onChangeRepairers}></Input>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Modal>
                <Table
                    dataSource={this.state.data}
                    columns={this.state.columns}
                    rowKey='id'
                    loading={this.state.loading}
                />
                ;
            </Layout>
        )
    }
}

export default withRouter(Form.create()(ButtonView))
