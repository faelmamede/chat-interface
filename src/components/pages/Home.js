import React, { useState } from 'react'
import userImg from '../../images/user.png';
import MessageBalloon from '../template/MessageBalloon';

import './Home.css'

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
        const hour = new Date().getHours();
        const minute = new Date().getMinutes();
        const time = hour + ':' + minute;
        const updateMessages = [
            ...messages,
            {
                user: activeUser,
                text: message,
                time: time
            }
        ];
        setMessages(updateMessages);
        document.querySelector('#message').value = ''; 
    }

    return (
        <main className='chat-container'>
            <section className='user-screen'>
                <div className='user-info'>
                    <img src={userImg} alt="User" />
                    <h2>{activeUser}</h2>
                </div>
                <section className='user-messages'>
                    {messages.map(msg => 
                        <MessageBalloon sendMessage="send-message" text={msg.text} user={msg.user} activeUser={activeUser} time={msg.time} />
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