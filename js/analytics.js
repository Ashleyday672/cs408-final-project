document.addEventListener("DOMContentLoaded", async () => {
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

  // Load completion chart with data
  async function loadCompletionChart() {
    const projects = await fetchProjects();
    const completed = projects.filter((p) => p.status === "Completed").length;
    const inProgress = projects.length - completed;

    const ctx = document.getElementById("completionChart").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Completed", "In Progress"],
        datasets: [
          {
            label: "Project Completion",
            data: [completed, inProgress],
            backgroundColor: ["#4caf50", "#ffc107"],
          },
        ],
      },
    });
  }

  // Load weekly overview
  async function loadWeeklyOverview() {
    const projects = await fetchProjects();
    const weeklyDiv = document.getElementById("weekly-overview");

    const today = new Date();
    const weekProjects = projects.filter((project) => {
      const dueDate = new Date(project.dueDate);
      const diffInDays = (dueDate - today) / (1000 * 60 * 60 * 24);
      return diffInDays >= 0 && diffInDays <= 7;
    });

    // Render the weekly projects
    weeklyDiv.innerHTML = weekProjects.length
      ? `<ul>${weekProjects
          .map(
            (p) =>
              `<li>${p.title} - Due: ${p.dueDate} (${p.status || "In Progress"})</li>`
          )
          .join("")}</ul>`
      : "<p>No projects due this week!</p>";
  }

  // Update analytics data
  async function updateAnalytics() {
    await loadCompletionChart();
    await loadWeeklyOverview();
  }

  updateAnalytics();
});
