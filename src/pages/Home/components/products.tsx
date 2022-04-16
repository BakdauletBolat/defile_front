import { SwiperSlide,Swiper } from "swiper/react";
import {useStoreContext} from '../../../hooks/useContext';
import { Category } from "../../../store/ProductStore";
import {observer} from 'mobx-react-lite';

interface CategoryItemProps {
    category:Category;
}

function CategoryItem({category}:CategoryItemProps) {
    return ( 
        <div>{category.name}</div>
     );
}

function CategoryList()  {
    const {product} = useStoreContext();

    return ( 
        <div>
            <Swiper
            style={{
                height:194
            }}
            slidesPerView={5}
            spaceBetween={50}
            >
                {product?.categories.map(category=>  <SwiperSlide key={category.id}>
                        <CategoryItem category={category}></CategoryItem>
                </SwiperSlide>)
                }
              
               
            </Swiper>
        </div>
     );
}

export default observer(CategoryList);