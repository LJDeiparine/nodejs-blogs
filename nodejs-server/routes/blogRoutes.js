
const express = require('express');
const blogController = require ('../controllers/blogController');
const router = express.Router();

router.get('/', blogController.blog_index);

router.post('/',  blogController.blog_create_post);

//Search
router.post('/search', blogController.blog_search);

router.get('/create', blogController.blog_create_get);

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);

//Delete
router.delete('/', blogController.blog_delete_all);


module.exports = router;