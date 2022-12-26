const router = require('express').Router();
const user = require('../controllers/user.controller');

// insert user
router.post('/user', user.insert);

// retrieve all users
router.get('/user', user.findAll);

// retrieve user by uid
router.get('/user', user.findOne);

// update user by uid
router.put('/user/:uid', user.update);

// delete user by uid
router.delete('/user/:id', user.delete);


module.exports = router;