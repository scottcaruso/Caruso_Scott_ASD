function(doc) {
	if (doc.type === "Enchantment-Buff") {
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