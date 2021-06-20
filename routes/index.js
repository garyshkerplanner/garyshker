const express = require('express');
const router = express.Router();
const {ensureAuthenticated}= require('../config/auth');


// Welcome Page
router.get('/',(req,res)=>res.render('welcome',{
    login_info: req.isAuthenticated(),
    nav: 'home',
    isError: false
}));

// About Page
router.get('/about',(req,res)=>res.render('about',{
    login_info: req.isAuthenticated(),
    nav: 'about',
    isError: false
}));

//Review
router.get('/about/msg',(req,res)=>{
    req.flash('success_msg', 'Your message has been sent successfully');
    res.redirect('/about');
});

// Weekly Page week1
router.get("/weekly", function(req, res){

  if(req.isAuthenticated()){
  const weeklyemail = req.user.email 
  LList.findOne({name: weeklyemail+"1"}, function(err, foundList){
    LList.findOne({name: weeklyemail+"2"}, function(err, foundList2){
      LList.findOne({name: weeklyemail+"3"}, function(err, foundList3){
        LList.findOne({name: weeklyemail+"4"}, function(err, foundList4){
          LList.findOne({name: weeklyemail+"5"}, function(err, foundList5){
           LList.findOne({name: weeklyemail+"6"}, function(err, foundList6){
              if (!err){ 
                res.render("weekly", {
                  listTitle: "Monday", newListItems: foundList.items,
                  listTitle2: "Tuesday", newListItems2: foundList2.items, 
                  listTitle3: "Wednesday", newListItems3: foundList3.items,
                  listTitle4: "Thursday", newListItems4: foundList4.items,
                  listTitle5: "Friday", newListItems5: foundList5.items, 
                  listTitle6: "Saturday", newListItems6: foundList6.items,
                  login_info: req.isAuthenticated(), nav:'weekly',
                  isError: false});
               }});});});});});});  
  } else{
    res.render('weekly',{
      login_info: req.isAuthenticated(),
      nav:'weekly',
      isError: false
});}});

router.post("/weekly", function(req, res){
  const weeklyemail = req.user.email;
  const itemName = req.body.newItem;
  const itemName2 = req.body.newItem2;
  const itemName3 = req.body.newItem3;
  const itemName4 = req.body.newItem4;
  const itemName5 = req.body.newItem5;
  const itemName6 = req.body.newItem6;
 
  if(itemName!=undefined){
    const item = new IItem({
      name: itemName
    });

      LList.findOne({name: weeklyemail+"1"}, function(err, foundList){
      if(!err){
        foundList.items.push(item);
        foundList.save();
      }});}

      if(itemName2!=undefined){
        const item = new IItem({
        name: itemName2
      });

        LList.findOne({name: weeklyemail+"2"}, function(err, foundList){
        if(!err){
          foundList.items.push(item);
          foundList.save();
      }});}

      if(itemName3!=undefined){
        const item = new IItem({
          name: itemName3
        });

        LList.findOne({name: weeklyemail+"3"}, function(err, foundList){
        if(!err){
          foundList.items.push(item);
          foundList.save();
      }});}

      if(itemName4!=undefined){
        const item = new IItem({
          name: itemName4
        });

        LList.findOne({name: weeklyemail+"4"}, function(err, foundList){
        if(!err){
          foundList.items.push(item);
          foundList.save();
      }});}

      if(itemName5!=undefined){
        const item = new IItem({
          name: itemName5
        });

        LList.findOne({name: weeklyemail+"5"}, function(err, foundList){
          if(!err){
            foundList.items.push(item);
            foundList.save();
      }});}

      if(itemName6!=undefined){
        const item = new IItem({
          name: itemName6
        });

        LList.findOne({name: weeklyemail+"6"}, function(err, foundList){
          if(!err){
            foundList.items.push(item);
            foundList.save();
      }});}

      res.redirect("/weekly");
});

router.post("/delete", function(req, res){
    const weeklyemail = req.user.email;
    const checkedItemId = req.body.checkbox;
    const checkedItemId2 = req.body.checkbox2;
    const checkedItemId3 = req.body.checkbox3;
    const checkedItemId4 = req.body.checkbox4;
    const checkedItemId5 = req.body.checkbox5;
    const checkedItemId6 = req.body.checkbox6;
  
    const checkedItemName1 = req.body.item_name1;
    const checkedItemName2 = req.body.item_name2;
    const checkedItemName3 = req.body.item_name3;
    const checkedItemName4 = req.body.item_name4;
    const checkedItemName5 = req.body.item_name5;
    const checkedItemName6 = req.body.item_name6;
    
    if(checkedItemId!=undefined){
      const item = new IItem({
        name: checkedItemName1
      });
      
      LList.findOne({name:weeklyemail+"weeklyDone"}, function(err, foundList){
        if(!err){
          foundList.items.push(item);
          foundList.save();
        }}); 
  
        LList.findOneAndUpdate({name: weeklyemail+"1"}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
          if(!err){
            res.redirect("/weekly");
    }});}
    
    if(checkedItemId2!=undefined){
      const item = new IItem({
        name: checkedItemName2
      });
    
      LList.findOne({name:weeklyemail+"weeklyDone"}, function(err, foundList){
        if(!err){
          foundList.items.push(item);
          foundList.save();
        }}); 
        LList.findOneAndUpdate({name: weeklyemail+"2"}, {$pull: {items: {_id: checkedItemId2}}}, function(err, foundList){
          if(!err){
            res.redirect("/weekly");
      }});}

    if(checkedItemId3!=undefined){
      const item = new IItem({
        name: checkedItemName3
      });
    
      LList.findOne({name:weeklyemail+"weeklyDone"}, function(err, foundList){
        if(!err){
          foundList.items.push(item);
          foundList.save();
        }}); 
        LList.findOneAndUpdate({name: weeklyemail+"3"}, {$pull: {items: {_id: checkedItemId3}}}, function(err, foundList){
          if(!err){
            res.redirect("/weekly");
    }});}

    if(checkedItemId4!=undefined){
      const item = new IItem({
        name: checkedItemName4
      });
    
        LList.findOne({name:weeklyemail+"weeklyDone"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
            }       
        }); 
      LList.findOneAndUpdate({name: weeklyemail+"4"}, {$pull: {items: {_id: checkedItemId4}}}, function(err, foundList){
        if (!err){
          res.redirect("/weekly");
        }
      });
    }
  
    if(checkedItemId5!=undefined){
      const item = new IItem({
        name: checkedItemName5
      });
    
        LList.findOne({name:weeklyemail+"weeklyDone"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
            }       
        }); 
      LList.findOneAndUpdate({name: weeklyemail+"5"}, {$pull: {items: {_id: checkedItemId5}}}, function(err, foundList){
        if (!err){
          res.redirect("/weekly");
        }
      });
    }
  
    if(checkedItemId6!=undefined){
      const item = new IItem({
        name: checkedItemName6
      });
    
        LList.findOne({name:weeklyemail+"weeklyDone"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
            }       
        }); 
        LList.findOneAndUpdate({name: weeklyemail+"6"}, {$pull: {items: {_id: checkedItemId6}}}, function(err, foundList){
          if (!err){
            res.redirect("/weekly");
          }});}});

router.post("/DeleteAll", function(req, res){
  const email=req.user.email
  LList.deleteMany({name:email+"1"}).then(function(){
    const list = new LList({
      name: email+"1" });
    list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly");
})
LList.deleteMany({name:email+"2"}).then(function(){
  const list = new LList({
    name: email+"2" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly");
})
LList.deleteMany({name:email+"3"}).then(function(){
  const list = new LList({
    name: email+"3" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly");
})
LList.deleteMany({name:email+"4"}).then(function(){
  const list = new LList({
    name: email+"4" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly");
})
LList.deleteMany({name:email+"5"}).then(function(){
  const list = new LList({
    name: email+"5" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly");
})
LList.deleteMany({name:email+"6"}).then(function(){
  const list = new LList({
    name: email+"6" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly");
})

res.redirect("/weekly");

;});



// Weekly Page week2
router.get("/weekly2", function(req, res){
  if(req.isAuthenticated()){
  const weeklyemail = req.user.email 
  LList.findOne({name: weeklyemail+"12"}, function(err, foundList){
     LList.findOne({name: weeklyemail+"22"}, function(err, foundList2){
      LList.findOne({name: weeklyemail+"32"}, function(err, foundList3){
        LList.findOne({name: weeklyemail+"42"}, function(err, foundList4){
          LList.findOne({name: weeklyemail+"52"}, function(err, foundList5){
           LList.findOne({name: weeklyemail+"62"}, function(err, foundList6){
               if (!err){ 
                   res.render("weekly2", {
                     listTitle: "Monday", newListItems: foundList.items,
                     listTitle2: "Tuesday", newListItems2: foundList2.items, 
                     listTitle3: "Wednesday", newListItems3: foundList3.items,
                     listTitle4: "Thursday", newListItems4: foundList4.items,
                     listTitle5: "Friday", newListItems5: foundList5.items, 
                     listTitle6: "Saturday", newListItems6: foundList6.items,
                     
                     login_info:req.isAuthenticated(), nav:'weekly2',
                     isError: false});
               }});});});});});});  
} else{
  res.render('weekly2',{
    login_info: req.isAuthenticated(),
    nav:'weekly',
    isError: false
});}});


router.post("/weekly2", function(req, res){
  const weeklyemail = req.user.email;
  const itemName = req.body.newItem;
  const itemName2 = req.body.newItem2;
  const itemName3 = req.body.newItem3;
  const itemName4 = req.body.newItem4;
  const itemName5 = req.body.newItem5;
  const itemName6 = req.body.newItem6;
 
  if(itemName!=undefined){
    const item = new IItem({
        name: itemName
      });
      LList.findOne({name: weeklyemail+"12"}, function(err, foundList){
        if (!err){
          foundList.items.push(item);
          foundList.save();
          }});}

   if(itemName2!=undefined){
      const item = new IItem({
       name: itemName2
      });
        LList.findOne({name: weeklyemail+"22"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
          }});}

     if(itemName3!=undefined){
          const item = new IItem({
              name: itemName3
            });

            LList.findOne({name: weeklyemail+"32"}, function(err, foundList){
              if (!err){
                foundList.items.push(item);
                foundList.save();
          }});}

      if(itemName4!=undefined){
          const item = new IItem({
              name: itemName4
            });

            LList.findOne({name: weeklyemail+"42"}, function(err, foundList){
              if (!err){
                foundList.items.push(item);
                foundList.save();
              }});}

      if(itemName5!=undefined){
          
          const item = new IItem({
              name: itemName5
            });

            LList.findOne({name: weeklyemail+"52"}, function(err, foundList){
              if (!err){
                foundList.items.push(item);
                foundList.save();
          }});}

        if(itemName6!=undefined){
        
          const item = new IItem({
              name: itemName6
            });

            LList.findOne({name: weeklyemail+"62"}, function(err, foundList){
              if (!err){
              foundList.items.push(item);
              foundList.save();
            }});}

        res.redirect("/weekly2");
});



router.post("/delete2", function(req, res){
    const weeklyemail = req.user.email;
    const checkedItemId = req.body.checkbox;
    const checkedItemId2 = req.body.checkbox2;
    const checkedItemId3 = req.body.checkbox3;
    const checkedItemId4 = req.body.checkbox4;
    const checkedItemId5 = req.body.checkbox5;
    const checkedItemId6 = req.body.checkbox6;
  
    const checkedItemName1 = req.body.item_name1;
    const checkedItemName2 = req.body.item_name2;
    const checkedItemName3 = req.body.item_name3;
    const checkedItemName4 = req.body.item_name4;
    const checkedItemName5 = req.body.item_name5;
    const checkedItemName6 = req.body.item_name6;
    
    if(checkedItemId!=undefined){
     
      const item = new IItem({
        name: checkedItemName1
      });
    
        LList.findOne({name:weeklyemail+"weeklyDone2"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
            }       
        }); 
  
      LList.findOneAndUpdate({name: weeklyemail+"12"}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
        if (!err){
          res.redirect("/weekly2");
        }
      });
    }
  
  
    
    if(checkedItemId2!=undefined){
      const item = new IItem({
        name: checkedItemName2
      });
    
        LList.findOne({name:weeklyemail+"weeklyDone2"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
            }       
        }); 
      LList.findOneAndUpdate({name: weeklyemail+"22"}, {$pull: {items: {_id: checkedItemId2}}}, function(err, foundList){
        if (!err){
          res.redirect("/weekly2");
        }
      });
    }
    if(checkedItemId3!=undefined){
      const item = new IItem({
        name: checkedItemName3
      });
    
        LList.findOne({name:weeklyemail+"weeklyDone2"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
            }       
        }); 
      LList.findOneAndUpdate({name: weeklyemail+"32"}, {$pull: {items: {_id: checkedItemId3}}}, function(err, foundList){
        if (!err){
          res.redirect("/weekly2");
        }
      });
    }
    if(checkedItemId4!=undefined){
      const item = new IItem({
        name: checkedItemName4
      });
    
        LList.findOne({name:weeklyemail+"weeklyDone2"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
            }       
        }); 
      LList.findOneAndUpdate({name: weeklyemail+"42"}, {$pull: {items: {_id: checkedItemId4}}}, function(err, foundList){
        if (!err){
          res.redirect("/weekly2");
        }
      });
    }
  
    if(checkedItemId5!=undefined){
      const item = new IItem({
        name: checkedItemName5
      });
    
        LList.findOne({name:weeklyemail+"weeklyDone2"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
            }       
        }); 
      LList.findOneAndUpdate({name: weeklyemail+"52"}, {$pull: {items: {_id: checkedItemId5}}}, function(err, foundList){
        if (!err){
          res.redirect("/weekly2");
        }
      });
    }
  
      if(checkedItemId6!=undefined){
        const item = new IItem({
          name: checkedItemName6
        });
      
          LList.findOne({name:weeklyemail+"weeklyDone2"}, function(err, foundList){
            if (!err){
              foundList.items.push(item);
              foundList.save();
              }       
          }); 
        LList.findOneAndUpdate({name: weeklyemail+"62"}, {$pull: {items: {_id: checkedItemId6}}}, function(err, foundList){
          if (!err){
            res.redirect("/weekly2");
          }});}});

router.post("/DeleteAll2", function(req, res){
  const email=req.user.email
  LList.deleteMany({name:email+"12"}).then(function(){
    const list = new LList({
      name: email+"12" });
    list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly2");
})
LList.deleteMany({name:email+"22"}).then(function(){
  const list = new LList({
    name: email+"22" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly2");
})
LList.deleteMany({name:email+"32"}).then(function(){
  const list = new LList({
    name: email+"32" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly2");
})
LList.deleteMany({name:email+"42"}).then(function(){
  const list = new LList({
    name: email+"42" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly2");
})
LList.deleteMany({name:email+"52"}).then(function(){
  const list = new LList({
    name: email+"52" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly2");
})
LList.deleteMany({name:email+"62"}).then(function(){
  const list = new LList({
    name: email+"62" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly2");
})

res.redirect("/weekly2");

;});





// Weekly Page week3
router.get("/weekly3", function(req, res){
  if(req.isAuthenticated()){
  const weeklyemail = req.user.email 
  LList.findOne({name: weeklyemail+"13"}, function(err, foundList){
     LList.findOne({name: weeklyemail+"23"}, function(err, foundList2){
      LList.findOne({name: weeklyemail+"33"}, function(err, foundList3){
        LList.findOne({name: weeklyemail+"43"}, function(err, foundList4){
          LList.findOne({name: weeklyemail+"53"}, function(err, foundList5){
           LList.findOne({name: weeklyemail+"63"}, function(err, foundList6){
               if (!err){ 
                   res.render("weekly3", {
                     listTitle: "Monday", newListItems: foundList.items,
                     listTitle2: "Tuesday", newListItems2: foundList2.items, 
                     listTitle3: "Wednesday", newListItems3: foundList3.items,
                     listTitle4: "Thursday", newListItems4: foundList4.items,
                     listTitle5: "Friday", newListItems5: foundList5.items, 
                     listTitle6: "Saturday", newListItems6: foundList6.items,
                     
                     login_info: req.isAuthenticated(), nav:'weekly',
                     isError: false});
               }});});});});});});  
} else{
  res.render('weekly3',{
    login_info: req.isAuthenticated(),
    nav:'weekly',
    isError: false
});}});


router.post("/weekly3", function(req, res){
  const weeklyemail = req.user.email;
  const itemName = req.body.newItem;
  const itemName2 = req.body.newItem2;
  const itemName3 = req.body.newItem3;
  const itemName4 = req.body.newItem4;
  const itemName5 = req.body.newItem5;
  const itemName6 = req.body.newItem6;
 
  if(itemName!=undefined){
    const item = new IItem({
        name: itemName
      });
      LList.findOne({name: weeklyemail+"13"}, function(err, foundList){
        if (!err){
          foundList.items.push(item);
          foundList.save();
          }});}

   if(itemName2!=undefined){
      const item = new IItem({
       name: itemName2
      });
        LList.findOne({name: weeklyemail+"23"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
          }});}

     if(itemName3!=undefined){
          const item = new IItem({
              name: itemName3
            });

            LList.findOne({name: weeklyemail+"33"}, function(err, foundList){
              if (!err){
                foundList.items.push(item);
                foundList.save();
          }});}

      if(itemName4!=undefined){
          const item = new IItem({
              name: itemName4
            });

            LList.findOne({name: weeklyemail+"43"}, function(err, foundList){
              if (!err){
                foundList.items.push(item);
                foundList.save();
              }});}

      if(itemName5!=undefined){
          
          const item = new IItem({
              name: itemName5
            });

            LList.findOne({name: weeklyemail+"53"}, function(err, foundList){
              if (!err){
                foundList.items.push(item);
                foundList.save();
          }});}

        if(itemName6!=undefined){
        
          const item = new IItem({
              name: itemName6
            });

            LList.findOne({name: weeklyemail+"63"}, function(err, foundList){
              if (!err){
              foundList.items.push(item);
              foundList.save();
            }});}

        res.redirect("/weekly3");
});




router.post("/delete3", function(req, res){
    const weeklyemail = req.user.email;
    const checkedItemId = req.body.checkbox;
    const checkedItemId2 = req.body.checkbox2;
    const checkedItemId3 = req.body.checkbox3;
    const checkedItemId4 = req.body.checkbox4;
    const checkedItemId5 = req.body.checkbox5;
    const checkedItemId6 = req.body.checkbox6;
  
    const checkedItemName1 = req.body.item_name1;
    const checkedItemName2 = req.body.item_name2;
    const checkedItemName3 = req.body.item_name3;
    const checkedItemName4 = req.body.item_name4;
    const checkedItemName5 = req.body.item_name5;
    const checkedItemName6 = req.body.item_name6;
    
   
    if(checkedItemId!=undefined){
     
      const item = new IItem({
        name: checkedItemName1
      });
    
        LList.findOne({name:weeklyemail+"weeklyDone3"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
            }       
        }); 
  
      LList.findOneAndUpdate({name: weeklyemail+"13"}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
        if (!err){
          res.redirect("/weekly3");
        }
      });
    }
  
  
    
    if(checkedItemId2!=undefined){
      const item = new IItem({
        name: checkedItemName2
      });
    
        LList.findOne({name:weeklyemail+"weeklyDone3"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
            }       
        }); 
      LList.findOneAndUpdate({name: weeklyemail+"23"}, {$pull: {items: {_id: checkedItemId2}}}, function(err, foundList){
        if (!err){
          res.redirect("/weekly3");
        }
      });
    }
    if(checkedItemId3!=undefined){
      const item = new IItem({
        name: checkedItemName3
      });
    
        LList.findOne({name:weeklyemail+"weeklyDone3"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
            }       
        }); 
      LList.findOneAndUpdate({name: weeklyemail+"33"}, {$pull: {items: {_id: checkedItemId3}}}, function(err, foundList){
        if (!err){
          res.redirect("/weekly3");
        }
      });
    }
    if(checkedItemId4!=undefined){
      const item = new IItem({
        name: checkedItemName4
      });
    
        LList.findOne({name:weeklyemail+"weeklyDone3"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
            }       
        }); 
      LList.findOneAndUpdate({name: weeklyemail+"43"}, {$pull: {items: {_id: checkedItemId4}}}, function(err, foundList){
        if (!err){
          res.redirect("/weekly3");
        }
      });
    }
  
    if(checkedItemId5!=undefined){
      const item = new IItem({
        name: checkedItemName5
      });
    
        LList.findOne({name:weeklyemail+"weeklyDone3"}, function(err, foundList){
          if (!err){
            foundList.items.push(item);
            foundList.save();
            }       
        }); 
      LList.findOneAndUpdate({name: weeklyemail+"53"}, {$pull: {items: {_id: checkedItemId5}}}, function(err, foundList){
        if (!err){
          res.redirect("/weekly3");
        }
      });
    }
  
      if(checkedItemId6!=undefined){
        const item = new IItem({
          name: checkedItemName6
        });
      
          LList.findOne({name:weeklyemail+"weeklyDone3"}, function(err, foundList){
            if (!err){
              foundList.items.push(item);
              foundList.save();
              }       
          }); 
        LList.findOneAndUpdate({name: weeklyemail+"63"}, {$pull: {items: {_id: checkedItemId6}}}, function(err, foundList){
          if (!err){
            res.redirect("/weekly3");
          }});}});


router.post("/DeleteAll3", function(req, res){
  const email=req.user.email
  LList.deleteMany({name:email+"13"}).then(function(){
    const list = new LList({
      name: email+"13" });
    list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly3");
})
LList.deleteMany({name:email+"23"}).then(function(){
  const list = new LList({
    name: email+"23" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly3");
})
LList.deleteMany({name:email+"33"}).then(function(){
  const list = new LList({
    name: email+"33" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly3");
})
LList.deleteMany({name:email+"43"}).then(function(){
  const list = new LList({
    name: email+"43" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly3");
})
LList.deleteMany({name:email+"53"}).then(function(){
  const list = new LList({
    name: email+"53" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly3");
})
LList.deleteMany({name:email+"63"}).then(function(){
  const list = new LList({
    name: email+"63" });
  list.save();
}).catch(function(error){
    console.log(error); 
    res.redirect("/weekly3");
})

res.redirect("/weekly3");

;});





// Achievement Page
router.get("/achievement", function(req, res){

  if(req.isAuthenticated()){
    LList.findOne({name:req.user.email+"gratitude"}, function(err, foundList){
      LList.findOne({name:req.user.email+"weeklyDone"}, function(err, foundListD){
        LList.findOne({name:req.user.email+"weeklyDone2"}, function(err, foundListD2){
          LList.findOne({name:req.user.email+"weeklyDone3"}, function(err, foundListD3){
            if (!err){             
              res.render('achievement',{     
                newListItemsDash: foundListD.items,
                newListItemsDash2: foundListD2.items,
                newListItemsDash3: foundListD3.items,
                login_info: req.isAuthenticated(),
                nav:'achievement',
                itemtab: foundList.items,
                isError: false
            })} }); }); }); }); 
  } else{
    res.render('achievement',{
      login_info: req.isAuthenticated(),
      nav:'achievement',
      isError: false
  });}});

router.post("/achievement", function(req, res){
  const txt1=req.body.txt1;
  const txt2=req.body.txt2;
  const txt3=req.body.txt3;
  
  const id1=req.body.idtxt1;
  const id2=req.body.idtxt2;
  const id3=req.body.idtxt3;

  LList.updateOne({name:req.user.email+"gratitude",'items._id': id1}, {'$set': {
    'items.$.name': txt1
  }}, function(err) { if(err)console.log(err)})

  LList.updateOne({name:req.user.email+"gratitude",'items._id': id2}, {'$set': {
    'items.$.name': txt2
  }}, function(err) { if(err) console.log(err)})

  LList.updateOne({name:req.user.email+"gratitude",'items._id': id3}, {'$set': {
   'items.$.name': txt3
  }}, function(err) { if(err) console.log(err)})
 
 res.redirect("/achievement")
      
});


router.post("/weeklyDoneDelete", function(req, res){
  LList.deleteMany({name:req.user.email+"weeklyDone"}).then(function(){
    const list = new LList({
      name: req.user.email+"weeklyDone", 
    });
    list.save();
    res.redirect("/achievement");
}).catch(function(error){
    console.log(error);
    res.redirect("/achievement");
});});

router.post("/weeklyDoneDelete2", function(req, res){
  LList.deleteMany({name:req.user.email+"weeklyDone2"}).then(function(){
    const list = new LList({
      name: req.user.email+"weeklyDone2", 
    });
    list.save();
    res.redirect("/achievement");
}).catch(function(error){
    console.log(error); 
    res.redirect("/achievement");
});});

router.post("/weeklyDoneDelete3", function(req, res){
  LList.deleteMany({name:req.user.email+"weeklyDone3"}).then(function(){
    const list = new LList({
      name: req.user.email+"weeklyDone3", 
    });
    list.save();
    res.redirect("/achievement");
}).catch(function(error){
    console.log(error); 
    res.redirect("/achievement");
});});


// Sprint Page

router.get('/sprint', function(req, res){
  if(req.isAuthenticated()){
    TTask.find({name:req.user.email+"sprint"}, function(err, task){
      if(err){
          console.log('Error in fetching tasks from db');
          return;
      }
      return res.render('sprint', {      
          task: task,
          login_info: req.isAuthenticated(),
          nav:'sprint',
          isError: false
      });})
    } else{
    res.render('sprint',{
        login_info: req.isAuthenticated(),
        nav:'sprint',
        isError: false
      })
}});

router.post('/create-task', function(req, res){
  TTask.create({
      name:req.user.email+"sprint", 
      description: req.body.description,
      category: req.body.category,
      date: req.body.date
      }, function(err, newtask){
      if(err){console.log('error in creating task', err); return;}
      return res.redirect('back');
  });
});

router.get('/delete-task', function(req, res){
  var id = req.query;
  var name = req.body.description
  var count = Object.keys(id).length;
  for(let i=0; i < count ; i++){
      TTask.findByIdAndDelete(Object.keys(id)[i], function(err){
      if(err){
          console.log('error in deleting task');
          }})}
  return res.redirect('back'); 
});



//Dashboard Page
router.get('/dashboard', ensureAuthenticated, (req,res)=>

    res.render('dashboard',{
      name: req.user.name,
      email: req.user.email,
      login_info: req.isAuthenticated(),
      nav:'dashboard',
      isError: false   
  })

  );


module.exports=router;
