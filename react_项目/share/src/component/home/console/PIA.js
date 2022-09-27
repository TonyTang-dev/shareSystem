import React, { Component } from 'react';
//导入饼图
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

import $ from "jquery";


 
export default class PiA extends Component {
    constructor(){
        super();
        this.state={
            colorList: [],
            dataList: [],
            legendData: ["空"],
            statisticData: [{
                value: 0,
                name: "空",
                label: {
                    show: true,
                    //自定义内容
                    formatter: String("空"),
                    color: '#fff',
                },
                itemStyle: { color: "#ff5500"},
            }]
        };
        this.init();
    }


    init=()=>{
        /* 相关的菜单属性 */
        let colorListtemp= ['#607CE9',"#ff5500",'#41D1A6',"blue",'pink'];
        let dataListtemp= [];
        let legendDatatemp= [];
        let statisticDatatemp= [];
        // 类型数量
        let typeNum = 0;
        var that = this;

        $.ajax({
            url: "/shareArticle/init/articleType.map",
            dataType: 'json',
            cache: false,
            contentType:"application/json;charset=utf-8",
            success: (result)=>{
                result[1].map((item, index)=>{
                    let obj = {
                        value: item.num,
                        name: item.type,
                        label: {
                            show: true,
                            //自定义内容
                            formatter: String(item.type),
                            color: '#fff',
                        },
                        itemStyle: { color: colorListtemp[index%5]},
                    };

                    // 数据填充
                    dataListtemp.push(item.num);
                    statisticDatatemp.push(obj);
                    legendDatatemp.push(item.type);
                    typeNum++;
                });

                // 状态设置
                that.setState({
                    statisticData :statisticDatatemp,
                    colorList :colorListtemp,
                    dataList :dataListtemp,
                    legendData :legendDatatemp
                });
            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    }


    getOption = ()=> {
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
                data: this.state.legendData,
                itemWidth: 8,
                itemHeight: 8,
                icon: 'circle',
                borderRadius: 16,
                textStyle:{color: this.props.fontTheme}
            },
            series: [
                {
                    name: `分类`,
                    type: 'pie',
                    width: 130,
                    height: 130,
                    top: 8,
                    left: 'center',
                    data: this.state.statisticData,
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
        return <ReactEcharts option={this.getOption()} style={{height:"70%"}} />;
    }
}