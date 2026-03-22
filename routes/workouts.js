const express = require('express');
const workoutRouter = express.Router();
const { workouts } = require('../database/db');


workoutRouter.get('/', (req, res) => {
    res.send(JSON.stringify(workouts, null, 4));
});

workoutRouter.get('/:day', (req, res) => {
    const {day} = req.params;
    if (workouts[day]) {
        res.send(workouts[day]);
    } else {
        res.status(404).send("Workout not found");
    }
});

module.exports = workoutRouter;