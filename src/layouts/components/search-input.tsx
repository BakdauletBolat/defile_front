import { SearchOutlined } from '@ant-design/icons';

export default function SearchComponent() {
    return  (
        <div className='topHeader__search'>
             <input type="text"
        placeholder='Искать'
          style={{
            fontSize: 14,
            marginLeft:25,
            paddingLeft:15,
            color: '#ADADAD',
            backgroundColor: '#F3F3F3',
            border:'none',
            width:'100%',
            borderRadius: '3px',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            
        }} />
        <button type="submit" className='button' style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
        }}>{<SearchOutlined size={24}></SearchOutlined>}</button>
        </div>
       
    )
}