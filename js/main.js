window.onload = loaded;

/**
 * Simple Function that will be run when the browser is finished loading.
 */
function loaded() {
    // Assign to a variable so we can set a breakpoint in the debugger!
    const hello = sayHello();
    console.log(hello);
}

/**
 * This function returns the string 'hello'
 * @return {string} the string hello
 */
export function sayHello() {
    return 'hello';
}
document.addEventListener("DOMContentLoaded", () => {
    // Navigation links
    const links = {
      dashboard: document.getElementById("dashboard-link"),
      projects: document.getElementById("projects-link"),
      detailedProject: document.getElementById("detailed-project-link"),
      categories: document.getElementById("categories-link"),
      analytics: document.getElementById("analytics-link"),
    };
  
    // Page sections
    const sections = {
      dashboard: document.getElementById("dashboard"),
      projects: document.getElementById("projects"),
      detailedProject: document.getElementById("detailed-project"),
      categories: document.getElementById("categories"),
      analytics: document.getElementById("analytics"),
    };
  
    // Add event listeners to links for navigation
    Object.entries(links).forEach(([key, link]) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(key);
      });
    });
  
    // Function to show a specific section and hide others
    function showSection(sectionId) {
      Object.values(sections).forEach((section) => {
        section.classList.add("hidden");
      });
      sections[sectionId].classList.remove("hidden");
    }
  
    // Placeholder for add-project functionality for next week :DDDDD
    document.getElementById("add-project").addEventListener("click", () => {
      alert("Add project functionality will be implemented next week!");
    });
  });