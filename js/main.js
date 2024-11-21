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
  // Section references
  const sections = {
    dashboard: document.getElementById("dashboard"),
  };

  // Link references
  const links = {
    dashboard: document.getElementById("dashboard-link"),
  };

  // Show the selected section and hide others
  function showSection(sectionId) {
    Object.values(sections).forEach((section) => {
      section.classList.add("hidden"); // Hide all sections
    });
    sections[sectionId]?.classList.remove("hidden"); // Show the selected section
  }

  // Load Dashboard
  function loadDashboard() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    // Populate deadlines
    const deadlines = document.getElementById("upcoming-deadlines");
    deadlines.innerHTML = projects
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5)
      .map((project) => `<li>${project.title} - Due: ${project.dueDate}</li>`)
      .join("");

    // Populate quick actions
    const quickActions = document.getElementById("quick-actions");
    quickActions.innerHTML = projects
      .map(
        (project, index) =>
          `<li>${project.title} 
          <button data-index="${index}" class="delete-btn">Delete</button>
          <button data-index="${index}" class="complete-btn">Complete</button>
          </li>`
      )
      .join("");

    attachQuickActionListeners();
  }

  // Attach event listeners for quick actions
  function attachQuickActionListeners() {
    document.querySelectorAll(".delete-btn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        projects.splice(index, 1); // Remove the selected project
        localStorage.setItem("projects", JSON.stringify(projects));
        loadDashboard(); // Reload dashboard
      })
    );

    document.querySelectorAll(".complete-btn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        projects[index].status = "Completed"; // Mark as completed
        localStorage.setItem("projects", JSON.stringify(projects));
        loadDashboard(); // Reload dashboard
        updateAnalytics(); // Update analytics
      })
    );
  }

  // Initial load
  loadDashboard();
});
