import { Tag } from 'antd';
import React, { useEffect } from 'react';


const TagList = (props) => {
    // 数据源
    const {data, setData} = props;

    // 关闭标签
    const closeTag = (item) => {
        let temp = [];
        for (let i of data){
            if(i === item){
                continue;
            }
            temp.push(i);
        }
        setData(temp);
    };

    return (
        <>
        <Tag color="pink" key="默认">默认</Tag>
        {
            data.map((item)=>{
                return (<Tag closable color="blue" onClose={()=>closeTag(item)} key={item}>{item}</Tag>)
            })
        }
        </>
    );  
}

export default TagList;