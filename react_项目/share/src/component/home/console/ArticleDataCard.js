import React, { useState } from "react";
import { Select } from 'antd';

import { Progress } from 'antd';
import PiA from "./PIA";


const { Option } = Select;

const DataCard = (props)=>{
    // 主题
    const {user, lan, theme, fontTheme} = props;

    // 月份列表
    const monthList = JSON.parse(lan.get("month"));
    // 文章类型
    const [articleTypeNum, setArticleTypeNum] = useState(4);

    return (
        <div className="data-card-content">
            <table>
                <tbody>
                    <tr>
                        <td colSpan="2" height="75%" className="bgCard article-bg" align="center"  style={{backgroundColor:theme}}>
                            <div className="article-detail-tiptag">
                                <div>
                                    <span>{lan.get("articleSort")}</span>
                                    <br />
                                    <span style={{color:"blue",fontStyle:"italic"}}>({lan.get("totalSort",{num:articleTypeNum})})</span>
                                </div>
                                <Select defaultValue="1月"
                                    style={{
                                        width: 80,
                                    }}>
                                    <Option value="1月">{monthList[0]}</Option>
                                    <Option value="2月">{monthList[1]}</Option>
                                    <Option value="3月">{monthList[2]}</Option>
                                    <Option value="4月">{monthList[3]}</Option>
                                    <Option value="5月">{monthList[4]}</Option>
                                    <Option value="6月">{monthList[5]}</Option>
                                    <Option value="7月">{monthList[6]}</Option>
                                    <Option value="8月">{monthList[7]}</Option>
                                    <Option value="9月">{monthList[8]}</Option>
                                    <Option value="10月">{monthList[9]}</Option>
                                    <Option value="11月">{monthList[10]}</Option>
                                    <Option value="12月">{monthList[11]}</Option>
                                </Select>
                            </div>
                            <PiA fontTheme={fontTheme} />
                            {/* <Progress type="circle" percent={75} format={(percent) => "7.8 w"} /> */}
                            {/* <img src={require("../../img/loginbg_login.png")} alt="加载失败" /> */}
                        </td>
                    </tr>
                    {/* <tr className="ele-row">
                        <td align="center" style={{border:"1px solid",borderWidth:"0 2px 0px 0px", borderColor:"grey",cursor:"pointer"}}>
                            <span>文章数量</span>
                            <br/>
                            <span className="statistic-text">100篇</span>
                        </td>
                        <td align="center" style={{cursor:"pointer"}}>
                            <span>评论数量</span>
                            <br/>
                            <span className="statistic-text">44条</span>
                        </td>
                    </tr>
                    <tr height="1px" style={{backgroundColor:"grey"}}>
                        <td></td>
                        <td></td>
                    </tr> */}
                    <tr className="ele-row">
                        <td className="api-card" align="center" style={{border:"1px solid",borderWidth:"0 2px 0px 0px", 
                                    borderColor:"grey",cursor:"pointer",backgroundColor:theme}}>
                            <span>{lan.get("myRanking")}</span>
                            <br/>
                            <span className="statistic-text">{user.ranking}</span>
                        </td>
                        <td className="api-card" align="center" style={{cursor:"pointer",backgroundColor:theme}}>
                            <span>{lan.get("rankingCompare")}</span>
                            <br/>
                            <span className="statistic-text">{lan.get("rankingUp")} 10%</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}



export default DataCard;