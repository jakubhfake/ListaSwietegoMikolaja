import {FieldPacket} from "mysql2";
import {GiftEntity} from "../types";

export const {v4: uuid} = require("uuid");
export const {ValidationError} = require("../utils/errors");
export const {pool} = require("../utils/db");

type GiftRecordResult = [GiftRecord[], FieldPacket[]]
export class GiftRecord implements GiftEntity{
    id?: string;
    name: string;
    count: number;
    constructor(obj: GiftRecord) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 50) {
            throw new ValidationError('Nazwa prezentu musi mieć od 3 do 50 znaków!!!');
        }
        if (!obj.count || obj.count < 1 || obj.count > 999999) {
            throw new ValidationError('Liczba przezentów powinna mieścić się w przedziale od 1 do 999999 szt.!!!');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.count = obj.count;
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `gifts` VALUES(:id, :name, :count)", {
            id: this.id,
            name: this.name,
            count: this.count,
        });
    //    Możemy ale nie musimy w tym miejscu zwracać id
        return this.id;

    }

    static async listAll(): Promise<GiftRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `gifts`") as GiftRecordResult;
        return results.map(obj => new GiftRecord(obj));
    }

    static async getOne(id: string): Promise<GiftRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `gifts` WHERE `id` = :id", {
            id,
        }) as GiftRecordResult;
        return results.length ===  0 ? null : new GiftRecord(results[0]);
    }

    async delete(): Promise<void> {
            await pool.execute("DELETE FROM `gifts` WHERE `id` = :id", {
            id: this.id,
        });
    }

    async countGivenGift(): Promise<number> {
        const [[{count}]] /* answer[][].count */ = await pool.execute("SELECT COUNT(*) AS `count` FROM `children` WHERE `giftId` = :id", { id: this.id,}) as GiftRecordResult;
        return count;
    }
}