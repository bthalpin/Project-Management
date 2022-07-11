const router = require('express').Router();
const messageRoutes = require('./MessageRoutes');
const projectRoutes = require('./ProjectRoutes');

const taskRoutes = require('./TaskRoutes');
const taskGroupRoutes = require('./TaskGroupRoutes');

router.use('/messages', messageRoutes);
router.use('/project', projectRoutes);
router.use('/task', taskRoutes);
router.use('/taskGroup', taskGroupRoutes);

module.exports = router;
