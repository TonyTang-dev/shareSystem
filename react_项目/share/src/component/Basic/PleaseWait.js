import { Spin } from "antd";
import React from "react";


const PleaseWait=()=>{

    return(
        <>
            <div style={{width:"100%",height:"100%",display:"flex",
                        flexDirection:"column",alignItems:"center",
                        justifyContent:"center",backgroundColor:"#0f0"
                        ,textShadow:"5px 0px 5px white"}}>
                <Spin size="large" />
                <span style={{fontSize:"128px",color:"white",fontWeight:"bold"}}>请稍候</span>
                <br />
                <span style={{fontSize:"24px",color:"white",fontWeight:"bold"}}>优质内容正在来的路上呀~</span>
            </div>
        </>
    );
}

export default PleaseWait;