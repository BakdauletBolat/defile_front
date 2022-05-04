import Main from '../../layouts/main';
import { Swiper, SwiperSlide, } from 'swiper/react';
import {  Pagination,EffectCreative } from 'swiper';
import SwiperClass from 'swiper/types/swiper-class';
import 'swiper/css';
import 'swiper/css/pagination';
import Row from '../../components/row';
import Grid from '../../components/grid';
import { useEffect, useState } from 'react';
import SizedBox from '../../components/sized-box';
import Categories from './components/categories';
import {useStoreContext} from '../../hooks/useContext';
import Products from './components/products';


function Home() {

    const [swiper,setSwiper] = useState<SwiperClass>();

    const {product} = useStoreContext();

    const background = require('../../static/images/rack-clothes-store.jpg');

    useEffect(()=>{
        product?.getProducts();
    },[]);

    return (
        <Main>
            <Swiper
            modules={[Pagination,EffectCreative]}
                slidesPerView={1}
                className='home__slider'
                effect={"creative"}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: [0, 0, -400],
                    },
                    next: {
                        translate: ["100%", 0, 0],
                    },
                }}
                pagination={{ clickable: true }}
                grabCursor={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiperEl) => setSwiper(swiperEl)}
                
            >
                <SwiperSlide >
                    <div className='slider_backgound-img'  style={{height:'100%',backgroundImage: `url(${background})`}}>
                    <div className='container' style={{height:'100%',display:'flex'}}>
                    <Grid className='grid-template-2fr' alignItems='center'>
                            <div className='slider__content'>
                                 <h1 className='home__title'>Одевайтесь в лучшее вместе с «Дефиле»!</h1>  
                                 <p className='home__description'>Миссия нашей компании – одеть граждан Казахстана в лучшую одежду:</p>
                                 <Row alignItems='center' className='home__input-container'>
                                        <input className='form-input form-input-with-button' type="text" />
                                        <button className='button button-with-input'type='submit'>Подписаться</button>
                                 </Row>
                            </div>
                        </Grid>
                    </div>
                    </div> 
                </SwiperSlide>
                <SwiperSlide >
                    <div className='slider_backgound-img'  style={{height:'100%',backgroundImage: `url(${background})`}}>
                    <div className='container' style={{height:'100%',display:'flex'}}>
                    <Grid className='grid-template-2fr' alignItems='center'>
                            <div className='slider__content'>
                                 <h1 className='home__title'>Одевайтесь в лучшее вместе с «Дефиле» 2!</h1>  
                                 <p className='home__description'>Миссия нашей компании – одеть граждан Казахстана в лучшую одежду:</p>
                                 {/* <Row alignItems='center' className='home__input-container'>
                                        <input className='form-input form-input-with-button' type="text" />
                                        <button className='button button-with-input'type='submit'>Подписаться</button>
                                 </Row> */}
                            </div>
                        </Grid>
                    </div>
                    </div> 
                </SwiperSlide>
            </Swiper>
            <SizedBox height={63}></SizedBox>
            <Categories></Categories>
            <SizedBox height={63}></SizedBox>
            <Products></Products>
            <SizedBox height={63}></SizedBox>
            </Main>
    )
}

export default Home;