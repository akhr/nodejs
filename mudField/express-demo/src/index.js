const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: "Course 1"},
    {id: 2, name: "Course 2"},
    {id: 3, name: "Course 3"},
]

app.get('/', (req, res) => {
    res.send(JSON.stringify(req.headers));
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id/', (req, res) => {
    let course = courses.find(function(c){
        return c.id == parseInt(req.params.id);
    });
    if(!course){
        res.status(404).send(`Course with ID ${req.params.id} not available`);
    }
    res.send(course);
});

app.get('/api/courses/:id/start/:year/:month/', (req, res) => {
    let resStr = {params: req.params, queryParams: req.query};
    res.write(JSON.stringify(resStr));
    res.end();
});

app.post('/api/courses/', (req, res) => {
    const schema = {
        name : Joi.string().min(3).required(),
        test : Joi.string().min(3).max(6).required()
    }

    const validateRes = Joi.validate(req.body, schema);
    if(validateRes.error){
        res.status(400).send(validateRes.error.details[0].message);
        return;
    }


    let newCourseName = req.body.name;
    let newCourseObj = {
        id : courses.length + 1,
        name: newCourseName
    }
    courses.push(newCourseObj);
    res.send(newCourseObj);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on PORT - ${port}`);
});



