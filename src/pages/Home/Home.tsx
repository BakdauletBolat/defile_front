import Main from '../../layouts/main';

import { Swiper, SwiperSlide, } from 'swiper/react';
import {  Pagination } from 'swiper';

import SwiperClass from 'swiper/types/swiper-class';

// Import Swiper styles
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

    useEffect(()=>{
        product?.getCategories();
        product?.getProducts();
    },[]);

    return (
        <Main>
            <Swiper
            modules={[Pagination]}
                slidesPerView={1}
                style={{
                    height:513
                }}

                pagination={{ clickable: true }}
                grabCursor={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiperEl) => setSwiper(swiperEl)}
            >
                <SwiperSlide >
                    <div className='slider_backgound' style={{height:'100%'}}>
                    <div className='container' style={{height:'100%',display:'flex'}}>
                        <Grid className='grid-template-2fr' alignItems='center'>
                            <div>
                                 <h1 className='home__title'>Одевайтесь в лучшее вместе с «Дефиле»!</h1>  
                                 <p className='home__description'>Миссия нашей компании – одеть граждан Казахстана в лучшую одежду:</p>
                                 <Row alignItems='center' className='home__input-container'>
                                        <input className='form-input form-input-with-button' type="text" />
                                        <button className='button button-with-input'type='submit'>Подписаться</button>
                                 </Row>
                            </div>
                            <div className='home__img'>
                                <img src={require('../../static/images/girl.png')} alt="" />
                            </div>
                        </Grid>
                    </div>
                    </div>
                    
                </SwiperSlide>
                <SwiperSlide >
                    <div className='slider_backgound' style={{height:'100%'}}>
                    <div className='container' style={{height:'100%',display:'flex'}}>
                        <Grid className='grid-template-2fr' alignItems='center'>
                            <div>
                                 <h1 className='home__title'>Одевайтесь в лучшее sd с «Дефиле»!</h1>  
                                 <p className='home__description'>Миссия нашей компании – одеть граждан Казахстана в лучшую одежду:</p>
                                 <Row alignItems='center' className='home__input-container'>
                                        <input className='form-input form-input-with-button' type="text" />
                                        <button className='button button-with-input'type='submit'>Подписаться</button>
                                 </Row>
                            </div>
                            <div className='home__img'>
                                <img src={require('../../static/images/girl.png')} alt="" />
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