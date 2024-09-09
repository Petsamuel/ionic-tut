

document.getElementById("start-btn").addEventListener("click", function () {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("semester-selection").style.display = "block";
});

// Step 2: Select number of semesters and go to course input
document
  .getElementById("next-semester-btn")
  .addEventListener("click", function () {
    const semesterCount = document.getElementById("semester-count").value;
    if (semesterCount) {
      document.getElementById("semester-selection").style.display = "none";
      createCourseInput(semesterCount);
      document.getElementById("course-input").style.display = "block";
    }
  });
// Navigation buttons
const navCalculator = document.getElementById("nav-calculator");
const navHistory = document.getElementById("nav-history");
const navProfile = document.getElementById("nav-profile");

// Pages
const calculatorPage = document.getElementById("calculator-page");
const historyPage = document.getElementById("history-page");
const profilePage = document.getElementById("profile-page");

navCalculator.addEventListener("click", () => showPage(calculatorPage));
navHistory.addEventListener("click", () => showPage(historyPage));
navProfile.addEventListener("click", () => showPage(profilePage));

function showPage(page) {
  // Hide all pages
  calculatorPage.style.display = "none";
  historyPage.style.display = "none";
  profilePage.style.display = "none";

  // Show the selected page
  page.style.display = "block";
}

// Step 3: Generate course input forms dynamically based on the number of semesters
function createCourseInput(semesterCount) {
  const courseInputDiv = document.getElementById("course-input");
  courseInputDiv.innerHTML = ""; // Clear previous content

  for (let semester = 1; semester <= semesterCount; semester++) {
    const semesterSection = document.createElement("div");
    semesterSection.innerHTML = `
        <h3>Semester ${semester}</h3>
        <ion-item>
          <ion-label position="stacked">Number of Courses</ion-label>
          <ion-select class="course-count" data-semester="${semester}">
            <ion-select-option value="1">1</ion-select-option>
            <ion-select-option value="2">2</ion-select-option>
            <ion-select-option value="3">3</ion-select-option>
            <!-- Add more options as needed -->
          </ion-select>
        </ion-item>
      `;
    courseInputDiv.appendChild(semesterSection);
  }

  const nextButton = document.createElement("ion-button");
  nextButton.innerText = "Next";
  nextButton.addEventListener("click", () => generateCourses());
  courseInputDiv.appendChild(nextButton);
}

// Step 4: Generate input forms for each course based on the number of courses selected
function generateCourses() {
  const courseCounts = document.querySelectorAll(".course-count");
  const courseInputDiv = document.getElementById("course-input");
  courseInputDiv.innerHTML = ""; // Clear previous content

  courseCounts.forEach((select) => {
    const semester = select.dataset.semester;
    const courseCount = select.value;

    for (let course = 1; course <= courseCount; course++) {
      const courseSection = document.createElement("div");
      courseSection.innerHTML = `
          <h4>Semester ${semester}, Course ${course}</h4>
          <ion-item>
            <ion-label position="stacked">Course Credits</ion-label>
            <ion-select class="course-credits" data-semester="${semester}" data-course="${course}">
              <ion-select-option value="1">1</ion-select-option>
              <ion-select-option value="2">2</ion-select-option>
              <ion-select-option value="3">3</ion-select-option>
              <ion-select-option value="4">4</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Course Grade</ion-label>
            <ion-select class="course-grade" data-semester="${semester}" data-course="${course}">
              <ion-select-option value="4">A</ion-select-option>
              <ion-select-option value="3.5">B+</ion-select-option>
              <ion-select-option value="3">B</ion-select-option>
              <ion-select-option value="2.5">C+</ion-select-option>
              <ion-select-option value="2">C</ion-select-option>
              <ion-select-option value="1">D</ion-select-option>
              <ion-select-option value="0">F</ion-select-option>
            </ion-select>
          </ion-item>
        `;
      courseInputDiv.appendChild(courseSection);
    }
  });

  const calculateButton = document.createElement("ion-button");
  calculateButton.innerText = "Calculate CGPA";
  calculateButton.addEventListener("click", () => calculateCGPA());
  courseInputDiv.appendChild(calculateButton);
}

// Step 5: Calculate CGPA
function calculateCGPA() {
  let totalPoints = 0;
  let totalCredits = 0;

  const courseCredits = document.querySelectorAll(".course-credits");
  const courseGrades = document.querySelectorAll(".course-grade");

  courseCredits.forEach((creditSelect, index) => {
    const credits = parseFloat(creditSelect.value);
    const grade = parseFloat(courseGrades[index].value);

    totalCredits += credits;
    totalPoints += credits * grade;
  });

  const cgpa = totalPoints / totalCredits;
  displayResult(cgpa.toFixed(2));
}

// Step 6: Display the result
function displayResult(cgpa) {
  document.getElementById("course-input").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("cgpa-result").innerText = `Your CGPA is ${cgpa}`;
}

// Step 7: Recalculate
document
  .getElementById("recalculate-btn")
  .addEventListener("click", function () {
    document.getElementById("result").style.display = "none";
    document.getElementById("semester-selection").style.display = "block";
  });
