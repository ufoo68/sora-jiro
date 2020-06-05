import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [host, setHost] = useState('wss://obniz.io')
  const [data, setData] = useState('')
  useEffect(() => {
    const socket = new WebSocket(host + '/obniz/7642-7710/ws/1')
    socket.onmessage = (event) => {
      const arr = JSON.parse(event.data)
      for (let i = 0; i < arr.length; i++) {
        const obj = arr[i]
        if (obj.ws && obj.ws.redirect) {
          socket.onmessage = null
          socket.close()
          setHost(obj.ws.redirect)
        }
        if (obj.ws && obj.ws.ready) {
          socket.send(JSON.stringify([
            {
              io0: {
                direction: "output",
                value: true
              },
            },
            {
              ad1: {
                stream: true
              }
            },
            {
              io2: {
                direction: "output",
                value: false
              },
            },
          ]))
        }
        if(obj.ad1) {
          setData(obj.ad1)
        }
      }
    }
  }, [host])
  return (
    <div>{data}</div>
  )
}

export default App
