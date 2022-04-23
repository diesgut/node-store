const express = require("express");
const faker = require("faker");
const app = express();
const port = 3000;

let products=[];

(function () {

    //load products
    for (let index = 0; index < 100; index++) {
        products.push(
            {
                id:index,
                name: faker.commerce.productName(),
                price: parseInt( faker.commerce.price() ),
                image: faker.image.imageUrl()
            }
        );
    }
  }
)();

app.get("/", (req, res) =>{
    res.send("Hola mi server en Express");
});

app.get("/products", (req, res) =>{
    res.json(products);
});

app.get("/products/:id", (req, res) =>{
  //  const productId=req.params.id;
    const { id }=req.params;
    let product= {
            productId: id,
            name: 'Product 1',
            price: 1000
        };
    res.json(product);
});

app.get("/users", (req, res) =>{
    const {limit, offset}=req.query;
    if(limit && offset){
        res.json({limit,offset});
        return;
    }
    res.send('no hay query params');
});


app.listen(port, () =>{
    console.log("My port: " + port);
});
