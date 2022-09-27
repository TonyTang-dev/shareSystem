import React, { useState, useEffect } from "react";

// import { Col, Row } from 'antd';
import { CreditCardOutlined, QuestionCircleOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Input, Row, Select, Form, Button} from "antd";
import AddSortTypeSelect from "./AddSortTypeSelect";
import ArticleSortTreeManage from "./ArticleSortTreeManage";
import $ from "jquery";
import Comfirm from "../../modal/Comfirm";
import StringTagList from "../../Basic/StringTagList";


const { Option } = Select;

const SortManage=(props)=>{
    // 主题
    const {user, bodyTheme, ComponentTheme,fontTheme} = props;

    // 选中的数据
    const [sortTreeData, setSortTreeData] = useState([]);

    // 需要修改的数据源
    const [updateSort, setUpdateSort] = useState({"name":"","target":""});
    
    // 表单hook钩子
    const [form] = Form.useForm();

    // 分类数据源
    const [sortData, setSortData] = useState([]);

    // 新增分类数据源
    let newSortObj = {"root":"","second":"","final":""};
    let [newSort, setNewSort] = useState(newSortObj);


    // 初始化修改分类对象
    useEffect(()=>{
        form.setFieldsValue({"updateObj": updateSort.name});
        if(updateSort.name === ""){
            $("#typeUpdateTip1").fadeIn(200);
            $("#typeUpdateTip2").fadeOut(200);
        }else{
            $("#typeUpdateTip2").fadeIn(200);
            $("#typeUpdateTip1").fadeOut(200);
        }
    },[updateSort]);


    // 请求分类数据源
    const getData=()=>{
        $.ajax({
            url:'/shareArticle/article/blogSort.map',
            method:"get",
            cache:false,
            dataType:"json",
            contentType:"application/json;charset=UTF-8",
            data:{

            },
            success:(result)=>{
                // console.log(result);
                if(result.success){
                    // 设置数据源
                    setSortData(result.data);
                }
            },
            error:(err)=>{
                alert("获取数据失败");
            }
        });
    }

    // 调用获取数据请求
    useEffect(()=>{
        getData();
    },[]);

    // 提交新分类
    const handleSubmitNewSort=()=>{
        // 用于comfirm的调用
        const OK=()=>{
            
        }
        // 空值检查
        if(newSort.root === "" && newSort.second==="" && newSort.final===""){
            Comfirm({"text":"请先填写分类数据后再添加哦！","resultOK":OK});
            return;
        }

        // 提交新增分类
        $.ajax({
            url:"/shareArticle/article/newSort.map",
            method:"POST",
            cache:false,
            dataType:"json",
            contentType:"application/x-www-form-urlencoded;charset=UTF-8",
            data:{
                newSort: JSON.stringify(newSort)
            },
            success:(result)=>{
                // console.log(result);

                if(result.success){
                    Comfirm({"text":`添加分类 ${newSort.root.split(";")[1]}->${newSort.second.split(";")[1]}->${newSort.final.split(";")[1]} 成功`,"resultOK":OK});
                    // 刷新数据源
                    getData();
                }else{
                    Comfirm({"text":`添加分类 ${newSort.root.split(";")[1]}->${newSort.second.split(";")[1]}->${newSort.final.split(";")[1]} 失败，分类已存在`,"resultOK":OK});
                }
                // 清空数据源
                newSort.root="";
                newSort.second="";
                newSort.final="";
                setNewSort(newSort);
            },
            error:(err)=>{
                Comfirm({"text":`添加分类 ${newSort.root.split(";")[1]}->${newSort.second.split(";")[1]}->${newSort.final.split(";")[1]} 出错了！`,"resultOK":OK});
            }
        })
    }

    // 删除分类
    const handleDeleteNewSort=()=>{
        // 用于comfirm的调用
        const OK=()=>{
            
        }
        if(sortTreeData.length < 1){
            return;
        }
        console.log(sortTreeData);
        let obj = "";
        sortTreeData.map((item)=>{
            obj += (item.target.split("-")[1]+",");
        });

        // 发出请求
        $.ajax({
            url:"/shareArticle/article/deleteSort.map",
            method:"POST",
            cache:false,
            dataType:"json",
            contentType:"application/x-www-form-urlencoded;charset=UTF-8",
            data:{
                deleteObj: obj
            },
            success:(result)=>{
                if(result.success){
                    Comfirm({"text":`删除分类成功`,"resultOK":OK});
                    // 刷新数据源
                    getData();
                    setSortTreeData([]);
                }else{
                    Comfirm({"text":"删除分类失败","resultOK":OK});
                }
            },
            error:(err)=>{
                Comfirm({"text":"删除分类出错了","resultOK":OK});
            }
        })
    }

    // 修改分类
    const handleUpdateSort=()=>{
        // 给弹出框调用的函数
        const OK=()=>{

        }
        // 空值检查
        if(updateSort.name === ""){
            Comfirm({"text":"您还未选择需要修改的对象哦！","resultOK":OK});
            return;
        }

        // 修改后的数据
        let obj = form.getFieldsValue();
        $.ajax({
            url:"/shareArticle/article/updateSort.map",
            method:"POST",
            dataType:"json",
            cache:false,
            contentType:"application/x-www-form-urlencoded;charset=UTF-8",
            data:{
                updateId: updateSort.target,
                updateName: obj.updateObj
            },
            success:(result)=>{
                if(result.success){
                    Comfirm({"text":`修改${updateSort.name}为${obj.updateObj}成功`,"resultOK":OK});
                    // 重新加载数据
                    getData();
                    setUpdateSort({"name":"","target":""});
                    form.resetFields();
                }else{
                    Comfirm({"text":`修改${updateSort.name}为${obj.updateObj}失败`,"resultOK":OK});
                }
            },
            error:(err)=>{
                Comfirm({"text":`修改${updateSort.name}为${obj.updateObj}出错了`,"resultOK":OK});
            }
        })
    }

    // 检测是否有删除项
    useEffect(()=>{
        if(sortTreeData.length < 1){
            $("#typeDeleteTip").fadeIn(200);
        }else{
            $("#typeDeleteTip").fadeOut(200);
        }
    },[sortTreeData]);


    return (
        <div className='content-table' align='center' style={{backgroundColor:bodyTheme,color:fontTheme}}>
            <table width="100%" height="100%" align='center'>
                <tbody className="myData-content" width="100%" height="100%" align='center'>
                    <tr>
                        <td className="mydata-left-panel">
                            <div className="data-card-wrap" style={{backgroundColor:ComponentTheme}}>
                                <div style={{fontSize:"18px",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:"0 20px 0 20px"}}>
                                    <UserAddOutlined />
                                    <span>添加分类</span>
                                </div>
                                <hr />
                                <Form id='add-form' layout="vertical">
                                    {/* initialValues={{account:updateObj.acc,password:"123456",gender:updateObj.gender,authority:updateObj.authority,phone:updateObj.phone,email:updateObj.email,sign:"每个人的一生都是一次远行"}}> */}
                                    <Row gutter={16}>
                                        <Col span={6}>
                                            <Form.Item
                                                name="root"
                                                label="顶层"
                                                rules={[
                                                    {
                                                    required: false,
                                                    message: '请输入顶级分类名',
                                                    },
                                                ]}
                                                >
                                                {/* <Input placeholder="请输入顶级分类名"/> */}
                                                <AddSortTypeSelect dataSource={sortData} aspect={"I"} newSort={newSort} setNewSort={setNewSort} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name="second"
                                                label="次级"
                                                rules={[
                                                    {
                                                    required: false,
                                                    message: '请输入次级分类名',
                                                    },
                                                ]} >
                                                {/* <Input
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    placeholder="请输入次级分类名"
                                                    type='text'
                                                /> */}

                                                <AddSortTypeSelect dataSource={sortData} aspect={"II"} newSort={newSort} setNewSort={setNewSort} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name="final"
                                                label="终端"
                                                rules={[
                                                    {
                                                    required: false,
                                                    message: '请输入分类叶节点名',
                                                    },
                                                ]} >
                                                {/* <Input
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    placeholder="请输入分类叶节点名"
                                                    type='text'
                                                /> */}
                                                <AddSortTypeSelect dataSource={sortData} aspect={"III"} newSort={newSort} setNewSort={setNewSort} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name=""
                                                label=" "
                                                rules={[
                                                    {
                                                    required: false,
                                                    message: '',
                                                    },
                                                ]} >
                                                <Button type="primary" onClick={handleSubmitNewSort}>提交</Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </td>
                        <td rowSpan="3" className="mydata-right-panel">
                            <div className="data-card-wrap scroll-bar" style={{backgroundColor:ComponentTheme}}>
                                <ArticleSortTreeManage setData={setSortTreeData} dataSource={sortData} setUpdateSort={setUpdateSort}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="mydata-left-panel">
                            <div className="data-card-wrap scroll-bar" style={{backgroundColor:ComponentTheme}}>
                                <div style={{fontSize:"18px",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:"0 20px 0 20px"}}>
                                    <CreditCardOutlined />
                                    <span>修改分类</span>
                                </div>
                                <hr />
                                <Form id='add-form2' layout="vertical" form={form}>
                                    {/* initialValues={{account:updateObj.acc,password:"123456",gender:updateObj.gender,authority:updateObj.authority,phone:updateObj.phone,email:updateObj.email,sign:"每个人的一生都是一次远行"}}> */}
                                    <Row gutter={16}>
                                        <Col span={18}>
                                            <Form.Item
                                                name="updateObj"
                                                label="修改对象"
                                                rules={[
                                                    {
                                                    required: false,
                                                    message: '请输入修改对象分类名',
                                                    },
                                                ]}
                                                >
                                                <Input placeholder="请输入修改后的分类名"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name=""
                                                label=" "
                                                rules={[
                                                    {
                                                    required: false,
                                                    message: '',
                                                    },
                                                ]} >
                                                <Button type="primary" onClick={handleUpdateSort}>修改</Button>
                                            </Form.Item>
                                        </Col>
                                        <span id="typeUpdateTip1" style={{display:"block",color:"red",fontSize:"14px"}}>*现在没有修改的对象哦！(点击右侧分类的文本即可进行修改)</span>
                                        <span id="typeUpdateTip2" style={{display:"none",color:"red",fontSize:"14px"}}>*修改对象&nbsp;&nbsp;{updateSort.name}</span>
                                    </Row>
                                </Form>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="mydata-left-panel">
                            <div className="data-card-wrap scroll-bar" style={{backgroundColor:ComponentTheme}}>
                                <div style={{fontSize:"18px",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:"0 20px 0 20px"}}>
                                    <QuestionCircleOutlined />
                                    <span>删除分类</span>
                                </div>
                                <hr />
                                <Form id='add-form3' layout="vertical">
                                    {/* initialValues={{account:updateObj.acc,password:"123456",gender:updateObj.gender,authority:updateObj.authority,phone:updateObj.phone,email:updateObj.email,sign:"每个人的一生都是一次远行"}}> */}
                                    <Row gutter={16}>
                                        <Col span={18}>
                                            <Form.Item
                                                name="root"
                                                label="候选"
                                                rules={[
                                                    {
                                                    required: false,
                                                    message: '请输入顶级分类名',
                                                    },
                                                ]}
                                                >
                                                <div style={{height:"32px",border:"1px solid #d9d9d9",
                                                    borderRadius:"2px",textAlign:"left",background:"#fff",lineHeight:"32px"}}>
                                                    <StringTagList data={sortTreeData} />
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name=""
                                                label=" "
                                                rules={[
                                                    {
                                                    required: false,
                                                    message: '',
                                                    },
                                                ]} >
                                                <Button type="primary" onClick={handleDeleteNewSort}>删除</Button>
                                            </Form.Item>
                                        </Col>
                                        <span id="typeDeleteTip" style={{display:"none",color:"red",fontSize:"14px"}}>*现在没有需要删除的对象哦！(在右侧分类选择分类即可进行删除操作)</span>
                                    </Row>
                                </Form>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}



export default SortManage;