const express = require("express");
const { nuevoCarrito, getCarrito } = require("./bd/consultas")
const app = express();
const exphbs = require("express-handlebars");
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});


/**
 * 
 * 5. Consumir los códigos fuentes de Bootstrap y jQuery a través de rutas o middlewares
creados en el servidor. Estas dependencias deben ser instaladas con NPM.
 * 
 */
app.set("view engine", "handlebars");
app.use(express.static("img"));

app.use('/bootstrap', express.static(__dirname +
    '/node_modules/bootstrap/dist/css'))

app.use('/js', express.static(__dirname +
    '/node_modules/bootstrap/dist/js'))

app.use('/jquery', express.static(__dirname +
    '/node_modules/jquery/dist'))


app.engine(
    "handlebars",
    exphbs({
        layoutsDir: __dirname + "/views",
        partialsDir: __dirname + "/views/componentes/",
    })
);



/**

 * 1. Crear una ruta raíz que al ser consultada renderice una vista con un parcial
“Dashboard” enviándole en el render un arreglo con los nombres de los productos. Se
recomienda que estos coincidan con las imágenes de cada producto.

 */

app.get("/", (req, res) => {
    res.render("main", {
        layout: "main",
        lenguajesFrontend: ["banana", "cebollas", "lechuga", "papas", "pimenton", "tomate"],
    });
});


app.get("/modal/:nombre", async (req, res) => {
  
    const { nombre } = req.params;
    const respuesta = await nuevoCarrito(nombre);
    
    res.send(respuesta);
    })

    app.get("/modal/", async (req, res) => {
        const respuesta = await getCarrito();
        console.log(respuesta);
        res.send(respuesta);
        })