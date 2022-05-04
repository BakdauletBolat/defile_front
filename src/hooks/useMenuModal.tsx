import { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import boxAnimation from '../static/animations/box-animation.json';
import { Row, Button, Space } from 'antd';
import SizedBox from '../components/sized-box';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from './useContext';

const useMenuModal = () => {
  const [visible, setVisible] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number>(0);
  const { product } = useStoreContext();
  const navigate = useNavigate();
  function openModal() {
    setVisible(true);
  }

  function toggle() {
    setVisible(!visible);
  }
  function closeModal() {
    setVisible(false);
  }

  useEffect(()=>{
    console.log('im upt');
  },[])

  const navigateToMainPage = () => {
    navigate('/');
    closeModal();
  }

  const navigateToDetail = (id:number) => {
    navigate(`/subcategory/${id}`);
    closeModal();
  }

  // console.log('up');

  const MenuModal = () => {
    return visible ? (
      <div className='menu-modal'>
        <div className='container'>
          <Row>
            <Space align='start'>
              <div>
                {product?.categories.map((category, index) => (
                  <div 
                      onClick={()=>setSelectedSubCategory(index)} 
                      key={category.id} 
                      className={index == selectedSubCategory ? 'menu-modal__item menu-modal__item--active':'menu-modal__item'}>{category.name} (33)</div>
                ))}
              </div>
              <div>
                {product?.categories[selectedSubCategory]?.subcategorires.map(subcategory => (
                  <div key={subcategory.id} className='menu-modal__subitem'>
                    <div onClick={()=>navigateToDetail(subcategory.id)}>{subcategory.name}</div>
                  </div>
                ))}
              </div>
            </Space>
          </Row>
        </div>
      </div>
    ) : <></>
  }
  return { openModal, toggle, closeModal, MenuModal }
};

export default useMenuModal;