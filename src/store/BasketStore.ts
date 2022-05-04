import { observable, runInAction, configure, makeObservable, action, computed } from "mobx"
import BasketService, { AddBasketProps } from "../api/basket";
import UserService from "../api/user";
import { IProduct } from "./ProductStore";
configure({ enforceActions: "observed" });

export interface IUser {
    id: number,
    phone: string,
    email: string,
    fullname: string
}

export interface ISessionUUID {
    session_id: string;
}

export interface IOrderItem {
    id: number,
    product: IProduct,
    order: IOrder,
    qty: number
}

export interface IOrder {
    id: number,
    status: 'ожидает' | 'принят' | 'процессе' | 'выполнен',
    orderitems: IOrderItem[]
}

class BasketStore {

    basketService: BasketService;
    userService: UserService;
    session_uuid: string | undefined;


    user?: IUser;
    order: IOrder | undefined;
    orders: IOrder[] = [];

    constructor() {
        this.basketService = new BasketService();
        this.userService = new UserService();
        makeObservable(this, {
            session_uuid: observable,
            getSession: action,
            order: observable,
            user: observable,
            orders: observable,
            is_auth: computed,
            totalPrice: computed,
            isLoadingOrderCreating: observable,
            isLoadingBasketAdding: observable,
        
            setIsLoadingCreateOrder: action
        })
    }

    getSession() {
        const session_id: string = this.basketService.createOrGetSession();
        this.session_uuid = session_id;
    }

    setOrder(order: any) {
        this.order = order;
    }

    setUser(user: IUser) {
        this.user = user
    }

    isLoadingBasketAdding: boolean = false;
    isLoadingOrderCreating: boolean = false;

    async getUser() {
        try {
            const user: IUser = await this.userService.checkUser();
            runInAction(() => {
                this.setUser(user);
            });
        }
        catch (e) {
            runInAction(() => {
                this.user = undefined;
            });
            console.log(e);
        }


    }

    get is_auth(): boolean {
        if (this.user == undefined) {
            return false;
        }
        else {
            return true;
        }
    }

    get totalPrice(): number {
        let tLength: number = 0;
        this.order?.orderitems.forEach(item => {
            if (item.product.is_stock) {
                const price_stock: number = item.product.price_stock! * item.qty;
                tLength += price_stock;
            }
            else {
                const price: number = item.product.price! * item.qty;
                tLength += price;
            }
        });
        return tLength;
    }


    async getOrder() {
        if (this.is_auth) {
            console.log('auth');
            const order: IOrder = (await this.basketService.getOrderAuth()).data;

            runInAction(() => {
                this.setOrder(order);
            })
        }
        else {
            const order: IOrder = (await this.basketService.getOrder(this.session_uuid!)).data;
            console.log('notauth',order);
            runInAction(() => {
                this.setOrder(order);
            })
        }
    }

    async getOrders() {
        const orders: IOrder[] = (await this.basketService.getOrders()).data;
        runInAction(() => {
            this.orders = orders;
        })
    }

    async addProductToBasket(data: AddBasketProps) {

        runInAction(() => {
            this.isLoadingBasketAdding = true;
        })
        let result;
        if (this.is_auth) {
            result = (await this.basketService.addProductToBasketAuth(data)).data;
        }
        else {
            result = (await this.basketService.addProductToBasket(data)).data;
        }

        if (result.statusCode == 200 || result.statusCode) {
            this.getOrder();
            runInAction(() => {
                this.isLoadingBasketAdding = false;
            });
            return result;
        }
        else {
            runInAction(() => {
                this.isLoadingBasketAdding = false;
            });
        }
    }

    setIsLoadingCreateOrder(value: boolean) {
        this.isLoadingOrderCreating = value;
    }

    
}



export default BasketStore;