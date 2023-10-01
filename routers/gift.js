const {GiftRecord} = require("../records/gift.record");

const {Router} = require("express");

const giftRouter = Router();

giftRouter

    .get('/', async (req, res) => {
        const giftsList = await GiftRecord.listAll();
        res.render('gifts/list', {
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
    });

module.exports = {
    giftRouter,
};
