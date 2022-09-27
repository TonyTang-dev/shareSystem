import React from "react";


const Forbid=()=>{

    return(
        <>
            <div style={{width:"100%",height:"100%",display:"flex",
                        flexDirection:"column",alignItems:"center",
                        justifyContent:"center",backgroundColor:"#0f0"
                        ,textShadow:"5px 0px 5px white"}}>
                <span style={{fontSize:"128px",color:"white",fontWeight:"bold"}}>404</span>
                <br />
                <span style={{fontSize:"24px",color:"white",fontWeight:"bold"}}>网页走丢咯~</span>
            </div>
        </>
    );
}

export default Forbid;