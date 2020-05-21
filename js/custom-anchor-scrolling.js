/*
https://wpcotstest.wpengine.com/sail-with-us/youth-day/
*/

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".program-lesson-links a").forEach(link => {
        // add anchor scrolling class to lesson links
        link.classList.add("fusion-one-page-text-link");

        // listen for clicks on lesson links and open corresponding toggle if lesson link is clicked
        link.addEventListener("click", () => {
            var toggle = document.querySelector(link.href.match(/#.*$/) + " a");
            // toggle class = collapsed, active, or null
            if (!toggle.classList.contains("active")) {
                toggle.click();
            }
        });
    });
});