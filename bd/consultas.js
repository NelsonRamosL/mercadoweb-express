const { Pool } = require("pg");
const pool = new Pool({
user: "postgres",
host: "localhost",
password: "1234",
database: "mercadoweb",
port: 5432,
});

async function nuevoCarrito(nombre) {
try {
const result = await pool.query(
`INSERT INTO carrito (nombre) values ('${nombre}') RETURNING *`
);
return result.rows;
} catch (e) {
return e;
}
}



async function getCarrito() {
    try {
    const result = await pool.query(`SELECT * FROM carrito`);
    return result.rows;
    } catch (e) {
    return e;
    }
    }
    

module.exports = { nuevoCarrito,getCarrito  };
