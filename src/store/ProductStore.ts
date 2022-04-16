import { observable,runInAction,configure,makeObservable,action } from "mobx"
import ProductService from "../api/product";
configure({ enforceActions: "observed" });

export interface Product {
    name: String,
    description:String
}

export interface Category {
    id: number,
    name: String,
    photo:String,
    created_at: Date
}

class ProductStore {

  
    products:Product[] = [];
    categories:Category[] = [];
    productsService: ProductService;

    constructor() {
        this.productsService = new ProductService();
        makeObservable(this, {
            products: observable,
            categories: observable,
        })
    }

    setProducts(data:Product[]) {
        this.products = data;
    }

    setCategories(data:Category[]) {
        this.categories = data;
    }

    getCategories = async () => {
        const apiData = await this.productsService.getCategories();
        console.log(apiData);
        runInAction(() => {
            this.setCategories(apiData.data);
          });
      };
}



export default ProductStore;