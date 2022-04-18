import React from "react";
import SearchComponent from "./components/search-input";
import FavoritesComponent from './components/favorites';
import BasketComponent from "./components/basket";
import Button from "../components/button";
import { BarsOutlined, HomeOutlined, FireOutlined, 
        PercentageOutlined, PhoneOutlined,MenuOutlined,
         } from '@ant-design/icons';
import Row from "../components/row";
import SizedBox from "../components/sized-box";
import LocationIcon from '../icons/locationIcon';


interface MainProps {
    children: React.ReactNode
}

const pages = [
    {
        title: 'Главная',
        icon: <HomeOutlined></HomeOutlined>
    },
    {
        title: 'Горячие товары',
        icon: <FireOutlined></FireOutlined>
    },
    {
        title: 'Акций',
        icon: <PercentageOutlined></PercentageOutlined>
    },
    {
        title: 'Новые продажи',
        icon: <HomeOutlined></HomeOutlined>
    },

]


function Main({ children }: MainProps) {
    return (
        <div>
            <header className="header">
            <div className="topHeader">
                <div className="container topHeader__row">
                    <div className="flex" style={{ width: '100%' }}>
                        <div className="topHeader__logo">
                            <img src={require('../static/images/logo.png')} alt="" />
                        </div>
                        <SearchComponent></SearchComponent>
                    </div>
                    <div className="flex" >
                        <FavoritesComponent></FavoritesComponent>
                        <BasketComponent></BasketComponent>
                        <Button style={{
                            marginLeft: 30,
                        }} title={'Войти'}></Button>
                    </div>
                </div>
            </div>
            <div className="bottomHeader">
                <div className="container">
                    <Row alignItems="center" justifyContent="space-between">
                        <Row alignItems="center">
                            <Button title={'Все категорий'} suffix={<BarsOutlined style={{ fontSize: 24 }} />}></Button>
                            <SizedBox width={20}></SizedBox>
                            <Row className="bottomHeader__nav-large">
                                {pages.map(page => <Row key={page.title} alignItems="center" className='bottomHeader__item'>
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
                            <div className="bottomHeader__item-phone">+7 701 036 55 50</div>
                            <SizedBox width={5}></SizedBox>
                            <div style={{color:'#253D4E'}}>24/7</div>
                        </Row>
                        <div className="menu-burger">
                        <MenuOutlined></MenuOutlined>
                        </div>
                        
                    </Row>
                </div>
            </div>
            </header>
            <SizedBox height={84.14*2}></SizedBox>
            {children}
            <footer className="footer">
                <div className="container">
                    <div className="footer__row">
                        <div>
                            <img src={require('../static/images/logo.png')} alt="" />
                            <SizedBox height={50}></SizedBox>
                            
                            <Row alignItems="center">
                                <LocationIcon/>
                                <SizedBox width={5}></SizedBox>
                                <div className="footer__item-title">Адрес</div>
                                <SizedBox width={10}></SizedBox>
                                <div className="footer__item-desc">Кунаева 36</div>
                            </Row>
                            <SizedBox height={20}></SizedBox>
                            <Row alignItems="center">
                                <LocationIcon/>
                                <SizedBox width={5}></SizedBox>
                                <div className="footer__item-title">Контакты</div>
                                <SizedBox width={10}></SizedBox>
                                <div className="footer__item-desc">+7 701 036 55 50</div>
                            </Row>
                            <SizedBox height={20}></SizedBox>
                            <Row alignItems="center">
                                <LocationIcon/>
                                <SizedBox width={5}></SizedBox>
                                <div className="footer__item-title">Почта</div>
                                <SizedBox width={10}></SizedBox>
                                <div className="footer__item-desc">groceyish@contact.com</div>
                            </Row>
                            <SizedBox height={20}></SizedBox>
                            <Row alignItems="center">
                                <LocationIcon/>
                                <SizedBox width={5}></SizedBox>
                                <div className="footer__item-title">Рабочий день</div>
                                <SizedBox width={10}></SizedBox>
                                <div className="footer__item-desc">8:00 - 20:00, Пон -  Суб</div>
                            </Row>
                        </div>
                        <div>
                            <div className="footer__title">Главная</div>
                            <SizedBox height={36}></SizedBox>
                            <Row alignItems="center">
                                <div className="footer__item-desc">О нас</div>
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
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Main;