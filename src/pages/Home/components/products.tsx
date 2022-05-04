import Row from "../../../components/row";
import SizedBox from "../../../components/sized-box";
import ProductsList from "./productsList";

function Products() {
    return ( 
        <div className="container">
              <Row justifyContent="space-between" alignItems="center">
            <div className="categories__title">Наши продукты</div>
            {/* <Row>
                <div className="categories__item categories__item--active">Все</div>
                <div className="categories__item">Мужской</div>
                <div className="categories__item">Женский</div>
            </Row> */}
        </Row>
        <SizedBox height={17}></SizedBox>
        <ProductsList></ProductsList>
        </div>
      
     );
}

export default Products;