const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authControllers'); 
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/admin/pending', verifyToken, isAdmin, authCtrl.getPendingSellers);
router.post('/admin/approve', verifyToken, isAdmin, authCtrl.updateStatus);

module.exports = router;