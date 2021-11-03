var express = require('express');
var router = express.Router();
const Post = require('../model/post');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
const {title, descrption} = req.body;
const post = new Post({title, descrption})
post.save((err, post) => {
  if (err) {
    res.send(err);
  }
  res.json(post);
})

})

module.exports = router;
