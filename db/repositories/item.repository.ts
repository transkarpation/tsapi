import { EntityRepository, Repository } from "typeorm";
import { Item } from "../entities/item";

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {

}