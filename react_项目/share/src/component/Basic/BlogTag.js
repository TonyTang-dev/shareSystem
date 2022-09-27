import { Tag } from 'antd';
import React, { useEffect } from 'react';


const BlogTag = (props) => {
    // 数据源
    const {data} = props;

    return (
        <>
        {
            data.split(",").map((item)=>{
                return (<Tag color="blue" key={item}>{item}</Tag>)
            })
        }
        </>
    );  
}

export default BlogTag;