const { Router } = require ('express');

const controller = require ('./controllers.js');


const router = Router ();

router.post   ('/', controller.createUser);
router.get    ('/', controller.getAllUsers);
router.get    ('/:code_or_id', controller.getOneUserById);
router.put    ('/:code_or_id', controller.updateUser);
router.delete ('/:code_or_id', controller.removeUser);

module.exports = router;