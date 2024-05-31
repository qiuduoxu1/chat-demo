import axios from "axios";
import { useEffect, useState } from "react";

//从面具数据库查询所有面具信息
export async function FetchMask() {
    // 这里可以是数据获取的逻辑，例如从 API 中获取数据
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:8080/queryallmasks")
            .then(response => {
                // 处理来自后端的响应并将数据存储在状态中
                console.log('Data received:', response.data.data);
                setData(response.data.data);
            }).catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])
    // 将获取到的数据传递给页面组件
    return {
        data
    };
}
//从页面数据库查询所有页面信息
export async function FetchChat() {
    // 这里可以是数据获取的逻辑，例如从 API 中获取数据
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:8080/queryallchat")
            .then(response => {
                // 处理来自后端的响应并将数据存储在状态中
                console.log('Chat received:', response.data.data);
                setData(response.data.data);
            }).catch(error => {
                console.error('Error fetching Chat:', error);
            });
    }, [])
    // 将获取到的数据传递给页面组件
    return {
        data
    };
}

//查询对话数据库所有对话信息
export async function FetchConv() {
    // 这里可以是数据获取的逻辑，例如从 API 中获取数据
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:8080/queryallconv")
            .then(response => {
                // 处理来自后端的响应并将数据存储在状态中
                console.log('Conv received:', response.data.data);
                setData(response.data.data);
            }).catch(error => {
                console.error('Error fetching Conv:', error);
            });
    }, [])
    // 将获取到的数据传递给页面组件
    return {
        data
    };
}
