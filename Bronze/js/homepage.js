//Scott Caruso
//MiU 1206
//Project 3 - Homepage JS file

	//The below function gets the name of elements from the form.
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

function fillWithJsonData(){
   if(localStorage.length === 0){
      for(var x in json){
         var id = Math.floor(Math.random()*3253533);
         localStorage.setItem(id, JSON.stringify(json[x]));
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
      var entry = elementName("searchbox");
      var searchText = entry.value;
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
   var getKeywords = keywordSearch();
   if (getKeywords[0] === undefined){
      alert("There are no matches for this keyword.");
   } else {
      alert("We have found " + getKeywords.length + " matches for that keyword.");
      //var makeDiv = document.createElement("div");
      //makeDiv.setAttribute("id", "cards");
      var listCardsDL = document.createElement("dl");
      //makeDiv.appendChild(listCardsDL);
      var findDisplayDiv = elementName("displaybucket");
      findDisplayDiv.appendChild(listCardsDL);
      for(var i=0, y=getKeywords.length; i<y; i++){
         var cardValues = getKeywords;
         var makedt = document.createElement("dt");
         var editDeleteLinks = document.createElement("dd");
         listCardsDL.appendChild(makedt);
         var key = getKeywords[i];
         var value = localStorage.getItem(key);
         var obj = JSON.parse(value);
         var cardTitle = (obj.name[0] + " " + obj.name[1]);
         makedt.innerHTML = cardTitle;
         makedt.setAttribute("class", "cardtitle");
         makeCardTypeImage(obj.type[1],makedt);
         var makeCardDetails = document.createElement("dd");
         makedt.appendChild(makeCardDetails);
         delete obj.name;
         for(var n in obj){
            var makeCardDetailItem = document.createElement("dd");
            makeCardDetails.appendChild(makeCardDetailItem);
            var cardText = (obj[n][0] + " " + obj[n][1]);
            makeCardDetailItem.innerHTML = cardText;
            };
         };
      window.location="#displaybucket";
      };
};

function makeCardTypeImage(cardTypeName,makedt){
   var makeImageLine = document.createElement("dd");
   makedt.appendChild(makeImageLine);
   var makeImage = document.createElement("img");
   var imageSource = makeImage.setAttribute("src","img/" + cardTypeName + ".png");
   makeImageLine.appendChild(makeImage);
};

//Make things happen when the links are clicked.
var clearCardData = elementName("eraseData");
clearCardData.addEventListener("click", eraseCardData); 
var fillData = elementName("fillJsonData");
fillData.addEventListener("click", fillWithJsonData);
var searchButtonClick = elementName("searchbutton");
searchButtonClick.addEventListener("click", keywordRead);
