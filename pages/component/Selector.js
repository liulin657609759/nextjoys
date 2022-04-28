import React, {useState} from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import style from './css/Selector.module.css'


export default function PhoTable({ children }) {
    const [result,setResule] = useState(false);
    
    const btnStyle = {
        background: 'red'
    }
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            // alignItems: 'center',
            paddingTop: '15%',
            height: '100%'
        }}>
            <div className={style.item}>
                <p>图片的位置一样吗？</p>
                <div className={style.selectItem}>
                    <Button
                        type="primary" 
                        danger
                        size={'large'}
                        icon={<CloseOutlined />}
                        onClick={()=>setResule(!result)}
                    />
                    <Button
                        type="primary" 
                        danger={result} 
                        shape="circle" 
                        size={'large'}
                        icon={<CheckOutlined />}
                        onClick={()=>setResule(!result)}
                    />
                </div>
            </div>
            <div className={style.item}>
                <p>中间文字颜色一样吗？</p>
                <div className={style.selectItem}>
                    <Button type="primary" size='large' danger icon={<CloseOutlined />}/>
                    <Button type="primary" shape="circle" size='large' icon={<CheckOutlined />}/>
                </div>
            </div>
        </div>

    );
}