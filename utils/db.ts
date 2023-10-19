import {createPool} from "mysql2/promise";

export const pool = createPool({
    data: '',
    host: 'localhost',
    user: 'root',
    database: 'megak_santa_giftlist',
    namedPlaceholders: true,
    decimalNumbers: true,
});
