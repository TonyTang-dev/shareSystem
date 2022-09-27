import React, { useEffect, useState } from "react";
import UpdateEditor from "./UpdateEditor";

import $ from "jquery";
import { useNavigate } from "react-router-dom";
import PleaseWait from "../../Basic/PleaseWait";

const UpdateArticle=(props)=>{
    const {user, refreshArticleList, setRefreshArticleList} = props


    // 显示页面
    const [flag, setFlag] = useState(false);

    // 路由跳转
    const Navigate = useNavigate();


    // 在进入修改页面之前，先验证用户身份
    const verify=()=>{
        // 用户信息cookie值
		let userObj = {};
		userObj["acc"] = document.cookie.split(";")
		for(let i of document.cookie.split(/;\s+/)){
			userObj[i.split("=")[0]] = i.split("=")[1];
		}

        $.ajax({
            url:"/shareArticle/user/verify.map",
            cache:false,
            dataType:"json",
            method:"GET",
            contentType:"applicaiton/json;charset=UTF-8",
            data:{
                acc: user.acc,
                token: userObj.token
            },
            success:(result)=>{
                // console.log(result);
                if(result.success){
                    // 给个延时，避免太快
                    setTimeout(()=>setFlag(true),1000);
                }else{
                    // 跳转回博客页面
                    Navigate("/home/blog");
                }
            },
            error:(err)=>{
                console.log(err);
                alert("您没有修改权限");
                // 跳转回博客页面
                Navigate("/home/blog");
            }
        })
    }

    // 调用验证函数
    useEffect(()=>{
        verify();
    },[])


    return flag?(
        <>
            <UpdateEditor user={user} refreshArticleList={refreshArticleList}
                setRefreshArticleList={setRefreshArticleList} />
        </>
    ):(
        <>
            <PleaseWait />
        </>
    );
}


export default UpdateArticle;