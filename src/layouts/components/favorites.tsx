import { HeartOutlined } from '@ant-design/icons';
export default function FavoritesComponent() {
    return (
        <div  style={{
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
                <div style={{
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

                }}>1</div>
                <HeartOutlined style={{ fontSize: '28px', color: '#253D4E' }}></HeartOutlined>
            </div>
            <div className='topHeader__item-title'>Избранные</div>
        </div>
    )
}