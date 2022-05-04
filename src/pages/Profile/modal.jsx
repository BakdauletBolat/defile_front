import { Modal } from 'antd';
import { useLocalStore } from 'mobx-react-lite';

import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../hooks/useContext';

const useAlertDialog = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();
    const {basket} = useStoreContext();

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
        localStorage.removeItem('token');
        basket.getUser();
        navigate('/');
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

    const AlertDialog = () => {
        return  <Modal title="Вы точно хотите выйти?" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        </Modal>
    }

    return {
        AlertDialog,
        showModal
    }   
}

export default useAlertDialog;
    

