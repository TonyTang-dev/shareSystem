import React, {useState, useEffect} from 'react';



function Login(){
    const [count, setCount] = useState(0);


    // 集成了didmount和didupdate等函数
    useEffect(() => {
        document.title = `你点击了 ${count}`;
    });


    return (
        <div>
            <p>你点击了{count}次</p>
            <button onClick={() => setCount(count+1)}>
                点击
            </button>
        </div>
    );
}