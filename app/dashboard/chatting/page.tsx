'use client'
import './chatting.css'
import { FetchChat } from '../fetch';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import OpenAI from 'openai';
import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons';
export default function RightChatting() {
    const selectedChatId = useSelector((state: any) => state.chat.selectedChatId);//页面id
    const convId = useSelector((state: any) => state.chat.convId);
    const maskId = useSelector((state: any) => state.chat.maskId);
    const [page, setPage] = useState<any>([]);
    const [message, setMessage] = useState<any>('');
    const [conv, setConv] = useState<any>([])
    const [userImage, setUserImage] = useState<any>(''); // 存储用户头像信息
    const [presetWords, setPresetWords] = useState<any>(''); // 储存预设提示词信息
    const [ismodalopen, setisModalopen] = useState<any>(false)
    const [chatId, setchatId] = useState('')//保存当前单个对话id
    const [chatconvContent, setchatconvContent] = useState('')//保存当前单个对话的内容
    const [currentconvContent, setcurrentconvContent] = useState('')//保存已修改的单个对话内容
    const openai = new OpenAI({
        apiKey: "sk-F5LRULqmKIlkbnrK60CcC9D4Ca9b47Ff9aE23c2d24A9622a",
        baseURL: "https://api.xty.app/v1",
        dangerouslyAllowBrowser: true
    });

    const generateAIResponse = async (message: any) => {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: presetWords
            },
            {
                role: "user",
                content: message
            }]
        });
        return completion.choices[0].message.content;
    };

    //获取页面表数据库所有数据
    const fetchPage = async () => {
        try {
            const result: any = await FetchChat();
            setPage(result.data);
        } catch (error) {
            console.error('Error fetching Page:', error);
        }
    };
    fetchPage();// 调用 fetchPage 函数来获取数据


    //将发送者的信息保存进对话数据库
    const handleChange = (e: any) => {
        setMessage(e.target.value);
    };
    const handleSubmit = async () => {
        const { v4: uuidv4 } = require('uuid');
        const uuid1 = uuidv4();
        const data = {//用户发送消息插入数据库
            id: convId,
            user: 1,
            userImage: 'https://fastly.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f60e.png',
            convContent: message,
            chatId: uuid1
        }
        try {
            const { v4: uuidv4 } = require('uuid');
            const uuid2 = uuidv4();
            // setConv((messages) => [messages, data])
            axios.post('http://localhost:8080/addconv', data)
            setMessage("")
            setConv((prevConv: any) => [...prevConv, data]);
            // 可以根据需要在这里处理后端返回的响应
            const aiResponseContent = await generateAIResponse(message);
            const aiMessage = {//ai对话插入数据库
                id: convId,
                user: 2,
                userImage: userImage,
                convContent: aiResponseContent,
                chatId: uuid2
            };

            axios.post('http://localhost:8080/addconv', aiMessage);
            setConv((prevConv: any) => [...prevConv, aiMessage]);
        }
        catch (error) {
            console.error('Error sending data:', error);
        };
    };


    useEffect(() => {
        const getmaskImage = async () => {
            if (maskId !== null) {
                axios.get("http://localhost:8080/mask/" + maskId)
                    .then(response => {
                        setUserImage(response.data.data[0].image);
                        setPresetWords(response.data.data[0].presetWords);
                    }).catch(error => {
                        console.error('Error fetching Chat:', error);
                    });
            }
        };
        getmaskImage(); // 调用获取数据的函数
    }, [maskId]);


    //从对话表数据库查询与点击页面表对话id相同的
    useEffect(() => {
        const getPageId = async () => {
            if (convId !== null) {
                try {
                    setConv([]);
                    const response = await axios.get('http://localhost:8080/' + convId);
                    setConv(response.data.data);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        getPageId(); // 调用获取数据的函数
    }, [convId]);
    //回车发送消息
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault(); // 阻止默认的换行行为
            setMessage(message + '\n'); // 在文本框中添加换行符
        } else if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // 阻止默认的提交行为
            handleSubmit(); // 调用发送消息的函数
        }
    };

    const openmodal = () => {
        setisModalopen(true)
    }
    const closemodal = () => {
        setisModalopen(false)
    }

    function click(chatId: any, convContent: any) {//chatId是获得当前单个对话的id  convConvtent是获得当前单个对话内容

        setchatconvContent(convContent)
        setchatId(chatId)
    }
    const handleTextChange = (event: any) => {
        setcurrentconvContent(event.target.value);// 更新 currentconvContent 的值为文本框的当前值

        // setPresetWords(event.target.value);
    };
    const clickok = () => {

        const data = {
            chatId: chatId,
            convContent: currentconvContent
        }
        axios.post("http://localhost:8080/updatechatById", data)
            .then(response => {
                // 处理来自后端的响应并将数据存储在状态中
                console.log('chatId已发送', response.data);
            }).catch(error => {
                console.error('Error fetching Chat:', error);
            });
    }
    // const { v4: uuidv4 } = require('uuid');
    // const uuid = uuidv4();
    const [isHovering, setIsHovering] = useState(null); // 用于控制是否悬停在头像上
    return (
        <div className='right'>
            {Array.isArray(page) && page.filter((s) => s.id === selectedChatId).map((conv, index) => (
                <div className="window-header" key={index}>
                    <div className="window-header-title">
                        <div className="window-header-main-title">{conv.pageTitle}</div>
                        <div className="window-header-sub-title">共有{conv.convCount}条对话</div>
                    </div>
                    <div className="chat_prompt-toast_VCUf"></div>
                </div>))}

            <div className='chat_chat-body_QFv5x'>
                {Array.isArray(conv) && conv.map((conv, index: any) => (
                    <div className={`${conv.user == 1 ? 'chat_chat-message-user_dg8rL' : 'chat_chat-message-ai_dg8rL'}`} key={index}>
                        <div className={`${conv.user == 1 ? 'chat_chat-message-user_OX8' : 'chat_chat-message-ai_OX8'}`}>
                            <div className='chat_chat-message-header__Dny_K'
                                onMouseEnter={() => setIsHovering(index)} // 鼠标悬停时设置为 true
                                onMouseLeave={() => setIsHovering(null)}
                                onClick={openmodal} // 鼠标移出时设置为 false
                            >
                                <div className='chat_chat-message-avatar__3QeMq' onClick={() => click(conv.chatId, conv.convContent)} >
                                    <div className='chat_chat-message-edit__h58of '></div>
                                    <div className={`${conv.user == 1 ? 'user-user_avatar' : 'user-ai_avatar'}`} >
                                        {/* 头像 */}
                                        <img src={conv.userImage} style={{ fontSize: '18px', height: '18px', width: '18px' }} ></img>
                                        {isHovering == index && (
                                            <div className='chat_chat-message-edit__h58of'>
                                                <EditOutlined style={{ backgroundColor: 'white' }} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='chat_chat-message-item_dKqM1'>

                                <div className='markdowm-body'>
                                    <p className='markdowm-body_dk'>{conv.convContent}</p>
                                </div>
                            </div>
                            <div className='chat_chat-message-action-date__RsXTn'>{conv.convTime}</div>
                        </div>
                    </div>
                ))}
            </div>


            {ismodalopen && <div className="modal-mask">
                <div className="ui-lib_modal-container__V07hJ">
                    <div className="ui-lib_modal-header__ez8kk">
                        <div className="ui-lib_modal-title__uDyyZ">编辑</div>
                        <div className="ui-lib_modal-header-actions__sGgzm">
                            <div className="sui-lib_modal-header-action__TQHsu">
                                <CloseCircleOutlined style={{ fontSize: "15px" }} onClick={closemodal} />
                            </div>
                        </div>
                    </div>
                    <div className="ui-lib_modal-content___F0dm">
                        <textarea className="ui-lib_modal-input__vxrdT"
                            defaultValue={chatconvContent}
                            onChange={handleTextChange}></textarea>
                    </div>
                    <div className="ui-lib_modal-footer__U6Gef">
                        <div className="ui-lib_modal-actions__Ag5eX">
                            <div className="ui-lib_modal-action__o5vae">
                                <button className="button_icon-button__VwAMf" onClick={closemodal}>
                                    <div className="button_icon-button-text__my76e">取消</div>
                                </button>
                            </div>
                            <div className="ui-lib_modal-action__o5vae">
                                <button className="button_primary__dwYZ6" onClick={closemodal}>
                                    <div className="button_icon-button-text__my76e" onClick={clickok}>确定</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}



            <div className="chat_chat-input-panel__rO72m">
                <label className='.chat_chat-input-panel-inner___IQHi'>
                    <textarea className='chat_chat-input__PQ_oF' value={message} onChange={handleChange} placeholder='Enter发送,Shift+Enter换行' onKeyDown={handleKeyDown} ></textarea>
                    <button className='chat_chat-input-send_GFQZo' onClick={handleSubmit}>
                        <div className='button_icon-button-text__my76e'>发送</div>
                    </button>
                </label>
            </div>
            {/* <Modal></Modal> */}
        </div>
    )
}