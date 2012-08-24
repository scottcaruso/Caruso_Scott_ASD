function(doc) {
	for (i=0; i<doc.colors.length; i++){
		if (doc.colors[i] === "green") {
		    emit(doc.name, {
		    	"id" : doc._id,
		    	"rev" : doc._rev,
		    	"name" : doc.name,
		    	"colors" : doc.colors,
		    	"mana" : doc.mana,
		    	"notes" : doc.notes,
		    	"number" : doc.number,
		    	"type" : doc.type,
		    	"usage" : doc.usage
		    });
		}
	};
};