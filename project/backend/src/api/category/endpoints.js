const { Router } = require ('express');

const controller = require ('./controllers.js');


const router = Router ();

router.post   ('/', controller.createCategory);
router.get    ('/', controller.getAllCategories);
router.get    ('/:code_or_id', controller.getOneCategoryById);
router.put    ('/:code_or_id', controller.updateCategory);
router.delete ('/:code_or_id', controller.removeCategory);

module.exports = router;