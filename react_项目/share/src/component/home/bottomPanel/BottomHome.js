import { AppstoreTwoTone, BookTwoTone, InteractionTwoTone, TagTwoTone, ThunderboltTwoTone } from "@ant-design/icons";
import React from "react";

const BottomHome=()=>{

    return (
        <div className="bottom-homt-panel">
            {/* <span style={{fontSize:"48px",fontFamily:"KaiTi"}}>小札记</span> */}
            <img src={require("../../../img/name.png")} alt="name" />
            <div className="bottom-home-api-wrap">
                <span><BookTwoTone />&nbsp;文档</span>
                <span><AppstoreTwoTone/>&nbsp;功能</span>
                <span><InteractionTwoTone/>&nbsp;下载</span>
                <span><TagTwoTone />&nbsp;关于</span>
            </div>
            <div className="launchApp">
                <ThunderboltTwoTone style={{fontSize:"24px"}} />&nbsp;
                <span style={{fontSize:"28px",fontFamily:"楷体"}}>开启系统</span>
            </div>
        </div>
    );
}


export default BottomHome;