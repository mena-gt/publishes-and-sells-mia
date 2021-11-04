const { Router } = require ('express');

const controller = require ('./controllers.js');


const router = Router ();

router.post   ('/', controller.createColor);
router.get    ('/', controller.getAllColors);
router.get    ('/:code_or_id', controller.getOneColorById);
router.put    ('/:code_or_id', controller.updateColor);
router.delete ('/:code_or_id', controller.removeColor);

module.exports = router;