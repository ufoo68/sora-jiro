import React from 'react'
import { Link } from "react-router-dom"
import { Card, Box, CardMedia, CardContent, Typography, CardActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Device from './assets/device.png'
import Jiro from './assets/jiro.png'
import Logo from './assets/logo.jpg'

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  card: {
    maxWidth: 400,
    margin: 10,
  },
  media: {
    height: 140,
  },
  credit: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
})

export const App = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <img src={Logo} />
      <Box display="flex" justifyContent="center" flexDirection="row">
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={Device}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="left">
              🧄ニンニクセンサーあり🧄
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p" align="left">
              ニンニクセンサーデバイスを使って「リモート二郎」に参加します。
          </Typography>
          </CardContent>
          <CardActions>
            <Link to='/withsensor'>開始</Link>
          </CardActions>
        </Card>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={Jiro}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="left">
              🧄ニンニクセンサーなし🧄
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p" align="left">
              ニンニクセンサーデバイスを使わないで「リモート二郎」に参加します。
          </Typography>
          </CardContent>
          <CardActions>
            <Link to='/withoutsensor'>開始</Link>
          </CardActions>
        </Card>
      </Box>
      <footer className={classes.credit}>Logo is created by <a href="https://www.designevo.com/jp/logo-maker/">DesignEvo</a></footer>
    </div>
  )
}
