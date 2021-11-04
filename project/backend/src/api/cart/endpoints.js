const { Router } = require ('express');

const controller = require ('./controllers.js');


const router = Router ();

router.get ('/', controller.getCart);
router.put ('/', controller.updateCart);

module.exports = router;