import { Tag } from 'antd';
import React, { useEffect } from 'react';


const StringTagList = (props) => {
    // 数据源
    const {data} = props;

    return (
        <>
        {
            data.map((item)=>{
                return (<Tag color="blue" key={item.target}>{item.name}</Tag>)
            })
        }
        </>
    );  
}

export default StringTagList;