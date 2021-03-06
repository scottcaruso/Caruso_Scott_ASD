//Scott Caruso
//ASDI 1208
//Project 4 - Cloudifying the CRUD

//Ensure dom is loaded before doing anything else.
$(document).on("pageinit", function(){
   var form = $("#addcardform");
   form.validate({
      invalidHandler: function(form, validator){},
      submitHandler: function(){
         saveCard();
      }
   });

$("#home").on("pageinit",function(){
  localStorage.clear();
})

/* This function is currently disabled, pending prioritization of making it work with the couch data.
function eraseCardData(){
  if(localStorage.length === 0){
    alert("There are no cards in your binder to clear.");
  } else {
     var ask = confirm("Are you sure you want to erase all card data? THIS CANNOT BE UNDONE!");
      if(ask){
      localStorage.clear();
      alert("All cards have been removed from your binder.");
      window.location.reload();
      return false;
    };
  };
};
*/

//Parse Local Storage for the Search Text
function keywordSearch(){
  var searchText = searchString();
  $.ajax({
       url: "_view/cards",
       type: "GET",
       dataType: "json",
       success: function(data){
          var cards = data.rows;
          var matches = [];
          for (i=0; i < data.rows.length; i++){
            var thisCard = data.rows[i];
            var thisCardName = thisCard.value.name;
            var doesSearchTermExist = thisCardName.match(searchText)
            if (doesSearchTermExist != null){
              matches.push(thisCard);
            }
          }         
         window.location="#display";
         $("#displaybucket").empty();
         $("#displaybucketcollapse").empty();
         console.log(matches);
         for(var i=0, j=matches.length; i<j; i++){
            var card = matches[i];
            console.log(card);
            $('<div data-role="collapsible" data-theme="b" id=' + card.value.id + '>' +
                  '<h3>' + card.value.name + '</h3>'+
                  '<p>' + "Currently In Use? " + card.value.usage + '</p>' +
                  '<p>' + "Card Type: " + card.value.type + '</p>' +  
                  '<p>' + "Mana Cost: " + card.value.mana + '</p>' +  
                  '<p>' + "Colors: " + card.value.colors + '</p>' +  
                  '<p>' + "Notes: " + card.value.notes + '</p>' + 
                  '<p>' + "Number Owned: " + card.value.number + '</p>' +
                  '<p>' + 
                    '<a href="#" class="editcard" id="editcard">' + "Edit Card" + '</a>' + 
                  '<a href="#" class="deletecard" id="deletecard">' + "Delete Card" + '</a>' + 
                '</p>'+
               '</div>'
            ).appendTo('#displaybucketcollapse');
            var editID = ("edit"+card.id);
            var deleteID = ("delete"+card.id);
            $("#editcard").attr("id",editID);
            $("#deletecard").attr("id",deleteID);
            bindEditDelete(editID,deleteID,card.name,card.id);
            storeIdInLocalStorage(card.id,card.rev);
         };
         $("#displaybucketcollapse").collapsibleset("refresh");
      }
 });
 };

//Turn what's in the search field into a string
function searchString(){
    var searchText = $("#searchbox").attr("value");
    return searchText;
 };

//The below function empties the search page every time new results are populated.
function clearSearchPage(){
   $(".displaybucket").empty();
};

/*This feature is currently disabled until work to get it up and running again is prioritized.
function newsFeed(){
   clearSearchPage();
   if (localStorage.length === 0){
      alert("There are no cards saved in this binder to view.");
   } else {
    $("#displaybucketcollapse").empty(); 
      $("#displaybucket").append("<dl id='listcards'></dl>")
      for(var y=localStorage.length; y>0; y--){
         var value = localStorage.getItem(y);
         var obj = JSON.parse(value);
         var cardTitle = (obj.name[0] + " " + obj.name[1]);
         var cardTitleID = ("title" + y);
         var cardTitleSelector = ("#" + cardTitleID); 
         $("#displaybucket").find("dl").append("<dt id='cardtitle'></dt>");
         if(obj !==null){
            $("#cardtitle").attr("class","cardtitle").attr("id",cardTitleID).html(cardTitle);
            var makeCount = ("Card " + y + " of " + localStorage.length);
            var countID = ("count" + y);
            var countIDSelector = ("#" + countID);
            $(cardTitleSelector).append("<dd id='cardID'></dd>");
            $("#cardID").attr("class","cardID").attr("id",countID).html(makeCount);
            delete obj.name;
            for(var n in obj){
               var cardText = (obj[n][0] + " " + obj[n][1]);
               $(countIDSelector).append("<dd id='individualdetail'>" + cardText + "</dd>");
            };
         addLinkClickEvents(cardTitleSelector, y);
      };
      window.location="#display";
      };
   };
};
*/

//To get value from card type
function getCardType(){
   var buttons = document.forms[0].cardtype;
   for(var i=0; i<buttons.length; i++){
      if(buttons[i].selected){
         var typeValue = buttons[i].value;
      };
   };
   return typeValue
};

//To get colors from a form when saving..
function getCardColors(){
   var colors = [];
   if($("#white").is(":checked")){
      colors.push("white");
   };
   if($("#black").is(":checked")){
      colors.push("black");
   };
   if($("#blue").is(":checked")){
      colors.push("blue");
   };
   if($("#red").is(":checked")){
      colors.push("red");
   };
   if($("#green").is(":checked")){
      colors.push("green");
   };    
   if($("#colorless").is(":checked")){
      colors.push("colorless");
   };
   return colors  
};

//As it says, this function Saves a card.
function saveCard() {
  console.log
   if($("#submit").val() === "Edit Card"){
      var id = ($("#submit").attr("key"));
      var rev = localStorage.getItem(id);
      var cardColors = getCardColors();
      var cardType = getCardType();
      var doc = {
            _id: id,
            _rev: rev,
            name: $("#cardname").val(),
            usage:  $("#currentuse").val(),
            type: cardType,
            mana: $("#manacost").val(),
            colors: cardColors,
            notes: $("#comments").val(),
            number: $("#numberowned").val()
        };
        $.couch.db("mtgbinder").saveDoc(doc, {
            success: function(data) {
                alert(doc.name + " has been successfully updated.");
                window.location="#home";
            },
            error: function(status) {
                console.log(status);
            }
        });
   } else {
      var cardColors = getCardColors();
      var cardType = getCardType();
      var card = {};
         card.name = $("#cardname").val();
         card.usage = $("#currentuse").val();
         card.type = cardType;
         card.mana = $("#manacost").val();
         card.colors = cardColors;
         card.notes = $("#comments").val();
         card.number = $("#numberowned").val();
      //localStorage.setItem(id, JSON.stringify(card));
      saveDataToCouch(card);
      alert(card.name + " has been successfully saved.")
      window.location="#home";
      window.location.reload();  
   };   
};

/*Something like this may need to come back when the NewsFeed comes back, Disabling for now.
//This function rekeys cards in local storage when one is deleted.
function rekeyCards(){
   var numberOfCards = localStorage.length;
   var largestID = numberOfCards + 1;
   var originalLargestID = largestID;
   for (var x = largestID; 0 < x; x-- ){
      var currentCard = localStorage.getItem(x);
      if (currentCard == null){
         var largestID = x;
      };
   };
   for (var x = largestID; x < localStorage.length; x++){
      var oldID = x+1;
      var itemToRekey = localStorage.getItem(oldID);
      localStorage.setItem(x, itemToRekey);
   };
   localStorage.removeItem(originalLargestID);
};
*/

//This function reloads the screen when a card has been added.
function addCardReload(){
   window.location="#addcard";
   window.location.reload();
};

//Manipulate local storage to temporarily pass _id and _rev around.
function storeIdInLocalStorage(id,rev){
   localStorage.setItem(id,rev);
};

//Saves data from form to couch
function saveDataToCouch(card){
   $.couch.db("mtgbinder").saveDoc(card, {
       success: function(data) {
         console.log(data);
       },
       error: function() {
         alert("An error occurred while saving this card.");
       }
   });
};

//Function to get json data with Ajax. Makes the .on functions cleaner. THIS ONE IS FOR COUCHBASE SAVED JSON.
function getJsonAjax(){
   $.ajax({
      url: "_view/cards",
      type: "GET",
      dataType: "json",
      success: function(data){
         makeJsonDataDisplay(data);
      },
      error: function(){
         console.log("There was an error.")
      }
   });
};

//Function to get ONLY currently in-use cards from CouchBase.
function getJsonAjaxInUse(){
   $.ajax({
      url: "_view/inuse",
      type: "GET",
      dataType: "json",
      success: function(data){
         makeJsonDataDisplay(data);
      },
      error: function(){
         console.log("There was an error.")
      }
   });
};

//Functions below to get ONLY specific colored cards from CouchBase.
function getJsonAjaxWhite(){
   $.ajax({
      url: "_view/color-white",
      type: "GET",
      dataType: "json",
      success: function(data){
         makeJsonDataDisplay(data);
      },
      error: function(){
         console.log("There was an error.")
      }
   });
};

function getJsonAjaxBlack(){
   $.ajax({
      url: "_view/color-black",
      type: "GET",
      dataType: "json",
      success: function(data){
         makeJsonDataDisplay(data);
      },
      error: function(){
         console.log("There was an error.")
      }
   });
};

function getJsonAjaxGreen(){
   $.ajax({
      url: "_view/color-green",
      type: "GET",
      dataType: "json",
      success: function(data){
         makeJsonDataDisplay(data);
      },
      error: function(){
         console.log("There was an error.")
      }
   });
};

function getJsonAjaxRed(){
     $.ajax({
        url: "_view/color-red",
        type: "GET",
        dataType: "json",
        success: function(data){
           makeJsonDataDisplay(data);
        },
        error: function(){
           console.log("There was an error.")
        }
     });
  };
  
function getJsonAjaxBlue(){
     $.ajax({
        url: "_view/color-blue",
        type: "GET",
        dataType: "json",
        success: function(data){
           makeJsonDataDisplay(data);
        },
        error: function(){
           console.log("There was an error.")
        }
     });
  };
  
function getJsonAjaxColorless(){
     $.ajax({
        url: "_view/color-colorless",
        type: "GET",
        dataType: "json",
        success: function(data){
           makeJsonDataDisplay(data);
        },
        error: function(){
           console.log("There was an error.")
        }
     });
  };
  
//Functions to only get specific card types.
function getJsonAjaxCreature(){
     $.ajax({
        url: "_view/type-creature",
        type: "GET",
        dataType: "json",
        success: function(data){
           makeJsonDataDisplay(data);
        },
        error: function(){
           console.log("There was an error.")
        }
     });
  };
  
function getJsonAjaxInstant(){
     $.ajax({
        url: "_view/type-instant",
        type: "GET",
        dataType: "json",
        success: function(data){
           makeJsonDataDisplay(data);
        },
        error: function(){
           console.log("There was an error.")
        }
     });
  };

function getJsonAjaxPlaneswalker(){
     $.ajax({
        url: "_view/type-planeswalker",
        type: "GET",
        dataType: "json",
        success: function(data){
           makeJsonDataDisplay(data);
        },
        error: function(){
           console.log("There was an error.")
        }
     });
  };
    
function getJsonAjaxSorcery(){
     $.ajax({
        url: "_view/type-sorcery",
        type: "GET",
        dataType: "json",
        success: function(data){
           makeJsonDataDisplay(data);
        },
        error: function(){
           console.log("There was an error.")
        }
     });
  };

function getJsonAjaxBuff(){
     $.ajax({
        url: "_view/type-buff",
        type: "GET",
        dataType: "json",
        success: function(data){
           makeJsonDataDisplay(data);
        },
        error: function(){
           console.log("There was an error.")
        }
     });
  };
  
function getJsonAjaxCurse(){
     $.ajax({
        url: "_view/type-curse",
        type: "GET",
        dataType: "json",
        success: function(data){
           makeJsonDataDisplay(data);
        },
        error: function(){
           console.log("There was an error.")
        }
     });
  };
  
function getJsonAjaxArtifact(){
     $.ajax({
        url: "_view/type-artifact",
        type: "GET",
        dataType: "json",
        success: function(data){
           makeJsonDataDisplay(data);
        },
        error: function(){
           console.log("There was an error.")
        }
     });
  };

function getJsonAjaxLand(){
     $.ajax({
        url: "_view/type-land",
        type: "GET",
        dataType: "json",
        success: function(data){
           makeJsonDataDisplay(data);
        },
        error: function(){
           console.log("There was an error.")
        }
     });
  };

//This is the guts of the Json display; works in tandem with it. - FOR USE WITH COUCHBASE ONLY!
function makeJsonDataDisplay(data){ 
   localStorage.clear(); //This ensures that Local Storage is clean every time the display is refereshed.
   window.location="#display";
   $("#displaybucket").empty();
   $("#displaybucketcollapse").empty();
   for(var i=0, j=data.rows.length; i<j; i++){
      var card = data.rows[i];
      $('<div data-role="collapsible" data-theme="b" id=' + card.value.id + '>' +
            '<h3>' + card.value.name + '</h3>'+
            '<p>' + "Currently In Use? " + card.value.usage + '</p>' +
            '<p>' + "Card Type: " + card.value.type + '</p>' +  
            '<p>' + "Mana Cost: " + card.value.mana + '</p>' +  
            '<p>' + "Colors: " + card.value.colors + '</p>' +  
            '<p>' + "Notes: " + card.value.notes + '</p>' + 
            '<p>' + "Number Owned: " + card.value.number + '</p>' +
            '<p>' + 
              '<a href="#" class="editcard" id="editcard">' + "Edit Card" + '</a>' + 
            '<a href="#" class="deletecard" id="deletecard">' + "Delete Card" + '</a>' + 
          '</p>'+
         '</div>'
      ).appendTo('#displaybucketcollapse');
      var editID = ("edit"+card.value.id);
      var deleteID = ("delete"+card.value.id);
      $("#editcard").attr("id",editID);
      $("#deletecard").attr("id",deleteID);
      bindEditDelete(editID,deleteID,card.value.name,card.value.id);
      storeIdInLocalStorage(card.value.id,card.value.rev);
   };
   $("#displaybucketcollapse").collapsibleset("refresh");
};

//The below function binds the Edit/Delete links properly. It works with the function above.
function bindEditDelete(editID,deleteID,cardName,cardID){
  var editCardIDSelector = ("#" + editID);
  var deleteCardIDSelector = ("#" + deleteID);
  $(editCardIDSelector).on("click",function(){
    getCardToEdit(editID);
  });
  $(deleteCardIDSelector).on("click",function(){
    deleteCardCouch(deleteID,cardName,cardID)
  });
};

//Delete card function
function deleteCardCouch(deleteID,cardName,cardID){
  var deleteArray = deleteID.split("delete");
  var deleteIDValue = deleteArray[1];
  var deleteRevValue = localStorage.getItem(deleteIDValue);
  var doc = {
      _id: deleteIDValue,
      _rev: deleteRevValue,
      name: cardName,
      id: cardID
  };
  var ask = confirm("Are you sure you want to delete this card?");
     if(ask){
       $.couch.db("mtgbinder").removeDoc(doc, {
           success: function(data) {
               alert(doc.name + " was successfully removed!");
               //The below clears out the display bucket that this old card held
               var displaybucket = "#" + doc.id;
               $(displaybucket).empty();
               $("#displaybucketcollapse").collapsibleset("refresh");
          },
          error: function(status) {
            alert("There was an error removing " + doc.name + ". It was not removed.")
              console.log(status);
          }
       });
     } else {
        alert("Don't worry! " + cardName + " was not removed.");
     };
};

function getCardToEdit(editID){
  var editArray = editID.split("edit");
  var editIDValue = editArray[1];
  var editRevValue = localStorage.getItem(editIDValue);
  var doc = {
      _id: editIDValue,
      _rev: editRevValue
  };
  $.couch.db("mtgbinder").openDoc(doc._id, {
      success: function(data) {
          console.log(data,data.mana)
          populateFormWithData(data);
      },
      error: function(status) {
          console.log(status);
      }
  });
};

function populateFormWithData(data){
     $("input[type='checkbox']").attr("checked",false)
     $("#cardname").val(data.name);
     $("#currentuse").val(data.usage);
     $("#creature").attr("selected",false);
     $("#cardtype").val(data.type); 
     $("#manacost").attr("value",data.mana);
     //clearColors();
     var colors = data.colors;
     for(var i=0; i < colors.length; i++){
        var colorName = colors[i];
        var colorNameSelector = ("#" + colorName);
        console.log(colorNameSelector);
        $(colorNameSelector).attr("checked", "checked");
     };
     $("#comments").val(data.notes);
     $("#numberowned").val(data.number);
     //var key = key;
     $("#submit").val("Edit Card").attr("key",data._id);
     $("#reset").attr("disabled","disabled");
     window.location="#addcard";
     //the below functions all update the jqm formatting upon form load
     $("input[type='checkbox']").checkboxradio("refresh");
     $("#cardtype").selectmenu("refresh");
     $("#manacost").slider("refresh");
};


//Make things happen when the links are clicked.
//The "unbind" events exist to prevent a bug where double pop-ups were occurring as if there were two clicks being registered.
$("#eraseData").unbind("click");
$("#fillJsonData").unbind("click");
$("#searchbutton").unbind("click");
$("#recentcards").unbind("click");
$("#addcard").unbind("click");
$("#viewactive").unbind("click");
//-- Temporarily disabled. $("#eraseData").on("click",function(){eraseCardData(); return false});
$("#searchbutton").on("click",function(){keywordSearch()});
$("#recentcards").on("click",function(){storeIdInLocalStorage(1,2); return false});

//Links for each of the specific card queries,
$("#allcards")
.on("click",
 function(){
    getJsonAjax();
    return false
 });
$("#creature").on("click",function(){getJsonAjaxCreature(); return false});
$("#planeswalker").on("click",function(){getJsonAjaxPlaneswalker(); return false});
$("#instant").on("click",function(){getJsonAjaxInstant(); return false});
$("#sorcery").on("click",function(){getJsonAjaxSorcery(); return false});
$("#buff").on("click",function(){getJsonAjaxBuff(); return false});
$("#curse").on("click",function(){getJsonAjaxCurse(); return false});
$("#artifact").on("click",function(){getJsonAjaxArtifact(); return false});
$("#land").on("click",function(){getJsonAjaxLand(); return false});
$("#whitemenu").on("click",function(){getJsonAjaxWhite(); return false});
$("#blackmenu").on("click",function(){getJsonAjaxBlack(); return false});
$("#redmenu").on("click",function(){getJsonAjaxRed(); return false});
$("#bluemenu").on("click",function(){getJsonAjaxBlue(); return false});
$("#greenmenu").on("click",function(){getJsonAjaxGreen(); return false});
$("#colorlessmenu").on("click",function(){getJsonAjaxColorless(); return false});
$("#viewactive").on("click",function(){getJsonAjaxInUse(); return false});

});

//NOTE - All of the below functions are deprecated in the current version. YOU MUST MOVE THEM BACK INTO THE PAGEINIT WRAPPER FOR THEM TO WORK!

//$("#fillJsonData").on("click",function(){fillWithJsonData(); return false});

/*Commenting out, since this shouldn't be needed anymore. Relic of pre-jquery days.
function elementName(x){
   var elementName = document.getElementById(x);
   return elementName;              
};
*/

//COMMENT OUT THE BELOW WHEN USING COUCHBASE JSON
/*Function to get json data with Ajax. Makes the .on functions cleaner. THIS ONE IS FOR THE LOCALLY SAVED JSON.
function getJsonAjax(){
   $.ajax({
      url: "xhr/data.json",
      type: "GET",
      dataType: "json",
      success: function(data){
         makeJsonDataDisplay(data);
      },
      error: function(){
         console.log("There was an error.")
      }
   });
};
*/

//Function to get xml data with Ajax.
/*function getXmlAjax(){
   $.ajax({
      url: "xhr/data.xml",
      type: "GET",
      dataType: "xml",
      success: function(xml){
         doStuffAfterXml(xml);
      },
      error: function(){
         console.log("There was an error.")
      }     
   });
};

//Function to get csv data with Ajax.
function getCsvAjax(){
   $.ajax({
      url: "xhr/data.csv",
      type: "GET",
      dataType: "text",
      success: function(csv){
         makeCsvDataDisplay(csv);
      },
      error: function(){
         console.log("There was an error.")
      }     
   });
};

//This is the guts of the XML display; works in tandem with getXmlAjax
function doStuffAfterXml(xml){
   $("#displaybucket").empty();
   window.location="#display";
   var obj = $(xml);
   obj.find("card").each(function(){
      var card = $(this);
      var name = $(card.find("name"));
      var usage = $(card.find("usage"));
      var type = $(card.find("type"));
      var mana = $(card.find("mana"));
      var colors = $(card.find("colors"));
      var notes = $(card.find("notes"));
      var number = $(card.find("number"));
      $('<div class="card">'+
         '<h2>' + "Card Name: " + name.text() + '</h2>'+
         '<li>' + "In Use? " + usage.text() + '</li>' +
         '<li>' + "Card Type: " + type.text() + '</li>' +  
         '<li>' + "Mana Cost: " + mana.text() + '</li>' +  
         '<li>' + "Card Colors: " + colors.text() + '</li>' +  
         '<li>' + "Additional Notes: " + notes.text() + '</li>' + 
         '<li>' + "Number Owned: " + number.text() + '</li>' +
      '</div>'
      ).appendTo('#displaybucket')
   });
};
*/

//COMMENT OUT THE BELOW WHEN USING COUCHBASE JSON
/*This is the guts of the Json display; works in tandem with it. - FOR USE WITH LOCALLY-SAVED JSON!
function makeJsonDataDisplay(data){
   $("#displaybucket").empty();
   window.location="#display";
   for(var i=0, j=data.cards.length; i<j; i++){
      var card = data.cards[i];
      $('<div data-role="collapsible" data-theme="b">' + 
            '<h3>' + card.name + '</h3>'+
            '<p>' + "Currently in use? " + card.usage + '</p>' +
            '<p>' + "Card Type: " + card.type + '</p>' +  
            '<p>' + "Mana Cost: " + card.mana + '</p>' +  
            '<p>' + "Colors: " + card.colors + '</p>' +  
            '<p>' + "Notes: " + card.notes + '</p>' + 
            '<p>' + "Number Owned: " + card.number + '</p>' +
         '</div>'
      ).appendTo('#displaybucket')
   }
};
*/

/*This is the guts of the Csv display; works in tandem with it
function makeCsvDataDisplay(csv){
   $("#displaybucket").empty();
   window.location="#display";
   var lines = csv.split("|");
   var   names = [];
         usage = [];
         type = [];
         mana = [];
         colors = [];
         notes = [];
         number = []; 
   //populate names array
   for (var lineNum = 7; lineNum < lines.length; lineNum+=7) {
      var row = lines[lineNum];
      var columns = row.split(",");
      names.push(columns);
   };
   //populate usage array
   for (var lineNum = 8; lineNum < lines.length; lineNum+=7) {
      var row = lines[lineNum];
      var columns = row.split(",");
      usage.push(columns);
   };
   //populate type array
   for (var lineNum = 9; lineNum < lines.length; lineNum+=7) {
      var row = lines[lineNum];
      var columns = row.split(",");
      type.push(columns);
   };
   //populate mana costs array
   for (var lineNum = 10; lineNum < lines.length; lineNum+=7) {
      var row = lines[lineNum];
      var columns = row.split(",");
      mana.push(columns);
   };
   //populate colors array
   for (var lineNum = 11; lineNum < lines.length; lineNum+=7) {
      var row = lines[lineNum];
      var columns = row.split(",");
      colors.push(columns);
   };
   //populate notes array
   for (var lineNum = 12; lineNum < lines.length; lineNum+=7) {
      var row = lines[lineNum];
      var columns = row.split(",");
      notes.push(columns);
   };
   //populate number array
   for (var lineNum = 13; lineNum < lines.length; lineNum+=7) {
      var row = lines[lineNum];
      var columns = row.split(",");
      number.push(columns);
   };
   //create the page elements
   for(var i=0, j=names.length; i<j; i++){
      $('<div class="card">'+
            '<h2>' + "Card Name: " + names[i] + '</h2>'+
            '<li>' + "In Use? " + usage[i] + '</li>' +
            '<li>' + "Card Type: " + type[i] + '</li>' +  
            '<li>' + "Mana Cost: " + mana[i] + '</li>' +  
            '<li>' + "Card Colors: " + colors[i] + '</li>' +  
            '<li>' + "Additional Notes: " + notes[i] + '</li>' + 
            '<li>' + "Number Owned: " + number[i] + '</li>' +
         '</div>'
      ).appendTo('#displaybucket')
   }
};


//When the Debug fill option is clicked, this fills local storage with JSON data.
function fillWithJsonData(){
   if(localStorage.length === 0){
      var y = 1;
      for(var x in json){
         var id = y;
         localStorage.setItem(id, JSON.stringify(json[x]));
         y++;
      };
      alert("Dummy data has been added to local storage!");
   } else {
      var ask = confirm("There is already data in local storage. Would you like to clear that data and then add new dummy data?");
      if (ask){
         eraseCardData();
         fillWithJsonData();
         return false
      };
   };
};


//The below function adds the Edit and Delete links, and their associated binding functions, when search results are made.
function addLinkClickEvents(cardTitleSelector, key){
   $(cardTitleSelector).append("<dd><a href='#addcard' class='editcard' id='editcard'>Edit Card</a><a href='#' class='deletecard' id='deletecard'>Delete Card</a></dd>");
   var editCardID = ("editcard" + key);
   var editCardIDSelector = ("#" + editCardID);
   $("#editcard").attr("id",editCardID).attr("key",key);
   var deleteCardID = ("deletecard"+key);
   var deleteCardIDSelector = ("#" + deleteCardID);
   $("#deletecard").attr("id",deleteCardID).attr("key",key);
   $(editCardIDSelector).on("click",function(){editCard(key)});//need to remember to ask why return false breaks this
   $(deleteCardIDSelector).on("click",function(){eraseCard(key)});//need to remember to ask why return false breaks this
};

//This function erases an individual card from local storage.
function eraseCard(key){
   var cardID = localStorage.getItem(key);
   var cardUnstring = JSON.parse(cardID);
   var cardNameArray = cardUnstring.name;
   var cardName = cardNameArray[1];
   var ask = confirm("Are you sure you want to delete this card?");
   if(ask){
      localStorage.removeItem(key);
      alert(cardName + " was successfully removed.");
      rekeyCards();
      window.location="#home";
   } else {
      alert("Don't worry! " + cardName + " was not removed.");
   };
};