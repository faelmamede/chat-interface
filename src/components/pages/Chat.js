import React from 'react'
import userImg from '../../images/user.png';

import './Chat.css'

function Chat(props) {
    return (
        <main className='chat-container'>
            <section className='user-screen'>
                <div className='user-info'>
                    <img src={userImg} alt="User" />
                    <h2>User 1</h2>
                </div>
                <section className='user-messages'>
                    
                </section>
            </section>
            <section className='user-keyboard'>
                <input type="text" />
                <button></button>
            </section>
        </main>
    )
}

export default Chat