const router = require('express').Router();
const userManager = require('../managers/userManager');
const {isAuth} = require('../middlewares/authMIddleware');
const {getErrorMessage} = require('../utils/errorUtils');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const token = await userManager.login(email, password);
        res.cookie('auth', token);
        res.redirect('/');
    } catch(error) {
        res.status(400).render('login', {error: getErrorMessage(error)});
    }
   
});


router.get('/register', (req, res) => {
    res.render('register');
});


router.post('/register', async (req, res) => {
    const {email, password, repeatPassword} = req.body;

    try{
        const token = await userManager.register(email, password, repeatPassword);
        res.cookie('auth', token);
        res.redirect('/');
    } catch(error) {
        res.status(400).render('register', {error: getErrorMessage(error)});
    }
    
});

router.get('/logout',isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

module.exports = router;