import { Router } from 'express'
import authR from './auth.router'
import itemsR from './items.router'

const r = Router()

r.use('/auth', authR)
r.use('/items', itemsR)

export default r