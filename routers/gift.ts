import {Router} from "express";

import {GiftRecord} from "../records/gift.record";
import {ValidationError} from "../utils/errors";


export const giftRouter = Router();

giftRouter

    .get('/', async (req, res) => {
        const giftsList = await GiftRecord.listAll();
        res.json( {
            giftsList,
        });
    })
    .post('/', async (req, res) => {
        const data = {
            ...req.body,
            count: Number(req.body.count),
        };

        const newGift = new GiftRecord(data);
        await newGift.insert();

        res.redirect('/gift');
    })
    .delete('/:id', async (req, res) => {
        const gift = await GiftRecord.getOne(req.params.id);

        if(!gift) {
            throw new ValidationError('No such gift!');
        }

        if (await gift.countGivenGift() > 0) {
            throw new ValidationError('Cannot remove given gift.');
        }
        console.log('gift', gift);
        await gift.delete();

        res.end();
    });
