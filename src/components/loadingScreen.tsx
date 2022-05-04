import Main from "../layouts/main";
import { Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

function LoadingScreen() {

    const antIcon = <SyncOutlined style={{ fontSize: 50,color:'red' }} spin />;

    return ( 
        <Main>
            <div className="container">
            <div className="loading-screen">
                    <Spin indicator={antIcon} />
                </div> 
            </div>
        </Main>
        
     );
}

export default LoadingScreen;