const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const  itemimageSchema = new Schema ( 
    {
        files:[Object],
        item_Id:{
            type:mongoose.Schema.Types.ObjectId,
            default:"",
        }
        
       
        
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

itemimageSchema.plugin(softDelete);

const  itemimage = mongoose.model("itemimage",  itemimageSchema);

module.exports =  itemimage