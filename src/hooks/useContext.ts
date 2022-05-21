import { NotificationInstance } from "antd/lib/notification";
import { createContext } from "react";
import { useContext } from "react";
import ApplicationStore from "../store/ApplicationsStore";
import BasketStore from "../store/BasketStore";
import ProductStore from "../store/ProductStore";

interface ContextProps {
    product?: ProductStore,
    basket?: BasketStore,
    notification?: NotificationInstance,
    application?: ApplicationStore
}

const Context = createContext<ContextProps>({
    product: new ProductStore(),
    basket: new BasketStore() 
});

const useStoreContext = () => useContext(Context);

export {
    Context,useStoreContext
}