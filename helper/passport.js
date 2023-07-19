const passport = require("passport");
const CustomStrategy = require("passport-custom").Strategy;
const usersModel = require("../services/items/items.model");

const commonFunctions = require("./functions");
// Passport Custom Strategy
 

passport.use(
  "admin",
  new CustomStrategy(async function (req, done) {
    try {
      req.body.email = req.body.email.toLowerCase();
      let user = await usersModel.findOne({ email: req.body.email });
      console.log("User Data : ", user);
      if (!user) {
        return done(new Error("INVALID_EMAIL"));
      }
      let isPasswordValid = await commonFunctions.matchPassword( req.body.password, user.password );
      console.log("isPasswordValid : ",isPasswordValid);
      if(isPasswordValid){
        return done(null, user); 
      }else{
        return done(new Error("INVALID_PASSWORD"));
      }
    } catch (error) {
      return done(error);
    }
  })
);  

