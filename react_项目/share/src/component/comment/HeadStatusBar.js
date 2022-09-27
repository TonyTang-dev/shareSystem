import React, {Component} from "react";



class headStatusBar extends Component{
    /* 返回 */
    handleBack(){
        window.history.back();
    }
    /* 点击账户 */
    handleAccount(){
        alert("点击账户干嘛");
    }


    render(){
        return (
            <div className="statusBar">
                <div style={{display:"flex",flexDirecttion:"row",alignItems:"center",cursor:"pointer"}}
                    onClick={this.handleBack}>
                    <img className="arrow" src={require("../../img/leftarrow.png")} alt="back" />
                    <span>返回</span>
                </div>
                <div>
                    <span style={{cursor:"pointer"}} onClick={this.handleAccount}>账户：123456</span>
                </div>
            </div>
        );
    }
}

export default headStatusBar;