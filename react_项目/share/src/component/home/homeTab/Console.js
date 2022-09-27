import React, { useState } from 'react';


import RankList from '../console/RankList';
import BarChart from '../console/BarChart';
import DataCard from '../console/DataCard';
import ArticleDataCard from "../console/ArticleDataCard";


const Console = (props)=>{
    // 主题
    const  {user, lan, ComponentTheme, bodyTheme, fontTheme} = props;

    // 文章数据图表数据源
    let [articleChart, setArticleChart] = useState([0,0,0,0,0,0,0,0,0,0]);
    let [creditChart, setCreditChart] = useState([0,0,0,0,0,0,0,0,0,0]);

    return (
        <table className='content-table' align='center' style={{backgroundColor:bodyTheme, color:fontTheme}}>
            <tbody align='center'>
                <tr className='home-panel-content-row'>
                    <td><DataCard user={user} lan={lan} theme={ComponentTheme} /></td>
                    <td><ArticleDataCard user={user} lan={lan} theme={ComponentTheme} fontTheme={fontTheme} /></td>
                    <td rowSpan='2' className='rank-list-table-wrap' style={{backgroundColor:ComponentTheme,color:fontTheme}}>
                        <RankList lan={lan} fontTheme={fontTheme} 
                            articleChart={articleChart} setArticleChart={setArticleChart}
                            creditChart={creditChart} setCreditChart={setCreditChart}/>
                    </td>
                </tr>
                <tr className='home-panel-content-row'>
                    <td colSpan='2'>
                        {/* <StatisticData /> */}
                        <BarChart lan={lan} theme={ComponentTheme} fontTheme={fontTheme} creditChart={creditChart} articleChart={articleChart}/>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Console;