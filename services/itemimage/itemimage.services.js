const Model = require('./itemimage.model');


/** 
 * add
*/
exports.save =async(reqBody) => {
    if(reqBody.long && reqBody.lat){
        // console.log("4")
        reqBody.location = {
            type: "Point",
            coordinates: [reqBody.long, reqBody.lat],
        }
    }
    const newModel = new Model(reqBody)
    return await newModel.save();
    
}
// exports.save =async(reqBody) => {
//     return await Model(reqBody).save();
// }

/** 
 *Get
*/
exports.get =async() => {
    return await Model.find().lean();
}
// exports.list = async (reqQuery) => {
//     let returnData = {
//         list: []
//     }
//     let query = {};

//     if (reqQuery.search && reqQuery.search != "") {
//         query["Variants_Name"] = { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") };
//     }
//     query.deleted = false;
//     returnData.list = await Model.find(query).populate("Item_Id").lean();
//     return returnData;
// }
/** 
 *Get by id
*/
// exports.getById =async() => {
//     // return await Model.find({item_Id:itemId}).populate("itemId").lean();
//     return await Model.find().lean();
// }

/** 
 *update
*/
exports.update =async(id,reqBody) => {
    return await Model.findByIdAndUpdate({ _id: id }, {$set:reqBody}, {new: true}).lean();
}

/*
*  Delete
*/
exports.delete = async (id) => {

    return await Model.removeOne({_id:id}); 

};
