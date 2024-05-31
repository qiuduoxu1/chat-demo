'use client'
import axios from 'axios';
import './choosemask.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { FetchMask } from './fetch';
import { LeftOutlined } from '@ant-design/icons';
export default function Choosemask() {
    const router = useRouter()
    const [data, setData] = useState<any>([]);
    // 使用 FetchData 函数获取数据   获取面具表数据库数据
    const fetchMask = async () => {
        try {
            const result: any = await FetchMask(); // 等待 FetchData 函数返回的 Promise
            setData(result.data);
        } catch (error) {
            console.error('Error fetching maskdata:', error);
        }
    };
    fetchMask(); // 调用 fetchData 函数来获取数据

    //根据点击面具获取到的面具名称面具ID添加到页面框
    function click(maskname: String, maskid: number, maskpresetWords: String, maskImage: String) {
        console.log(maskname)
        console.log(maskid)
        const { v4: uuidv4 } = require('uuid');
        const uuid = uuidv4();
        const data = {//页面表
            maskId: maskid,
            pageTitle: maskname,
            convId: uuid,
            convCount: 1,
        }
        axios.post('http://localhost:8080/addchat', data)
            .then(response => {
                console.log('Data sent successfully:', response.data);
                // 可以根据需要在这里处理后端返回的响应
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });


        const uuid3 = uuidv4();
        //把预设提示词设置进对话表
        const data2 = {
            id: uuid,
            user: 1,
            userImage: 'https://fastly.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f60e.png',
            convContent: maskpresetWords,
            chatId: uuid3

        }
        axios.post("http://localhost:8080/addconv", data2)
            .then(response => {
                console.log('Data sent successfully:', response.data);
                // 可以根据需要在这里处理后端返回的响应
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    }

    return (
        <div className="new-chat_new-chat_63RF3">
            <div className='new-chat_mask-header_nBwht' >
                <button className='button_icno-button_VwAMf' onClick={() => router.push('/dashboard/chatting')}>
                    <LeftOutlined />
                    <div className='button_icno-button-text_my76e'>返回</div>
                </button>
            </div>

            <div className='new-chat_mask-cards__W1FzL'>
                <div className='new-chat_mask-card__EXvr1'>
                    <img src='https://fastly.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f606.png' className='epr-emoji-img'></img>
                </div>
                <div className='new-chat_mask-card__EXvr2'>
                    <img src='https://fastly.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f916.png' className='epr-emoji-img'></img>
                </div>
                <div className='new-chat_mask-card__EXvr3'>
                    <img src='	https://fastly.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f479.png' className='epr-emoji-img '></img>
                </div>
            </div>

            <div className="new-chat_title__lfHL6">挑选一个面具</div>
            <div className="title2">现在开始,与面具背后的灵魂思维碰撞</div>
            <div className='new-chat_masks__ArNS9' >
                {Array.isArray(data) && data.map(mask => (
                    <div className='new-chat_mask-row__ZRTfV' key={mask.id} onClick={() => router.push('/dashboard/chatting')}>
                        <div className='new-chat_mask__P5aBk' onClick={() => { click(mask.name, mask.id, mask.presetWords, mask.image) }}>
                            <div className='user-avatar' >
                                <img src={mask.image} className='epr-emoji-img' alt={mask.name} ></img>
                            </div>
                            <div className='new-chat_mask-name__AytPM' >{mask.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

