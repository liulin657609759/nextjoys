import React, {useState} from 'react'
import { Form, Input, Button, Checkbox } from 'antd';

export default function PhoTable({ children }) {
    
    
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <style jsx>{`
                .flex{
                    display: flex;
                    width: 300px;
                    /*height: 300px;*/
                    flex-wrap: wrap;
                    padding: 0;
                    box-sizing: border-box;           
                }
                .flex > li{
                    box-sizing: border-box;
                    height: 100px;
                    width: 100px;
                    // margin-left: -4px;
                    // margin-top: -4px;
                    line-height: 100px;
                    text-align: center;
                    list-style: none;
                    border: 4px solid #ccc;
                }
            `}</style>
            <ul className="flex">
                {new Array(9).fill(null).map((_,index)=>{
                    return <li key={index}>{index===4 && '你好'}</li>
                })}
            </ul>
        </div>

    );
}