import { observable, runInAction, configure, makeObservable, computed } from "mobx"
import ProductService, { ProductFilterProps } from "../api/product";
import {SkinOutlined,MenuUnfoldOutlined,TeamOutlined,StarOutlined,PercentageOutlined,FireOutlined} from '@ant-design/icons';
configure({ enforceActions: "observed" });


export interface IProductImage {
    name?: String,
    photo: string,
    id: number
}


export interface ISubCategory {
    name?: String,
    photo: string,
    id: number
}

export interface IProductFavorite {
    product: number,
    session_id?: string,
    owner: number | undefined
}


export interface IProduct {
    id: number,
    name: String,
    description: String,
    subcategory: ISubCategory,
    category: ICategory,
    is_stock: boolean,
    brand: IBrand,
    price: number,
    price_stock: number | undefined,
    images: IProductImage[],
    likes: IProductFavorite[]
}

export interface ICategory {
    id: number,
    name: String,
    photo: string,
    created_at: Date,
    subcategorires: ISubCategory[]
}

export interface IBrand {
    id: number,
    name: String,
    photo: string,
    created_at: Date
}

interface TreeData {
    id:number,
    icon?: any,
    title: any,
    key: String,
    children?: TreeData[],
    type?: 'main' | 'sub' | 'brand' | 'gender' | 'filter' | 'category'
}

class ProductStore {


    products: IProduct[] = [];
    categories: ICategory[] = [];
    brands: IBrand[] = [];
    productsService: ProductService;
    filteredProducts: IProduct[] = [];
    productsFavorites: IProduct[] = [];

    isLoadingFiltered: boolean = false;
    isLoadingFavorites: boolean = false;
    isLoadingProducts: boolean = false;


    constructor() {
        this.productsService = new ProductService();
        makeObservable(this, {
            products: observable,
            categories: observable,
            filteredProducts: observable,
            productsFavorites: observable,
            isLoadingFiltered: observable,
            isLoadingProducts: observable,
            brands: observable,
            brandsTree: computed,
            treeData: computed
        })
    }

    setProducts(data: IProduct[]) {
        this.products = data;
    }

    setCategories(data: ICategory[]) {
        this.categories = data;
    }

    getCategories = async () => {
        const apiData = await this.productsService.getCategories();
        runInAction(() => {
            this.setCategories(apiData.data);
        });
    };

    getBrands = async () => {
        const apiData = await this.productsService.getBrands();
        runInAction(() => {
            this.brands = apiData.data;
        });
    };

    getProducts = async () => {
        runInAction(() => {
            this.isLoadingProducts = true;
        })
        const apiData = await this.productsService.getProducts({});
        runInAction(() => {
            this.setProducts(apiData.data);
            this.isLoadingProducts = false;
        });
    };

    getProductFavorites = async () => {
        runInAction(() => {
            this.isLoadingFavorites = true;
        })
        const apiData = await this.productsService.getProductFavorites();
        runInAction(() => {
            this.productsFavorites = apiData.data;
            this.isLoadingFavorites = false;
        });
    };

    getBrandProducts = async (id: number) => {
        runInAction(() => {
            this.isLoadingFiltered = true;
        })
        const apiData = await this.productsService.getProducts({ brand: id });
        runInAction(() => {
            this.filteredProducts = apiData.data;
            this.isLoadingFiltered = false;
        });
    };

    getSubCategoryProducts = async (id: number) => {
        runInAction(() => {
            this.isLoadingFiltered = true;
        })
        const apiData = await this.productsService.getProducts({ subcategory: id });
        runInAction(() => {
            this.filteredProducts = apiData.data;
            this.isLoadingFiltered = false;
        });
    }



    getCategoryProducts = async (id: number) => {
        runInAction(() => {
            this.isLoadingFiltered = true;
        })
        const apiData = await this.productsService.getProducts({ category: id });
        runInAction(() => {
            this.filteredProducts = apiData.data;
            this.isLoadingFiltered = false;
        });
    }

    getFilteredProducts = async ({is_hot,is_new,is_stock}:ProductFilterProps) => {
        runInAction(() => {
            this.isLoadingFiltered = true;
        })
        const apiData = await this.productsService.getProducts({ is_hot,is_new,is_stock });
        runInAction(() => {
            this.filteredProducts = apiData.data;
            this.isLoadingFiltered = false;
        });
    }

    get filtersTree(): any {
        let treeDataRaw: Array<TreeData> = [
            {
                title: <div className="antd-main-tree-title"><FireOutlined style={{
                    color: '#FF0303'
                }}/> Горячие товары</div>,
                key: 'is_hot',
                id: 0,
                type:'brand',  
            },
            {
                title: <div className="antd-main-tree-title"><PercentageOutlined style={{
                    color: '#FF0303'
                }}/> Акций</div>,
                key: 'is_stock',
                id: 0,
                type:'brand',  
            },
            {
                title: <div className="antd-main-tree-title"><StarOutlined style={{
                    color: '#FF0303'
                }}/> Новые кродажи</div>,
                key: 'is_new',
                id: 0,
                type:'brand',  
            }
        ];

        return treeDataRaw;
    }

    get brandsTree(): any {
        let treeDataRaw: Array<TreeData> = [
            {
                title: <div className="antd-main-tree-title"><TeamOutlined style={{
                    color: '#FF0303'
                }}/> Бренды</div>,
                key: 'brands',
                id: 0,
                type:'brand',
                children : []
            }
        ];
        this.brands.map(brand => {
            treeDataRaw[0].children!.push({
                title:brand.name,
                key: brand.id.toString(),
                id: brand.id,
                type: 'brand',
                icon: <SkinOutlined style={{
                    color:'#FF0303',
            
                }}></SkinOutlined>
            })
        });

        return treeDataRaw;
    }

    get treeData(): any {

        console.log('treedata');

        let treeDataRaw: Array<TreeData> = [{
            type:'category',
            id: 0,
            key:'categories',
            title: <div className="antd-main-tree-title"><MenuUnfoldOutlined style={{
                color: '#FF0303'
            }}/>  Категорий</div>,
            children: []
        }];

        this.categories.map(category => {
            if (category.subcategorires.length > 0) {
                let children: Array<TreeData> = [];
                category.subcategorires.map(subcategory => {
                    children.push({
                        id: subcategory.id,
                        type: 'sub',
                        icon: <SkinOutlined style={{
                            color:'#FF0303',
                    
                        }} />,
                        title: subcategory.name!.toString(),
                        key: 'sub'+subcategory.id.toString(),
                    })
                });
                treeDataRaw[0].children!.push({
                    id: category.id,
                    type: 'main',
                    icon: <SkinOutlined style={{
                        color:'#FF0303'
                    }}/>,
                    title: category.name,
                    key: category.id.toString(),
                    children: children
                });
            }
            else {
                treeDataRaw[0].children!.push({
                    type: 'main',
                    icon: <SkinOutlined style={{
                        color:'#FF0303'
                    }}/>,
                    id: category.id,
                    title: category.name,
                    key: category.id.toString()
                });
            }
        });

        return treeDataRaw;
    }
}



export default ProductStore;