import {createPool} from "mysql2/promise";
import {PoolOptions} from "mysql2";

const access: PoolOptions = {
    data: '',
    host: 'localhost',
    user: 'root',
    database: 'megak_santa_giftlist',
    namedPlaceholders: true,
    decimalNumbers: true,
};

export const pool = createPool(access);