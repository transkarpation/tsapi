import express from 'express';
import morgan from 'morgan';
import conf from './config';
import { routesWhiteList } from './config/jwt.config';
import { authenticateJwt } from './middlewares/jwt.mw';
import routes from './routes';
import passport from './config/passport.config';

const PORT = conf.app.PORT;
const app = express();

app.use(morgan('tiny'))
app.use(express.json())
app.use(passport.initialize())
app.use('/api-docs', conf.swagger.serve, conf.swagger.setup)
app.use(authenticateJwt(routesWhiteList), routes)

export default {
  run() {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`)
    })
  }
}