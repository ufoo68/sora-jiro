import React from 'react'
import { useState, useRef } from 'react'
import Peer from 'skyway-js'
const peer = new Peer({ key: process.env.REACT_APP_SKYWAY_KEY })

export const SkyWay = ({ galic, setCalled }) => {
  const [myId, setMyId] = useState('')
  const [callId, setCallId] = useState('')
  const localVideo = useRef(null)
  const remoteVideo = useRef(null)
  const conn = useRef(null)
  const [recvGalic, setRecvGalic] = useState(0)
  const [galicable, setGalicable] = useState(false)
  peer.on('open', () => {
    setMyId(peer.id)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(localStream => {
      localVideo.current.srcObject = localStream
    })
  })

  peer.on('call', mediaConnection => {
    mediaConnection.answer(localVideo.current.srcObject)
    setCalled(true)
  })

  peer.on('connection', (connection) => {
    connection.on('data', (data) => setRecvGalic(Number(data)))
  })

  const makeCall = () => {
    const mediaConnection = peer.call(callId, localVideo.current.srcObject)
    conn.current = peer.connect(callId)
    mediaConnection.on('stream', async stream => {
      remoteVideo.current.srcObject = stream
      await remoteVideo.current.play().catch(console.error)
    })
    setCallId('')
    setGalicable(true)
  }
  const myWindow = 400 + galic - recvGalic
  const peerWindow = 400 + recvGalic - galic
  return (
    <div>
      <div>あなたのにんにく値：{galic}</div>
      <div>あいてのにんにく値：{recvGalic}</div>
      <div>
        <video style={{ width: myWindow <= 600 ? myWindow : 600 }} autoPlay muted playsInline ref={localVideo} />
        <video style={{ width: peerWindow <= 600 ? peerWindow : 600 }} autoPlay muted playsInline ref={remoteVideo} />
      </div>
      <div>あなたのID: {myId}</div>
      <div>
        <input value={callId} onChange={e => setCallId(e.target.value)}></input>
        <button onClick={makeCall}>発信</button>
        <button disabled={!galicable} onClick={() => conn.current.send(galic)}>にんにくを投げる</button>
      </div>
    </div>
  )
}
