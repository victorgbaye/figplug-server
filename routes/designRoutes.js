const express = require('express');
const router = express.Router();

const {createDesign, getAllDesign, getSingleDesign, updateDesign, deleteDesign} = require('../controllers/designController');


router
  .route('/')
  .post(createDesign)
  .get(getAllDesign);


router
  .route('/:id')
  .get(getSingleDesign)
  .patch(updateDesign)
  .delete(deleteDesign);

module.exports = router;