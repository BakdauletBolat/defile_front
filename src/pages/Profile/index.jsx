import Main from "../../layouts/main";
import { Row, Col, Button, Collapse } from 'antd';
import { useStoreContext } from "../../hooks/useContext";
import { UserOutlined, CheckOutlined } from '@ant-design/icons';
import { useEffect } from "react";
import { observer } from 'mobx-react-lite';
import SizedBox from "../../components/sized-box";
import ProductItem from "../../components/productItem";
import useAlertDialog from "./modal";

const { Panel } = Collapse;

function ProfilePage() {

    const { basket } = useStoreContext();

    const { AlertDialog, showModal } = useAlertDialog();
    const signOut = () => {
        showModal();
    }

    useEffect(()=>{
        basket.getOrders();
    },[])

    return (
        <Main>
            <div className="profile">
                <AlertDialog></AlertDialog>
                <div className="container">
                    <div className="profile__name"><UserOutlined></UserOutlined> {basket?.user?.fullname}</div>
                    <div className="profile__email">{basket?.user?.email}</div>
                    <div className="profile__email"><CheckOutlined /> {basket?.orders.length} - заказов</div>
                    <div onClick={signOut} className="profile__exit">Выйти</div>
                    <Row justify="space-between">
                        <Col span={11} xs={{
                            span: 24
                        }} md={{
                            span: 11
                        }}>
                            <Row>
                                <Button style={{
                                    marginBottom: 20
                                }}>Мой заказы</Button>
                            </Row>
                            <OrdersCollapse></OrdersCollapse>
                        </Col>
                        <Col className="product__favorites" span={11} xs={{
                            span: 24
                        }} md={{
                            span: 11,
                        }}>
                            <Row> <Button style={{
                                marginBottom: 20
                            }}>Избранные</Button></Row>
                            <ProductsFavorites></ProductsFavorites>
                        </Col>
                    </Row>
                </div>
            </div>

        </Main>

    );
}

const OrdersCollapse = () => {
    const { basket } = useStoreContext();

    const renderOrderPrice = (orderitems) => {
        let price = 0;
        orderitems?.forEach(order => {
            if (order.product.is_stock) {
                price += order.product.price_stock * order.qty;
            }
            else {
                price += order.product.price * order.qty;
            }
        });

        return price;
    }

    return <Collapse bordered={false} onChange={() => console.log('yes')}>
        {basket.orders.map(order => (
            <Panel header={`Заказ #${order.id} Cтатус: ${order.status}`} key={order.id}>
                <div>
                    {order.orderitems.map(order => (
                        <Row key={order.id} justify="space-between">
                            <div style={{

                                fontWeight: 500
                            }}>{order.product.name} ({order.qty}x)</div>
                            {order.product.is_stock ? (
                                <div>₸ {order.product.price_stock * order.qty}</div>
                            ) : <div>₸ {order.product.price * order.qty}</div>}
                        </Row>
                    ))}
                </div>
                <SizedBox height={10}></SizedBox>
                <div style={{
                    fontSize: 16,
                    fontWeight: 700
                }}>
                    Общая цена  ₸{renderOrderPrice(order.orderitems)}
                </div>
            </Panel>
        ))}
    </Collapse>
}

const ProductsFavorites = observer(() => {
    const { product } = useStoreContext();
    return <div className="product__row">
        {product?.productsFavorites.map(product => (
            <ProductItem key={product.id} productItem={product}></ProductItem>
        ))}
    </div>
});

export default observer(ProfilePage);