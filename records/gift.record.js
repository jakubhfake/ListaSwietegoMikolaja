const {v4: uuid} = require("uuid");
const {ValidationError} = require("../utils/errors");
const {pool} = require("../utils/db");

class GiftRecord {
    constructor(obj) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 50) {
            throw new ValidationError('Nazwa prezentu musi mieć od 3 do 50 znaków!!!');
        }
        if (!obj.count || obj.count.length < 1 || obj.count.length > 999999) {
            throw new ValidationError('Liczba przezentów powinna mieścić się w przedziale od 1 do 999999 szt.!!!');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.count = obj.count;
    }

    async insert() {
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

    static async listAll() {
        const [results] = await pool.execute("SELECT * FROM `gifts`");
        return results.map(obj => new GiftRecord(obj));
    }

    static async getOne(id) {
        const [results] = await pool.execute("SELECT * FROM `gifts` WHERE `id` = :id", {
            id,
        });
        return results.length ===  0 ? null : new GiftRecord(results[0]);
    }

    async countGivenGift() {
        const [[{count}]] /* answer[][].count */ = await pool.execute("SELECT COUNT(*) AS `count` FROM `children` WHERE `giftId` = :id", { id: this.id,});
        return count;
    }
}

module.exports = {
    GiftRecord,
};