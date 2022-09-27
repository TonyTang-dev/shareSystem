import { UnorderedListOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import ArticleEditor from "../editionManage/ArticleEditor";



const EditionManage=(props)=>{
    const {user, refreshArticleList, setRefreshArticleList, onSwitchMenu} = props;

    return (
        <>
            <ArticleEditor user={user} refreshArticleList={refreshArticleList}
                setRefreshArticleList={setRefreshArticleList} />

            {/* 菜单打开关闭按钮 */}
            <Tooltip title="编辑模式" color="blue">
                <div className="switchMenu-btn" onClick={()=>{onSwitchMenu()}}>
                    <UnorderedListOutlined />
                </div>
            </Tooltip>
        </>
    );
}


export default EditionManage;