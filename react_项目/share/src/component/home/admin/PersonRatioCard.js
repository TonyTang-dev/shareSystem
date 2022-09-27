import { UserAddOutlined } from "@ant-design/icons";
import React from "react";

import RoleRatio from "./RoleRatio";


const DataCard = (props)=>{
    // 主题
    const {lan, theme, fontTheme, manageBasic} = props;

    return (
        <div className="data-card-content admin-sys-content">
            <table>
                <tbody>
                    <tr>
                        <td colSpan="2" height="75%" className="bgCard article-bg admin-roleRatio" align="center"  style={{backgroundColor:theme}}>
                            <div className="article-detail-tiptag">
                                <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"space-between",fontSize:"18px"}}>
                                    <span style={{fontWeight:"bold"}}>{lan.get("roleRatio")}</span>
                                    {/* <br />
                                    <span style={{color:"blue",fontStyle:"italic"}}>({lan.get("totalSort",{num:articleTypeNum})})</span> */}
                                    <div><UserAddOutlined /></div>
                                </div>
                            </div>
                            <hr />
                            <RoleRatio manageBasic={manageBasic} fontTheme={fontTheme} />
                        </td>
                    </tr>
                    {/* <tr className="ele-row">
                        <td className="api-card" align="center" style={{border:"1px solid",borderWidth:"0 2px 0px 0px", 
                                    borderColor:"grey",cursor:"pointer",backgroundColor:theme}}>
                            <span>{lan.get("myRanking")}</span>
                            <br/>
                            <span className="statistic-text">7.8 w</span>
                        </td>
                        <td className="api-card" align="center" style={{cursor:"pointer",backgroundColor:theme}}>
                            <span>{lan.get("rankingCompare")}</span>
                            <br/>
                            <span className="statistic-text">{lan.get("rankingUp")} 10%</span>
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
}



export default DataCard;