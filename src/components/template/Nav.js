import React from 'react'
import userImg from '../../images/user.png';

import './Nav.css'

function Nav(props) {
    const userConnected = {nickname: 'Bruna', status: 'online'}

    const users = [
        {name: 'Bruno', status: 'online'},
        {name: 'Rafael', status: 'absent'},
        {name: 'João', status: 'offline'},
    ];

    function activeUser(id) {
        document.querySelector('.active')?.classList.remove('active');
        document.getElementById(id).classList.add('active'); 
        document.querySelector('.chat-container').classList.add('display');
    }
    
    return (
        <aside className='menu'>
            <header className='user user-connected'>
                <div className='info-user'>
                    <img src={userImg} alt="User" />
                    <h1>{userConnected.nickname}</h1>
                </div>
                <div className={userConnected.status}></div>
            </header>

            <section>
                {users.map((user) => (
                    <div key={user.name} className='user' id={user.name} onClick={() => activeUser(user.name)}>
                        <h2>{user.name}</h2>
                        <div className={user.status}></div>
                    </div>
                ))}
            </section>
        </aside>
    )
}

export default Nav