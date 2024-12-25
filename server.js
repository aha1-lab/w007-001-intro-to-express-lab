const express = require("express");
const app = express();

// 1. Be Polite, Greet the User
app.get("/greeting/:username",(req,res)=>{
    const username = req.params.username;
    res.send(`<p style="font-size:25px">What a delight it to see you once more, 
        ${username} </p>`);
})


// 2. Rolling the Dice
app.get("/roll/:number",(requist,respond)=>{
    const number = requist.params.number;
    if(isNaN(Number(number))){
        respond.send("You must specify a number");
    }else{
        const randomNumber = Math.ceil(Math.random() * Number(number))
        respond.send(`You rolled a ${randomNumber}.`)
    }
})


// 3. I Want THAT One!
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get("/collectibles/:index", (req,res)=>{
    const index = req.params.index;
    if(index > (collectibles.length-1)){
        res.send(`This item is not yet in stock. Check back soon!`)
    }else{
        res.send(`So, you want the ${collectibles[index].name}? 
            For $${collectibles[index].price}, it can be yours!`)
    }
})

//  Using Query Parameters
// 4. Filter Shoes by Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get("/shoes",(req,res)=>{
    const min_price = req.query.min_price;
    const max_price = req.query.max_price;
    const type = req.query.type;

    let filterdShoes = shoes
    if(min_price !== undefined){
        filterdShoes = filterdShoes.filter((shoe)=>{
            return shoe.price > min_price;
        })
    }
    if(max_price !== undefined){
        filterdShoes = filterdShoes.filter((shoe)=>{
            return shoe.price < max_price;
        })
    }
    if(type !== undefined){
        filterdShoes = filterdShoes.filter((shoe)=>{
            return shoe.type.toLowerCase() == type.toLowerCase();
        })
        
    }
    res.send(filterdShoes)

})

app.listen(3000,()=>{
    console.log("listening on port 3000");
})