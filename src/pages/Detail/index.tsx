import Main from "../../layouts/main";

import {useParams} from 'react-router-dom';

function DetailProductPage() {

    let {productId} = useParams();
    return ( 
        <Main>
        <div className="container">
            hello {productId}
        </div>
        </Main>
     );
}

export default DetailProductPage;