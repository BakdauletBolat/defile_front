import { observable,runInAction,configure,makeObservable,action } from "mobx"
import ProductService from "../api/product";
configure({ enforceActions: "observed" });


export interface IProductImage {
    name?: String,
    photo: string,
    id:number
}


export interface ISubCategory {
    name?: String,
    photo: string,
    id:number
}


export interface IProduct {
    id: number,
    name: String,
    description:String,
    subcategory: ISubCategory,
    category: ICategory,
    images: IProductImage[]
}

export interface ICategory {
    id: number,
    name: String,
    photo:string,
    created_at: Date
}

class ProductStore {

  
    products:IProduct[] = [];
    categories:ICategory[] = [];
    productsService: ProductService;

    constructor() {
        this.productsService = new ProductService();
        makeObservable(this, {
            products: observable,
            categories: observable,
        })
    }

    setProducts(data:IProduct[]) {
        this.products = data;
    }

    setCategories(data:ICategory[]) {
        this.categories = data;
    }

    getCategories = async () => {
        const apiData = await this.productsService.getCategories();

        runInAction(() => {
            this.setCategories(apiData.data);
          });
    };

    getProducts = async () => {
        const apiData = await this.productsService.getProducts();
 
        runInAction(() => {
            this.setProducts(apiData.data);
          });
    };
}



export default ProductStore;