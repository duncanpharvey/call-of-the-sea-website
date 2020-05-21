function() {
	var parent = {{Click Element}}.parentElement;
	var level = 1;
	while (parent && !parent.classList.contains("menu")) {
		if (parent.classList.contains("children")) level++;
		parent = parent.parentElement;
	}
	return "click sub level " + level;
}