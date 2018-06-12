const express = require('express');
const Joi= require('joi');
var router = express.Router();
const app= express() 
const  bodyParser = require('body-parser');
const PORT=3003;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var movies = [
    {
        id: 1, 
        name: "Fight Club", 
        year: 1999, 
        rating: 8.1
    },
    {
        id: 2, 
        name: "Inception", 
        year: 2010,
        rating: 8.7
    },
    {
        id: 3,
        name: "The Dark Knight", 
        year: 2008, 
        rating: 9
    },
    {
        id: 4, 
        name: "12 Angry Men", 
        year: 1957, 
        rating: 8.9
    }
 ];

//GET DATA 
app.get("/", (req, res) => {
    res.json(movies)
})

//GET DATA BY ID PARAMETER
app.get("/:id", (req, res) => {
    const movie = movies.find(m=> m.id===parseInt(req.params.id));
    if(!movie) res.status(404).send("Error not Found") ;
    res.json(movie);
});

//POST DATA
app.post("/",(req,res)=>{

    const {error} = validateInput(req.body)
        if(error){
            res.status(400).send(error.details[0].message);
            return;
        }
    movies.push({
        id: movies.length+1,
        name: req.body.name,
        year: req.body.year,
        rating: req.body.rating
    })
    res.json(movies);
})

//PUT DATA
app.put("/:id",(req,res)=>{

        const movie = movies.find(m=> m.id===parseInt(req.params.id));
        if(!movie) res.status(404).send("Error not Found") ;

        const {error} = validateInput(req.body)
        if(error){
            res.status(400).send(error.details[0].message);
            return;
        }

        movie.name=req.body.name;
        movie.year=req.body.year;
        movie.rating=req.body.rating;
        res.json(movies);
    })

//Delete Data
app.delete("/:id",(req,res)=>{
    const movie = movies.find(m=> m.id===parseInt(req.params.id));
    if(!movie) res.status(404).send("Error not Found") ;

    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.json(movies);

})
//Validation of Input
function validateInput(movies){
    const schema={
        name: Joi.string().min(3).required(),
        year:Joi.number().required(),
        rating:Joi.number().required()
    };
    return Joi.validate(movies, schema);
}
app.listen(PORT,()=> console.log(`The server is listening at Port ${PORT}`))
//module.exports = router;
 