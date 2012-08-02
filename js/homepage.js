//Scott Caruso
//AFW 1208
//Project 1 - Refactoring

//Ensure dom is loaded before doing anything else.
$(document).bind("pageinit", function(){
   var form = $("#addcardform");
   form.validate({
      invalidHandler: function(form, validator){},
      submitHandler: function(){
         saveCard();
      }
   });

function elementName(x){
   var elementName = document.getElementById(x);
   return elementName;              
};

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
   $(editCardIDSelector).bind("click",function(){editCard(key)});
   $(deleteCardIDSelector).bind("click",function(){eraseCard(key)});
};

function newsFeed(){
   clearSearchPage();
   if (localStorage.length === 0){
      alert("There are no cards saved in this binder to view.");
   } else {
      var findDisplayDiv = elementName("displaybucket");
      var listCardsDL = document.createElement("dl");
      listCardsDL.setAttribute("id", "listcards");
      findDisplayDiv.appendChild(listCardsDL);
      for(var y=localStorage.length; y>0; y--){
         var makedt = document.createElement("dt");
         makedt.setAttribute("id", "makedt");
         var editDeleteLinks = document.createElement("dd");
         listCardsDL.appendChild(makedt);
         var key = y;
         var value = localStorage.getItem(key);
         var obj = JSON.parse(value);
         if(obj !==null){
            var cardTitle = (obj.name[0] + " " + obj.name[1]);
            makedt.innerHTML = cardTitle;
            makedt.setAttribute("class", "cardtitle");
            var makeid = document.createElement("dd");
            var makeCount = ("Card " + y + " of " + localStorage.length);
            makeid.innerHTML = makeCount;
            makeid.setAttribute("class", "cardid");
            makedt.appendChild(makeid);
            //makeCardTypeImage(obj.type[1],makedt); - Depricated and removing from results.
            var makeCardDetails = document.createElement("dd");
            makedt.appendChild(makeCardDetails);
            delete obj.name;
            for(var n in obj){
               var makeCardDetailItem = document.createElement("dd");
               makeCardDetailItem.setAttribute("class", "testclass");
               makeCardDetails.appendChild(makeCardDetailItem);
               var cardText = (obj[n][0] + " " + obj[n][1]);
               makeCardDetailItem.innerHTML = cardText;
               };
            makeEditDeleteLinks(key, editDeleteLinks);
            makedt.appendChild(editDeleteLinks);
         };
      };
      window.location="#display";
      deleteLink();
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
      console.log(id);
   };
      var cardColors = getCardColors();
      var cardType = getCardType();
      var card = {};
         card.name = ["Card Name:", $("#cardname").val()];
         card.usage = ["Currently In Use?", $("#currentuse").val()];
         card.type = ["Card Type:", cardType];
         card.mana = ["Mana Cost:", $("#manacost").val()];
         card.colors = ["Colors:", cardColors];
         card.notes = ["Notes:", $("#comments").val()];
         card.number = ["Number Owned:", $("#numberowned").val()];
      localStorage.setItem(id, JSON.stringify(card));
      alert($("#cardname").val() + " has been added!");
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

//Make things happen when the links are clicked.
$("#eraseData").bind("click",function(){eraseCardData()});
//var clearCardData = elementName("eraseData");
//clearCardData.addEventListener("click", eraseCardData);
var fillData = elementName("fillJsonData");
fillData.addEventListener("click", fillWithJsonData);
var searchButtonClick = elementName("searchbutton");
searchButtonClick.addEventListener("click", keywordRead);
//var recentClick = elementName("recentcards");
//recentClick.addEventListener("click", newsFeed);
//var addCardClick = elementName("addcard");
//addCardClick.addEventListener("click", addCardReload);
//var saveCardData = elementName("submit");
//saveCardData.addEventListener("click", saveCard);


//The below is a test function to use to verify that JS is working right in specific locations.
function testFunction(){
   alert("JS is working!")
};

});

