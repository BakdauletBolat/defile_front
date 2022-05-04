import { observer } from "mobx-react-lite";
import Button from "../../components/button";
import SizedBox from "../../components/sized-box";
import { useStoreContext } from "../../hooks/useContext";
import Main from "../../layouts/main";
import { IOrderItem } from "../../store/BasketStore";
import { ShoppingOutlined } from '@ant-design/icons';
import { Drawer, Row } from 'antd';
import { useState } from "react";
import RegisterForm from "./registerForm";
import { useLocalStoreContext } from "../../hooks/useLocalContext";
import useModal from '../../hooks/useModal';
import BasketService from "../../api/basket";


function BasketPage() {
  const { basket } = useStoreContext();
  const { userService } = useLocalStoreContext();

  const { openModal, closeModal, Modal } = useModal();

  const [visible, setVisible] = useState<boolean>(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const updateTypeQueryNode = async (type:string,order_id:number) => {
      const basketService = new BasketService();
      try {
        await basketService.updateOrderQty({
          type: type,
          order_id: order_id
        });

        basket?.getOrder();
        
      }

      catch (e) {
        console.log(e);
      }
  }


  const handleSubmit = async () => {
    if (basket?.is_auth) {
      basket.setIsLoadingCreateOrder(true);
      try {
        const res = await userService?.createOrderToAuthorizedUser();
        basket.setIsLoadingCreateOrder(false);
        openModal();
        basket.getOrder();
      }
      catch (e) {
        console.log(e);
        basket.setIsLoadingCreateOrder(false);
      }
    }
    else {
      showDrawer();
    }
  }

  const onClose = () => {
    setVisible(false);
  };

  const renderPrice = (item: IOrderItem) => {

    const price = item.product.price * item.qty;
    let price_stock = undefined;
    if (item.product.is_stock) {
      price_stock = item.product.price_stock! * item.qty;
    }
 
    return <Row style={{
      flexDirection: 'column',
      marginTop: 10
    }}>
      {item.product.is_stock ? (<div>
        <div className="product__item-price-instock">₸ {price_stock}</div>
        <SizedBox width={10}></SizedBox>
        <div className="product__item-price">₸ {price}</div>
      </div>) : (<div className="product__item-price-instock product__item-price-instock-without">₸ {price}</div>)}

    </Row>
  }

  return (
    <Main>
      <Modal></Modal>
      <div className="basket">
        <div className="container">
          <div className="basket__title">Оформление заказа</div>

          <div className="order">
            <div className="order__header">
              <div className="order__all">{basket?.order?.orderitems?.length} товара</div>
              <div className="order__price-title">Цена</div>
            </div>
            <div className="order__row">
              {basket?.order?.orderitems?.map((item) => (
                <div key={item.id} className="order__item">
                  <div className="order__content-container">
                    <img src={item.product.images[0].photo} className="order__img"></img>
                    <div className="order__content">
                      <div className="order__subcategory">{item?.product.subcategory?.name}</div>
                      <div className="order__name">{item.product?.name}</div>
                      {renderPrice(item)}
                      <div className="qtycontainer" style={{
                        marginTop: 10
                      }}>
                        <div className="qtycontainer__title smalled">Количество</div>
                        <div className="qty">
                          <div onClick={() => updateTypeQueryNode('add',item.id)} className="qtyplus qty__item smalled">
                            +
                          </div>
                          <input value={item.qty} readOnly className="qty__input smalled"></input>
                          <div onClick={() => updateTypeQueryNode('remove',item.id)} className="qtyminus qty__item smalled">
                            -
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="order__button">
                 <div style={{
                     width: 400
                 }}>
                 <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 15
                  }}>
                    <div
                      style={{
                        fontSize: 14,
                        color: '#ADADAD'
                      }}
                    >{basket?.order?.orderitems.length} товаров на сумму </div>
                    <div style={{
                      fontSize: 18,
                      color: '#253D4E',
                      fontWeight: 700
                    }}>₸ {basket?.totalPrice}</div>
                  </div>
                  <Button
                    style={{
                      width: '100%',
                      justifyContent: 'center'
                    }}
                    shadowed
                    onClick={handleSubmit}
                    suffix={<ShoppingOutlined />}
                    title={'Оформить заказ'}></Button>
                 </div>
                </div>
          </div>
        </div>
      </div>

      <div className="bottom-fixed">
        <div className="container">
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 15
            }}>
              <div
                style={{
                  fontSize: 14,
                  color: '#ADADAD'
                }}
              >{basket?.order?.orderitems.length} товаров на сумму </div>
              <div style={{
                fontSize: 18,
                color: '#253D4E',
                fontWeight: 700
              }}>₸ {basket?.totalPrice}</div>
            </div>

            <Button
              style={{
                width: '100%',
                justifyContent: 'center'
              }}
              shadowed
              onClick={handleSubmit}
              suffix={<ShoppingOutlined />}
              title={'Оформить заказ'}></Button>
          </div>

        </div>
      </div>
      <Drawer
        title="Оформление заказа"
        onClose={onClose}
        width={'95%'}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <RegisterForm onClose={onClose}></RegisterForm>
      </Drawer>

    </Main>
  );
}

export default observer(BasketPage);