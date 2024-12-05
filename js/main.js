document.addEventListener("DOMContentLoaded", async () => {
  const upcomingDeadlines = document.getElementById("upcoming-deadlines");
  const quickActions = document.getElementById("quick-actions");

  // Fetch all projects from AWS API
  async function fetchProjects() {
    try {
      const response = await fetch(
        "https://qpovxxohib.execute-api.us-east-2.amazonaws.com/projects"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  }

  // Load upcoming deadlines on the dashboard
  async function loadUpcomingDeadlines() {
    const projects = await fetchProjects();
    const sortedProjects = projects
      .filter((project) => project.dueDate) // Ensure dueDate exists
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5); // Take the next 5 deadlines

    upcomingDeadlines.innerHTML = sortedProjects.length
      ? sortedProjects
          .map(
            (project) =>
              `<li>${project.title} - Due: ${new Date(
                project.dueDate
              ).toLocaleDateString()}</li>`
          )
          .join("")
      : "<p>No upcoming deadlines!</p>";
  }

  // Load quick actions (delete, mark as complete) on the dashboard
  async function loadQuickActions() {
    const projects = await fetchProjects();

    quickActions.innerHTML = projects.length
      ? projects
          .map(
            (project) => `
          <li>
            ${project.title}
            <button data-id="${project.id}" class="delete-btn">Delete</button>
            <button data-id="${project.id}" class="complete-btn">Complete</button>
          </li>`
          )
          .join("")
      : "<p>No projects available!</p>";

    attachQuickActionListeners();
  }

  // Attach event listeners for delete and complete actions
  function attachQuickActionListeners() {
    document.querySelectorAll(".delete-btn").forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        try {
          await fetch(
            `https://qpovxxohib.execute-api.us-east-2.amazonaws.com/projects/${id}`,
            { method: "DELETE" }
          );
          loadUpcomingDeadlines();
          loadQuickActions();
        } catch (error) {
          console.error("Error deleting project:", error);
        }
      })
    );
  
    document.querySelectorAll(".complete-btn").forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        try {
          // Fetch the project details
          const response = await fetch(
            `https://qpovxxohib.execute-api.us-east-2.amazonaws.com/projects/${id}`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch project: ${response.statusText}`);
          }
          const project = await response.json();
  
          // Delete the original project
          await fetch(
            `https://qpovxxohib.execute-api.us-east-2.amazonaws.com/projects/${id}`,
            { method: "DELETE" }
          );
  
          // Re-add the project with the status set to "Completed"
          const updatedProject = { ...project, status: "Completed" };
          await fetch(
            `https://qpovxxohib.execute-api.us-east-2.amazonaws.com/projects`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedProject),
            }
          );
  
          loadUpcomingDeadlines();
          loadQuickActions();
        } catch (error) {
          console.error("Error marking project as complete:", error);
        }
      })
    );
  }
  

  // Load all dashboard data
  async function loadDashboard() {
    await loadUpcomingDeadlines();
    await loadQuickActions();
  }

  loadDashboard();
});
