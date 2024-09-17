// JS for dynamic actions

// Min Salary Range Slider
const slider = document.querySelector('.slider');
const output = document.querySelector('.min-salary-output');

slider.oninput = function() {
    output.textContent = "₹" + this.value / 100000 + " LPA";
}

// Sort by Dropdown
const sortDropdown = document.querySelector('select');
sortDropdown.addEventListener('change', function() {
    console.log("Sorting jobs by " + this.value);
});


// Job Data
const jobs = [
    { company: "Amazon", title: "Software Engineer", location: "Gurugram", salary: 4800000, officeType: "in-office", experience: 2, skills: ["JavaScript", "NodeJS", "AWS"] },
    { company: "Rubrik", title: "Software Engineer", location: "Bengaluru", salary: 5350000, officeType: "in-office", experience: 1, skills: ["JavaScript", "React.js", "Node.js", "Python"] },
    { company: "Google", title: "Cloud Engineer", location: "Remote", salary: 6000000, officeType: "remote", experience: 3, skills: ["GCP", "Cloud", "Kubernetes"] },
    { company: "Microsoft", title: "Frontend Developer", location: "Hyderabad", salary: 4500000, officeType: "in-office", experience: 1, skills: ["JavaScript", "React.js", "Azure"] },
    { company: "Meta", title: "Backend Developer", location: "Remote", salary: 5200000, officeType: "remote", experience: 2, skills: ["Node.js", "AWS", "MongoDB"] },
    { company: "Netflix", title: "DevOps Engineer", location: "Bengaluru", salary: 4900000, officeType: "in-office", experience: 2, skills: ["Docker", "Kubernetes", "AWS"] },
    { company: "Apple", title: "iOS Developer", location: "Remote", salary: 5000000, officeType: "remote", experience: 3, skills: ["Swift", "iOS", "Xcode"] },
    { company: "Tesla", title: "Full Stack Developer", location: "Gurugram", salary: 4800000, officeType: "in-office", experience: 2, skills: ["JavaScript", "Node.js", "React.js"] },
];

// Filter Jobs based on user input
function filterJobs() {
    const officeType = document.querySelector('input[name="office-type"]:checked')?.value || "";
    const experience = document.getElementById("experience-filter").value;
    const salary = document.getElementById("salary-range").value;

    let filteredJobs = jobs.filter(job => {
        return (officeType === "" || job.officeType === officeType) &&
               (experience === "any" || job.experience <= parseInt(experience)) &&
               job.salary <= salary;
    });

    displayJobs(filteredJobs);
}

// Sort jobs based on salary
function sortJobs() {
    const sortBy = document.getElementById("sort-by").value;
    const sortedJobs = [...jobs].sort((a, b) => {
        if (sortBy === "salary") {
            return a.salary - b.salary;
        }
        return 0; // Default (no sorting)
    });

    displayJobs(sortedJobs);
}

// Display jobs in the DOM
function displayJobs(jobs) {
    const jobList = document.getElementById("job-list");
    jobList.innerHTML = ""; // Clear existing jobs

    jobs.forEach(job => {
        const jobCard = `
        <div class="bg-white p-4 shadow-md rounded-lg">
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="text-lg font-semibold text-gray-800">${job.company}</h3>
                    <p class="text-sm text-gray-500">${job.title} - ${job.location}</p>
                    <div class="flex space-x-2 mt-2">
                        ${job.skills.map(skill => `<span class="bg-gray-100 text-sm px-2 py-1 rounded">${skill}</span>`).join('')}
                    </div>
                </div>
                <div>
                    <p class="text-sm text-gray-500 mb-1">${(job.salary / 100000).toFixed(1)} LPA</p>
                    <button class="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Apply</button>
                </div>
            </div>
        </div>`;
        jobList.insertAdjacentHTML("beforeend", jobCard);
    });
}

// On page load
window.onload = function() {
    displayJobs(jobs);
}
