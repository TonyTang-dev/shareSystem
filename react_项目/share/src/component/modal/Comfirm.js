import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal} from 'antd';
import React, { useState } from 'react';


const Comfirm = (props) => {
    const {text,resultOK} = props;

    const OK=()=>{
        resultOK();
    }

    Modal.confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: text,
        okText: '确认',
        cancelText: '取消',
        onOk:OK,
    });
};

export default Comfirm;