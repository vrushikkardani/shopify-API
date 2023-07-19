const Service = require('./itemimage.services');
const Model = require('./itemimage.model');
const _ = require('lodash');
const moment = require('moment');
const { commonResponse } = require("../../helper");

module.exports = {

    /**
     * Add
     */
    create: async (req, res, next) => {
        
        try {
           
            
            let filesArray = [];
            req.files.forEach(element => {
                const file = {
                    fileName:element.originalname
                }
                
                filesArray.push(file)
                
            });
            const multipleFiles = new Model({
                item_Id:req.body.item_Id, 
               files:filesArray
            })
            let data = await multipleFiles.save();
            


            if (data) {
                
                return commonResponse.success(res, "ITEM_DETAILS_SAVE", 200, data, 'Success');
            } else {
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, 'Something went wrong, Please try again');
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }

    },

    /**
     * Get
     */
    get:async(req,res,next) =>{
        try {
            let data = await Service.get();
            if(data){
                return commonResponse.success(res, "VARIANT_GET", 200, data, 'Success');
            }else{
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, 'Something went wrong, Please try again');
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {},error.message);
        }
    },

    //  READ
    // list: async (req, res, next) => {

    //     try {
    //         // let data =await Service.list(req.params.id);
    //         let data = await Service.list(req.query);
    //         if (data) {
    //             return commonResponse.success(res, "ITEMIMAGE_GET", 200, data, 'Success');
    //         } else {
    //             return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, 'Something went wrong, Please try again');
    //         }
    //     } catch (error) {

    //         return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500)
    //     }
    // },

    /**
     * Get by id
     */
    getById: async (req, res, next) => {
        try {
            let data = await Service.getById(req.params.id);
            if (data) {
                return commonResponse.success(res, "ITEM_GET", 200, data, 'Success');
            } else {
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, 'Something went wrong, Please try again');
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },
    /**
     * Update
     */
    update: async (req, res, next) => {
        try {
            let filesArray = [];
            req.files.forEach(element => {
                const file = {
                    fileName:element.originalname
                }
                
                filesArray.push(file)
                
            });
            const multipleFiles = new Model({
                item_Id:req.body.item_Id, 
               files:filesArray
            })
            let update = await multipleFiles.update(req.params.id, req.body);
            // let update = await Service.update(req.params.id, req.body);
            if (update) {
                return commonResponse.success(res, "ITEM_DETAILS_GET", 200, update, 'Success');
            } else {
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, 'Something went wrong, Please try again');
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },
    /**
     * Delete
     */
    delete: async (req, res) => {
        try {
            let data = await Service.delete(req.params.id);
            if (data) {
                return commonResponse.success(res, "ITEM_DETAILS_DELETE", 200, data, 'Successfully deleted');
            } else {
                return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 400, {});
            }
        } catch (error) {
            console.log("INVOICE_DETAILS_DELETE -> ", error);
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

}