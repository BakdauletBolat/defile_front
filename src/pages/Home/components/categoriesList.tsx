import { SwiperSlide, Swiper } from "swiper/react";
import SwiperClass from "swiper/types/swiper-class";
import { EffectCreative } from 'swiper';
import { useStoreContext } from '../../../hooks/useContext';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { ICategory } from "../../../store/ProductStore";
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface CategoryItemProps {
    category: ICategory;
}

function CategoryItem({ category }: CategoryItemProps) {
    return (
        <div className="category__item"
        >
            <img className="category__item-img" src={category.photo} alt="" />
            <div className="category__item-title">{category.name}</div>
            <div className="category__item-qty">38 889</div>
        </div>
    );
}

function CategoryList() {
    const { product } = useStoreContext();

    const [swiper, setSwiper] = useState<SwiperClass>();
    const navigate = useNavigate();

    return (
        <div className="category">
            <Swiper
                slidesPerView={1}
                spaceBetween={50}      
                style={{
                    padding: '20px 20px'
                }}
                onSwiper={(swiper) => setSwiper(swiper)}
                breakpoints={{
                    1500: {
                        slidesPerView: 5
                    },
                    1300: {
                        slidesPerView: 4
                    },
                    1120: {
                        slidesPerView: 3
                    },
                    720: {
                        slidesPerView: 2
                    }
                }}
            >
                {product?.categories.map(category => <SwiperSlide onClick={() => navigate(`/category/${category.id}`)} key={category.id}>
                    <CategoryItem category={category}></CategoryItem>
                </SwiperSlide>)
                }
            </Swiper>
            <div onClick={() => swiper?.slideNext()} className="slider__arrow slider__arrow-right">
                <ArrowRightOutlined style={{
                    fontSize: 24,
                    color: '#253D4E'
                }}></ArrowRightOutlined>
            </div>
            <div onClick={() => swiper?.slidePrev()} className="slider__arrow slider__arrow-left">
                <ArrowLeftOutlined style={{
                    fontSize: 24,
                    color: '#253D4E'
                }}></ArrowLeftOutlined>
            </div>
        </div>
    );
}

export default observer(CategoryList);