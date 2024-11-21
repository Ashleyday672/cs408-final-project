document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add-project-form");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const title = sanitizeInput(document.getElementById("project-title").value);
      const dueDate = sanitizeInput(document.getElementById("due-date").value);
      const subject = sanitizeInput(document.getElementById("subject").value);
      const description = sanitizeInput(
        document.getElementById("description").value
      );
  
      const newProject = {
        title,
        dueDate,
        subject,
        description,
        status: "In Progress",
      };
  
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      projects.push(newProject);
      localStorage.setItem("projects", JSON.stringify(projects));
  
      alert("Project added successfully!");
      form.reset();
      window.location.href = "index.html";
    });
  
    function sanitizeInput(input) {
      return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  });
  