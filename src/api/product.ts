import { $authHost, $host } from ".";
import { IBrand, ICategory, IProduct } from "../store/ProductStore";


export interface ProductFilterProps {
   subcategory?: number,
   category?: number,
   brand?:number,
   is_stock?:boolean,
   is_new?:boolean,
   is_hot?:boolean
}

export default class ProductService {

   async getCategories() {
      return await $host.get<ICategory[]>('/api/product/category/');
   }

   async getBrands() {
      return await $host.get<IBrand[]>('/api/product/brand/');
   }

   async getProducts({ subcategory,category,brand,is_stock,is_new,is_hot }: ProductFilterProps) {
      let route:string = `/api/product/?subcategory=${subcategory ? subcategory : ''}&category=${category ? category : ''}&brand=${brand ? brand : ''}`;
      if (is_hot) {
         route += `&is_hot=${is_hot}`;
      }
      if (is_stock) {
         route += `&is_stock=${is_stock}`;
      }
      if (is_new) {
         route += `&is_new=${is_new}`;
      }
      console.log(route);
      return await $host.get<IProduct[]>(route);
   }

   async getProductById(id: number) {
      return await $host.get<IProduct>(`/api/product/${id}/`);
   }

   async getProductFavorites(sessionId?:string) {
      return await $authHost.get(`/api/product/favorites/?session_id=${sessionId}`);
   }

   async addToFavorites(body?:any) {
      return await $authHost.post(`/api/product/like/`,body);
   }

   

}