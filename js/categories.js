document.addEventListener("DOMContentLoaded", () => {
    const categoriesDiv = document.getElementById("categories");
  
    function loadCategories() {
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const categories = {};
  
      projects.forEach((project) => {
        if (!categories[project.subject]) {
          categories[project.subject] = [];
        }
        categories[project.subject].push(project);
      });
  
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
  