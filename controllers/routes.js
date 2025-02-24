import express from 'express';
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('registration');
});

router.get('/home', (req, res) => {
    res.render('home');
});

export default router;
