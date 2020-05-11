function() {
	var sibling = {{Click Element}}.parentElement.parentElement.previousElementSibling;
	while (sibling && !sibling.matches("a")) {
		sibling = sibling.previousElementSibling;
	}
    var parentMenu = sibling ? sibling.querySelector("span").textContent.toLowerCase() : "no parent menu found";
    return parentMenu + " - click";
}