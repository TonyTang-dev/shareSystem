import { Tag } from 'antd';
import React, { useEffect } from 'react';


const TypeTagList = (props) => {
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
                // onClose={()=>closeTag(item)}
                return (<Tag color="blue" key={item.target}>{item.name}</Tag>)
            })
        }
        </>
    );  
}

export default TypeTagList;