import React from 'react'
import { useEffect, useState } from 'react'
import { SkyWay } from './SkyWay'

export const WithSensor = () => {
  const [host, setHost] = useState('wss://obniz.io')
  const [galic, setGalic] = useState(0)
  const [data, setData] = useState(0)
  const [sensorId, setSensorId] = useState('')
  const [connectable, setConnectable] = useState(true)
  const [called, setCalled] = useState(false)

  const connectSensor = () => {
    const socket = new WebSocket(host + `/obniz/${sensorId}/ws/1`)
    socket.onmessage = (event) => {
      const arr = JSON.parse(event.data)
      for (let i = 0; i < arr.length; i++) {
        const obj = arr[i]
        if (obj.ws && obj.ws.redirect) {
          socket.onmessage = null
          socket.close()
          setHost(obj.ws.redirect)
          connectSensor()
        }
        if (obj.ws && obj.ws.ready) {
          setSensorId('')
          setConnectable(false)
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
        if (obj.ad1) {
          setData(Number(obj.ad1))
        }
      }
    }
  }
  useEffect(() => {
    if (data > 0.2 && called) {
      setGalic(galic + 1)
    }
  }, [data])
  return (
    <div>
      {connectable ?
        <div>
          <input value={sensorId} onChange={e => setSensorId(e.target.value)}></input>
          <button onClick={connectSensor}>デバイスに接続</button>
        </div> : <></>}
        <SkyWay galic={galic} setCalled={setCalled} />
    </div>
  )
}
