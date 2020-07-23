const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
var ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');

module.exports.register = (req,res,next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.contact = req.body.contact;
    user.experience = req.body.experience;
    user.save((err,doc) => {

        if(!err) {
            res.send(doc);
        } else {
            if (err.code == 11000)
            res.status(422).send(['Duplicate email adrress found.']);
        else
            return next(err);
        }
    });

}
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}
module.exports.update = (req, res) => {
    var user = new User();
    user.fullName = req.fullName;
    user.email = req.email;
    user.password = req.password;
    user.contact = req.contact;
    user.experience = req.experience;
    if (!ObjectId.isValid(req._id))
        return res.status(400).send(`No record with given id : ${req._id}`);
    User.findByIdAndUpdate(req._id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    });
}
    

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}
