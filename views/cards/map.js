function(doc) {
  if (doc.type != undefined	) {
    emit(doc.name, {
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