import { Router } from 'express'
import passport from '../config/passport.config'
import { sign } from 'jsonwebtoken';
import { jwtSecret } from '../config/jwt.config'

const r = Router()

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login user.
 *    tags:
 *      - auth
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: creds
 *        required: true
 *        description: The creds to login.
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      201:
 *        description: Created      
 */
r.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const { password, ...user } = req.user as { password: string, id: any }
  const token = sign({ id: user.id }, jwtSecret)
  res.send({ token, user })
})

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Register user.
 *    tags:
 *      - auth
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: creds
 *        required: true
 *        description: The creds to register.
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      200:
 *        description: Created      
 */
r.post('/register', passport.authenticate('register', { session: false }), (req, res) => {
  const { password, ...user } = req.user as { password: string, id: any }
  const token = sign({ id: user.id }, jwtSecret)
  res.send({ token, user })
})

export default r