import React, { useState } from 'react';
import axios from 'axios';

import userImg from '../../images/user.png';
import refreshImage from '../../images/refresh.svg';
import MessageBalloon from '../template/MessageBalloon';

import './Home.css'

const baseURL = process.env.REACT_APP_SERVER_ENDPOINT;
const nickname = process.env.REACT_APP_NICKNAME;

function Home(props) {
    const [activeUser, setActiveUser] = useState('user');
    const [messages, setMessages] = useState([{
        user: '', 
        text: '', 
        time: ''
    }]);

    window.addEventListener('click', () => {
        const users = document.querySelectorAll('.user');
        users.forEach(user => {
            if(user.classList.contains('active')) {
                setActiveUser(user.id);
            }
        })
    });

    function sendMessage() {
        const message = document.querySelector('#message').value;

        axios.post(`${baseURL}/chat/sendMessage`, {
            from: nickname,
            to: activeUser,
            message: message
        }).then(response => {
            const time = new Date(response.data);
            const hour = time.getHours();
            const minute = time.getMinutes();
            const hourAndMinute = hour + ':' + minute;
            const updateMessages = [
                ...messages,
                {
                    user: activeUser,
                    text: message,
                    time: hourAndMinute,
                    flow: 'sent'
                }
            ];
            setMessages(updateMessages);
            document.querySelector('#message').value = '';
        });
    }

    function getMessages() {
        axios.post(`${baseURL}/chat/getAllMessages`, {
            talkers: [ nickname, activeUser ]
        }).then(response => {
            setMessages(response.data.map(messageObj => {
                const time = new Date(messageObj.time);
                const hour = time.getHours();
                const minute = time.getMinutes();
                const hourAndMinute = hour + ':' + minute; 
                messageObj.flow = messageObj.from === nickname? 'sent' : 'received';
                messageObj.user = messageObj.to !== nickname ? messageObj.to : messageObj.from;
                messageObj.text = messageObj.message;
                messageObj.time = hourAndMinute;
                return messageObj;
            }));
            axios.delete(`${baseURL}/user/deleteNotification`, { data: {
                from: activeUser,
                to: nickname
            }}).then(response => 
                scrollMessageContainer());
        });
    }

    function scrollMessageContainer() {
        setTimeout(() => {
            const messageContainer = document.querySelector('.user-messages');
            messageContainer.scrollTop = messageContainer.scrollHeight; 
        }, 50)
    }

    return (
        <main className='chat-container'>
            <section className='user-screen'>
                <div className='user-info'>
                    <img src={userImg} alt="User" />
                    <h2>{activeUser}</h2>
                    <div className='reload-messages' onClick={() => getMessages()}>
                        <img src={refreshImage} alt="Refresh" />
                    </div>
                </div>
                <section className='user-messages'>
                    {messages.map(msg => 
                        <MessageBalloon sendMessage={`${msg.flow}-message`} text={msg.text} user={msg.user} activeUser={activeUser} time={msg.time} />
                    )}
                </section>
            </section>
            <section className='user-keyboard'>
                <input 
                    id='message' 
                    type="text" 
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            sendMessage()
                        }
                    }}
                />
                <button onClick={() => {sendMessage()}}></button>
            </section>
        </main>
    )
}

export default Home