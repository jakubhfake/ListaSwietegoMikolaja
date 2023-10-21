import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";
import {ChildEntity} from "../types/child-entity";


class ChildRecord implements ChildEntity {
    id?: string;
    name: string;
    giftId: string;

    constructor(obj: ChildEntity) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 25) {
            throw new ValidationError('Imię dziecka musi mieć od 3 do 25 znaków!!!');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.giftId = obj.giftId;

    }

    async insert() {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `children`(`id`, `name`) VALUES(:id, :name)", {
            id: this.id,
            name: this.name,
        });
        //    Możemy ale nie musimy w tym miejscu zwracać id
        return this.id;

    }

       static async listAll() {
           const [results] = await pool.execute("SELECT * FROM `children` ORDER BY `name` ASC");
           return results.map(obj => new ChildRecord(obj));
       }

       static async getOne(id) {
           const [results] = await pool.execute("SELECT * FROM `children` WHERE `id` = :id", {
               id,
           });
           return results.length === 0 ? null : new ChildRecord(results[0]);
       }

    async update() {
        console.log('this.giftId:',this.giftId);

        await pool.execute("UPDATE `children` SET `name` = :name, `giftId` = :giftId WHERE `id` = :id", {
            id: this.id,
            name: this.name,
            giftId: this.giftId,
        });


    }

}

module.exports = {
    ChildRecord,
};