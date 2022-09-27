import React, { useEffect, useState } from 'react';

import $ from "jquery";
import { PlusOutlined } from '@ant-design/icons';
import AdBanner from '../../banner/AdBanner';
import Comfirm from '../../modal/Comfirm';


const AdManage = (props)=>{
    // 主题
    const  {lan, ComponentTheme, bodyTheme, fontTheme} = props;

    // 广告图片确定（是否上传后续确定）
    const handleCoverUpload=(obj)=>{
        console.log(obj);
        // 如果图片为空则不上传
        if(obj.length < 1){
            return;
        }

        // 上传图片的表单
        let formData = new FormData();
        for(let i of obj){
            formData.append('document',i);
        }

        // 确认刷新
        const OK=()=>{
            // 页面重渲染
            window.location.reload();
        }

        $.ajax({
            url:"/shareArticle/file/ad.map",
            method:"POST",
            cache:false,
            data: formData,
            // 不对url编码
            processData:false,
            // 不修改contentType属性，原样发送
            contentType:false,
            success:(result)=>{
                result = JSON.parse(result);
                if(result.success){
                    // 清空文件输入框
                    $("#uploadAdPanel").val("");
                    Comfirm({"text":'上传成功啦，可能需要刷新才能看到效果哦！',"resultOK":OK});
                }else{
                    alert("上传广告失败");
                }
            },
            error:(err)=>{
                console.log(err);
                alert('上传出错了');
            }
        })
    }


    return (
        <table className='content-table' align='center' style={{backgroundColor:bodyTheme, color:fontTheme}}>
            <tbody align='center'>
                <tr className='home-panel-content-row-admin'>
                    <td>
                        <div style={{width:"25vw",height:"43vh"}}>
                            <img style={{width:"25vw",height:"40vh",borderRadius:"5px"}} src="http://localhost:8080/shareArticle/static/ad/banner1.png" alt='banner1' />
                            <span>广告投放1</span>
                        </div>
                    </td>
                    <td>
                        <div style={{width:"25vw",height:"43vh"}}>
                            <img style={{width:"25vw",height:"40vh",borderRadius:"5px"}} src="http://localhost:8080/shareArticle/static/ad/banner2.png" alt='banner1' />
                            <span>广告投放2</span>
                        </div>
                    </td>
                    <td rowSpan='2' className='rank-list-table-wrap' style={{backgroundColor:ComponentTheme,color:fontTheme}}>
                        <AdBanner />
                        <span>效果预览</span>
                        <hr />
                        <div className='ad-pub-tip-wrap' style={{textAlign:"left"}}>
                            <span style={{fontSize:"18px",fontWeight:"bold"}}>投放教程</span>
                            <hr />
                            <ol>
                                <li>广告投放采用两张图片的模式</li>
                                <li>广告会在控制台和用户管理界面轮播显示</li>
                                <li>投放时，请投放两张图片，否则默认覆盖第一份广告</li>
                                <li>投放方式：单击下方文件面板打开文件夹选择图片/拖动两张图片至其上释放即可</li>
                                <li>注意：选择/拖动图片后文件即上传，不需要其他操作</li>
                                <li>上传完毕后，可能需要刷新页面才能看到上传效果</li>
                            </ol>
                        </div>
                    </td>
                </tr>
                <tr className='home-panel-content-row-admin'>
                    <td colSpan='2' style={{paddingTop:"20px"}}>
                        <div className='user-list-wrap scroll-bar'>
                            <div className="file-upload-module">
                                <label className="upload-file-label-input" 
                                        htmlFor="uploadCoverPanel" 
                                        style={{display:"flex",flexDirection:"column",
                                        alignItems:"center",justifyContent:"center",
                                        fontSize:"14px",fontWeight:"bold",color:"white"}}
                                    >
                                    <PlusOutlined style={{fontSize:"24px"}} />
                                    <span>点击/拖动广告图片至此释放上传</span>
                                </label>
                                <input name="document" multiple="multiple"
                                    id="uploadAdPanel" type="file" 
                                    accept="image/png, image/jpeg, image/jpg"
                                    style={{opacity:"0",width:"100%",height:"100%",cursor:"pointer"}} 
                                    onChange={(e)=>handleCoverUpload(e.target.files)} 
                                    />
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default AdManage;