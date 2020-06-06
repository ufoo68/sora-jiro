import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import Peer from 'skyway-js'
import { Input, Button, Box } from '@material-ui/core'
import CallIcon from '@material-ui/icons/Call'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
})

export const SkyWay = ({ galic, setCalled }) => {
  const peer = new Peer({ key: process.env.REACT_APP_SKYWAY_KEY })
  const [myId, setMyId] = useState('')
  const [callId, setCallId] = useState('')
  const localVideo = useRef(null)
  const remoteVideo = useRef(null)
  const conn = useRef(null)
  const [recvGalic, setRecvGalic] = useState(0)
  const [galicable, setGalicable] = useState(false)

  const classes = useStyles()

  useEffect(()=> {
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
  }, [])

  const makeCall = () => {
    const mediaConnection = peer.call(callId, localVideo.current.srcObject)
    conn.current = peer.connect(callId)
    mediaConnection.on('stream', async stream => {
      remoteVideo.current.srcObject = stream
      await remoteVideo.current.play().catch(console.error)
      setCallId('')
      setGalicable(true)
    })
  }
  const myWindow = 400 + galic - recvGalic
  const peerWindow = 400 + recvGalic - galic
  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="center" flexDirection="row">
        <Box m={5}>
          <div>あなたのニンニク値：{galic}</div>
          <div>
            <video style={{ width: myWindow <= 600 ? myWindow : 600 }} autoPlay muted playsInline ref={localVideo} />
          </div>
        </Box>
        <Box m={5}>
          <div>あいてのニンニク値：{recvGalic}</div>
          <div>
            <video style={{ width: peerWindow <= 600 ? peerWindow : 600 }} autoPlay muted playsInline ref={remoteVideo} />
          </div>
        </Box>
      </Box>
      <div>あなたのID: {myId}</div>
      <Box display="flex" justifyContent="center" flexDirection="row">
        <Box m={2}>
          <Input value={callId} onChange={e => setCallId(e.target.value)} />
        </Box>
        <Box m={2}>
          <Button variant="contained" disableElevation startIcon={<CallIcon />} onClick={makeCall}>Call</Button>
        </Box>
      </Box>
      <div>
        <Button disabled={!galicable} 
          onClick={() => conn.current.send(galic)} color="primary">🧄ニンニクを投げる🧄</Button>
      </div>
    </div>
  )
}
