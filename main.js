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

//On document load, fetch the data from couch.
$(document).on("pageinit", function(){
   $.couch.db("mtgbinder").view("planeswalkersbinder/cards", {
      success: function(data){
         console.log(data);
      }
   })
})

/*Placeholder savedata function for now.
$.couch.db("mtgbinder").saveDoc(doc, {
    success: function(data) {
        console.log(data);
    },
    error: function(status) {
        console.log(status);
    }
});

//Placeholder edit function for now.
var doc = {
    _id: "d12ee5ea1df6baa2b06451f44a019ab9",
    _rev: "1-967a00dff5e02add41819138abb3284d",
    foo: "bar"
};
$.couch.db("mydb").saveDoc(doc, {
    success: function(data) {
        console.log(data);
    },
    error: function(status) {
        console.log(status);
    }
});

//Placeholder delete function for now - use this in place of existing Delete!
var doc = {
    _id: "d12ee5ea1df6baa2b06451f44a019ab9",
    _rev: "2-13839535feb250d3d8290998b8af17c3"
};
$.couch.db("mydb").removeDoc(doc, {
     success: function(data) {
         console.log(data);
    },
    error: function(status) {
        console.log(status);
    }
});
/*

/*
Commenting out, since this shouldn't be needed anymore. Relic of pre-jquery days.
function elementName(x){
   var elementName = document.getElementById(x);
   return elementName;              
};
*/

function eraseCardData(){
	if(localStorage.length === 0){
		alert("There are no cards in your binder to clear.");
	} else {
		 var ask = confirm("Are you sure you want to erase all card data?");
			if(ask){
			localStorage.clear();
			alert("All cards have been removed from your binder.");
			window.location.reload();
			return false;
		};
	};
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

//Turn what's in the search field into a string
function searchString(){
   if(localStorage.length === 0){
      alert("There is no data in Local Storage to search!");
   } else {
      var searchText = $("#searchbox").attr("value");
      return searchText;
   };
};

//Parse Local Storage for the Search Text
function keywordSearch(){
   var searchText = searchString();
   var matches = [];
   for(var i=0, y=localStorage.length; i<y; i++){
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      var obj = JSON.parse(value);
      var cardNameArray = obj.name;
      var cardName = cardNameArray[1];
      var doesSearchTermExist = cardName.match(searchText);
      if (doesSearchTermExist != null){
         matches.push(key);
      };
   };
   return matches;
};

function keywordRead(){
   clearSearchPage();
   var getKeywords = keywordSearch();
   if (getKeywords[0] === undefined){
      alert("There are no matches for this keyword.");
      return
   } else {
      alert("We have found " + getKeywords.length + " matches for that keyword.");
      $("#displaybucket").append("<dl></dl>");
      for(var i=0, y=getKeywords.length; i<y; i++){
         var cardValues = getKeywords;
         var key = getKeywords[i];
         var value = localStorage.getItem(key);
         var obj = JSON.parse(value);
         var cardTitle = (obj.name[0] + " " + obj.name[1]);
         var cardTitleID = ("title" + key);
         var cardTitleSelector = ("#" + cardTitleID); 
         $("#displaybucket").find("dl").append("<dt id='cardtitle'></dt>");
         $("#cardtitle").attr("class","cardtitle").attr("id",cardTitleID).html(cardTitle);
         var makeCount = ("Card " + key + " of " + localStorage.length);
         var countID = ("count" + key);
         var countIDSelector = ("#" + countID);
         $(cardTitleSelector).append("<dd id='cardID'></dd>");
         $("#cardID").attr("class","cardID").attr("id",countID).html(makeCount);
         delete obj.name;
         for(var n in obj){
            var cardText = (obj[n][0] + " " + obj[n][1]);
            $(countIDSelector).append("<dd id='individualdetail'>" + cardText + "</dd>");
         };
      addLinkClickEvents(cardTitleSelector, key);
      };
      window.location="#display";
   };
};

//The below function empties the search page every time new results are populated.
function clearSearchPage(){
   $(".displaybucket").empty();
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
   if($("#submit").val() === "Edit Card"){
      var id = $("#submit").attr("key");
   } else {
      var y = localStorage.length;
      var id = y+1;
   };
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
      window.location="#home";
      window.location.reload();     
};

//As it says, this function activates the Edit Card functionality
function editCard(key){
   var card = localStorage.getItem(key);
   var cardUnstring = JSON.parse(card);
   $("#cardname").val(cardUnstring.name[1]);
   $("#currentuse").val(cardUnstring.usage[1]);
   var type = document.forms[0].cardtype;
   $("#cardtype").val(cardUnstring.type[1]); 
   $("#manacost").attr("value",cardUnstring.mana[1]);
   var colors = cardUnstring.colors;
   var namesOfColors = colors[1];
   for(var i=0; i < namesOfColors.length; i++){
      var colorName = namesOfColors[i];
      var colorNameSelector = ("#" + colorName);
      $(colorNameSelector).attr("checked", "checked");
   };
   $("#comments").val(cardUnstring.notes[1]);
   $("#numberowned").val(cardUnstring.number[1]);
   var key = key;
   $("#submit").val("Edit Card").attr("key",key);
   $("#reset").attr("disabled","disabled");
};

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

//This function reloads the screen when a card has been added.
function addCardReload(){
   window.location="#addcard";
   window.location.reload();
};

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

//This is the guts of the Csv display; works in tandem with it
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

//Make things happen when the links are clicked.
//The "unbind" events exist to prevent a bug where double pop-ups were occurring as if there were two clicks being registered.
$("#eraseData").unbind("click");
$("#fillJsonData").unbind("click");
$("#searchbutton").unbind("click");
$("#recentcards").unbind("click");
$("#addcard").unbind("click");
$("#viewactive").unbind("click");
$("#eraseData").on("click",function(){eraseCardData(); return false});
$("#fillJsonData").on("click",function(){fillWithJsonData(); return false});
$("#searchbutton").on("click",function(){keywordRead(); return false});
$("#recentcards").on("click",function(){storeIdInLocalStorage(1,2); return false});
$("#addcard").on("click",function(){addCardReload(); return false});
$("#allcards")
   .on("click",
      function(){
         getJsonAjax();
         return false
      });

//All of the below are functions that are only for use with COUCHBASE data.

//Manipulate local storage to temporarily pass _id and _rev around.
function storeIdInLocalStorage(id,rev){
   localStorage.clear();
   localStorage.setItem("Card ID",id);
   localStorage.setItem("Card Rev",rev);
};

//Saves data from form to couch
function saveDataToCouch(card){
   $.couch.db("mtgbinder").saveDoc(card, {
       success: function() {
         alert($("#cardname").val() + " has been added!");
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

//This is the guts of the Json display; works in tandem with it. - FOR USE WITH COUCHBASE ONLY!
function makeJsonDataDisplay(data){	
   window.location="#display";
   $("#displaybucket").empty();
   $("#displaybucketcollapse").empty();
   for(var i=0, j=data.rows.length; i<j; i++){
      var card = data.rows[i];
      $('<div data-role="collapsible" data-theme="b" id="displaycollapse">'+
            '<h3>' + "Card Name: " + card.value.name + '</h3>'+
            '<p>' + "Currently In Use? " + card.value.usage + '</p>' +
            '<p>' + "Card Type: " + card.value.type + '</p>' +  
            '<p>' + "Mana Cost: " + card.value.mana + '</p>' +  
            '<p>' + "Colors: " + card.value.colors + '</p>' +  
            '<p>' + "Notes: " + card.value.notes + '</p>' + 
            '<p>' + "Number Owned: " + card.value.number + '</p>' +
         '</div>'
      ).appendTo('#displaybucketcollapse');
   };
   $("#displaybucketcollapse").collapsibleset("refresh");
};

$("#viewactive").on("click",function(){getJsonAjaxInUse(); return false});

});