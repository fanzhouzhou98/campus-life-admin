import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import '@/style/view-style/button.scss'
import { withRouter } from 'react-router-dom'
import { Layout, Table, Form, Input, Row, Col, Modal, Button, notification, Select } from 'antd'
import { addClass, getClassByPage, updateClassById, deleteClassById } from '@/api/api'
const { confirm } = Modal
const { Option } = Select
const { userType } = JSON.parse(sessionStorage.getItem('userInfo'))
class IconView extends Component {
    state = {
        loading: false,
        iconLoading: false,
        visible: false,
        title: '添加班级信息',
        type: 1,
        id: '',
        major: '',
        grade: '2018',
        classfalName: '',
        columns: [
            {
                title: '年级',
                dataIndex: 'grade',
                key: 'grade',
                render: text => <span>{text}</span>
            },
            {
                title: '专业',
                dataIndex: 'major',
                key: 'major',
                render: text => <span>{text}</span>
            },
            {
                title: '班级',
                dataIndex: 'classfalName',
                key: 'classfalName'
            },
            {
                title: '班级号',
                dataIndex: 'classNo',
                key: 'classNo'
            },
            {
                title: '班级人数',
                key: 'count',
                dataIndex: 'count'
            },
            {
                title: '班主任',
                dataIndex: 'teacher',
                key: 'teacher'
            },

            {
                title: '操作',
                key: 'action',
                render: (text, record) =>
                    // <Space size="middle">
                    userType === 1 && (
                        <div>
                            {/* <Button type='primary' icon='eye' onClick={this.showModal} size='small'>
                            查看
                        </Button> */}
                            <Button type='primary' icon='edit' onClick={() => this.showModal(2, record)} size='small'>
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
                deleteClassById({ id })
                    .then(data => {
                        if (data.status === 200) {
                            notification.success({
                                message: '成功',
                                description: '删除成功'
                            })
                            that.getClass()
                        }
                    })
                    .catch(() => {})
            },
            onCancel() {}
        })
    }
    showModal = (type, record) => {
        if (type === 2) {
            let { grade, major, classfalName, count, teacher, id } = record
            this.setState({ id })
            setTimeout(() => {
                this.props.form.setFieldsValue({
                    grade,
                    major,
                    classfalName,
                    count,
                    teacher
                })
            }, 100)
            this.setState({
                visible: true,
                title: '修改班级信息',
                type
            })
        } else {
            this.setState({
                visible: true,
                title: '添加班级信息',
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
                    let { grade, major, classfalName, count, teacher } = values
                    let data = await addClass({ grade, major, classfalName, count, teacher })
                    if (data.data) {
                        notification.success({
                            message: '成功',
                            description: '添加班级完成'
                        })
                        this.getClass()
                        this.props.form.setFieldsValue({
                            grade: '',
                            major: '',
                            classfalName: '',
                            count: '',
                            teacher: ''
                        })
                    }
                }
            })
        }
        if (this.state.type === 2) {
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    let { grade, major, classfalName, count, teacher } = values
                    this.updateClassById({ grade, major, classfalName, count, teacher, id: this.state.id })
                    this.props.form.setFieldsValue({
                        grade: '',
                        major: '',
                        classfalName: '',
                        count: '',
                        teacher: ''
                    })
                }
            })
        }
        this.setState({
            visible: false,
            id: ''
        })
    }
    updateClassById = async params => {
        let data = await updateClassById(params).catch(() => {})
        if (data.status === 200) {
            notification.success({
                message: '成功',
                description: '修改完成'
            })
            this.getClass()
        }
    }
    getClass = async params => {
        this.setState({ loading: true })
        let data = await getClassByPage(params).catch(() => {
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
            grade: '',
            major: '',
            classfalName: '',
            count: '',
            teacher: ''
        })
    }
    onChangeclassfalName = e => {
        let { value } = e.target
        this.setState({
            classfalName: value
        })
    }
    onChangeMajor = e => {
        let { value } = e.target
        this.setState({
            major: value
        })
    }
    onChangeGrade = val => {
        this.setState({
            grade: val
        })
    }
    resetSearch = () => {
        this.setState({
            major: '',
            grade: '2018',
            classfalName: ''
        })
    }
    onQuery = () => {
        console.log(111)
        let params = {
            major: this.state.major,
            classfalName: this.state.classfalName,
            grade: this.state.grade
        }
        this.getClass(params)
    }
    componentDidMount() {
        this.getClass()
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
                    <CustomBreadcrumb arr={['学生管理', '班级信息']}></CustomBreadcrumb>
                </div>
                <div className='gutter-example'>
                    <Form className='ant-advanced-search-form'>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label='年级' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Select placeholder='请选择' value={this.state.grade} onChange={this.onChangeGrade}>
                                        <Option value='2018'>2018</Option>
                                        <Option value='2019'>2019</Option>
                                        <Option value='2020'>2020</Option>
                                        <Option value='2021'>2021</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label='专业' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入'
                                        value={this.state.major}
                                        onChange={this.onChangeMajor}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label='班级' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入'
                                        value={this.state.classfalName}
                                        onChange={this.onChangeclassfalName}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Button type='primary' onClick={this.onQuery}>
                                    查询
                                </Button>
                                <Button onClick={this.resetSearch}>清空</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div>
                    {userType === 1 && (
                        <Button type='primary' onClick={() => this.showModal(1)}>
                            添加班级信息
                        </Button>
                    )}
                </div>
                <Table dataSource={this.state.data} columns={this.state.columns} rowKey='id' />;
                <Modal
                    cancelText='取消'
                    okText='确定'
                    closable={false}
                    width='50%'
                    title={this.state.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <div className='gutter-example'>
                        <Form className='ant-advanced-search-form'>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item label='专业' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('major', {
                                            rules: [{ required: true, message: '请输入!' }]
                                        })(<Input placeholder='请输入' />)}
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label='班级' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('classfalName', {
                                            rules: [{ required: true, message: '请输入!' }]
                                        })(<Input placeholder='请输入' />)}
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label='班级人数' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('count', {
                                            rules: [{ required: true, message: '请输入!' }]
                                        })(<Input placeholder='请输入' />)}
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label='班主任' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('teacher', {
                                            rules: [{ required: true, message: '请输入!' }]
                                        })(<Input placeholder='请输入' />)}
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label='年级' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('grade', {
                                            rules: [{ required: true, message: '请输入!' }],
                                            initialValue: '2018'
                                        })(
                                            <Select>
                                                <Option value='2018'>2018</Option>
                                                <Option value='2019'>2019</Option>
                                                <Option value='2020'>2020</Option>
                                                <Option value='2021'>2021</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal>
            </Layout>
        )
    }
}
export default withRouter(Form.create()(IconView))
