document.addEventListener("DOMContentLoaded", () => {
    function loadCompletionChart() {
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
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
  
    function loadWeeklyOverview() {
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const weeklyDiv = document.getElementById("weekly-overview");
      const weekProjects = projects.filter((project) => {
        const dueDate = new Date(project.dueDate);
        const today = new Date();
        const diff = (dueDate - today) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 7;
      });
  
      weeklyDiv.innerHTML = weekProjects.length
        ? `<ul>${weekProjects
            .map(
              (p) =>
                `<li>${p.title} - Due: ${p.dueDate} (${p.status || "In Progress"})</li>`
            )
            .join("")}</ul>`
        : "<p>No projects due this week!</p>";
    }
  
    function updateAnalytics() {
      loadCompletionChart();
      loadWeeklyOverview();
    }
  
    updateAnalytics();
  });
  