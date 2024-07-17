const router = require('express').Router();
const auth = require('../controllers/authControllers');

  //  base path = "/api/auth"
  
  router.post('/login', auth.login)


module.exports = router;