import {Router} from 'express'
import ctrl from '../controllers/items.controller'

const r = Router()

/**
 * @swagger
 * /items:
 *  get:
 *    security:
 *      - Bearer: []
 *    description: Get message
 *    tags:
 *      - items
 *    responses:
 *      200:
 *        description: Success
 */
r.get('/', ctrl.getAll)

/**
 * @swagger
 * /items:
 *  post:
 *    security:
 *      - Bearer: []
 *    summary: Create new item.
 *    tags:
 *      - items
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: item
 *        required: true
 *        description: The item to create.
 *        schema:
 *          type: object
 *          required:
 *            - title
 *            - price
 *          properties:
 *            title:
 *              type: string
 *            price:
 *              type: number
 *    responses:
 *      201:
 *        description: Created      
 */
r.post('/', ctrl.create)

/**
 * @swagger
 * /items/{id}:
 *  put:
 *    security:
 *      - Bearer: []
 *    summary: update item.
 *    tags:
 *      - items
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the item to update
 *      - in: body
 *        name: item
 *        required: true
 *        description: The item to update.
 *        schema:
 *          type: object
 *          required:
 *            - title
 *            - price
 *          properties:
 *            title:
 *              type: string
 *            price:
 *              type: number
 *    responses:
 *      201:
 *        description: Updated      
 */
r.put('/:id', ctrl.put)

/**
 * @swagger
 * /items/{id}:
 *  delete:
 *    summary: delete item.
 *    security:
 *      - Bearer: []
 *    tags:
 *      - items
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the item to delete
 *    responses:
 *      204:
 *        description: Deleted      
 */
r.delete('/:id', ctrl.delete)

export default r