import { UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useStoreContext } from '../../hooks/useContext';
import {Link} from 'react-router-dom';

 function ProfileComponent() {

    return (
         <Link to="/profile"  style={{
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
                <UserOutlined style={{ fontSize: '30px', color: '#253D4E' }}></UserOutlined>
            </div>
            <div className='topHeader__item-title'>Профиль</div>
        </Link>
    )
}

export default observer(ProfileComponent);