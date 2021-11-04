const { Router } = require ('express');

const { routes: categoryRoutes } = require ('./category');
const { routes: colorRoutes } = require ('./color');


const router = Router ();

router.use ('/categories', categoryRoutes);
router.use ('/colors', colorRoutes);


module.exports = router;