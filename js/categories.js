document.addEventListener("DOMContentLoaded", async () => {
  const categoriesDiv = document.getElementById("categories");

  // Fetch all projects from AWS API
  async function fetchProjects() {
    try {
      const response = await fetch(
        "https://qpovxxohib.execute-api.us-east-2.amazonaws.com/projects"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  }

  // Group projects by subject and display them
  async function loadCategories() {
    const projects = await fetchProjects();
    const categories = {};

    projects.forEach((project) => {
      if (!categories[project.subject]) {
        categories[project.subject] = [];
      }
      categories[project.subject].push(project);
    });

    // Render categories and projects
    categoriesDiv.innerHTML = Object.entries(categories)
      .map(
        ([subject, projects]) => `
        <div class="category">
          <h3>${subject}</h3>
          <ul>
            ${projects
              .map(
                (project) =>
                  `<li>${project.title} - Due: ${project.dueDate} (${project.status})</li>`
              )
              .join("")}
          </ul>
        </div>
      `
      )
      .join("");
  }

  loadCategories();
});
