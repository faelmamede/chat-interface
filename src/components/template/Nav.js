import React, { Component } from 'react';
import axios from 'axios';
import userImg from '../../images/user.png';

import './Nav.css'

const baseURL = process.env.REACT_APP_SERVER_ENDPOINT;
const nickname = process.env.REACT_APP_NICKNAME;
const timeToLoad = process.env.REACT_APP_REFRESH_TIME;

export default class Nav extends Component {

    userConnected = { nickname: nickname, status: 'online' };
    state = { users: [] };

    constructor(props) {
        super(props);
        this.loadConnectedUsers();
        this.loadNotifications();
    }

    activeUser(id) {
        document.querySelector('.active')?.classList.remove('active');
        document.getElementById(id).classList.add('active'); 
        document.querySelector('.chat-container').classList.add('display');

        setTimeout(() => {
            document.querySelector('.reload-messages').click();
        }, 100);
    }

    loadConnectedUsers() {
        window.setInterval(() => {
            axios(`${baseURL}/user/getConnectedUsers`).then((response) => {
                const users = response.data.reduce((acc, current) => {
                    if (current.nickname !== nickname) {
                        acc.push(current);
                    }
                    return acc;
                },[])
                this.loadNotifications(users);
            });
        }, timeToLoad);
    }

    loadNotifications(users) {
        axios.post(`${baseURL}/user/getNotifications`, { nickname: nickname }).then((response) => {
            users.map(user => {
                user.notifications = response.data[user.nickname] ? response.data[user.nickname] : 0;
                return user;
            })
            this.setState({ users: users });
        });
    }
    
    render() {
        return (
        <aside className='menu'>
            <header className='user user-connected'>
                <div className='info-user'>
                    <img src={userImg} alt="User" />
                    <h1>{this.userConnected.nickname}</h1>
                </div>
                <div className={this.userConnected.status}></div>
            </header>

            <section>
                {this.state.users.map((user) => (
                    <div key={user.nickname} className='user' id={user.nickname} onClick={() => this.activeUser(user.nickname)}>
                        <h2>{user.nickname}</h2>
                        <div className={user.status}>
                            {user.notifications ? user.notifications : null}
                        </div>
                    </div>
                ))}
            </section>
        </aside>
    )}
    
}