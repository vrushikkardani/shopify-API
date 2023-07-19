const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const itemsSchema = new Schema(
    {

        Title: {
            type: String,
            default: "",
        },
        Description: {
            type: String,
            default: "",

        },
        
        
        
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

itemsSchema.plugin(softDelete);

const items = mongoose.model("Items", itemsSchema);

module.exports = items;