import { $authHost,$host } from ".";
import { ICategory,IProduct } from "../store/ProductStore";


export default class ProductService {

    async getCategories() {
       return await $host.get<ICategory[]>('/api/product/category/');
    }

    async getProducts() {
        return await $host.get<IProduct[]>('/api/product/');
     }

}