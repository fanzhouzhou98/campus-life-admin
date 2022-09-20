import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import '@/style/view-style/button.scss'
import { withRouter } from 'react-router-dom'
import { Layout, Table, Form, Input, Row, Col, Modal, Button, notification } from 'antd'
import { addMutual, getMutualByPage, updateMutualById, deleteMutualById } from '@/api/api'
import { dateFormat } from '@/utils/dateFromat'
const { userType, userID } = JSON.parse(sessionStorage.getItem('userInfo'))
const { confirm } = Modal
class ButtonView extends Component {
    state = {
        userID: userID,
        loading: false,
        iconLoading: false,
        name: '',
        info: '',
        studentNo: '',
        phone: '',
        createdTime: '',
        id: '',
        type: '',
        columns: [
            {
                title: '学号',
                dataIndex: 'studentNo',
                key: 'studentNo',
                render: text => <span>{text}</span>
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: text => <span>{text}</span>
            },
            {
                title: '互助信息',
                dataIndex: 'info',
                key: 'info'
            },
            {
                title: '发布时间',
                dataIndex: 'createdTime',
                key: 'createdTime',
                render: text => <span>{dateFormat(text, 'yyyy-MM-dd hh:mm:ss')}</span>
            },
            {
                title: '联系电话',
                key: 'phone',
                dataIndex: 'phone'
            },

            {
                title: '操作',
                key: 'action',
                render: (text, record) =>
                    (userType === 1 || userID === record.userID) && (
                        <div>
                            <Button type='primary' onClick={() => this.showModal(2, record)} icon='edit' size='small'>
                                修改
                            </Button>
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
                deleteMutualById({ id })
                    .then(data => {
                        if (data.status === 200) {
                            notification.success({
                                message: '成功',
                                description: '删除成功'
                            })
                            that.getMutual()
                        }
                    })
                    .catch(() => {})
            },
            onCancel() {}
        })
    }
    showModal = (type, record) => {
        if (type === 2) {
            let { name, info, studentNo, phone, id } = record
            this.setState({ id })
            setTimeout(() => {
                this.props.form.setFieldsValue({
                    name,
                    info,
                    studentNo,
                    phone
                })
            }, 100)
            this.setState({
                visible: true,
                title: '修改互助信息',
                type
            })
        } else {
            this.setState({
                visible: true,
                title: '添加互助信息',
                type
            })
        }
    }
    async deleteMutualByIdOk(id) {
        let data = await deleteMutualById({ id }).catch(() => {})
        if (data.status === 200) {
            notification.success({
                message: '成功',
                description: '删除成功'
            })
            this.getMutual()
        }
    }
    handleOk = e => {
        e.preventDefault()
        console.log(e)
        if (this.state.type === 1) {
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    let { name, info, studentNo, phone } = values
                    console.log(111, userID)
                    let data = await addMutual({ name, info, studentNo, userID, phone })
                    if (data.data) {
                        notification.success({
                            message: '成功',
                            description: '添加互助信息完成'
                        })
                        this.getMutual()
                        this.props.form.setFieldsValue({
                            name: '',
                            info: '',
                            studentNo: '',
                            phone: ''
                        })
                    }
                }
            })
        }
        if (this.state.type === 2) {
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    let { name, info, studentNo, phone } = values
                    this.updateMutualById({ name, info, studentNo, phone, id: this.state.id })
                    this.props.form.setFieldsValue({
                        name: '',
                        info: '',
                        studentNo: '',
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
    getMutual = async params => {
        this.setState({ loading: true })
        let data = await getMutualByPage(params).catch(() => {
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
    updateMutualById = async params => {
        let data = await updateMutualById(params).catch(() => {})
        if (data.status === 200) {
            notification.success({
                message: '成功',
                description: '修改完成'
            })
            this.getMutual()
        }
    }
    handleCancel = e => {
        this.setState({
            visible: false,
            id: ''
        })
        this.props.form.setFieldsValue({
            name: '',
            info: '',
            studentNo: '',
            phone: ''
        })
    }
    onChangeName = e => {
        let { value } = e.target
        this.setState({
            name: value
        })
    }
    onChangeStudentNo = e => {
        let { value } = e.target
        this.setState({
            studentNo: value
        })
    }
    onChangePhone = e => {
        let { value } = e.target
        this.setState({
            phone: value
        })
    }
    resetSearch = () => {
        this.setState({
            name: '',
            studentNo: '',
            phone: ''
        })
    }
    onQuery = () => {
        console.log(111)
        let params = {
            name: this.state.name,
            studentNo: this.state.studentNo,
            grade: this.state.grade
        }
        this.getMutual(params)
    }
    enterLoading = () => {
        this.setState({ loading: true })
    }

    enterIconLoading = () => {
        this.setState({ iconLoading: true })
    }
    componentDidMount() {
        this.getMutual()
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
                    <CustomBreadcrumb arr={['互助信息管理']}></CustomBreadcrumb>
                </div>
                <div className='gutter-example'>
                    <Form className='ant-advanced-search-form'>
                        <Row gutter={16}>
                            <Col span={5}>
                                <Form.Item label='学号' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入'
                                        value={this.state.studentNo}
                                        onChange={this.onChangeStudentNo}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label='姓名' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input placeholder='请输入' value={this.state.name} onChange={this.onChangeName} />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label='联系电话' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入'
                                        value={this.state.phone}
                                        onChange={this.onChangePhone}
                                    />
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
                        发布互助信息
                    </Button>
                </div>
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
                                <Col span={6}>
                                    <Form.Item label='姓名' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入!' }]
                                        })(<Input placeholder='请输入' />)}
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label='学号' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('studentNo', {
                                            rules: [{ required: true, message: '请输入!' }]
                                        })(<Input placeholder='请输入' />)}
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label='联系电话' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('phone', {
                                            rules: [{ required: true, message: '请输入!' }]
                                        })(<Input placeholder='请输入' />)}
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label='互助信息' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('info', {
                                            rules: [{ required: true, message: '请输入!' }]
                                        })(<Input placeholder='请输入' />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal>
                <Table dataSource={this.state.data} columns={this.state.columns} rowKey='id' />;
            </Layout>
        )
    }
}

export default withRouter(Form.create()(ButtonView))
