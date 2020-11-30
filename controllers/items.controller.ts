import {Request, Response} from 'express'
import {getRepository} from "typeorm";
import {Item} from "../db/entities/item";

export default {
  async getAll(req: Request, res: Response) {
    const ItemRepo = getRepository(Item)
    const result = await ItemRepo.find()
    res.json(result)
    console.log(result)
  },

  async create(req: Request, res: Response) {
    const ItemRepo = getRepository(Item)
    const {title, price} = req.body
    console.log(req.body)
    const item = new Item()
    item.title = title
    item.price = price
    const result = await ItemRepo.save(item)
    res.status(201).send(result)
  },

  async put(req: Request, res: Response) {
    const {title, price} = req.body
    const {id} = req.params
    const ItemRepo = getRepository(Item)
    const item = await ItemRepo.findOne(id)
    if (item) {
      item.title = title
      item.price = price
      const result = await ItemRepo.save(item)
      res.status(201).send(result)
    }   
  },

  async delete(req: Request, res: Response) {
    const {id} = req.params
    const ItemRepo = getRepository(Item)
    try {
      const item = await ItemRepo.findOneOrFail(id)
      const result = await ItemRepo.remove(item)
      console.log(result)
      res.status(204).json(result)
    } catch (e) {
      console.log(e)
    }
  }
}