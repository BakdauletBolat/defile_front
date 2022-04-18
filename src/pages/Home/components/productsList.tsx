import { SwiperSlide, Swiper } from "swiper/react";
import SwiperClass from "swiper/types/swiper-class";
import { useStoreContext } from '../../../hooks/useContext';
import { ArrowLeftOutlined, ArrowRightOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import { IProduct } from "../../../store/ProductStore";
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Row from "../../../components/row";
import Button from "../../../components/button";
import SizedBox from "../../../components/sized-box";
import {  Link } from 'react-router-dom';

interface ProuctItemProps {
    product: IProduct;
}

function ProductItem({ product }: ProuctItemProps) {

    const width = document.body.clientWidth;


    const renderProductItem = () => {
        if (width < 1200 && width > 950) {
            return <div className="product__item-title">{product.name.length > 105 ? product.name.substring(0,105)+" ..." : product.name}</div>
        }

        if (width < 950 && width > 650) {
            return <div className="product__item-title">{product.name.length > 50 ? product.name.substring(0,50)+" ..." : product.name}</div>
        }
        else if (width < 650) {
            return <div className="product__item-title">{product.name.length > 30 ? product.name.substring(0,28)+" ..." : product.name}</div>
        }

        return <div className="product__item-title">{product.name.length > 70 ? product.name.substring(0,70)+" ..." : product.name}</div>
        
    } 

    console.log();
    return (
        <Link to={`product/${product.id}`} className="product__item"
        >
            <img className="product__item-img" src={product.images[0].photo} alt="" />
            <div className="product__content">
                <div className="product__item-pre-title">{product.subcategory.name}</div>
                {renderProductItem()}
                <SizedBox height={10}></SizedBox>
                <Row alignItems="center" justifyContent="space-between">
                    <Row alignItems="center" style={{
                        flexDirection:'column'
                    }}>
                        <div className="product__item-price-instock">₸ 43 000</div>
                        <SizedBox width={10}></SizedBox>
                        <div className="product__item-price">₸ 56 000</div>
                    </Row>
                    <Button className="button--small" suffix={<ShoppingCartOutlined style={{
                        color:'white',
                        fontSize:12
                    }}></ShoppingCartOutlined>} isButtonMobileResponsive={true}  title={'Добавить'}></Button>
                </Row>
            </div>
        </Link>
    );
}

function ProductList() {
    const { product } = useStoreContext();

    const [swiper, setSwiper] = useState<SwiperClass>();

    return (
        <div className="category">
            <Swiper

                slidesPerView={2}
                spaceBetween={5}
                onSwiper={(swiper) => setSwiper(swiper)}
                breakpoints={{
                    1500: {
                        slidesPerView: 3
                    },
                    1300: {
                        slidesPerView: 3
                    },
                    1120: {
                        slidesPerView: 2
                    },
                    750: {
                        slidesPerView: 2
                    }
                }}
            >
                {product?.products.map(product => <SwiperSlide key={product.id}>
                    <ProductItem product={product}></ProductItem>
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

export default observer(ProductList);