import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
const { Option } = Select;

// 为新增的条目添加Key
let index = 0;

const AddSortTypeSelect = (props) => {
    // 数据源
    const {dataSource, aspect, newSort, setNewSort} = props;

    // 设置选择数据源
    const [items, setItems] = useState([]);

    useEffect(()=>{
        let tempObj = [];
        if(aspect === "I"){
            dataSource.map((obj)=>{
                let temp = {"id":"","aspect":aspect,"name":""};
                temp.id = obj.id;
                temp.name = JSON.parse(obj.typeName)[Object.keys(JSON.parse(obj.typeName))[0]];
                tempObj.push(temp);
            });
        }else if(aspect === "II"){
            dataSource.map((rootObj)=>{
                rootObj.linkSecondType.map((obj)=>{
                    let temp = {"id":"","aspect":aspect,"name":""};
                    temp.id = obj.id;
                    temp.name = JSON.parse(obj.typeName)[Object.keys(JSON.parse(obj.typeName))[0]];
                    tempObj.push(temp);
                });
            });
        }else if(aspect === "III"){
            dataSource.map((rootObj)=>{
                rootObj.linkSecondType.map((secondObj)=>{
                    secondObj.linkFinalType.map((obj)=>{
                        let temp = {"id":"","aspect":aspect,"name":""};
                        temp.id = obj.id;
                        temp.name = JSON.parse(obj.typeName)[Object.keys(JSON.parse(obj.typeName))[0]];
                        tempObj.push(temp);
                    })
                });
            });
        }
        setItems(tempObj);
    },[dataSource]);

    const [name, setName] = useState('');
    const inputRef = useRef(null);

    const onNameChange = (event) => {
        setName(event.target.value);
        // console.log(name);
    };

    const addItem = (e) => {
        e.preventDefault();
        if(name === ""){
            alert("请先输入分类名再添加哦！");
            return;
        }
        let temp = {"id":String(index-1),"aspect":aspect,"name":name};
        index = index-1;
        setItems([...items, temp]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    // 选择分类
    const selectObj=(obj,option)=>{
        // console.log(option);
        // 设置新数据源
        if(aspect === "I"){
            newSort.root = obj+";"+option.children;
        }else if(aspect === "II"){
            if(newSort.root === ""){
                alert("请先填写父级分类哦！");
                return;
            }
            newSort.second = obj+";"+option.children;
        }else if(aspect === "III"){
            if(newSort.root === "" || newSort.second===""){
                alert("请先填写父级分类哦！");
                return;
            }
            newSort.final = obj+";"+option.children;
        }

        setNewSort(newSort);
    }

    // 清除记录
    const clearItem=()=>{
        switch(aspect){
            case "I":
                newSort.root = "";
                break;
            case "II":
                newSort.second = "";
                break;
            case "III":
                newSort.final = "";
                break;
        }
        setNewSort(newSort);
    }

    return (
        <Select
            allowClear
            placeholder="请选择/添加分类"
            onSelect={selectObj}
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider
                        style={{
                        margin: '8px 0',
                        }}
                        />
                    <Space
                        style={{
                        padding: '0 8px 4px',
                        }}
                        >
                        <Input
                        placeholder="添加"
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                        />
                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                        添加
                        </Button>
                    </Space>
                </>
            )}
            >
            {items.map((item) => (
                <Option key={item.aspect+"~"+item.id}>{item.name}</Option>
            ))}
        </Select>
    );
};

export default AddSortTypeSelect;