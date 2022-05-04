import Main from "../../layouts/main";
import { Row, Col, Button, Collapse } from 'antd';
import { useStoreContext } from "../../hooks/useContext";
import { UserOutlined, CheckOutlined } from '@ant-design/icons';
import { useEffect } from "react";
import { observer } from 'mobx-react-lite';
import ProductItem from "../../components/productItem";

const { Panel } = Collapse;


function FavoritesPage() {

    return (
        <Main>
            <div className="profile">
                <div className="container">
                    <Row justify="space-between">
                        <Col className="product__favorites" style={{
                            marginTop: 0
                        }} span={24} xs={{
                            span: 24
                        }} md={{
                            span: 24,
                        }}>
                            <Row><Button style={{
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

const ProductsFavorites = observer(() => {

    const { product } = useStoreContext();
    
    return <div className="product__row">
        {product?.productsFavorites.map(product => (
            <ProductItem key={product.id} productItem={product}></ProductItem>
        ))}
    </div>
});

export default FavoritesPage;