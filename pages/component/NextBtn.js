import React, {useState} from 'react'
import style from './css/NextBtn.module.css'


export default function PhoTable({ rate, nextLevel }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '25%',
            height: '100%'
        }}>
            <div className={style.text}>您这一关的正确率为：{rate}%</div>
            {
                rate>80 ?
                <div className={style.right}>恭喜您完成</div> :
                <div className={style.error}>很遗憾您没能完成这一关！</div>
            }
            <div>
                <button
                    className={style.button}
                    onClick={()=>nextLevel()}
                >{rate>80 ? '点击进入下一关' : '再来一次'}</button>
            </div>
        </div>

    );
}