const itemModel = require('./items.model');


/** 
 * add
*/
exports.save = async (reqBody) => {
    
    return await itemModel(reqBody).save();
}


/** 
 *Get
*/
exports.get = async () => {
    return await itemModel.find().lean();
    // return await itemModel.find().populate({path:'variant_id', model: 'variants'}).lean();
}
/** 
 *Get by id
*/
exports.getById = async (id) => {
    return await itemModel.findOne({ _id: id }).lean();
}


/** 
 *update
*/
// exports.update =async(id,reqBody) => {
//     return await Model.findByIdAndUpdate({ _id: id }, {$set:reqBody}, {new: true}).lean();
// }
exports.update = async (id, reqBody) => {
    let updateUserData = await itemModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true, }).lean();
    return updateUserData;
};

/*
*  Delete
*/
exports.delete = async (id) => {

    return await itemModel.removeOne({ _id: id });

};
