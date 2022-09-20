import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

class Bar extends Component {
    componentDidMount() {
        let myChart = echarts.init(document.getElementById('bar'))
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['软件学院', '计算机学院', '土木工程学院', '化学学院', '音乐学院', '历史学院', '文学院']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['2018', '2019', '2020', '2021']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '软件学院',
                    type: 'bar',
                    data: [320, 460, 301, 300, 390, 460, 320]
                },
                {
                    name: '计算机学院',
                    type: 'bar',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '土木工程学院',
                    type: 'bar',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '化学学院',
                    type: 'bar',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '音乐学院',
                    type: 'bar',
                    data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                    markLine: {
                        lineStyle: {
                            normal: {
                                type: 'dashed'
                            }
                        },
                        data: [[{ type: 'min' }, { type: 'max' }]]
                    }
                },
                {
                    name: '历史学院',
                    type: 'bar',
                    data: [620, 732, 701, 734, 1090, 1130, 1120]
                },
                {
                    name: '文学院',
                    type: 'bar',
                    data: [120, 132, 101, 134, 290, 230, 220]
                }
            ]
        })
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    render() {
        return <div id='bar' style={{ height: 300, background: '#fff' }}></div>
    }
}

export default Bar
