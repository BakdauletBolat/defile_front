import { useState } from 'react';
import Lottie from "lottie-react";
import boxAnimation from '../static/animations/box-animation.json';
import {Row,Button,Space} from 'antd';
import SizedBox from '../components/sized-box';
import { useNavigate } from 'react-router-dom';

const useModal = () => {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  function openModal() {
    setVisible(true);
    document.body.classList.add('modal-open');
  }
  function closeModal() {
    setVisible(false);
    document.body.classList.remove('modal-open');
  }

  const navigateToMainPage = () => {
    navigate('/');
    closeModal();
  }

  const navigateToOrderPage = () => {
    navigate('/profile');
    closeModal();
  }

  console.log('m')

  const Modal = () => {
    return visible ? (
      <div className='b-modal'>
        <div>
        <Lottie style={{
          maxWidth: 400,
          margin: '0px auto'
        }}
          loop={true}
          animationData={boxAnimation} />
        <div className='b-modal__title'>
          Заказ успешно принят !
        </div>
        <div className='b-modal__description'>
        Спасибо за покупки в нашем магазине, мы рады вас обслуживать
        </div>
        <Row justify='center'>
          <Space>
          <Button onClick={navigateToOrderPage}>Посмотреть заказы</Button>
          <Button type='primary' onClick={navigateToMainPage}>Продолжить покупки</Button>
          </Space>
        </Row>
        <SizedBox height={50}></SizedBox>      
        </div>
      </div>

    ) : <></>
  }
  return { openModal, closeModal, Modal }
};

export default useModal;