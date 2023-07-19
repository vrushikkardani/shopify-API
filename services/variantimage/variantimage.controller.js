const Service = require('./variantimage.services');
const guard = require("../../helper/guards");
const _ = require('lodash');
const Model = require('./variantimage.model')
const moment = require('moment');
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");

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
            const multipleFiles2 = new Model({
                Variant_Id:req.body.Variant_Id, 
               files:filesArray
            })
            let data = await multipleFiles2.save();

            if (data) {
                return commonResponse.success(res, "VARIANT_DETAILS_SAVE", 200, data, 'Success');
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
    //             return commonResponse.success(res, "VARIANT_GET", 200, data, 'Success');
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
                return commonResponse.success(res, "VARIANT_GET", 200, data, 'Success');
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
            if (req.files != undefined && req.files.variant_Media != undefined) {
                req.body.variant_Media = "/variant_Media/" + req.files.variant_Media[0].filename;
            }
            let update = await Service.update(req.params.id, req.body);
            if (update) {
                return commonResponse.success(res, "VARIANT_DETAILS_GET", 200, update, 'Success');
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
                return commonResponse.success(res, "VARIANT_DETAILS_DELETE", 200, data, 'Successfully deleted');
            } else {
                return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 400, {});
            }
        } catch (error) {
            console.log("INVOICE_DETAILS_DELETE -> ", error);
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

}