import { NotificationInstance } from "antd/lib/notification";
import { createContext } from "react";
import { useContext } from "react";
import UserService from "../api/user";



interface LocalContextProps {
    notification?: NotificationInstance,
    destroy?: Function,
    userService?: UserService
}



const LocalContext = createContext<LocalContextProps>({
});

const useLocalStoreContext = () => useContext(LocalContext);

export {
    LocalContext,useLocalStoreContext
}