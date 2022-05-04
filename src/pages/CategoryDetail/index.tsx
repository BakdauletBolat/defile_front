
import { ShoppingCartOutlined, HomeOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useStoreContext } from "../../hooks/useContext";
import Row from "../../components/row";
import Button from "../../components/button";
import SizedBox from "../../components/sized-box";
import { IProduct } from "../../store/ProductStore";
import Main from "../../layouts/main";
import LoadingScreen from '../../components/loadingScreen';
import { Divider, Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface ProuctItemProps {
    product: IProduct;
}

function ProductItem({ product }: ProuctItemProps) {

    const width = document.body.clientWidth;


    const renderProductItem = () => {
        if (width < 1200 && width > 950) {
            return <div className="product__item-title">{product.name.length > 105 ? product.name.substring(0, 105) + " ..." : product.name}</div>
        }

        if (width < 950 && width > 650) {
            return <div className="product__item-title">{product.name.length > 50 ? product.name.substring(0, 50) + " ..." : product.name}</div>
        }
        else if (width < 650) {
            return <div className="product__item-title">{product.name.length > 30 ? product.name.substring(0, 28) + " ..." : product.name}</div>
        }

        return <div className="product__item-title">{product.name.length > 70 ? product.name.substring(0, 70) + " ..." : product.name}</div>

    }

    return (
        <Link to={`/product/${product.id}`} className="product__item"
        >
            <img className="product__item-img" src={product.images[0].photo} alt="" />
            <div className="product__content">
                <div className="product__item-pre-title">{product.subcategory.name}</div>
                {renderProductItem()}
                <SizedBox height={10}></SizedBox>
                <Row alignItems="center" justifyContent="space-between">
                    <Row alignItems="center" style={{
                        flexDirection: 'column'
                    }}>
                        {product.price_stock != undefined ? (<div>
                            <div className="product__item-price-instock">₸ {product.price}</div>
                            <SizedBox width={10}></SizedBox>
                            <div className="product__item-price">₸ {product.price_stock}</div>
                        </div>) : (<div className="product__item-price-instock product__item-price-instock-without">₸ {product.price}</div>)}

                    </Row>
                    <Button className="button--small" suffix={<ShoppingCartOutlined style={{
                        color: 'white',
                        fontSize: 12
                    }}></ShoppingCartOutlined>} isButtonMobileResponsive={true} title={'Добавить'}></Button>
                </Row>
            </div>
        </Link>
    );
}



function CategoryDetail() {
    const { product } = useStoreContext();
    const { categoryId, subCategoryId, brandId } = useParams();

    const location = useLocation();

    const [treeDefaultKey, setTreeDefaultKey] = useState<string>('');
    const [brandDefaultKey, setBrandDefaultKey] = useState<string>('');
    const [filterKey, setFilterKey] = useState<string>('');

    useEffect(() => {
        product?.getBrands();
        product?.getCategories();
        if (categoryId !== undefined) {
            setTreeDefaultKey(categoryId);
            product?.getCategoryProducts(parseInt(categoryId!));
        }
        if (subCategoryId !== undefined) {
            setTreeDefaultKey('sub' + subCategoryId);
            console.log('sub' + subCategoryId);
            product?.getSubCategoryProducts(parseInt(subCategoryId!));
        }
        if (brandId !== undefined) {
            product?.getBrandProducts(parseInt(brandId!));
            setTreeDefaultKey(brandId);
        }

        if (location.pathname == '/is_stock') {
            product?.getFilteredProducts({
                is_stock: true
            });
            setFilterKey('is_stock')
        }

        if (location.pathname == '/is_new') {
            product?.getFilteredProducts({
                is_new: true
            });
            setFilterKey('is_new')
        }

        if (location.pathname == '/is_hot') {
            product?.getFilteredProducts({
                is_hot: true
            });
            setFilterKey('is_hot')
        }

    }, [categoryId, subCategoryId, brandId,location]);



    if (product?.isLoadingFiltered) {
        return <LoadingScreen></LoadingScreen>
    }

    return (
        <Main>
            <div className="subcategory-detail">
                <div className="container">
                    <div className='filter__row'>
                        <div className='filter__sidebar'>
                        <FilterTreeComponent treeDefaultKey={filterKey} setTreeDefaultKey={setFilterKey}></FilterTreeComponent>
                        <Divider></Divider>
                            <TreeComponent treeDefaultKey={treeDefaultKey} 
                                           setTreeDefaultKey={setTreeDefaultKey}></TreeComponent>
                            <Divider></Divider>
                            <BrandTreeComponent treeDefaultKey={brandDefaultKey} 
                                                setTreeDefaultKey={setBrandDefaultKey}></BrandTreeComponent>
                                                    
                        </div>
                        <ProductsList></ProductsList>
                    </div>
                </div>
            </div>
        </Main>
    );
}

const BrandTreeComponent = ({ treeDefaultKey,setTreeDefaultKey }: any) => {
    const { product } = useStoreContext();
    const onSelect = (selectedKeys: any, info: any) => {
        product?.getBrandProducts(parseInt(info.node.id));
                setTreeDefaultKey(info.node.id.toString());

    };
    return <Tree
        showIcon
        switcherIcon={<DownOutlined />}
        onSelect={onSelect}
        defaultExpandedKeys={[treeDefaultKey]}
        defaultSelectedKeys={[treeDefaultKey]}
        treeData={product?.brandsTree}
    />
}


const FilterTreeComponent = ({ treeDefaultKey,setTreeDefaultKey }: any) => {
    const { product } = useStoreContext();
    const onSelect = (selectedKeys: any, info: any) => {
        product?.getFilteredProducts({
            [info.node.key]: true
        });
        setTreeDefaultKey([info.node.key][0]);

    };
    return <Tree
        showIcon
        switcherIcon={<DownOutlined />}
        onSelect={onSelect}
        defaultExpandedKeys={[treeDefaultKey]}
        defaultSelectedKeys={[treeDefaultKey]}
        treeData={product?.filtersTree}
    />
}


const TreeComponent = ({ treeDefaultKey,setTreeDefaultKey }: any) => {
    const { product } = useStoreContext();

    const navigate = useNavigate();

    const onSelect = (selectedKeys: any, info: any) => {
        console.log('selected', selectedKeys, info);
        switch (info.node.type) {
            case 'sub':
                product?.getSubCategoryProducts(parseInt(info.node.id));
                setTreeDefaultKey('sub'+info.node.id);
                break
            case 'main':
                product?.getCategoryProducts(parseInt(info.node.id));
                setTreeDefaultKey(info.node.id.toString());
                break
            default:
                console.log('def');
        }

    };


    return <Tree
        showIcon
        switcherIcon={<DownOutlined />}
        defaultExpandedKeys={[treeDefaultKey]}
        defaultSelectedKeys={[treeDefaultKey]}
        onSelect={onSelect}
        treeData={product?.treeData}
    />
}

const ProductsList = () => {
    const { product } = useStoreContext();

    return <div className="subcategory-detail__row">
        {product?.filteredProducts.map(product =>
            <ProductItem key={product.id} product={product}></ProductItem>
        )
        }
    </div>
};

export default observer(CategoryDetail);