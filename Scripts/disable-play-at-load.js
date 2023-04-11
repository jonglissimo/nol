var myTrigger = script.addTrigger("Disable Play at Load", "Trigger description"); 								

function scriptParameterChanged(param)
{
	if(param.is(myTrigger)) {
		var items = root.sequences.getItems();

		for (var i = 0; i < items.length; i++) {
			var seq = items[i];
			local.send("/scenes/" + seq.name + "/sequences/sequence/playAtLoad", 0);
		}
	}
}
