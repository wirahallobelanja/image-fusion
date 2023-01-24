const express = require('express');

const emojis = require('./emojis');
const images = require('./controllers/imageRouters')

const router = express.Router();

// router.get('/', (req, res) => {
//   res.json({
//     message: 'API - 👋🌎🌍🌏',
//   });
// });

router.use('/', images)
router.use('/emojis', emojis);

module.exports = router;
