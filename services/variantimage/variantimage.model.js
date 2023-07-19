const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const  variantimageSchema = new Schema ( 
    {
        
        files:[Object],
        Variant_Id:{
            type:mongoose.Schema.Types.ObjectId,
            default:"",
        }
        
       
        
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

variantimageSchema.plugin(softDelete);

const  variantimage = mongoose.model("variantimage",  variantimageSchema);

module.exports =  variantimage