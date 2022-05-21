import Main from '../../layouts/main';
import { useEffect } from 'react';
import SizedBox from '../../components/sized-box';
import Categories from './components/categories';
import {useStoreContext} from '../../hooks/useContext';
import Products from './components/products';
import SwiperSliders from './components/swiper-slides';


function Home() {

    const {product} = useStoreContext();

    useEffect(()=>{
        product?.getProducts();
    },[]);

    return (
        <Main>
            <SwiperSliders></SwiperSliders>
            <SizedBox height={63}></SizedBox>
            <Categories></Categories>
            <SizedBox height={63}></SizedBox>
            <Products></Products>
            <SizedBox height={63}></SizedBox>
            </Main>
    )
}

export default Home;