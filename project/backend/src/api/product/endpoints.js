const { Router } = require ('express');

const controller = require ('./controllers.js');


const router = Router ();

router.post   ('/', controller.createProduct);
router.get    ('/', controller.getAllMyProducts);
router.get    ('/:code_or_id', controller.getOneProductById);
router.put    ('/:code_or_id', controller.updateProduct);
router.delete ('/:code_or_id', controller.removeProduct);

module.exports = router;