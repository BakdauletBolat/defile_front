import { $authHost, $host } from ".";
import { IBrand, ICategory, IProduct } from "../store/ProductStore";


export interface ISlide {
    id: number,
   title: String,
   description: String,
   photo: String
}

export default class ApplicationService {

   async getCategories() {
      return await $host.get<ISlide[]>('/api/core/slides/');
   }

}