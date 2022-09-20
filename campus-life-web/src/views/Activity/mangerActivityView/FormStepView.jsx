import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import '@/style/view-style/button.scss'
import { dateFormat } from '@/utils/dateFromat'
import { Layout, Table, Form, Input, Row, Col, Modal, notification, Button } from 'antd'
import { getActivityByPage, deleteActivityById } from '@/api/api'
import { withRouter } from 'react-router-dom'
const { userType } = JSON.parse(sessionStorage.getItem('userInfo'))
const { confirm } = Modal
class ButtonView extends Component {
    state = {
        loading: false,
        iconLoading: false,
        activityName: '',
        clubName: '',
        score: '',
        count: '',
        id: '',
        principal: '',
        principalName: '',
        createdTime: '',
        endTime: '',
        columns: [
            {
                title: '活动名称',
                dataIndex: 'activityName',
                key: 'activityName',
                render: text => <span>{text}</span>
            },
            {
                title: '社团名称',
                dataIndex: 'clubName',
                key: 'clubName',
                render: text => <span>{text}</span>
            },
            {
                title: '发布时间',
                dataIndex: 'createdTime',
                key: 'createdTime',
                render: text => <span>{dateFormat(text, 'yyyy-MM-dd')}</span>
            },
            {
                title: '截至时间',
                dataIndex: 'endTime',
                key: 'endTime',
                render: text => <span>{dateFormat(text, 'yyyy-MM-dd')}</span>
            },
            {
                title: '分数',
                key: 'score',
                dataIndex: 'score'
            },
            {
                title: '人数',
                key: 'count',
                dataIndex: 'count'
            },
            {
                title: '负责人',
                key: 'principal',
                dataIndex: 'principal'
            },
            {
                title: '负责人电话',
                key: 'principalName',
                dataIndex: 'principalName'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) =>
                    userType === 1 && (
                        <div>
                            <Button type='primary' onClick={() => this.goToEdit(record)} icon='edit' size='small'>
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
            }
        ],
        data: []
    }
    goToEdit = record => {
        this.props.history.replace(`/form/base-form?type=edit&id=${record.id}`)
    }
    showConfirm(id) {
        let that = this
        confirm({
            cancelText: '取消',
            okText: '确定',
            title: '提示',
            content: '是否确认删除该条记录？',
            onOk() {
                deleteActivityById({ id })
                    .then(data => {
                        if (data.status === 200) {
                            notification.success({
                                message: '成功',
                                description: '删除成功'
                            })
                            that.getActivity()
                        }
                    })
                    .catch(() => {})
            },
            onCancel() {}
        })
    }
    getActivity = async params => {
        this.setState({ loading: true })
        let data = await getActivityByPage(params).catch(() => {
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
    onChangePrincipal = e => {
        let { value } = e.target
        this.setState({
            principal: value
        })
    }
    onChangePrincipalName = e => {
        let { value } = e.target
        this.setState({
            principalName: value
        })
    }
    onChangeClubName = e => {
        let { value } = e.target
        this.setState({
            clubName: value
        })
    }
    onChangeActivityName = e => {
        let { value } = e.target
        this.setState({
            activityName: value
        })
    }
    resetSearch = () => {
        this.setState({
            principal: '',
            activityName: '',
            principalName: '',
            clubName: ''
        })
    }
    onQuery = () => {
        console.log(111)
        let params = {
            principal: this.state.principal,
            principalName: this.state.principalName,
            activityName: this.state.activityName,
            clubName: this.state.clubName
        }
        this.getActivity(params)
    }
    componentDidMount() {
        this.getActivity()
    }

    componentWillUnmount() {}
    enterLoading = () => {
        this.setState({ loading: true })
    }

    enterIconLoading = () => {
        this.setState({ iconLoading: true })
    }
    render() {
        return (
            <Layout className='button animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['活动管理', '活动信息信息']}></CustomBreadcrumb>
                </div>
                <div className='gutter-example'>
                    <Form className='ant-advanced-search-form'>
                        <Row gutter={16}>
                            <Col span={5}>
                                <Form.Item label='活动名称' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入活动名称'
                                        value={this.state.activityName}
                                        onChange={this.onChangeActivityName}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label='社团名称' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入社团名称'
                                        value={this.state.clubName}
                                        onChange={this.onChangeClubName}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label='负责人' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入负责人'
                                        value={this.state.principal}
                                        onChange={this.onChangePrincipal}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label='负责人电话' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Input
                                        placeholder='请输入负责人电话'
                                        value={this.state.principalName}
                                        onChange={this.onChangePrincipalName}
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
                <Table dataSource={this.state.data} columns={this.state.columns} rowKey='id' />;
            </Layout>
        )
    }
}

export default withRouter(ButtonView)
