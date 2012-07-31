//Scott Caruso
//MiU 1206
//Project 3 - Main JS file

window.addEventListener("DOMContentLoaded", function(){	   	   			   
    //Variables
    //var manaCosts = ["0","1","2","3","4","5","6","7","8","9","10+"]; - removing
    var typeValue;
    //makeManaCosts();
    var errorText = elementName("errors");
	
	//The below function gets the name of elements from the form.
    function elementName(x){
         var elementName = document.getElementById(x);
         return elementName;              
    };
    
   	/*Function to create Mana Cost Drop-Down
   	function makeManaCosts(){
   		var findFormTag = document.getElementsByTagName("form");
   		var whereToPut = elementName("manacost");
   		var makeManaDropdown = document.createElement("select");
   		makeManaDropdown.setAttribute("id", "manacosts");
   		for(var i=0, y=manaCosts.length; i<y; i++){
   			var makeOption = document.createElement("option");
   			var optionText = manaCosts[i];
   			makeOption.setAttribute("value", optionText);
   			makeOption.innerHTML = optionText;
   			makeManaDropdown.appendChild(makeOption);
   		}; 
   		whereToPut.appendChild(makeManaDropdown);		
   	}; -- putting back into HTML */
   	
   	//To get value from card type
   	function getCardType(){
   		var buttons = document.forms[0].type;
   		for(var i=0; i<buttons.length; i++){
   			if(buttons[i].checked){
   				typeValue = buttons[i].value;
   				//console.log(typeValue);
   			};
   		};
   	};
   	
   	//To get colors
   	function getCardColors(){
   		var colors = [];
		if(elementName("white").checked){
			colors.push("white");
		};
		if(elementName("black").checked){
			colors.push("black");
		};
		if(elementName("blue").checked){
			colors.push("blue");
		};
		if(elementName("red").checked){
			colors.push("red");
		};
		if(elementName("green").checked){
			colors.push("green");
		};		
		if(elementName("colorless").checked){
			colors.push("colorless");
		};	
		return colors	
   	};
   	
   	function toggleControls(dataDisplayed){
		switch(dataDisplayed){
			case "on":
				elementName("form").style.display = "none";
				elementName("eraseData").style.display = "inline";
				elementName("displayData").style.display = "none";
				elementName("addCard").style.display = "inline";		
				break;
			case "off":
				elementName("form").style.display = "block";
				elementName("eraseData").style.display = "inline";
				elementName("displayData").style.display = "none";
				elementName("cards").style.display = "none";
				elementName("addCard").style.display = "none";		
				break;
			default:
				elementName("addCard").style.display = "none";
				return false;
		};
	};
   	
   	//To store the data
   	function saveCard(key) {
   		if(!key){
   			var id = Math.floor(Math.random()*3253533);
   		} else {
   			var id = key;
   		};
   		var cardColors = getCardColors();
   		getCardType();
   		var card = {};
   			card.name = ["Card Name:", elementName("cardname").value];
            card.usage = ["Currently In Use?", elementName("currentuse").value];
            card.type = ["Card Type:", typeValue];
   			card.mana = ["Mana Cost:", elementName("manacosts").value];
            card.colors = ["Colors:", cardColors];
   			card.notes = ["Notes:", elementName("comments").value];
   			card.date = ["Date Acquired:", elementName("dateacquired").value];
   			card.love = ["Amount of Love:", elementName("preference").value];
   		localStorage.setItem(id, JSON.stringify(card));
   		alert(elementName("cardname").value + " has been added!");
   		window.location.reload();
   	};
   	
   	function displayCards(){
   		toggleControls("on");
   		if (localStorage.length === 0){
   			var ask = confirm("There is no data in local storage. Would you like to populate it with default/dummy data?");
   			if (ask) {
   				fillWithJsonData();
   			};
   		};
   		var makeDiv = document.createElement("div");
   		makeDiv.setAttribute("id", "cards");
   		var listCardsDL = document.createElement("dl");
   		makeDiv.appendChild(listCardsDL);
   		document.body.appendChild(makeDiv);
   		elementName("cards").style.display = "block";
   		elementName("addCard").style.display = "inline";
   		for(var i=0, y=localStorage.length; i<y; i++){
   			var makedt = document.createElement("dt");
   			var editDeleteLinks = document.createElement("dd");
   			listCardsDL.appendChild(makedt);
   			var key = localStorage.key(i);
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
   				makeCardDetails.appendChild(editDeleteLinks);
   			};
   			makeEditDeleteLinks(localStorage.key(i), editDeleteLinks);
   		};
   	};
   	
   	//Autofill with Json data
   	function fillWithJsonData(){
   		for(var x in json){
   			var id = Math.floor(Math.random()*3253533);
   			localStorage.setItem(id, JSON.stringify(json[x]));
   		};
   	};
   	
   	//creates the thumbnail image for the card type
   	function makeCardTypeImage(cardTypeName,makedt){
   		var makeImageLine = document.createElement("dd");
   		makedt.appendChild(makeImageLine);
   		var makeImage = document.createElement("img");
   		var imageSource = makeImage.setAttribute("src","img/" + cardTypeName + ".png");
   		makeImageLine.appendChild(makeImage);
   	};
   	
   	//This function creates the Edit Card and Delete Card links.
   	function makeEditDeleteLinks(key, editDeleteLinks){
		//edit link
		var editCardLink = document.createElement("a");
		editCardLink.href = "#";
		editCardLink.key = key;
		editCardLink.setAttribute("class","editcard");
		var editCardGuts = "Edit Card";
		editCardLink.addEventListener("click", editCard);
		editCardLink.innerHTML = editCardGuts;
		editDeleteLinks.appendChild(editCardLink);
		//delete link
		var deleteCardLink = document.createElement("a");
		deleteCardLink.href = "#";
		deleteCardLink.key = key;
		deleteCardLink.setAttribute("class", "deletecard");
		deleteCardLink.setAttribute("id", "deletecard");
		var deleteCardGuts = "Delete Card";
		deleteCardLink.addEventListener("click", eraseCard);
		deleteCardLink.innerHTML = deleteCardGuts;
		editDeleteLinks.appendChild(deleteCardLink);
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
   	
   	function editCard(){
   		var card = localStorage.getItem(this.key);
   		var cardUnstring = JSON.parse(card);
   		toggleControls("off");
   		elementName("cardname").value = cardUnstring.name[1];
         elementName("currentuse").value = cardUnstring.usage[1];
         var type = document.forms[0].type;
         for(var i=0; i<type.length; i++){
            if(type[i].value == "Creature" && cardUnstring.type[1] == "Creature"){
               type[i].setAttribute("checked", "checked");
            } else if(type[i].value == "Planeswalker" && cardUnstring.type[1] == "Planeswalker"){
               type[i].setAttribute("checked", "checked");
            } else if(type[i].value == "Instant" && cardUnstring.type[1] == "Instant"){
               type[i].setAttribute("checked", "checked");
            } else if(type[i].value == "Sorcery" && cardUnstring.type[1] == "Sorcery"){
               type[i].setAttribute("checked", "checked");
            } else if(type[i].value == "Enchantment-Buff" && cardUnstring.type[1] == "Enchantment = Buff"){
               type[i].setAttribute("checked", "checked");
            } else if(type[i].value == "Enchantment-Curse" && cardUnstring.type[1] == "Enchantment = Curse"){
               type[i].setAttribute("checked", "checked");
            } else if(type[i].value == "Artifact" && cardUnstring.type[1] == "Artifact"){
               type[i].setAttribute("checked", "checked");
            } else if(type[i].value == "Land" && cardUnstring.type[1] == "Land"){
               type[i].setAttribute("checked", "checked");
            }; 
         };    
   		elementName("manacosts").value = cardUnstring.mana[1];
   		var colors = cardUnstring.colors;
   		var namesOfColors = colors[1];
		   for(var i=0; i < namesOfColors.length; i++){
			   var colorName = namesOfColors[i];
            elementName(colorName).setAttribute("checked", "checked");
         //Commenting out below - this used to exist in Project 3, but I was challenged to 
         //find a way to condense this and make it more dynamic
         /*
         if(namesOfColors[i] == "white"){
				elementName("white").setAttribute("checked", "checked");
			};
			if(namesOfColors[i] == "black"){
				elementName("black").setAttribute("checked", "checked");
			};
			if(namesOfColors[i] == "blue"){
				elementName("blue").setAttribute("checked", "checked");
			};
			if(namesOfColors[i] == "red"){
				elementName("red").setAttribute("checked", "checked");
			};
			if(namesOfColors[i] == "green"){
				elementName("green").setAttribute("checked", "checked");
			};
			if(namesOfColors[i] == "colorless"){
				elementName("colorless").setAttribute("checked", "checked");
			};
         */
		   };
   		elementName("comments").value = cardUnstring.notes[1];
   		elementName("dateacquired").value = cardUnstring.date[1];
   		elementName("preference").value = cardUnstring.love[1];
         displayPreference(preference, preferenceDisplay); //make sure preference value updates
   		saveCardData.removeEventListener("click", saveCard);
   		elementName("submit").value = "Edit Card";
   		var newButton = elementName("submit");
   		newButton.addEventListener("click", validate);
   		newButton.key = this.key; 
   	};
   	
   	//Remember - the validate function only checked against name and colors; manacost and card type
   	//have default values and cannot be empty.
   	
   	function validate (x){
   		window.scrollTo(0,0);
   		var getName = elementName("cardname");
   		//verify that at least one of the colors is checked
   		var getColors = function isAColorChecked(){
			if(elementName("white").checked){
				var areColorsChecked = true;
			} else if(elementName("black").checked){
				var areColorsChecked = true;
			} else if(elementName("blue").checked){
				var areColorsChecked = true;
			} else if(elementName("red").checked){
				var areColorsChecked = true;
			} else if(elementName("green").checked){
				var areColorsChecked = true;
			} else if(elementName("colorless").checked){
				var areColorsChecked = true;
   			} else {
   				var areColorsChecked = false;
   			};
   			return areColorsChecked 
   		};
   		
   		errorText.innerHTML = ""; //so that function resets properly
   		var errorMessage = [];
   		if(getName.value === ""){
   			var nameError = "Please enter a name for this card.";
   			errorMessage.push(nameError);
   		};
   		var colors = getColors();
   		if(colors === false){
   			var colorsError = "Please select at least one color for this card.";
   			errorMessage.push(colorsError);
   		};
   		if(errorMessage.length >= 1){
   			for(var i = 0, j=errorMessage.length; i < j; i++){
   				var makeError = document.createElement("p");
   				makeError.innerHTML = errorMessage[i];   	
   				errorText.appendChild(makeError);	
   			};
   		   	x.preventDefault();
   			return false;
   		} else {
   			saveCard(this.key);
   		};

   	};
   	
   	function eraseCard(){
   		var cardID = localStorage.getItem(this.key);
   		var cardUnstring = JSON.parse(cardID);
   		var cardNameArray = cardUnstring.name;
   		var cardName = cardNameArray[1];
   		var ask = confirm("Are you sure you want to delete this card?");
   		if(ask){
   			localStorage.removeItem(this.key);
   			alert(cardName + " was successfully removed.");
   			window.location.reload();
   		} else {
   			alert("Don't worry! " + cardName + " was not removed.");
   		};
   	};

      //populates the unselectable text box next to the slider
      function displayPreference(preference, preferenceDisplay) {
            var x = elementName("preference");
            var y = elementName("preferenceDisplay");
            y.value = x.value;
        }

      window.onload = displayPreference(preference, preferenceDisplay);

	//Make things happen when the links are clicked.
	var displayCardData = elementName("displayData");
	displayCardData.addEventListener("click", displayCards);
  	var clearCardData = elementName("eraseData");
  	clearCardData.addEventListener("click", eraseCardData);
  	var saveCardData = elementName("submit");
  	saveCardData.addEventListener("click", validate);    
   var sliderChange = elementName("preference");
   sliderChange.addEventListener("change", displayPreference);      
});