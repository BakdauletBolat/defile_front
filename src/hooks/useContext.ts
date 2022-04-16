import { createContext } from "react";
import { useContext } from "react";
import ProductStore from "../store/ProductStore";

interface ContextProps {
    product: ProductStore
}

const Context = createContext<ContextProps>({
    product: new ProductStore()
});

const useStoreContext = () => useContext(Context);

export {
    Context,useStoreContext
}