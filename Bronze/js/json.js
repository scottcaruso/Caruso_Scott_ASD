//Scott Caruso
//MiU 1206
//Project 3 - JSON file

var json = {
	"card1": {
		"name": ["Card Name:","Flying Warbler"],
		"usage": ["Currently In Use?", "true"],
		"type": ["Card Type:", "Creature"],
		"mana": ["Mana Cost:","3"],
		"colors": ["Colors:",["white","blue"]],
		"notes": ["Notes:", "1/1, flying"],
		"date": ["Date Acquired:", "2012/3/12"],
		"love": ["Amount of Love:", "4"]
	},
	"card2": {
		"name": ["Card Name:","Scour"],
		"usage": ["Currently In Use?", "false"],
		"type": ["Card Type:", "Sorcery"],
		"mana": ["Mana Cost:","2"],
		"colors": ["Colors:",["blue"]],
		"notes": ["Notes:", ""],
		"date": ["Date Acquired:", "2012/4/12"],
		"love": ["Amount of Love:", "9"]
	},
	"card3": {
		"name": ["Card Name:","Liliana"],
		"usage": ["Currently In Use?", "true"],
		"type": ["Card Type:", "Planeswalker"],
		"mana": ["Mana Cost:","6"],
		"colors": ["Colors:",["red"]],
		"notes": ["Notes:", "so awesome"],
		"date": ["Date Acquired:", "2012/3/12"],
		"love": ["Amount of Love:", "1"]
	},
	"card4": {
		"name": ["Card Name:","Crackle"],
		"usage": ["Currently In Use?", "false"],
		"type": ["Card Type:", "Instant"],
		"mana": ["Mana Cost:","1"],
		"colors": ["Colors:",["red"]],
		"notes": ["Notes:", "1 damage instantly"],
		"date": ["Date Acquired:", "2012/4/12"],
		"love": ["Amount of Love:", "9"]
	},
	"card5": {
		"name": ["Card Name:","Strength of Men"],
		"usage": ["Currently In Use?", "true"],
		"type": ["Card Type:", "Enchantment-Buff"],
		"mana": ["Mana Cost:","4"],
		"colors": ["Colors:",["white"]],
		"notes": ["Notes:", "+3/+3"],
		"date": ["Date Acquired:", "2012/3/12"],
		"love": ["Amount of Love:", "4"]
	},
	"card6": {
		"name": ["Card Name:","Vampire's Bite"],
		"usage": ["Currently In Use?", "false"],
		"type": ["Card Type:", "Enchantment-Curse"],
		"mana": ["Mana Cost:","3"],
		"colors": ["Colors:",["black"]],
		"notes": ["Notes:", "1 damage each turn"],
		"date": ["Date Acquired:", "2012/4/12"],
		"love": ["Amount of Love:", "9"]
	},
	"card7": {
		"name": ["Card Name:","Boots of Steel"],
		"usage": ["Currently In Use?", "true"],
		"type": ["Card Type:", "Artifact"],
		"mana": ["Mana Cost:","1"],
		"colors": ["Colors:",["colorless"]],
		"notes": ["Notes:", "+0/+1"],
		"date": ["Date Acquired:", "2012/1/12"],
		"love": ["Amount of Love:", "8"]
	},
	"card8": {
		"name": ["Card Name:","Plains"],
		"usage": ["Currently In Use?", "true"],
		"type": ["Card Type:", "Land"],
		"mana": ["Mana Cost:","0"],
		"colors": ["Colors:",["white"]],
		"notes": ["Notes:", "I have 17 of these"],
		"date": ["Date Acquired:", "2012/4/12"],
		"love": ["Amount of Love:", "9"]
	},
	"card9": {
		"name": ["Card Name:","Awesome Bomb"],
		"usage": ["Currently In Use?", "false"],
		"type": ["Card Type:", "Sorcery"],
		"mana": ["Mana Cost:","4"],
		"colors": ["Colors:",["red"]],
		"notes": ["Notes:", "Does 6 damage"],
		"date": ["Date Acquired:", "2012/3/12"],
		"love": ["Amount of Love:", "4"]
	},
	"card10": {
		"name": ["Card Name:","Burn the Earth"],
		"usage": ["Currently In Use?", "false"],
		"type": ["Card Type:", "Sorcery"],
		"mana": ["Mana Cost:","5"],
		"colors": ["Colors:",["black", "red"]],
		"notes": ["Notes:", "Sac a land"],
		"date": ["Date Acquired:", "2012/4/12"],
		"love": ["Amount of Love:", "9"]
	},
	"card11": {
		"name": ["Card Name:","Ball and Chain"],
		"usage": ["Currently In Use?", "true"],
		"type": ["Card Type:", "Enchantment-Curse"],
		"mana": ["Mana Cost:","2"],
		"colors": ["Colors:",["black"]],
		"notes": ["Notes:", "-2/-1"],
		"date": ["Date Acquired:", "2012/3/12"],
		"love": ["Amount of Love:", "1"]
	},
	"card12": {
		"name": ["Card Name:","Snap"],
		"usage": ["Currently In Use?", "false"],
		"type": ["Card Type:", "Instant"],
		"mana": ["Mana Cost:","1"],
		"colors": ["Colors:",["red"]],
		"notes": ["Notes:", "1 damage instantly"],
		"date": ["Date Acquired:", "2012/4/12"],
		"love": ["Amount of Love:", "9"]
	},
	"card13": {
		"name": ["Card Name:","Strength of Oaks"],
		"usage": ["Currently In Use?", "true"],
		"type": ["Card Type:", "Enchantment-Buff"],
		"mana": ["Mana Cost:","4"],
		"colors": ["Colors:",["green"]],
		"notes": ["Notes:", "+3/+3"],
		"date": ["Date Acquired:", "2012/3/12"],
		"love": ["Amount of Love:", "4"]
	},
	"card14": {
		"name": ["Card Name:","Vanish"],
		"usage": ["Currently In Use?", "false"],
		"type": ["Card Type:", "Enchantment-Curse"],
		"mana": ["Mana Cost:","2"],
		"colors": ["Colors:",["blue"]],
		"notes": ["Notes:", ""],
		"date": ["Date Acquired:", "2012/4/12"],
		"love": ["Amount of Love:", "9"]
	},
	"card15": {
		"name": ["Card Name:","Cairn of Invisibility"],
		"usage": ["Currently In Use?", "true"],
		"type": ["Card Type:", "Artifact"],
		"mana": ["Mana Cost:","3"],
		"colors": ["Colors:",["colorless"]],
		"notes": ["Notes:", "equip. unblockable"],
		"date": ["Date Acquired:", "2012/1/12"],
		"love": ["Amount of Love:", "8"]
	},
	"card16": {
		"name": ["Card Name:","Forest"],
		"usage": ["Currently In Use?", "true"],
		"type": ["Card Type:", "Land"],
		"mana": ["Mana Cost:","0"],
		"colors": ["Colors:",["green"]],
		"notes": ["Notes:", "I have 22 of these"],
		"date": ["Date Acquired:", "2012/4/12"],
		"love": ["Amount of Love:", "9"]
	},
	"card17": {
		"name": ["Card Name:","Mountain"],
		"usage": ["Currently In Use?", "true"],
		"type": ["Card Type:", "Land"],
		"mana": ["Mana Cost:","0"],
		"colors": ["Colors:",["red"]],
		"notes": ["Notes:", "I have 11 of these"],
		"date": ["Date Acquired:", "2012/4/12"],
		"love": ["Amount of Love:", "9"]
	},
	"card18": {
		"name": ["Card Name:","Swamp"],
		"usage": ["Currently In Use?", "true"],
		"type": ["Card Type:", "Land"],
		"mana": ["Mana Cost:","0"],
		"colors": ["Colors:",["black"]],
		"notes": ["Notes:", "I have 15 of these"],
		"date": ["Date Acquired:", "2012/4/12"],
		"love": ["Amount of Love:", "9"]
	},
	"card19": {
		"name": ["Card Name:","Island"],
		"usage": ["Currently In Use?", "true"],
		"type": ["Card Type:", "Land"],
		"mana": ["Mana Cost:","0"],
		"colors": ["Colors:",["blue"]],
		"notes": ["Notes:", "I have 14 of these"],
		"date": ["Date Acquired:", "2012/4/12"],
		"love": ["Amount of Love:", "9"]
	},
	"card20": {
		"name": ["Card Name:","Apex Hawks"],
		"usage": ["Currently In Use?", "true"],
		"type": ["Card Type:", "Creature"],
		"mana": ["Mana Cost:","2"],
		"colors": ["Colors:",["white"]],
		"notes": ["Notes:", "1/1, flying"],
		"date": ["Date Acquired:", "2012/4/12"],
		"love": ["Amount of Love:", "3"]
	}
};