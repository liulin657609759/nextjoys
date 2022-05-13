import React, {useState} from 'react'
import Image from 'next/image';
import { Form, Input, Button, Checkbox } from 'antd';

export default function PhoTable({ data }) {
    const lazyRoot = React.useRef(null)
    const contentRender = (index)=>{
        if(data){
            switch (index) {
                case 4 :
                    return (
                        <span
                            style={{
                                fontSize: '40px',
                                color: data.color
                            }}
                        >{data.word}</span>
                    );
                case data.pos :
                    return (
                        <Image alt="Picture" lazyRoot={lazyRoot} width="100" height="100" src={data.imageUrl}  />
                    );
                default: 
                    return null
            }
        }else{
            return null
        }
        
    }
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
                    margin-left: -4px;
                    margin-top: -4px;
                    line-height: 100px;
                    text-align: center;
                    list-style: none;
                    border: 4px solid #cce3f9;
                }
            `}</style>
            <ul ref={lazyRoot} className="flex">
                {new Array(9).fill(null).map((_,index)=>{
                    return <li key={index}>
                        {contentRender(index)}
                        </li>
                })}
            </ul>
        </div>

    );
}