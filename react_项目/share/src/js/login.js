import { AliwangwangOutlined, BgColorsOutlined, PlusCircleOutlined, RiseOutlined } from '@ant-design/icons';
import React, {useState, useEffect} from 'react';


import {LoginPanel} from '../component/login/LoginPanel';

import '../css/login.css'



function Login(){
    // const [count, setCount] = useState(0);


    // 集成了didmount和didupdate等函数
    // useEffect(() => {
        
    // });


    return (
        <div className='login-content'>
            <div className='login-animation'>
                <div className='animation-wrap'>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div className='center-intro-wrap'>
                                        {/* <img src={require('../img/account_white.png')} alt="拓展" /> */}
                                        <PlusCircleOutlined style={{fontSize:"2vw"}}/>
                                        <span>拓展</span>
                                    </div>
                                </td>
                                <td>
                                    
                                </td>
                                <td>
                                    <div className='center-intro-wrap'>
                                        {/* <img src={require('../img/account_white.png')} alt="博学" /> */}
                                        <BgColorsOutlined style={{fontSize:"2vw"}}/>
                                        <span>博学</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    
                                </td>
                                <td>
                                    <div className='center-intro-wrap hover-extend'>
                                        <img src={require('../img/account_white.png')} alt="分享" />
                                        <span>知识分享</span>
                                    </div>
                                </td>
                                <td>
                                    
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='center-intro-wrap'>
                                        {/* <img src={require('../img/account_white.png')} alt="进步" /> */}
                                        <RiseOutlined style={{fontSize:"2vw"}}/>
                                        <span>进步</span>
                                    </div>
                                </td>
                                <td>
                                    
                                </td>
                                <td>
                                    <div className='center-intro-wrap'>
                                        {/* <img src={require('../img/account_white.png')} alt="成长" /> */}
                                        <AliwangwangOutlined style={{fontSize:"2vw"}}/>
                                        <span>成长</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <LoginPanel />
        </div>
    );
}

export {Login};