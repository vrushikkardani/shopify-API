const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const  variantSchema = new Schema ( 
    {
        
        Variants_Name:{
            type:String,
            default:"",
        },
        price:{
            type:String,
            default:"",    
        },
        available:{
            type:String,
            default:"",
        },
        On_Hand:{
            type:String,
            default:"",
        },
        Item_Id:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Items"
        }
        
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

variantSchema.plugin(softDelete);

const  variant = mongoose.model("Variant",  variantSchema);

module.exports =  variant