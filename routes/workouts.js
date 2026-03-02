const express = require('express');
const router = express.Router();

let workouts = {
    "Push Day": "Chest & Triceps",
    "Pull Day": "Back & Biceps",
    "Leg Day": "Legs & Abs"
};

/**
 * @description GET: Retreive all workouts
 */
router.get('/', (req, res) => {
    res.send(JSON.stringify(workouts, null, 4));
});

/**
 * @description GET: Retreive workout by day
 */
router.get('/:day', (req, res) => {
    const {day} = req.params;
    if (workouts[day]) {
        res.send(workouts[day]);
    } else {
        res.status(404).send("Workout not found");
    }
});

module.exports = router;