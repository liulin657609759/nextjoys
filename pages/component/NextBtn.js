import React, {useState} from 'react'
import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import style from './css/NextBtn.module.css'


export default function PhoTable({ nextLevel }) {
    const btnStyle = {
        width: '70px',
        height: '70px',
    }
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '25%',
            height: '100%'
        }}>
            <div className={style.text}>您这一关的正确率为：89%</div>
            <div>
                <button
                    className={style.button}
                >3D Button 1</button>
            </div>
        </div>

    );
}