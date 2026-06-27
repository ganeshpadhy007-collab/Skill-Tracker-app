let skills = JSON.parse(localStorage.getItem('bcaSkills')) || [
  { name: "DSA", progress: 0, total: 150 }, // 150 Striver questions
  { name: "Web Dev", progress: 0, total: 10 }, // 10 projects
  { name: "DBMS", progress: 0, total: 20 } // 20 topics
];

function renderSkills() {
  const container = document.getElementById('skills-container');
  container.innerHTML = '';
  let totalPercent = 0;

  skills.forEach((skill, index) => {
    let percent = Math.round((skill.progress / skill.total) * 100);
    totalPercent += percent;

    container.innerHTML += `
      <div class="bg-white p-4 rounded shadow">
        <div class="flex justify-between mb-2">
          <h3 class="font-bold">${skill.name}</h3>
          <span>${percent}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded h-4 mb-2">
          <div class="bg-green-500 h-4 rounded" style="width:${percent}%"></div>
        </div>
        <button onclick="updateProgress(${index}, 1)" class="bg-green-500 text-white px-2 py-1 text-sm rounded">+ Complete Task</button>
        <span class="ml-2 text-sm">${skill.progress}/${skill.total}</span>
      </div>
    `;
  });

  document.getElementById('total-score').innerText = Math.round(totalPercent / skills.length);
  localStorage.setItem('bcaSkills', JSON.stringify(skills));
}

function updateProgress(index, amount) {
  if(skills[index].progress < skills[index].total) {
    skills[index].progress += amount;
    renderSkills();
  }
}

function addSkill() {
  let name = prompt("Skill name? Ex: Java");
  let total = prompt("Total tasks/topics?");
  if(name && total) {
    skills.push({name: name, progress: 0, total: parseInt(total)});
    renderSkills();
  }
}

renderSkills();