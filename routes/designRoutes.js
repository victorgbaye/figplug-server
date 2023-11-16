const express = require('express');
const router = express.Router();

const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');

const {createDesign, getAllDesign, getSingleDesign, updateDesign, deleteDesign, uploadImage} = require('../controllers/designController');


router
  .route('/')
  .post([authenticateUser, authorizePermissions('admin')],createDesign)
  .get(getAllDesign);


  router
  .route('/uploadImage')
  .post([authenticateUser, authorizePermissions('admin')], uploadImage);

router
  .route('/:id')
  .get(getSingleDesign)
  .patch([authenticateUser, authorizePermissions('admin')],updateDesign)
  .delete([authenticateUser, authorizePermissions('admin')],deleteDesign);

module.exports = router;