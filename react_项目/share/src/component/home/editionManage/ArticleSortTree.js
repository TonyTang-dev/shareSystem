import { Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import $ from "jquery";


const ArticleSortTree = (props) => {
    // 分类前端显示数据源
    const {setData} = props;

    // 分类数据源
    let [dataSource, setDataSource] = useState([]);

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck = (checkedKeys, info) => {
        // console.log('onCheck', checkedKeys,info);

        // 设置前端显示数据源
        let tempData = [];
        info.checkedNodes.map((item)=>{
            let obj = {"name":item.title,"target":(item.key)};
            tempData.push(obj);
        });
        setData(tempData);
    };


    // 请求分类数据源
    const getData=()=>{
        let tempSource = [];

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
                    result.data.map((item)=>{
                        let rootObj={
                                title: '',
                                key: '',
                                checkable:false,
                                children: [],
                            };
                        let typeNameObj = JSON.parse(item.typeName);
                        // 如果子分类为空，则可选
                        if(item.linkSecondType.length === 0){
                            rootObj.checkable = true;
                        }
                        rootObj.title = typeNameObj[(Object.keys(typeNameObj))[0]];
                        rootObj.key = (Object.keys(typeNameObj))[0]+"-I~"+item.id;
                        
                        let tempSecond = [];
                        item.linkSecondType.map((secondItem)=>{
                            let secondObj={
                                    title: '',
                                    key: '',
                                    checkable:false,
                                    children: [],
                                };
                            let typeSecondNameObj = JSON.parse(secondItem.typeName);
                            // 如果子分类为空，则可选
                            if(secondItem.linkFinalType.length === 0){
                                secondObj.checkable = true;
                            }
                            secondObj.title = typeSecondNameObj[(Object.keys(typeSecondNameObj))[0]];
                            secondObj.key = (Object.keys(typeSecondNameObj))[0]+"-II~"+secondItem.id;

                            let tempFinal = [];
                            secondItem.linkFinalType.map((finalItem)=>{
                                let finalObj={
                                        title: '',
                                        key: '',
                                    };
                                let typeFinalNameObj = JSON.parse(finalItem.typeName);
                                finalObj.title = typeFinalNameObj[(Object.keys(typeFinalNameObj))[0]];
                                finalObj.key = (Object.keys(typeFinalNameObj))[0]+"-III~"+finalItem.id;

                                tempFinal.push(finalObj);
                            });
                            secondObj.children = tempFinal;
                            tempSecond.push(secondObj);
                        });
                        rootObj.children = tempSecond;

                        // 添加进数据源
                        tempSource.push(rootObj);
                    });

                    // 设置数据源
                    setDataSource(tempSource);
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


    return (
        <div style={{border:"1px solid grey",borderRadius:"5px"}}>
            <Tree
                checkable
                // defaultExpandedKeys={['education-I']}
                // defaultSelectedKeys={['material']}
                // defaultCheckedKeys={['experience']}
                // onSelect={onSelect}
                onCheck={onCheck}
                treeData={dataSource}
            />
        </div>
    );
};

export default ArticleSortTree;