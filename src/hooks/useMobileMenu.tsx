import { useEffect, useState } from 'react';
import {DownOutlined} from '@ant-design/icons';
import { Divider, Tree } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useStoreContext } from './useContext';

const BrandTreeComponent = () => {
    const { product } = useStoreContext();
    const navigate = useNavigate();
    const onSelect = (selectedKeys: any, info: any) => {
        navigate('/brand/'+info.node.id)

    };
    return <Tree
        showIcon
        switcherIcon={<DownOutlined />}
        onSelect={onSelect}
        treeData={product?.brandsTree}
    />
}


const FilterTreeComponent = () => {
    const { product } = useStoreContext();
    const navigate = useNavigate();
    const onSelect = (selectedKeys: any, info: any) => {
        navigate('/'+[info.node.key][0])
    };
    return <Tree
        showIcon
        switcherIcon={<DownOutlined />}
        onSelect={onSelect}
        treeData={product?.filtersTree}
    />
}


const TreeComponent = () => {
    const { product } = useStoreContext();

    const navigate = useNavigate();

    const onSelect = (selectedKeys: any, info: any) => {
        console.log('selected', selectedKeys, info);
        switch (info.node.type) {
            case 'sub':
                navigate('/subcategory/'+info.node.id)
                break
            case 'main':
                navigate('/category/'+info.node.id)
                break
            default:
                console.log('def');
        }

    };


    return <Tree
        showIcon
        switcherIcon={<DownOutlined />}
        onSelect={onSelect}
        treeData={product?.treeData}
    />
}

const useMobileMenu = () => {
    const [visible, setVisible] = useState(false);

    function openModal() {
        setVisible(true);
    }

    function toggle() {
        setVisible(!visible);
    }
    function closeModal() {
        setVisible(false);
    }


    const MobileMenu = () => {
        return visible ? (
            <div className='mobile-menu'>
                <div className='container'>
                    <div style={{
                        paddingTop: 20
                    }}>
                    <FilterTreeComponent ></FilterTreeComponent>
                    <Divider></Divider>
                    <TreeComponent ></TreeComponent>
                    <Divider></Divider>
                    <BrandTreeComponent></BrandTreeComponent>
                    </div>
                   
                </div>
            </div>
        ) : <></>
    }
    return { openModal, toggle, closeModal, MobileMenu }
};

export default useMobileMenu;