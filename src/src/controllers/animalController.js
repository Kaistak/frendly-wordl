const router = require('express').Router();
const animalManager = require('../managers/animalManager');
const {isAuth} = require('../middlewares/authMIddleware');
const {getErrorMessage} = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    const animal = await animalManager.getAll();

    res.render('dashboard', {animal});
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create',isAuth, async (req, res) => {
    const animalData = {
        ...req.body,
        owner: req.user._id
    }

    try {
        await animalManager.create(req.user._id, animalData);
        res.redirect('/catalog');
    } catch(error) {
        res.status(400).render('create', {error: getErrorMessage(error)});
    }
   
});

router.get('/:animalId/details', async (req, res) => {
    const animal = await animalManager.getOne(req.params.animalId).lean();
    const isOwner = req.user?._id == animal.owner._id;

    res.render('details', {animal, isOwner});
});

router.get('/:animalId/edit', async (req, res) => {

    try {
        const animal = await animalManager.getOne(req.params.animalId).lean();
        res.render('edit', {animal});
    } catch(error) {
        res.render('edit', {error: getErrorMessage(error)});
    }
});

router.post('/:animalId/edit', isAuth, async (req, res) => {
    const animalInfo = req.body;
    
    try{
        await animalManager.edit(req.params.animalId, animalInfo);
        res.redirect(`/${req.params.animalId}/details`);
    } catch(error) {
        const animal = await animalManager.getOne(req.params.animalId)
        res.render('edit', {animalInfo: animalInfo, error: getErrorMessage(error)})
    }
});

router.get('/:animalId/delete', isAuth, async (req, res) => {
    
    try {
        await animalManager.delete(req.params.animalId)
    } catch(error) {
        res.status(400).redirect('/404', {error: getErrorMessage(error)});
    }

    res.redirect('/catalog');
});

router.get('/search', async (req, res) => {

    

    res.render('search')
})


module.exports = router;