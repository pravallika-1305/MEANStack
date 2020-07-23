const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {useCreateIndex: true , useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err) {
        console.log("MONGODB Connection Established!");
    } else {
        console.log("Error in MongoDB Connection:" + JSON.stringify(err, undefined, 2));
    }
});
require('./user.model')
