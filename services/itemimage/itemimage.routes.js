const controller = require('./itemimage.controller');
const router = require("express").Router();
const { guard } = require('../../helper');
 const multerSetting = require("../../helper/multer").userImageUpload;


/*
 *  Add 
 */
router.post(
    "/create",
    
    multerSetting,
    
    controller.create
);

/*
 *  Get
 */
router.get(
    "/get",
    controller.get
);

/*
 *  Get by id
 */
router.get(
    "/:id",
    controller.getById
);


/*
 *  Update 
 */
router.put(
    "/:id",
     multerSetting,
   
    controller.update
);

/*
 *  Delete  
 */
router.delete(
    "/:id",
   
    controller.delete
);

module.exports = router