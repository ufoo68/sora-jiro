import React from 'react'
import { useEffect, useState } from 'react'
import { SkyWay } from './SkyWay'
import { Input, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
})

export const WithSensor = () => {
  const [host, setHost] = useState('wss://obniz.io')
  const [galic, setGalic] = useState(0)
  const [data, setData] = useState(0)
  const [sensorId, setSensorId] = useState('')
  const [connectable, setConnectable] = useState(true)
  const [called, setCalled] = useState(false)

  const classes = useStyles()

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
    <div className={classes.root}>
      {connectable ?
        <div>
          <Input value={sensorId} onChange={e => setSensorId(e.target.value)}></Input>
          <Button onClick={connectSensor}>デバイスに接続</Button>
        </div> : <></>}
      <SkyWay galic={galic} setCalled={setCalled} />
    </div>
  )
}
