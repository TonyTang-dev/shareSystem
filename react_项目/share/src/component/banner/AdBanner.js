import { Carousel } from 'antd';
 

const AdBanner = (props) => {
    return (
        <Carousel autoplay style={{width:"25vw",height:"22.5vh",borderRadius:"10px 10px 0 0",overflow:"hidden"}} >
            <div style={{width:"25vw",height:"22.5vh"}}>
                <img style={{width:"25vw",height:"22.5vh"}} src="http://localhost:8080/shareArticle/static/ad/banner1.png" alt='banner1' />
            </div>
            <div style={{width:"25vw",height:"22.5vh"}}>
                <img style={{width:"25vw",height:"22.5vh"}} src="http://localhost:8080/shareArticle/static/ad/banner2.png" alt='banner2' />
            </div>
        </Carousel>
    );
}


export default AdBanner;