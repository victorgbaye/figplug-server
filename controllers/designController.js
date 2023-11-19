const Design  = require('../models/Design')
const { StatusCodes } = require('http-status-codes');
const customError = require('../errors')

const createDesign = async(req, res) =>{
    req.body.user = req.user.userId;
    const design  = await Design.create(req.body)
    res.status(StatusCodes.CREATED).json({design})
}

const getAllDesign = async(req, res) =>{
    const design = await Design.find({})

    res.status(StatusCodes.OK).json({design, count: design.length})
}

const getSingleDesign = async(req, res) =>{
    const {id: designID} = req.params
    const design = await Design.findOne({_id: designID})
    if(!design){
        throw new customError.NotFoundError(`No design with id: ${designID}`)
    }
    res.status(StatusCodes.OK).json({design})

}

const updateDesign = async(req, res) =>{
    const { id: designID } = req.params;

    const design = await Design.findOneAndUpdate({ _id: designID }, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!design) {
      throw new customError.NotFoundError(`No design with id : ${productId}`);
    }
  
    res.status(StatusCodes.OK).json({ design });
}
const deleteDesign = async(req, res) =>{
     const { id: designID } = req.params;

  const design = await Design.findOne({ _id: designID });

  if (!design) {
    throw new customError.NotFoundError(`No design with id : ${designID}`);
  }

  await design.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! design removed.' });
}
const uploadImage = async(req, res) => {
    res,send('upload image')
}

module.exports = {createDesign, getAllDesign, getSingleDesign, updateDesign, deleteDesign, uploadImage}