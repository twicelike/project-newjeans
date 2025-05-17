const menuButton = document.getElementById("menuButton");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");

let isSidebarOpen = true;

function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
    sidebar.style.transform = isSidebarOpen ? "translateX(0)" : "translateX(-100%)";
}

window.addEventListener("resize", function () {
    if (window.innerWidth <= 768) {
        sidebar.style.transform = "translateX(-100%)";
        isSidebarOpen = false;
    }
});

menuButton.removeEventListener("click", toggleSidebar);

menuButton.addEventListener("mouseenter", () => {
    sidebar.style.transform = "translateX(0)";
});

sidebar.addEventListener("mouseenter", () => {
    sidebar.style.transform = "translateX(0)";
});

sidebar.addEventListener("mouseleave", () => {
    sidebar.style.transform = "translateX(-100%)";
});

menuButton.addEventListener("mouseleave", (e) => {
    if (e.clientX > menuButton.getBoundingClientRect().right) {
        return;
    }
    sidebar.style.transform = "translateX(-100%)";
});

// const links = document.querySelectorAll("nav a");
// const sections = document.querySelectorAll(".content-section");

// links.forEach(link => {
//     link.addEventListener("click", function (event) {
//         event.preventDefault();
//         sections.forEach(section => section.classList.add("hidden"));
//         document.getElementById(this.getAttribute("data-target")).classList.remove("hidden");
//     });
// });
