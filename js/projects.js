document.addEventListener("DOMContentLoaded", () => {
    const projectList = document.getElementById("project-list");
    const searchBar = document.getElementById("search-bar");
    const filterDropdown = document.getElementById("filter-dropdown");
  
    // Load Projects
    function loadProjects() {
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const searchInput = searchBar.value.toLowerCase();
      const filterValue = filterDropdown.value;
  
      const filteredProjects = projects.filter(
        (project) =>
          (!searchInput || project.title.toLowerCase().includes(searchInput)) &&
          (!filterValue || project.subject === filterValue)
      );
  
      projectList.innerHTML = filteredProjects
        .map(
          (project, index) => `
          <div class="project-card">
            <h3>${project.title}</h3>
            <p><strong>Due:</strong> ${project.dueDate}</p>
            <p><strong>Subject:</strong> ${project.subject}</p>
            <p><strong>Description:</strong> ${project.description}</p>
            <p><strong>Status:</strong> ${project.status || "In Progress"}</p>
            <button class="complete-btn" data-index="${index}">Mark as Complete</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
          </div>
        `
        )
        .join("");
  
      attachProjectActionListeners();
    }
  
    // Attach event listeners for delete and complete buttons
    function attachProjectActionListeners() {
      // Delete project
      document.querySelectorAll(".delete-btn").forEach((btn) =>
        btn.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          const projects = JSON.parse(localStorage.getItem("projects")) || [];
          projects.splice(index, 1); // Remove the selected project
          localStorage.setItem("projects", JSON.stringify(projects));
          loadProjects(); // Reload project list
        })
      );
  
      // Mark as complete
      document.querySelectorAll(".complete-btn").forEach((btn) =>
        btn.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          const projects = JSON.parse(localStorage.getItem("projects")) || [];
          projects[index].status = "Completed"; // Mark as completed
          localStorage.setItem("projects", JSON.stringify(projects));
          loadProjects(); // Reload project list
        })
      );
    }
  
    // Add event listeners for search and filter
    searchBar.addEventListener("input", loadProjects);
    filterDropdown.addEventListener("change", loadProjects);
  
    // Initial load
    loadProjects();
  });
  