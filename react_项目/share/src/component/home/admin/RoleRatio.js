import React, { Component } from 'react';
//导入饼图
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

// import $ from "jquery";


 
export default class RoleRatio extends Component {
    constructor(props){
        super(props);
    }

    // 生成需要的数据
    generateData=(legend2, showData)=>{
        //剩余
        let option = {
            // title: {
            //     text: `文章`,
            //     x: 'center',
            //     textStyle: {
            //         color: 'rgba(0, 0, 0, 0.9)',
            //         fontWeight: 400,
            //         fontSize: 14,
            //     },
            // },
            tooltip: {
                trigger: 'item',
                //提示框浮层内容格式器，支持字符串模板和回调函数形式。
                formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            legend: {
                orient: 'horizontal',
                // bottom: 5,
                data: legend2,
                itemWidth: 8,
                itemHeight: 8,
                icon: 'circle',
                borderRadius: 16,
            },
            series: [
                {
                    name: `分类`,
                    type: 'pie',
                    width: 130,
                    height: 130,
                    top: 8,
                    left: 'center',
                    data: showData,
                    clockwise: false, //是否顺时针
                    label: {
                        //去除饼图的指示折线label
                        // normal: {
                            show: false,
                            position: 'inside',
                            formatter: '{b}:{d}%',
                        // },
                    },
                },
            ],
        };
        return option;
    }

    getOption = () => {
        let colorList = ['#607CE9',"#ff5500",'#41D1A6','#00D1A6'];
        let dataList = [this.props.manageBasic.commonUser,this.props.manageBasic.commonAdmin,this.props.manageBasic.superAdmin];

        //剩余
        let option = {
            // title: {
            //     text: `文章`,
            //     x: 'center',
            //     textStyle: {
            //         color: 'rgba(0, 0, 0, 0.9)',
            //         fontWeight: 400,
            //         fontSize: 14,
            //     },
            // },
            tooltip: {
                trigger: 'item',
                //提示框浮层内容格式器，支持字符串模板和回调函数形式。
                formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            legend: {
                orient: 'horizontal',
                bottom: 0,
                data: ['普通用户',"管理员","超级管理员"],
                itemWidth: 8,
                itemHeight: 8,
                icon: 'circle',
                borderRadius: 16,
                textStyle:{color: this.props.fontTheme}
            },
            series: [
                {
                    name: `用户比例`,
                    type: 'pie',
                    width: 130,
                    height: 130,
                    top: 8,
                    left: 'center',
                    data: [{
                        value: dataList[0],
                        name: "普通用户",
                        label: {
                            show: true,
                            //自定义内容
                            formatter: String("普通用户"),
                            color: '#fff',
                        },
                        itemStyle: { color: "#607CE9"},
                    },{
                        value: dataList[1],
                        name: "管理员",
                        label: {
                            show: true,
                            //自定义内容
                            formatter: String("管理员"),
                            color: '#fff',
                        },
                        itemStyle: { color: "#ff5500"},
                    },{
                        value: dataList[2],
                        name: "超级管理员",
                        label: {
                            show: true,
                            //自定义内容
                            formatter: String("超管"),
                            color: '#fff',
                        },
                        itemStyle: { color: "#41D1A6"},
                    }],
                    clockwise: false, //是否顺时针
                    label: {
                        //去除饼图的指示折线label
                        // normal: {
                            show: false,
                            position: 'inside',
                            formatter: '{b}:{d}%',
                        // },
                    },
                },
            ],
        };
        return option;
    };
    render() {
        return <ReactEcharts option={this.getOption()} style={{height:"65%"}} />;
    }
}