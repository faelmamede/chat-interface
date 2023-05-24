import React from 'react'
import './MessageBalloon.css'

function MessageBalloon(props) {
  return(
    props.user === props.activeUser ? 
      <section className={props.sendMessage + " balloon"}>
        <p>{props.text}</p>
        <span>{props.time}</span>
      </section>
      : null
  )
}

export default MessageBalloon