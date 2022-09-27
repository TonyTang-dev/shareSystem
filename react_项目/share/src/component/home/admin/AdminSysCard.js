import React from "react";

import Banner from "../../banner/Banner";


const DataCard = (props)=>{
    const {lan, theme, manageBasic} = props;

    return (
        <div className="data-card-content admin-sys-content">
            <table>
                <tbody>
                    <tr>
                        <td colSpan="2" height="50%" className="bgCard adminSysCard" align="center">
                            {/* <img src={require("../../../img/loginbg_login.png")} alt="加载失败" /> */}
                            <Banner style={{width:"25vw",height:"20vh"}} />
                        </td>
                    </tr>
                    <tr className="ele-row">
                        <td className="api-card" align="center" style={{border:"1px solid",borderWidth:"0 2px 0px 0px", 
                                    borderColor:"grey",cursor:"pointer",backgroundColor:theme}}>
                            <span>{lan.get("userSysNum")}</span>
                            <br/>
                            <span className="statistic-text">{manageBasic.totalUser}{lan.get("people")}</span>
                        </td>
                        <td className="api-card" align="center" style={{cursor:"pointer",backgroundColor:theme}}>
                            <span>{lan.get("articleSysNum")}</span>
                            <br/>
                            <span className="statistic-text">{manageBasic.totalArticle}{lan.get("piece")}</span>
                        </td>
                    </tr>
                    <tr height="1px" style={{backgroundColor:"grey"}}>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="ele-row">
                        <td className="api-card" align="center" style={{border:"1px solid",borderWidth:"0 2px 0px 0px", 
                                    borderColor:"grey",cursor:"pointer",backgroundColor:theme}}>
                            <span>{lan.get("daySysRegister")}</span>
                            <br/>
                            <span className="statistic-text">{manageBasic.dayRegister}{lan.get("people")}</span>
                        </td>
                        <td className="api-card" align="center" style={{cursor:"pointer",backgroundColor:theme}}>
                            <span>{lan.get("dayAccessNum")}</span>
                            <br/>
                            <span className="statistic-text">{manageBasic.dayAccess}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}



export default DataCard;