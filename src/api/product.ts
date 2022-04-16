import { $authHost,$host } from ".";
import { Category, Product } from "../store/ProductStore";


export default class ProductService {

    async getCategories() {
       return await $host.get<Category[]>('/api/product/category/');
    }

}