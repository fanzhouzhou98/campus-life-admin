import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import '@/style/view-style/button.scss'
import { withRouter } from 'react-router-dom'
import { Layout, Table, Form, Input, Row, Col, Modal, Button, notification, Select } from 'antd'
import { addStdent, getStudentByPage, updateStudentById, deleteStudentById } from '@/api/api'
const { confirm } = Modal
const { Option } = Select
const { userType } = JSON.parse(sessionStorage.getItem('userInfo'))
class ButtonView extends Component {
    state = {
        loading: false,
        iconLoading: false,
        name: '',
        studentNo: '',
        grade: '',
        type: 1,
        id: '',
        title: '添加学生信息',
        columns: [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: text => <span>{text}</span>
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
                render: text => <span>{text === '0' ? '女' : '男'}</span>
            },
            {
                title: '学号',
                dataIndex: 'studentNo',
                key: 'age'
            },
            {
                title: '年级',
                dataIndex: 'grade',
                key: 'address'
            },
            {
                title: '班级',
                key: 'classNo',
                dataIndex: 'classNo'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) =>
                    userType === 1 && (
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
                deleteStudentById({ id })
                    .then(data => {
                        if (data.status === 200) {
                            notification.success({
                                message: '成功',
                                description: '删除成功'
                            })
                            that.getStudent()
                        }
                    })
                    .catch(() => {})
            },
            onCancel() {}
        })
    }
    showModal = (type, record) => {
        if (type === 2) {
            let { name, studentNo, classNo, grade, gender, id } = record
            this.setState({ id })
            setTimeout(() => {
                this.props.form.setFieldsValue({
                    name,
                    studentNo,
                    classNo,
                    grade,
                    gender
                })
            }, 100)
            this.setState({
                visible: true,
                title: '修改学生信息',
                type
            })
        } else {
            this.setState({
                visible: true,
                title: '添加学生信息',
                type
            })
        }
    }
    async deleteStudentByIdOk(id) {
        let data = await deleteStudentById({ id }).catch(() => {})
        if (data.status === 200) {
            notification.success({
                message: '成功',
                description: '删除成功'
            })
            this.getStudent()
        }
    }
    handleOk = e => {
        e.preventDefault()
        console.log(e)
        if (this.state.type === 1) {
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    let { name, studentNo, classNo, grade, gender } = values
                    let data = await addStdent({ name, studentNo, classNo, grade, gender })
                    if (data.data) {
                        notification.success({
                            message: '成功',
                            description: '添加学生学校完成'
                        })
                        this.getStudent()
                        this.props.form.setFieldsValue({
                            name: '',
                            studentNo: '',
                            classNo: '',
                            grade: '',
                            gender: ''
                        })
                    }
                }
            })
        }
        if (this.state.type === 2) {
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    let { name, studentNo, classNo, grade, gender } = values
                    this.updateStudentById({ name, studentNo, classNo, grade, gender, id: this.state.id })
                    this.props.form.setFieldsValue({
                        name: '',
                        studentNo: '',
                        classNo: '',
                        grade: '',
                        gender: ''
                    })
                }
            })
        }
        this.setState({
            visible: false,
            id: ''
        })
    }
    getStudent = async params => {
        this.setState({ loading: true })
        let data = await getStudentByPage(params).catch(() => {
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
    updateStudentById = async params => {
        let data = await updateStudentById(params).catch(() => {})
        if (data.status === 200) {
            notification.success({
                message: '成功',
                description: '修改完成'
            })
            this.getStudent()
        }
    }
    handleCancel = e => {
        this.setState({
            visible: false,
            id: ''
        })
        this.props.form.setFieldsValue({
            name: '',
            studentNo: '',
            classNo: '',
            grade: '2018',
            gender: '1'
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
    onChangeGrade = val => {
        this.setState({
            grade: val
        })
    }
    resetSearch = () => {
        this.setState({
            name: '',
            studentNo: '',
            grade: ''
        })
    }
    onQuery = () => {
        console.log(111)
        let params = {
            name: this.state.name,
            studentNo: this.state.studentNo,
            grade: this.state.grade
        }
        this.getStudent(params)
    }
    enterLoading = () => {
        this.setState({ loading: true })
    }

    enterIconLoading = () => {
        this.setState({ iconLoading: true })
    }
    componentDidMount() {
        this.getStudent()
    }

    componentWillUnmount() {}

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Layout className='button animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['学生管理', '学生信息管理']}></CustomBreadcrumb>
                </div>
                <div className='gutter-example'>
                    <Form className='ant-advanced-search-form'>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label='学号' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入'
                                        value={this.state.studentNo}
                                        onChange={this.onChangeStudentNo}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label='姓名' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input placeholder='请输入' value={this.state.name} onChange={this.onChangeName} />
                                </Form.Item>
                            </Col>
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
                            添加学生信息
                        </Button>
                    )}
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
                                    <Form.Item label='班级' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('classNo', {
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
                            <Row gutter={16}>
                                {' '}
                                <Col span={6}>
                                    <Form.Item label='性别' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {getFieldDecorator('gender', {
                                            rules: [{ required: true, message: '请输入!' }],
                                            initialValue: '1'
                                        })(
                                            <Select>
                                                <Option value='1'>男</Option>
                                                <Option value='0'>女</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal>
                <Table
                    dataSource={this.state.data}
                    columns={this.state.columns}
                    loading={this.state.loading}
                    rowKey='id'
                />
                ;
            </Layout>
        )
    }
}
export default withRouter(Form.create()(ButtonView))
