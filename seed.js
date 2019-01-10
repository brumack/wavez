var mongoose = require("mongoose");
var Beach = require("./models/beach");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Santa Monica", 
        image: "https://californiathroughmylens.com/wp-content/uploads/2016/08/santa-monica-pier-1.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Bolsa Chica", 
        image: "https://static1.squarespace.com/static/530504efe4b07e4708f68485/t/573ff2a21bbee0ad7c72c8d9/1479626102377/Bolsa-Chica-Wetlands-Reserve",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Manhattan", 
        image: "https://www.citymb.info/Home/ShowPublishedImage/24205/636716545817630000",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function seedDB(){
   //Remove all beaches
   Beach.remove({}, function(err){
        if(err){
            console.log(err);
        }
    //     console.log("removed beaches!");
    //     Comment.remove({}, function(err) {
    //         if(err){
    //             console.log(err);
    //         }
    //         console.log("removed comments!");
    //          //add a few beaches
    //         data.forEach(function(seed){
    //             Beach.create(seed, function(err, beach){
    //                 if(err){
    //                     console.log(err)
    //                 } else {
    //                     console.log("added a beach");
    //                     //create a comment
    //                     Comment.create(
    //                         {
    //                             text: "This place is great, but I wish there was internet",
    //                             author: "Homer"
    //                         }, function(err, comment){
    //                             if(err){
    //                                 console.log(err);
    //                             } else {
    //                                 beach.comments.push(comment);
    //                                 beach.save();
    //                                 console.log("Created new comment");
    //                             }
    //                         });
    //                 }
    //             });
    //         });
    //     });
    }); 
    //add a few comments
}
 
module.exports = seedDB;