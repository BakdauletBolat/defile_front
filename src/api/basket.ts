import { v4 as uuidv4 } from 'uuid';
import { $authHost,$host } from ".";
import { IOrder, ISessionUUID } from "../store/BasketStore";

export interface AddBasketProps {
    qty: number;
    product_id: number | undefined;
    session_id?: string
}

export default class BasketService {

    createOrGetSession():string {
        const sessionId:string | null = localStorage.getItem('session-basket-uuid');

        if (sessionId == null ) {
            const sessionId:string = uuidv4();
            localStorage.setItem('session-basket-uuid',sessionId);
            return sessionId 
        }

        return sessionId;
    }

    async getOrder(session_id:string) {
        return await $host.get<IOrder>('/api/store/get-order/?session_id='+session_id);
    }

    async getOrders() {
        return await $authHost.get<IOrder[]>('/api/store/get-orders/');
    }

    async getOrderAuth() {
        return await $authHost.get<IOrder>('/api/store/get-order/');
    }


    async addProductToBasketAuth(data:AddBasketProps) {
        return await $authHost.post('/api/store/add-to-basket/',data=data);
    }

    async addProductToBasket(data:AddBasketProps) {
        return await $host.post('/api/store/add-to-basket/',data=data);
    }

    async updateOrderQty(body:any) {
        return await $authHost.post('api/store/update-order-qty/',body);
     }

}