import { Swiper, SwiperSlide, } from 'swiper/react';
import {  Pagination,EffectCreative } from 'swiper';
import Grid from '../../../components/grid';
import { useState } from 'react';
import { useStoreContext } from '../../../hooks/useContext';
import SwiperClass from 'swiper/types/swiper-class';
import 'swiper/css';
import 'swiper/css/pagination';
import {observer} from 'mobx-react-lite';

function SwiperSliders() {
    const [swiper,setSwiper] = useState<SwiperClass>();

    const {product,application} = useStoreContext();
    return ( 
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
                {application?.slides.map(slide=>(
                    <SwiperSlide key={slide.id}>
                    <div className='slider_backgound-img'  style={{height:'100%',backgroundImage: `url(${slide.photo})`}}>
                    <div className='container' style={{height:'100%',display:'flex'}}>
                    <Grid className='grid-template-2fr' alignItems='center'>
                            <div className='slider__content'>
                                 <h1 className='home__title'>{slide.title}</h1>  
                                 <p className='home__description'>{slide.description}</p>
                                 {/* <Row alignItems='center' className='home__input-container'>
                                        <input className='form-input form-input-with-button' type="text" />
                                        <button className='button button-with-input'type='submit'>Подписаться</button>
                                 </Row> */}
                            </div>
                        </Grid>
                    </div>
                    </div> 
                </SwiperSlide>
                ))}
            </Swiper>
     );
}

export default observer(SwiperSliders);