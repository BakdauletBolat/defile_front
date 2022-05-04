import { HeartOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import { useStoreContext } from '../../hooks/useContext';

function FavoritesComponent() {

    const {product} = useStoreContext();
    return (
        <Link to='/favorites'  style={{
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            position: 'relative',
            marginLeft: 25
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
            }}>
                {product!.productsFavorites.length > 0 ? (<div style={{
                    position: 'absolute',
                    top: -7,
                    left: 15,
                    width: 22,
                    fontSize: 11,
                    color: 'white',
                    height: 22,
                    border: '2px solid white',
                    borderRadius: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#FF0303',

                }}>{product?.productsFavorites.length}</div>) : ''}
                <HeartOutlined style={{ fontSize: '28px', color: '#253D4E' }}></HeartOutlined>
            </div>
            <div className='topHeader__item-title'>Избранные</div>
        </Link>
    )
}

export default observer(FavoritesComponent)