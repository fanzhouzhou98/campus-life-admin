import React, { Component } from 'react'
import { Layout, Row, Col, Icon, Divider } from 'antd'
import screenfull from 'screenfull'
import '@/style/view-style/index.scss'

import BarEcharts from './bar.jsx'
import PieEcharts from './pie.jsx'
import LineEcharts from './line.jsx'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false
        }
    }

    fullToggle = () => {
        if (screenfull.isEnabled) {
            screenfull.request(document.getElementById('bar'))
        }
    }
    render() {
        return (
            <Layout className='index animated fadeIn'>
                <Row>
                    <Col>
                        <div className='base-style'>
                            <div className='bar-header'>
                                <div>学校各学院人数预览</div>
                                <Icon type='fullscreen' style={{ cursor: 'pointer' }} onClick={this.fullToggle} />
                            </div>
                            <Divider />
                            <BarEcharts />
                        </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        <div className='base-style'>
                            <div>近四年学校毕业生去向</div>
                            <LineEcharts />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='base-style'>
                            <div>在校生各年级人数占比</div>
                            <PieEcharts />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default Index
