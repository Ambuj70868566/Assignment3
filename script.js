function verifyStudent() {
  const idInput = document.getElementById("identifier");
  const id = idInput.value.trim();
  const resultBox = document.getElementById("result");
  const verifyBtn = document.querySelector(".verify-btn");
  const btnText = document.querySelector(".btn-text");
  const btnLoader = document.querySelector(".btn-loader");

  if (!id) {
    showToast("Please enter a valid Email or ID", "error");
    return;
  }

  // Show loading state
  showSpinner(true);
  verifyBtn.disabled = true;
  btnText.classList.add("hidden");
  btnLoader.classList.remove("hidden");

  // Simulate network delay and dummy data
  setTimeout(() => {
    const student = {
      name: "John Doe",
      email: "john@example.com",
      mobile: "+1 (555) 123-4567",
      domain: "Full Stack Web Development",
      college: "MIT - Massachusetts Institute of Technology",
      start: "01 June 2024",
      duration: "3 Months",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      assignments: [true, false, true, true],
      certificate: "#",
      status: "Completed",
    };

    const html = createStudentCard(student);
    resultBox.innerHTML = html;

    // Hide loading state
    showSpinner(false);
    verifyBtn.disabled = false;
    btnText.classList.remove("hidden");
    btnLoader.classList.add("hidden");

    showToast("✅ Certificate verified successfully!", "success");

    // Scroll to result
    setTimeout(() => {
      resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  }, 2000);
}

function createStudentCard(student) {
  const completedAssignments = student.assignments.filter((a) => a).length;
  const totalAssignments = student.assignments.length;
  const completionRate = Math.round(
    (completedAssignments / totalAssignments) * 100
  );

  return `
        <div class="student-card">
            <div class="student-header">
                <img src="${student.photo}" alt="${
    student.name
  }" class="student-photo" />
                <h3 class="student-name">${student.name}</h3>
                <p class="student-domain">${student.domain}</p>
            </div>
            
            <div class="student-details">
                <div class="detail-group">
                    <h4>Contact Information</h4>
                    <p><strong>Email:</strong> ${student.email}</p>
                    <p><strong>Mobile:</strong> ${student.mobile}</p>
                </div>
                
                <div class="detail-group">
                    <h4>Program Details</h4>
                    <p><strong>Institution:</strong> ${student.college}</p>
                    <p><strong>Start Date:</strong> ${student.start}</p>
                    <p><strong>Duration:</strong> ${student.duration}</p>
                </div>
            </div>
            
            <div class="assignments-section">
                <h4>Assignment Progress (${completedAssignments}/${totalAssignments} - ${completionRate}%)</h4>
                <div class="assignment-grid">
                    ${student.assignments
                      .map(
                        (completed, index) => `
                        <div class="assignment-item ${
                          completed ? "completed" : "pending"
                        }">
                            <div class="assignment-status-icon">${
                              completed ? "✅" : "⏳"
                            }</div>
                            <div class="assignment-label">Assignment ${
                              index + 1
                            }</div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="certificate-section">
                <a href="${
                  student.certificate
                }" target="_blank" class="certificate-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10,9 9,9 8,9"/>
                    </svg>
                    View Certificate
                </a>
            </div>
        </div>
    `;
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

function showSpinner(show) {
  const spinner = document.querySelector(".spinner-container");
  if (show) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
}

// Add input validation and enter key support
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("identifier");

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      verifyStudent();
    }
  });

  // Add input animation
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "scale(1.02)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "scale(1)";
  });
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = "smooth";
