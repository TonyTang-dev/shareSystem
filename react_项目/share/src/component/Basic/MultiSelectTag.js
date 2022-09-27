import { MenuOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
const { Option } = Select;


const MultiSelectTag = (props) => {
    const {selectList, setData} = props;

    // 可选数据源
    const children = [];

    // 初始化
    selectList.map((item,index)=>{
        children.push(<Option key={String(index)}>{item.name}</Option>);
    });

    // 选择数据
    const handleChange = (value) => {
        // 设置提交的表单数据
        let temp = [];
        for(let i of value){
            if(i === "默认"){
                continue;
            }
            temp.push(selectList[parseInt(i)]);
        }
        // 设置数据
        setData(temp);
    };
    
    return(
        <>
            <Select
                mode="multiple"
                allowClear
                style={{
                    width: '100%',
                    color:"#1890ff",
                }}
                placeholder="请选择拓展菜单"
                defaultValue={['默认']}
                defaultActiveFirstOption={true}
                onChange={handleChange}
                >
                &nbsp;{children}
            </Select>
        </>
    );
}

export default MultiSelectTag;