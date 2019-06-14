const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const controller = {

  resources: {
    base: "/posts",
    like: "/posts/:id/like"
  },

  async get(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },
  
  async post(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;
    const name = image.split('.')[0];
    const formatedName = name.replace(new RegExp(' ', 'g'), '_')
                             .normalize('NFD')
                             .replace(/[\u0300-\u036f]/g, ""); 
    const fileName = `${formatedName}.jpg`;

    await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 70})
            .toFile(
              path.resolve(req.file.destination, 'resized', fileName)
            );

    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName
    });

    req.io.emit('post', post);

    return res.json(post);
  },

  async postLike(req, res) {
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    req.io.emit('like', post);

    return res.json(post);
  }
};

module.exports = controller;