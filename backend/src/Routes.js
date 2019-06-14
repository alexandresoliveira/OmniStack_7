const express = require('express');
const multer = require('multer');
const UploadConfig = require('./config/upload')
const PostController = require('./controllers/PostController')

const routes = new express.Router();
const upload = multer(UploadConfig);

// Posts
routes.get(PostController.resources.base, PostController.get);
routes.post(PostController.resources.base, upload.single('image'), PostController.post);
routes.post(PostController.resources.like, PostController.postLike);

module.exports = routes;