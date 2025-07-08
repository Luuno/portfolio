//SAVE AND LOAD JSON FROM GIT

  const repo = 'Luuno/portfolio';
const filePath = 'content/content.json';
const branch = 'main';
const token = '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';

// 1. Load current file + SHA
async function loadJSON() {
  const res = await fetch(`https://api.github.com/repos/${repo}/${filePath}?ref=${branch}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

// 2. Update file
async function saveJSON(updatedJson) {
  const file = await loadJSON();

  const response = await fetch(`https://api.github.com/repos/${repo}lluu/${filePath}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Update portfolio.json ${new Date().toISOString()}`,
      content: btoa(unescape(encodeURIComponent(JSON.stringify(updatedJson, null, 2)))), // base64 encode
      sha: file.sha,
      branch: branch
    })
  });

  const result = await response.json();
  console.log('✅ Commit success:', result);
}




//CREATE UPDATED INPUT FIELDS BASED ON JSON
fetch('/content/content.json')
  .then(res => res.json())
  .then(data => {
    const editorWebsite = document.getElementById('editor-website');
      const editorDesign = document.getElementById('editor-design');
    const websites = data.sections.websites.projects;
    const design = data.sections.design.projects;

    websites.forEach((project, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'project-editor';

      for (const key in project) {
        const label = document.createElement('label');
        label.textContent = key.charAt(0).toUpperCase() + key.slice(1);

        const input = document.createElement('input');
        input.value = project[key];
        input.name = `${index}-${key}`;

        wrapper.appendChild(label);
        wrapper.appendChild(input);
      }

      editorWebsite.appendChild(wrapper);
    });

    design.forEach((project, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'project-editor';

      for (const key in project) {
        const label = document.createElement('label');
        label.textContent = key.charAt(0).toUpperCase() + key.slice(1);

        const input = document.createElement('input');
        input.value = project[key];
        input.name = `${index}-${key}`;

        wrapper.appendChild(label);
        wrapper.appendChild(input);
      }

      editorDesign.appendChild(wrapper);
    });

    document.getElementById('saveBtn').addEventListener('click', () => {
      // Read updated values
      websites.forEach((project, index) => {
        for (const key in project) {
          const input = document.querySelector(`input[name="${index}-${key}"]`);
          project[key] = input.value;
        }
      });

      // Save logic here: commit to Git or export JSON
      console.log(JSON.stringify(data, null, 2)); // for now just log it
      saveJSON(data);
    });
  });


