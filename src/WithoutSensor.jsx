import React from 'react'
import { useState } from 'react'
import { SkyWay } from './SkyWay'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
})

export const WithoutSensor = () => {
  const [galic, setGalic] = useState(0)
  const [called, setCalled] = useState(false)

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SkyWay galic={galic} setCalled={setCalled} />
      <Button disabled={!called} variant="contained" color="secondary" onClick={() => setGalic(galic + 1)}>
        ニンニク増量
      </Button>
    </div>

  )
}
