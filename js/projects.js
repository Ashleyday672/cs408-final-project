document.addEventListener("DOMContentLoaded", async () => {
  const projectList = document.getElementById("project-list");
  const searchBar = document.getElementById("search-bar");
  const filterDropdown = document.getElementById("filter-dropdown");

  async function loadProjects() {
    try {
      const response = await fetch(
        "https://qpovxxohib.execute-api.us-east-2.amazonaws.com/projects"
      );
      if (!response.ok) {
        throw new Error("Failed to load projects");
      }

      const projects = await response.json();
      const searchInput = searchBar.value.toLowerCase();
      const filterValue = filterDropdown.value;

      const filteredProjects = projects.filter(
        (project) =>
          (!searchInput || project.title.toLowerCase().includes(searchInput)) &&
          (!filterValue || project.subject === filterValue)
      );

      projectList.innerHTML = filteredProjects
        .map(
          (project) => `
          <div class="project-card">
            <h3>${project.title}</h3>
            <p><strong>Due:</strong> ${project.dueDate}</p>
            <p><strong>Subject:</strong> ${project.subject}</p>
            <p><strong>Description:</strong> ${project.description}</p>
            <p><strong>Status:</strong> ${project.status || "In Progress"}</p>
            <button class="complete-btn" data-id="${project.id}">Mark as Complete</button>
            <button class="delete-btn" data-id="${project.id}">Delete</button>
          </div>
        `
        )
        .join("");

      attachProjectActionListeners();
    } catch (error) {
      console.error("Error loading projects:", error);
      projectList.innerHTML = `<p>Failed to load projects.</p>`;
    }
  }

  async function deleteProject(id) {
    try {
      const response = await fetch(
        `https://qpovxxohib.execute-api.us-east-2.amazonaws.com/projects/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      loadProjects(); // Reload the project list
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }

  async function markAsComplete(id) {
    try {
      // Fetch the project details
      const fetchResponse = await fetch(
        `https://qpovxxohib.execute-api.us-east-2.amazonaws.com/projects/${id}`
      );
      if (!fetchResponse.ok) {
        throw new Error(`Failed to fetch project: ${fetchResponse.statusText}`);
      }
      const project = await fetchResponse.json();

      // Delete the original project
      const deleteResponse = await fetch(
        `https://qpovxxohib.execute-api.us-east-2.amazonaws.com/projects/${id}`,
        { method: "DELETE" }
      );
      if (!deleteResponse.ok) {
        throw new Error(`Failed to delete project: ${deleteResponse.statusText}`);
      }

      // Re-add the project with the status set to "Completed"
      const updatedProject = { ...project, status: "Completed" };
      const addResponse = await fetch(
        `https://qpovxxohib.execute-api.us-east-2.amazonaws.com/projects`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProject),
        }
      );
      if (!addResponse.ok) {
        throw new Error(`Failed to re-add project: ${addResponse.statusText}`);
      }

      loadProjects(); // Reload the project list
    } catch (error) {
      console.error("Error marking project as complete:", error);
    }
  }

  function attachProjectActionListeners() {
    document.querySelectorAll(".delete-btn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        deleteProject(id);
      })
    );

    document.querySelectorAll(".complete-btn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        markAsComplete(id);
      })
    );
  }

  searchBar.addEventListener("input", loadProjects);
  filterDropdown.addEventListener("change", loadProjects);

  loadProjects(); // Initial load
});
