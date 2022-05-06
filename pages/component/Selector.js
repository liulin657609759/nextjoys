import React, {useState} from 'react'
import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import style from './css/Selector.module.css'


export default function PhoTable({ selectRes }) {
    
    const tyle = {
        background: 'red'
    }
    const btnStyle = {
        width: '70px',
        height: '70px',
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
                <p className={style.p}>图片的位置一样吗？</p>
                <div className={style.selectItem}>
                    <Button
                        style={btnStyle}
                        type="primary" 
                        // danger={result} 
                        shape="circle" 
                        size={'large'}
                        icon={<CheckOutlined />}
                        onClick={()=>selectRes('posJudge',true)}
                    />
                </div>
            </div>
            <div className={style.item}>
                <p className={style.p}>中间文字颜色一样吗？</p>
                <div className={style.selectItem}>
                    <Button
                    style={btnStyle}
                    type="primary"
                    shape="circle"
                    size='large'
                    icon={<CheckOutlined />}
                    onClick={()=>selectRes('colorJudge',true)}
                    />
                </div>
            </div>
        </div>

    );
}