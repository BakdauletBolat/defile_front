import { $authHost,$host } from ".";
import { IUser } from "../store/BasketStore";


export interface CreateOrderOrAuthProps {
    qty: number;
    product_id: number | undefined;
    session_id?: string
}

export interface DefaultProps {
    message: string
}

export interface IUserResponse {
    access: string,
    refresh: string,
    user: IUser
}

export default class UserService {

    async checkUser() {
        return (await $authHost.get<IUser>('/api/auth/me')).data
    }

    async createOrderToUnauthorizedUser(data:CreateOrderOrAuthProps) {
        return await $host.post<IUserResponse>('/api/store/create-unauthorized-order/',data);
    }

    async createOrderToAuthorizedUser() {
        return await $authHost.post<DefaultProps>('/api/store/create-authorized-order/');
    }
}