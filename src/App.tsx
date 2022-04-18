import Home from './pages/Home/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DetailProductPage from './pages/Detail';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<Home />} />
        <Route path="product">
          <Route path=":productId" element={<DetailProductPage />} />
        </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
