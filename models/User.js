const mongoose = require('mongoose');

// creating Schema for Tasks (Weekly)
const itemsSchema = new mongoose.Schema( {
    name:{
    type: String,
    required: true
    }
  });

const Item = mongoose.model("Item", itemsSchema);// save to DB
global.IItem=Item;// global var
  
//default Items for weekle planner
const item1 = new Item({
    name: "Welcome to your weekly planner!"
  });
  
  const item2 = new Item({
    name: "Hit the + button to add a new item."
  });
  
  const item3 = new Item({
    name: "<-- Hit this to delete an item."
  });
  
  global.defaultItems = [item1, item2, item3];



//default Items for Gratitude
  const item4 = new Item({
    name: " "
  });
  const item5 = new Item({
    name: " "
  });
  const item6 = new Item({
    name: " "
  });
    
  global.defaultGratitude = [
    item4, item5, item6
  ];
 

  // creating Schema for Lists
  const listSchema = new mongoose.Schema( {
      name:{
        type: String,
        required: true
      },
    items:{
        type: [itemsSchema],
        required: true
    }     
  });
  
const List = mongoose.model("List", listSchema);
global.LList=List;


// creating Schema for Tasks (SPRINT)
const taskSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  description: {
      type: String,
      required: true
  },
  category: {
      type: String,
      required: true
  },
  date: {
      type: Date,
      required: true
  }
});
const Task = mongoose.model('Task', taskSchema);
global.TTask=Task;

//creating Schema for Users
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', UserSchema);



module.exports = User;