import React from 'react'
import { useState } from 'react'
import { SkyWay } from './SkyWay'

export const WithoutSensor = () => {
  const [galic, setGalic] = useState(0)
  const [called, setCalled] = useState(false)

  return (
    <div>
      <SkyWay galic={galic} setCalled={setCalled} />
      <button disabled={!called} onClick={() => setGalic(galic + 1)}>にんにく増量</button>
    </div>

  )
}
