import { MenuOutlined } from '@ant-design/icons';
import useMobileMenu from '../../hooks/useMobileMenu';



function MenuBurger() {

    const {MobileMenu,closeModal,toggle} = useMobileMenu();
    return (
        <>
        <MobileMenu></MobileMenu>
         <div className="menu-burger" onClick={toggle}>
            <MenuOutlined style={{ fontSize: '30px', color: '#253D4E' }}></MenuOutlined>
        </div>
        </>

       
    );
}

export default MenuBurger;