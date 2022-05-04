import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button";
import { useStoreContext } from "../../hooks/useContext";
import {ShoppingCartOutlined } from '@ant-design/icons';
import SizedBox from "../../components/sized-box";
import { useLocalStoreContext } from "../../hooks/useLocalContext";

interface AddToBasketProps {
    qty: number
}


function AddToBasket({qty}:AddToBasketProps) {

    const { basket } = useStoreContext();
    const {notification,destroy} = useLocalStoreContext();
    const { productId } = useParams();
    const navigate = useNavigate();

    const navigateToBasket = () => {
        navigate('/basket');
        destroy!();
    }

    const btn = (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginTop: 20,
        }}>
            <Button fullsize outlined onClick={()=>destroy!()} title={'Остаться'}></Button>
            <SizedBox width={20}></SizedBox>
            <Button suffix={<ShoppingCartOutlined></ShoppingCartOutlined>} fullsize title={'В корзину'} onClick={navigateToBasket}></Button>
        </div>

    );

    const openNotification = () => {
        notification?.success({
            message: `Заказ успешно добавлен`,
            btn,
            duration: 5
        });
    };



    const handleSubmit = async () => {
        let result = await basket?.addProductToBasket({
            product_id: parseInt(productId!),
            qty: qty,
            session_id: basket.session_uuid
        });
        if (result.statusCode === 200 || result.statusCode == 201) {
            openNotification();
        }
    }


    return ( 
        <Button title={'Заказать'} suffix={<ShoppingCartOutlined />} onClick={handleSubmit}></Button>
     );
}

export default AddToBasket;