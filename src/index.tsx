import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import App from './App';
import './static/scss/index.scss';
import reportWebVitals from './reportWebVitals';
import { Context } from './hooks/useContext';
import ProductStore from './store/ProductStore';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{
    product: new ProductStore()
  }}>
    <App />
  </Context.Provider >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();