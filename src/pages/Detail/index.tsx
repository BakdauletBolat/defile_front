import Main from "../../layouts/main";

import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { IProduct } from '../../store/ProductStore';
import ProductService from "../../api/product";
import { Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SizedBox from "../../components/sized-box";
import { ArrowLeftOutlined, ArrowRightOutlined, HomeOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStoreContext } from "../../hooks/useContext";
import AddToBasket from "./add-to-basket";
import BottomFixedAddToBasket from "./bottom-fixed";

import LoadingScreen from "../../components/loadingScreen";


function DetailProductPage() {

    let { productId } = useParams();
    const { basket } = useStoreContext();
    const [product, setProduct] = useState<IProduct>();
    const [qty, setQty] = useState<number>(1);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [parentSwiper, setParentSwiper] = useState<any>(null);
    const [activeSlider, setActiveSlider] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getProduct = async () => {
        setIsLoading(true);
        const service = new ProductService();
        const product: IProduct = (await service.getProductById(parseInt(productId!))).data;
        setProduct(product);
        setIsLoading(false);

    }

    const incrementQty = () => {
        setQty(qty + 1);
    }

    const decrementQty = () => {
        setQty(qty - 1);
    }

    useEffect(() => {
        getProduct();
    }, [productId]);

    if (isLoading) {
        return <LoadingScreen></LoadingScreen>
    }

    const renderDetailImages = () => {

        if (product?.images == undefined) {
            console.log('error');
            return <div>Nodata</div>
        }
        return <div className="detail-images">
            <Swiper
                className="detail-images__swiper"
                slidesPerView={1}
                modules={[Thumbs]}
                grabCursor={true}
                onSwiper={setParentSwiper}
                onSlideChange={(swiper) => { setActiveSlider(swiper.activeIndex) }}
                thumbs={{ swiper: thumbsSwiper }}>
                {product?.images.map(image => (
                    <SwiperSlide key={image.id}>
                        <div className="detail-image__big" >
                            <Image preview={{
                                mask: 'Подробнее'
                            }} width={'100%'} height={'100%'} src={image.photo} />
                        </div>
                    </SwiperSlide>
                ))}
                <div onClick={() => parentSwiper?.slideNext()} className="slider__arrow inbox slider__arrow-right">
                    <ArrowRightOutlined style={{
                        fontSize: 24,
                        color: '#253D4E'
                    }}></ArrowRightOutlined>
                </div>
                <div onClick={() => parentSwiper?.slidePrev()} className="slider__arrow inbox slider__arrow-left">
                    <ArrowLeftOutlined style={{
                        fontSize: 24,
                        color: '#253D4E'
                    }}></ArrowLeftOutlined>
                </div>
            </Swiper>
            <SizedBox height={20}></SizedBox>
            <Swiper
                style={{
                    height: 77
                }}
                slidesPerView={5}
                spaceBetween={20}
                modules={[Thumbs]}
                watchSlidesProgress
                onSwiper={setThumbsSwiper}
                allowTouchMove={false}
            >
                {product?.images.map((image, index) => (
                    <SwiperSlide onClick={() => { parentSwiper.slideTo(index) }} key={image.id}>
                        <div className={activeSlider !== index ? 'detail-image__small' : 'detail-image__small detail-image__small--active'}>
                            <img src={image.photo} alt="" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    }

    return (
        <Main>
            <div className="detail-top">
                <div className="container">
                    <div className="breadcrumb">
                        <div className="breadcrumb__item">
                            <Link to="/"><HomeOutlined></HomeOutlined></Link>
                            <div className="breadcrumb__divider">/</div>
                        </div>
                        <div className="breadcrumb__item">
                            <Link to="/">{product?.category.name}</Link>
                            <div className="breadcrumb__divider">/</div>
                        </div>
                        <div className="breadcrumb__item">
                            <Link to={`/subcategory/${product?.subcategory.id}`}>{product?.subcategory.name}</Link>
                            <div className="breadcrumb__divider">/</div>
                        </div>
                        <div className="breadcrumb__item">
                            <Link to={`/brand/${product?.brand.id}`}>{product?.brand.name}</Link>
                            <div className="breadcrumb__divider">/</div>
                        </div>
                        <div className="breadcrumb__item breadcrumb__item--last">
                            <Link to="/">{product?.name}</Link>
                        </div>
                    </div>
                </div>
                <div className="detail-top__row container ">
                    {renderDetailImages()}
                    <div className="detail-desc">
                        <div className="detail-product__name">{product?.name}</div>
                        <div className="detail-product__brand">{product?.brand.name}</div>
                        <div className="detail-product__about">О товаре</div>
                        <div className="detail-product__desc">{product?.description}</div>
                        <div className="detail-product__pricecontainer">
                            {product?.is_stock ? <div className="detail-product__prices">
                                <div className="detail-product__price">₸ {product?.price}</div>
                                <div className="detail-product__pricestock">₸ {product?.price_stock}</div>
                            </div> : <div className="detail-product__prices">
                                <div className="detail-product__pricestock">₸ {product?.price}</div>
                            </div>}
                        </div>
                        <div className="detail-product__footer">
                            <div className="qtycontainer">
                                <div className="qtycontainer__title">Количество</div>
                                <div className="qty">
                                    <div onClick={incrementQty} className="qtyplus qty__item">
                                        +
                                    </div>
                                    <input value={qty} readOnly className="qty__input"></input>
                                    <div onClick={decrementQty} className="qtyminus qty__item">
                                        -
                                    </div>
                                </div>
                            </div>
                            <AddToBasket qty={qty}></AddToBasket>
                        </div>
                    </div>
                </div>
            </div>
            <BottomFixedAddToBasket qty={qty}></BottomFixedAddToBasket>
        </Main>
    );
}

export default observer(DetailProductPage);