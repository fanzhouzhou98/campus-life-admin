import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

class Line extends Component {
    componentDidMount() {
        let myChart = echarts.init(document.getElementById('line'))
        myChart.setOption({
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['考研', '就业', '参军']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['2014', '2015', '2016', '2018']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '考研',
                    type: 'line',
                    data: [2600, 2800, 3000, 1500]
                },
                {
                    name: '就业',
                    type: 'line',
                    data: [8000, 7000, 6500, 9000]
                },
                {
                    name: '参军',
                    type: 'line',
                    data: [150, 232, 201, 154]
                }
            ]
        })
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    render() {
        return <div id='line' style={{ height: 300 }}></div>
    }
}

export default Line
