import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

class Pie extends Component {
    componentDidMount() {
        let myChart = echarts.init(document.getElementById('pie'))
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['2018级', '2019级', '2020级', '2021级']
            },
            series: [
                {
                    name: '年级人数占比',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: '2018级' },
                        { value: 310, name: '2019级' },
                        { value: 234, name: '2020级' },
                        { value: 135, name: '2021级' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        })
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    render() {
        return <div id='pie' style={{ height: 300 }}></div>
    }
}

export default Pie
