import React, {useEffect, createRef, useState} from 'react'
import { Button } from 'antd';
import style from './css/Selector.module.css'


export default function Selector({ selectRes }) {
    const [fIsUp,setFIsUp] = useState(false)
    const [gIsUp,setGFIsUp] = useState(false)
    const ref = createRef();
    useEffect(() => {
        ref.current.focus();
    }, [ref]);
    let fBtnStyle = {
        opacity: fIsUp ? '.4' : '1',
        width: '70px',
        height: '70px',
        fontSize: '40px',
        fontWeight: '500',
        lineHeight: '55px'
    }
    let gBtnStyle = {
        opacity: gIsUp ? '.4' : '1',
        width: '70px',
        height: '70px',
        fontSize: '40px',
        fontWeight: '500',
        lineHeight: '55px'
    }
    const onKeyPress = (e)=>{
        if(e.keyCode === 70){
            setFIsUp(true)
            selectRes('posJudge',true)
        }else if(e.keyCode === 71){
            setGFIsUp(true)
            selectRes('colorJudge',true)
        }
    }  

    return (
        <div 

        style={{
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
                        className='btn'
                        style={fBtnStyle}
                        type="primary" 
                        tabIndex={-1}
                        ref={ref}
                        onKeyDown={onKeyPress}
                        shape="circle" 
                        size={'large'}
                        onClick={()=>selectRes('posJudge',true)}
                    >
                        F
                    </Button>
                </div>
            </div>
            <div className={style.item}>
                <p className={style.p}>中间文字颜色一样吗？</p>
                <div className={style.selectItem}>
                    <Button
                    style={gBtnStyle}
                    type="primary"
                    tabIndex={-1}
                    ref={ref}
                    onKeyDown={onKeyPress}
                    shape="circle"
                    size='large'
                    onClick={()=>selectRes('colorJudge',true)}
                    >
                        G
                    </Button>
                </div>
            </div>
        </div>

    );
}