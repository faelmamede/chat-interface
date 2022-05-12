import React from 'react'
import userImg from '../../images/user.png';

import './Nav.css'

function activeUser(id) {
    document.querySelector('.active')?.classList.remove('active');
    document.getElementById(id).classList.add('active');
}

function Nav(props) {
    return (
        <aside className='menu'>
            <header className='user user-connected'>
                <div className='info-user'>
                    <img src={userImg} alt="User" />
                    <h1>Nickname</h1>
                </div>
                <div className='status'></div>
            </header>

            <section>
                <div className='user' id='user1' onClick={() => activeUser('user1')}>
                    <h2>User 1</h2>
                    <div className='status'></div>
                </div>
                <div className='user' id='user2' onClick={() => activeUser('user2')}>
                    <h2>User 2</h2>
                    <div className='status'></div>
                </div>
            </section>
        </aside>
    )
}

export default Nav