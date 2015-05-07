Posts = new Meteor.Collection("posts");

if (Meteor.isClient) {
  
  (function() {
    var state = document.readyState;
    if(state === 'interactive' || state === 'complete') {
        Session.set("userTag", prompt("What is your userTag?") || "Guest"); // Set user session with userTag
        document.getElementById("userText").focus();
    }
    else setTimeout(arguments.callee, 1000);// Recall the state of the Dom loading
  })();

  Template.body.messages = function(){
    return Posts.find({}, {sort: {postDate: -1}, limit: 20});
  };
  
  // select the template named foot and set the creator variable to your name
  Template.foot.creator = "laytonsdad";
  // Select the template named foot and set the year using a function return
  Template.foot.year = function() {
    var _d = new Date();// Create new date
    return _d.getFullYear();// Return the year to the year variable
  };


  Template.body.events = {
    'keyup #userText' : function(e){
       if (e.which === 13){
          addPost();
       }
    },
    'click #sendBtn' : function(e){
       addPost();
    }
  }

  function addPost(){
    var userText = document.getElementById("userText").value;
    if (userText.length > 0){
      Posts.insert({"userTag": Session.get("userTag"), "text": userText, "postDate": Math.floor(Date.now()/1000)});
      document.getElementById("userText").value = "";
    }
  }
  
// End of isClient test
}
