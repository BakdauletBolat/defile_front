
import Row from "./row";
import Button from "./button";
import SizedBox from "./sized-box";
import {  Link } from 'react-router-dom';
import { IProduct } from "../store/ProductStore";
import { ShoppingCartOutlined,HeartOutlined,HeartFilled } from '@ant-design/icons';
import { useStoreContext } from "../hooks/useContext";
import ProductService from "../api/product";

interface ProuctItemProps {
    productItem: IProduct;
}



function ProductItem({ productItem }: ProuctItemProps) {

    const width = document.body.clientWidth;
    const {basket,product} = useStoreContext();

    const addToFavorites = async (product_id:number) => {
        const session_id = basket?.session_uuid;
        const productService = new ProductService();
        try {
            const res = await productService.addToFavorites({
                session_id: session_id,
                product_id: product_id
            })
            console.log(res.data);
            product?.getProducts();
            product?.getProductFavorites();
        }
        catch(e) {
            console.log(e);
        }
    }

    const renderProductItem = () => {
        if (width < 1200 && width > 950) {
            return <div className="product__item-title">{productItem.name.length > 105 ? productItem.name.substring(0,105)+" ..." : productItem.name}</div>
        }

        if (width < 950 && width > 650) {
            return <div className="product__item-title">{productItem.name.length > 50 ? productItem.name.substring(0,50)+" ..." : productItem.name}</div>
        }
        else if (width < 650) {
            return <div className="product__item-title">{productItem.name.length > 30 ? productItem.name.substring(0,28)+" ..." : productItem.name}</div>
        }

        return <div className="product__item-title">{productItem.name.length > 70 ? productItem.name.substring(0,70)+" ..." : productItem.name}</div>
        
    } 

    const renderLike = () => {
        let render = <HeartOutlined style={{
            color:'red',
            fontSize: 18
        }}></HeartOutlined>;
        productItem.likes.forEach(like=>{
            if (basket?.is_auth) {
                if (like.owner == basket?.user?.id) {
                    render = <HeartFilled style={{
                        color:'red',
                        fontSize: 18
                    }}></HeartFilled>
                }
            }
            else {
                if (like.session_id == basket?.session_uuid) {
                    render = <HeartFilled style={{
                        color:'red',
                        fontSize: 18
                    }}></HeartFilled>
                }
            }
            
        })
        return render;
    }

    return (
        <div style={{
            position:'relative'
        }}>
             <div onClick={()=>{
                 console.log('click');
                addToFavorites(productItem.id);
            }} className="product__like">
                {renderLike()}
            </div>
             <Link to={`/product/${productItem.id}`} className="product__item">
            <img className="product__item-img" src={productItem.images[0].photo} alt="" />
            <div className="product__content">
                <div className="product__item-pre-title">{productItem.subcategory.name}</div>
                {renderProductItem()}
                <SizedBox height={10}></SizedBox>
                <Row alignItems="center" justifyContent="space-between">
                    <Row alignItems="center" style={{
                        flexDirection:'column'
                    }}>
                        {productItem.price_stock != undefined ? (<div>
                            <div className="product__item-price-instock">₸ {productItem.price}</div>
                        <SizedBox width={10}></SizedBox>
                        <div className="product__item-price">₸ {productItem.price_stock}</div>
                        </div>) : (<div className="product__item-price-instock product__item-price-instock-without">₸ {productItem.price}</div>)}      
                    </Row>
                    <Button className="button--small" suffix={<ShoppingCartOutlined style={{
                        color:'white',
                        fontSize:12
                    }}></ShoppingCartOutlined>} isButtonMobileResponsive={true}  title={'Добавить'}></Button>
                </Row>
            </div>
        </Link>
        </div>
    );
}


export default ProductItem;