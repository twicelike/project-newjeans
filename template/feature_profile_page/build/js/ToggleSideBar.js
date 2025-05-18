const menuButton = document.getElementById("menuButton");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");
const overlay = document.getElementById("overlay");

let isSidebarOpen = true;

function toggleSidebar() {
  isSidebarOpen = !isSidebarOpen;
  sidebar.style.transform = isSidebarOpen ? "translateX(0)" : "translateX(-100%)";
  overlay.classList.toggle("hidden", !isSidebarOpen);
}


window.addEventListener("resize", function () {
    if (window.innerWidth <= 768) {
        sidebar.style.transform = "translateX(-100%)";
        isSidebarOpen = false;
        overlay.classList.toggle("hidden", !isSidebarOpen);
    }
});

menuButton.addEventListener("click", toggleSidebar);

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
overlay.addEventListener("click", () => {
  if (isSidebarOpen) {
    sidebar.style.transform = "translateX(-100%)";
    overlay.classList.add("hidden");
    isSidebarOpen = false;
  }
});

