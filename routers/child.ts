import {ValidationError} from "../utils/errors";
import {Router} from "express";
import {ListChildrenRes} from "../types";
import {GiftRecord} from "../records/gift.record";
import {ChildRecord} from "../records/child.record";

export const childRouter = Router();

childRouter

    .get('/', async (req, res) => {
        const childrenList = await ChildRecord.listAll();
        const giftsList = await GiftRecord.listAll();

        res.json( {
            childrenList,
            giftsList,
        } as ListChildrenRes);
    })
    .post('/', async (req, res) => {

        const newChild = new ChildRecord(req.body);
        await newChild.insert();

        res.json(newChild);
    })
    .patch('/gift/:childId', async (req, res) => {
        const child = await ChildRecord.getOne(req.params.childId);

        if(child === null) {
            throw new ValidationError('Dziecka o podanym ID nie ma na liście Św. Mikołaja, było chyba niegrzeczne :)')
        }

        const gift = req.body.giftId === '' ? null : await GiftRecord.getOne(req.body.giftId);

        if (gift) {
            if (gift.count <= await gift.countGivenGift()) {
                throw new ValidationError('Tego prezentu jest za mało w magazynie')
            }
            console.log('xxx:', gift.count, 'yyy:', await gift.countGivenGift());
        }

        // child.giftId = gift === null ? null : gift.id; //zais w starszej wersji JS
        child.giftId = gift?.id ?? null; // co to oznacza???
        await child.update();

        res.json(child);


    });

module.exports = {
    childRouter,
};
