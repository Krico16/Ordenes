var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Ordenes'
  });
});

router.post('/', function (req, res, next) {
  var user = req.body.UserMail;
  var pass = req.body.UserPass;


});

module.exports = router;