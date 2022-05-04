import React, { useEffect } from "react";
import SearchComponent from "./components/search-input";
import FavoritesComponent from './components/favorites';
import BasketComponent from "./components/basket";
import Button from "../components/button";
import {
    BarsOutlined, HomeOutlined, FireOutlined,
    PercentageOutlined, PhoneOutlined,
    StarOutlined,MessageOutlined,CalendarOutlined,
    InstagramOutlined,TwitterOutlined,FacebookOutlined,
    YoutubeOutlined
} from '@ant-design/icons';
import Row from "../components/row";
import SizedBox from "../components/sized-box";
import LocationIcon from '../icons/locationIcon';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStoreContext } from "../hooks/useContext";
import { observer } from 'mobx-react-lite';
import useMenuModal from "../hooks/useMenuModal";
import ProfileLink from "./components/profileLink";
import { Divider } from "antd";
import MenuBurger from "./components/menuBurger";


interface MainProps {
    children: React.ReactNode
}

const pages = [
    {
        title: 'Главная',
        url: '/',
        icon: <HomeOutlined></HomeOutlined>
    },
    {
        title: 'Горячие товары',
        url: '/is_hot',
        icon: <FireOutlined></FireOutlined>
    },
    {
        title: 'Акций',
        url: '/is_stock',
        icon: <PercentageOutlined></PercentageOutlined>
    },
    {
        title: 'Новые продажи',
        url: '/is_new',
        icon: <StarOutlined />
    },

]


function Main({ children }: MainProps) {
    const { basket, product } = useStoreContext();

    const { toggle, MenuModal } = useMenuModal();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        product?.getCategories();
        product?.getProductFavorites();
    });

    console.log('s')

    return (
        <div>
            <header className="header">
                <div className="topHeader">
                    <div className="container topHeader__row">
                        <div className="flex" style={{ width: '100%' }}>
                            <Link to="/" className="topHeader__logo">
                                <img src={require('../static/images/logo.png')} alt="" />
                            </Link>
                            <SearchComponent></SearchComponent>
                        </div>
                        <div className="flex" >
                            <FavoritesComponent></FavoritesComponent>
                            <BasketComponent></BasketComponent>
                            {basket?.is_auth ? (
                                <ProfileLink></ProfileLink>
                            ) : <Button style={{
                                marginLeft: 30,
                            }} title={'Войти'}></Button>}
                            <MenuBurger></MenuBurger>
                        </div>
                    </div>
                </div>
                <div className="bottomHeader">
                    <div className="container">
                        <Row alignItems="center" justifyContent="space-between">
                            <Row alignItems="center">
                                <Button onClick={toggle} title={'Все категорий'} suffix={<BarsOutlined style={{ fontSize: 24 }} />}></Button>
                                <SizedBox width={20}></SizedBox>
                                <Row className="bottomHeader__nav-large">
                                    {pages.map(page => <Row onClick={()=>{
                                        navigate(page.url);
                                        
                                    }} key={page.title} alignItems="center" className={location.pathname == page.url ? 'bottomHeader__item bottomHeader__item--active' :'bottomHeader__item'}>
                                        <div className="bottomHeader__item-icon">
                                            {page.icon}
                                        </div>
                                        <SizedBox width={5}></SizedBox>
                                        <div className="bottomHeader__item-title">
                                            {page.title}
                                        </div>
                                    </Row>)}
                                </Row>
                            </Row>
                            <Row alignItems="center" className="bottomHeader__call">
                                <PhoneOutlined className="bottomHeader__item-phone"></PhoneOutlined>
                                <SizedBox width={5}></SizedBox>
                                <a href="tel://+7 701 036 55 50" className="bottomHeader__item-phone">+7 701 036 55 50</a>
                                <SizedBox width={5}></SizedBox>
                                <div style={{ color: '#253D4E' }}>24/7</div>
                            </Row>
                        </Row>
                    </div>
                    <MenuModal></MenuModal>
                </div>
            </header>
            <div className="header__sized-box"></div>
            {children}
            <footer className="footer">
                <div className="container">
                    <div className="footer__row">
                    <div>
                            <div className="footer__title">Главная</div>
                            <SizedBox height={36}></SizedBox>
                            <Row alignItems="center">
                                <Link to='/about' className="footer__item-desc">О нас</Link>
                            </Row>
                            <SizedBox height={20}></SizedBox>
                            <Row alignItems="center">
                                <div className="footer__item-desc">Горячие товары</div>
                            </Row>
                            <SizedBox height={20}></SizedBox>
                            <Row alignItems="center">
                                <div className="footer__item-desc">Акций</div>
                            </Row>
                            <SizedBox height={20}></SizedBox>
                            <Row alignItems="center">
                                <div className="footer__item-desc">Новые продкты</div>
                            </Row>
                        </div>
                        <div>
                            <img src={require('../static/images/logo.png')} alt="" />
                            <SizedBox height={50}></SizedBox>
                            <Row alignItems="center">
                                <PhoneOutlined style={{
                                    color:'#FF0303',
                                    fontSize:18
                                }} />
               
                                <SizedBox width={10}></SizedBox>
                                <div className="footer__item-desc">+7 701 036 55 50</div>
                            </Row>
                            <SizedBox height={20}></SizedBox>
                            <Row alignItems="center">
                                <MessageOutlined style={{
                                    color:'#FF0303',
                                    fontSize:18
                                }}  />
            
                                <SizedBox width={10}></SizedBox>
                                <div className="footer__item-desc">groceyish@contact.com</div>
                            </Row>
                            <SizedBox height={20}></SizedBox>
                            <Row alignItems="center">
                                <CalendarOutlined  style={{
                                    color:'#FF0303',
                                    fontSize:18
                                }} />
                          
                                <SizedBox width={10}></SizedBox>
                                <div className="footer__item-desc">8:00 - 20:00, Пон -  Суб</div>
                            </Row>
                        </div>
                        <div>
                        <div className="footer__title">Адрес</div>
                        <SizedBox height={36}></SizedBox>
                            <Row alignItems="center">
                                <LocationIcon />
                                <SizedBox width={10}></SizedBox>
                                <div className="footer__item-desc">Пр. Кунаева 36</div>
                            </Row>
                            <SizedBox height={20}></SizedBox>
                            <Row alignItems="center">
                                <LocationIcon />
                                <SizedBox width={10}></SizedBox>
                                <div className="footer__item-desc">Г. Иляева 4</div>
                            </Row>
                            <SizedBox height={20}></SizedBox>
                            <Row alignItems="center">
                                <LocationIcon />
                                <SizedBox width={10}></SizedBox>
                                <div className="footer__item-desc">ЦУМ 240 бутик </div>
                            </Row>
                            <SizedBox height={20}></SizedBox>
                            <Row alignItems="center">
                                <LocationIcon />
                                <SizedBox width={10}></SizedBox>
                                <div className="footer__item-desc">Пр. Республики 2</div>
                            </Row>
                        </div>
                        
                    </div>
                    <Divider></Divider>
                    <div className="footer__bottom">
                        <div className="footer__copyright">© 2022, Все права защищены</div>
                        <div>
                            <InstagramOutlined className="footer__icon" />
                            <FacebookOutlined className="footer__icon" />
                            <YoutubeOutlined className="footer__icon" />
                            <TwitterOutlined className="footer__icon" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default observer(Main);