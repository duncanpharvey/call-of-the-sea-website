function() {
	var parent = {{Click Element}}.parentElement;
	var menuIds = ["mobile-menu-main-menu", "menu-main-menu"];
	var level = 0;
	while (parent && !menuIds.includes(parent.id)) {
		if (parent.classList.contains("sub-menu")) level++;
		parent = parent.parentElement;
	}
	return "click sub level " + level;
}