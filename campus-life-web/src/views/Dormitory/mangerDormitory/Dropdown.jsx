import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import '@/style/view-style/button.scss'
import { withRouter } from 'react-router-dom'
import { Layout, Table, Form, Input, Row, Col, Modal, Button, notification, Select } from 'antd'
import { addDormitory, getDormitoryByPage, updateDormitoryById, deleteDormitoryById } from '@/api/api'
const { confirm } = Modal
const { Option } = Select
const { userType } = JSON.parse(sessionStorage.getItem('userInfo'))
class ButtonView extends Component {
    state = {
        loading: false,
        iconLoading: false,
        type: 1,
        id: '',
        campus: '',
        towerNo: '',
        dormitory: '',
        count: '',
        dormitorAdimner: '',
        columns: [
            {
                title: '校区',
                dataIndex: 'campus',
                key: 'campus',
                render: text => <span>{text}</span>
            },
            {
                title: '楼号',
                dataIndex: 'towerNo',
                key: 'towerNo',
                render: text => <span>{text}</span>
            },
            {
                title: '宿舍号',
                dataIndex: 'dormitory',
                key: 'dormitory'
            },
            {
                title: '宿舍人数',
                dataIndex: 'count',
                key: 'count'
            },
            {
                title: '寝室长',
                key: 'dormitorAdimner',
                dataIndex: 'dormitorAdimner'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) =>
                    // <Space size="middle">
                    userType === 1 && (
                        <div>
                            {/* <Button type='primary' icon='eye' size='small'>
                            查看
                        </Button> */}
                            <Button type='primary' onClick={() => this.showModal(2, record)} icon='edit' size='small'>
                                修改
                            </Button>
                            <Button
                                onClick={() => this.showConfirm(record.id)}
                                type='danger'
                                icon='delete'
                                size='small'>
                                删除
                            </Button>
                        </div>
                    )

                // </Space>
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
                deleteDormitoryById({ id })
                    .then(data => {
                        if (data.status === 200) {
                            notification.success({
                                message: '成功',
                                description: '删除成功'
                            })
                            that.getDormitory()
                        }
                    })
                    .catch(() => {})
            },
            onCancel() {}
        })
    }
    showModal = (type, record) => {
        if (type === 2) {
            let { campus, towerNo, dormitory, count, dormitorAdimner, id } = record
            this.setState({ id })
            setTimeout(() => {
                this.props.form.setFieldsValue({
                    campus,
                    towerNo,
                    dormitory,
                    count,
                    dormitorAdimner
                })
            }, 100)
            this.setState({
                visible: true,
                title: '修改宿舍信息',
                type
            })
        } else {
            this.setState({
                visible: true,
                title: '添加宿舍信息',
                type
            })
        }
    }

    handleOk = e => {
        e.preventDefault()
        console.log(e)
        if (this.state.type === 1) {
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    let { campus, towerNo, dormitory, count, dormitorAdimner } = values
                    let data = await addDormitory({ campus, towerNo, dormitory, count, dormitorAdimner })
                    if (data.data) {
                        notification.success({
                            message: '成功',
                            description: '添加宿舍完成'
                        })
                        this.getDormitory()
                        this.props.form.setFieldsValue({
                            campus: '',
                            towerNo: '',
                            dormitory: '',
                            count: '',
                            dormitorAdimner: ''
                        })
                    }
                }
            })
        }
        if (this.state.type === 2) {
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    let { campus, towerNo, dormitory, count, dormitorAdimner } = values
                    this.updateDormitoryById({ campus, towerNo, dormitory, count, dormitorAdimner, id: this.state.id })
                    this.props.form.setFieldsValue({
                        campus: '',
                        towerNo: '',
                        dormitory: '',
                        count: '',
                        dormitorAdimner: ''
                    })
                }
            })
        }
        this.setState({
            visible: false,
            id: ''
        })
    }
    updateDormitoryById = async params => {
        let data = await updateDormitoryById(params).catch(() => {})
        if (data.status === 200) {
            notification.success({
                message: '成功',
                description: '修改完成'
            })
            this.getDormitory()
        }
    }
    getDormitory = async params => {
        this.setState({ loading: true })
        let data = await getDormitoryByPage(params).catch(() => {
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
            visible: false
        })
        this.props.form.setFieldsValue({
            campus: '',
            towerNo: '',
            dormitory: '',
            count: '',
            dormitorAdimner: ''
        })
    }
    onChangeTowerNo = e => {
        let { value } = e.target
        this.setState({
            towerNo: value
        })
    }
    onChangeDormitory = e => {
        let { value } = e.target
        this.setState({
            dormitory: value
        })
    }
    onChangeDormitorAdimner = e => {
        let { value } = e.target
        this.setState({
            dormitorAdimner: value
        })
    }
    onChangeCampus = val => {
        this.setState({
            campus: val
        })
    }
    resetSearch = () => {
        this.setState({
            campus: '',
            towerNo: '',
            dormitory: '',
            dormitorAdimner: ''
        })
    }
    onQuery = () => {
        console.log(111)
        let params = {
            campus: this.state.campus,
            towerNo: this.state.towerNo,
            dormitory: this.state.dormitory,
            dormitorAdimner: this.state.dormitorAdimner
        }
        this.getDormitory(params)
    }
    componentDidMount() {
        this.getDormitory()
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
                    <CustomBreadcrumb arr={['宿舍管理', '宿舍信息']}></CustomBreadcrumb>
                </div>
                <div className='gutter-example'>
                    <Form className='ant-advanced-search-form'>
                        <Row gutter={16}>
                            <Col span={5}>
                                <Form.Item label='校区' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Select
                                        placeholder='请选择'
                                        value={this.state.campus}
                                        onChange={this.onChangeCampus}>
                                        <Option value='黄河路校区'>黄河路校区</Option>
                                        <Option value='文明大道校区'>文明大道校区</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label='楼号' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入楼号'
                                        value={this.state.towerNo}
                                        onChange={this.onChangeTowerNo}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label='宿舍号' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入宿舍号'
                                        value={this.state.dormitory}
                                        onChange={this.onChangeDormitory}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label='寝室长' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入寝室长姓名'
                                        value={this.state.dormitorAdimner}
                                        onChange={this.onChangeDormitorAdimner}
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
                    {userType === 1 && (
                        <Button type='primary' onClick={() => this.showModal(1)}>
                            添加宿舍信息
                        </Button>
                    )}
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
                                <Col span={6}>
                                    <Form.Item label='校区' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('campus', {
                                            rules: [{ required: true, message: '请输入!' }],
                                            initialValue: ''
                                        })(
                                            <Select>
                                                <Option value='黄河路校区'>黄河路校区</Option>
                                                <Option value='文明大道校区'>文明大道校区</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label='楼号' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('towerNo', {
                                            rules: [{ required: true, message: '请输入!' }]
                                        })(<Input placeholder='请输入' />)}
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label='宿舍号' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('dormitory', {
                                            rules: [{ required: true, message: '请输入!' }]
                                        })(<Input placeholder='请输入' />)}
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label='人数' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('count', {
                                            rules: [{ required: true, message: '请输入!' }]
                                        })(<Input placeholder='请输入' />)}
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label='寝室长' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('dormitorAdimner', {
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
