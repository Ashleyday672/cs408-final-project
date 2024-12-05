document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-project-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newProject = {
      id: Date.now().toString(), // Unique ID for each project
      title: sanitizeInput(document.getElementById("project-title").value),
      dueDate: sanitizeInput(document.getElementById("due-date").value),
      subject: sanitizeInput(document.getElementById("subject").value),
      description: sanitizeInput(
        document.getElementById("description").value
      ),
      status: "In Progress",
    };

    try {
      const response = await fetch(
        "https://qpovxxohib.execute-api.us-east-2.amazonaws.com/projects",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProject),
        }
      );

      if (response.ok) {
        alert("Project added successfully!");
        form.reset();
        window.location.href = "projects.html"; // Redirect to projects page
      } else {
        throw new Error("Failed to add project");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the project.");
    }
  });

  function sanitizeInput(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
});
