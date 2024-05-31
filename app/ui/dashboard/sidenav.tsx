'use client'
import './left.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setSelectedChatId } from '../reducer/store';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';
import { CloseCircleOutlined, OpenAIOutlined } from '@ant-design/icons';
import React from 'react';
import { FloatButton } from 'antd';
const colors1 = ['#6253E1', '#04BEFE'];
const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

export default function Page() {
    const router = useRouter()
    const dispatch = useDispatch();//接收数据
    const [data, setData] = useState<any>([]);
    // 使用 FetchData 函数获取所有页面数据
    useEffect(() => {
        axios.get("http://localhost:8080/queryallchat")
            .then(response => {
                // 处理来自后端的响应并将数据存储在状态中
                console.log('Chat received:', response.data.data);
                setData(response.data.data);
            }).catch(error => {
                console.error('Error fetching Chat:', error);
            });
    }, []);
    //根据ID删除页面列表
    function deleteById(id: number, convId: String) {
        console.log("222222222222222", id)

        axios.delete('http://localhost:8080/' + id)
            .then(response => {
                console.log(response);
                // window.location.reload();
                const newData = data.filter((item: any) => item.id !== id);
                setData(newData);
                console.log("newData", newData)
            })
            .catch(error => {
                console.error(error);
            });
        axios.delete('http://localhost:8080/deleteconvById/' + convId)
            .then(response => {
                console.log(response);
                console.log("233333333333333", convId)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='left' data-tauri-drag-region="true">
            <div className="home_sidebar-header_Nhg" data-tauri-drag-region="true">
                <div>
                    <div className="home_sidebar-title_13KhW">虚拟助手</div>
                    <div className="home_sidebar-sub-title_sbT6Z">Build your own AI assistant</div>
                </div>
                <OpenAIOutlined style={{ opacity: 0.5, fontSize: "36px" }} />
            </div>
            <div className="home_sidebar-header-bar_SVjIN" >
                <Space>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                                    lineWidth: 0,
                                },
                            },
                        }}
                    >
                        <Button type="primary" size="large" onClick={() => router.push('/dashboard')}
                            style={{ width: '150px' }}>
                            面具
                        </Button>
                    </ConfigProvider>
                </Space>
                {/* <button className="button_icno-button_VwAMf  button_icno-button_zJdvm" onClick={() => router.push('/dashboard')}>
                    <div className="button_icno-button-text_my76e">面具</div>
                </button> */}
            </div>
            <div className='home_sidebar-body_9zbei'>
                {Array.isArray(data) && data.map(chat => (
                    <div className='chat-list ' key={chat.id} onClick={() => { dispatch(setSelectedChatId({ selectedChatId: chat.id, convId: chat.convId, maskId: chat.maskId })) }}>
                        <div className="home_chat-item_Oblai home_chat-item-selected_b6eBe" onClick={() => { router.push('/dashboard/chatting') }}>
                            <div className='home_chat-item_sRstw'>{chat.pageTitle}</div>
                            <div className='home_chat-item-info_9r6z'>
                                <div className='home_chat-item-count_Lpy'>{chat.convCount}条对话</div>
                                <div className='.home_chat-item-date_NOFrp'>{chat.convTime}</div>
                            </div>
                            <div className="home_chat-item-delete__3qV5m" onClick={() => deleteById(chat.id, chat.convId)} >
                                <CloseCircleOutlined style={{ fontSize: "15px" }} />
                            </div>
                        </div>
                    </div>))}

            </div>
            <FloatButton onClick={() => console.log('onClick')} style={{ position: 'relative', marginLeft: '20px' }} />

        </div>
    )
}