import Home from './pages/Home/Home';
import {
  Routes,
  Route,
} from "react-router-dom";
import DetailProductPage from './pages/Detail';
import { useEffect } from 'react';
import { useStoreContext } from './hooks/useContext';
import BasketPage from './pages/Basket';
import ScrollToTop from './scrollToTop';
import { notification } from 'antd';
import { LocalContext } from './hooks/useLocalContext';
import UserService from './api/user';
import ProfilePage from './pages/Profile';
import CategoryDetail from './pages/CategoryDetail';
import About from './pages/About';
import Favorites from './pages/Favorites';

function App() {

  const destroy = () => {
    const element = document.getElementsByClassName('ant-notification-hook-holder');
    if (element.length >= 1) {
      element[0].remove();
    }
  }

  const { basket,application } = useStoreContext();
  const [notificationApi, contextHolder] = notification.useNotification();


  const init = async () => {
    application?.getSlides();
    basket?.getUser().then(() => {
      basket?.getSession();
      basket?.getOrder();
    });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <LocalContext.Provider value={{
      notification: notificationApi,
      destroy: destroy,
      userService: new UserService()
    }}>
      <ScrollToTop />
      {contextHolder}
      <Routes>
        <Route index element={<Home />} />
        <Route path="product">
          <Route path=":productId" element={<DetailProductPage />} />
        </Route>
        <Route path="subcategory">
          <Route path=":subCategoryId" element={<CategoryDetail />} />
        </Route>
        <Route path="category">
          <Route path=":categoryId" element={<CategoryDetail />} />
        </Route>
        <Route path="brand">
          <Route path=":brandId" element={<CategoryDetail />} />
        </Route>
        <Route path="is_stock" element={<CategoryDetail />}></Route>
        <Route path="is_new" element={<CategoryDetail />}></Route>
        <Route path="is_hot" element={<CategoryDetail />}></Route>
        <Route path="basket" element={<BasketPage />}></Route>
        <Route path="profile" element={<ProfilePage />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="favorites" element={<Favorites />}></Route>
      </Routes>
    </LocalContext.Provider>
  );
}

export default App;
