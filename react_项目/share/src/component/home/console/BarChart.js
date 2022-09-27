import React, { Component } from 'react';
import * as echarts from 'echarts';
 
 

 
class BarChart extends Component {
    
    renderBarCharts=(title)=>{
        let lan = this.props.lan;
        return {
            // 图表背景颜色
            // backgroundColor: '#ccc',
            title: {
                text: title,
                left: "center",
                textStyle: {
                    color: this.props.fontTheme,
                    fontSize: 16,
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [lan.get("browse"), lan.get("like")],
                textStyle: {
                    color: this.props.fontTheme,//'black',
                },
                padding: [5, 0, 0, 50],
                orient: 'horizontal',
                left: 'left',
                top:"top"
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            height: "60%",
            xAxis: [
                {
                    name: lan.get("date"),
                    nameTextStyle: {
                        padding: [20, 0, 0, 0],    // 四个数字分别为上右下左与原位置距离
                        color:'green',
                        fontSize: 14,
                    },
                    type: 'category',
                    // prettier-ignore
                    data: JSON.parse(lan.get("weekday")),//['星期1', '星期2', '星期3', '星期4', '星期5', '星期6', '星期7'],
                    axisLabel: {
                        margin: 10,
                        align: "center",
                        interval: 0,
                        rotate: 5,
                        // textStyle: {
                            //改变x轴上文字的颜色
                            color: "green",
                            fontSize: 12,
                        // }
                    }
                }
            ],
            yAxis: [
                {
                    name:lan.get("count"),
                    nameTextStyle: {
                        padding: [20, 0, 0, 0],    // 四个数字分别为上右下左与原位置距离
                        color:'green',
                        fontSize: 14,
                    },
    
                    type: 'value',
                    axisLabel: {
                        show: true,
                        // textStyle: {
                            //改变y轴上文字的颜色
                            color: "blue",
                            fontSize: 12,
                        // }
                    },
                    // axisLine: {
                    //     show: true,//是否显示轴线
                    //     lineStyle: {
                    //         color: 'black',//刻度线的颜色
                    //     }
                    // }
                }
            ],
            series: [
                {
                    name: lan.get("browse"),
                    type: 'bar',
                    data: this.props.creditChart,
                    itemStyle: {
                        // normal: {
                            color: 'rgba(255, 85, 0, 0.8)'
                        // },
                    },
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Max' },
                            { type: 'min', name: 'Min' }
                        ]
                    },
                    // markLine: {
                    //     data: [{ type: 'average', name: 'Avg' }]
                    // }
                },
                {
                    name: lan.get("like"),
                    type: 'bar',
                    data: this.props.articleChart,
                    // [
                    //     32.6, 95.9, 99.0, 226.4, 218.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                    // ],
                    itemStyle: {
                        // normal: {
                            color: 'rgba(0,0,255, 0.8)'
                        // },
                    },
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Max' },
                            { type: 'min', name: 'Min' }
                        ],
                        label: {
                            offset: [0, 0],
                            // textStyle: {
                                color: "white",
                                fontSize: 12,
                            // },
                        },
                    },
                    // markLine: {
                    //     data: [{ type: 'average', name: 'Avg' }],
                    //     label: {
                    //         offset: [0, 0],
                    //         textStyle: {
                    //             color: "red",
                    //             fontSize: 12,
                    //         },
                    //     },
                    // }
                }
            ]
        }
    }

    constructor(){
        super();
        // 基于准备好的dom，初始化echarts实例
        this.state={
            MyEcharts: null
        }
    }
        
    componentDidMount() {
        const that = this;
        const lan = this.props.lan;
        this.state.MyEcharts = echarts.init(document.getElementById("charts"));
        // 绘制图表
        this.state.MyEcharts.setOption(that.renderBarCharts(lan.get("articleStatistic")));

        // 屏幕大小变化监听，图标大小自适应
        window.addEventListener("resize", function () {
            that.state.MyEcharts.resize();
        });
    }

    componentDidUpdate(){
        const lan = this.props.lan;
        this.state.MyEcharts.setOption(this.renderBarCharts(lan.get("articleStatistic")));
    }
 
    render() {
        return (
            <div>
                <div id='charts' style={{ height: "35vh",backgroundColor:this.props.theme, borderRadius:'5px'}}>
 
                </div>
            </div>
        )
    }
 
}
 
export default BarChart;