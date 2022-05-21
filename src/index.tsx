import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import App from './App';
import './static/scss/index.scss';
import reportWebVitals from './reportWebVitals';
import { Context } from './hooks/useContext';
import ProductStore from './store/ProductStore';
import { BrowserRouter } from 'react-router-dom';
import BasketStore from './store/BasketStore';
import ApplicationStore from './store/ApplicationsStore';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Context.Provider value={{
    basket: new BasketStore(),
    product: new ProductStore(),
    application: new ApplicationStore()
  }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider >
);

reportWebVitals();