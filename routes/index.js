const { itemsRoutes } = require('../services/items');
const { variantsRoutes } = require('../services/variants');
const { variantimageRoutes } = require('../services/variantimage');
const { itemimageRoutes } = require('../services/itemimage');


// console.log(1);


const initialize = (app) => {

  app.use("/api/items", itemsRoutes);
  app.use("/api/variants",  variantsRoutes);
  app.use("/api/variantimage",  variantimageRoutes);
  app.use("/api/itemimage",  itemimageRoutes);

 
  // console.log(2);




  app.use("/authError", (req, res, next) => {
    // console.log("3")
    return next(new Error("DEFAULT_AUTH"));
  });

  app.get("/ping", (req, res) => {
    res.status(200).send({
      
      success: true,
      statusCode: 200,
    });
  });
};

module.exports = { initialize };
