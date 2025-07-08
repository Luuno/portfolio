document.addEventListener('DOMContentLoaded', () => {
fetch('/content/content.json')
  .then(res => res.json())
  .then(data => {
    // Insert website page
    const websites = data.sections.websites;
    document.getElementById('websites-title').textContent = websites.title;
    document.getElementById('websites-intro').textContent = websites.intro;

    const projectList = document.getElementById('website-card-container');
    projectList.innerHTML = "";
    websites.projects.forEach(project => {
      const item = document.createElement('div');
      item.className = 'card';
      item.innerHTML = `
        <h3>${project.title}</h3>
        <img src="/assets/${project.image}" alt="${project.title}" />
        <p>${project.description}</p>

      `;
      projectList.appendChild(item);
    });

    // Insert Design page
    const design = data.sections.design;
    document.getElementById('design-title').textContent = design.title;
    document.getElementById('design-intro').textContent = design.intro;

    const designList = document.getElementById('design-card-container');
    designList.innerHTML = "";
    design.projects.forEach(project => {
      const item = document.createElement('div');
      item.className = 'card';
      item.innerHTML = `
        <h3>${project.title}</h3>
        <img src="/assets/${project.image}" alt="${project.title}" />
        <p>${project.description}</p>
  
      `;
      designList.appendChild(item);
    });

    // Insert Contact page
    const contact = data.sections.contact;
    document.getElementById('contact-title').textContent = contact.title;
    document.getElementById('contact-intro').textContent = contact.intro;
   const button = document.createElement('button');
    button.textContent = 'Email Me';
    button.classList.add('contact-button');

    button.addEventListener('click', () => {
      window.location.href = `mailto:${contact.email}`;
    });

    document.getElementById('contact-header').appendChild(button);

  
  })
});

//Intro Animation
gsap.set("#website-page, #design-page, #contact-page",{opacity:0,y:200});
gsap.set(".logo-corner",{opacity:0});
var tl = gsap.timeline();
tl.from(".nav-button",{y:100,opacity:0,duration:0.2,stagger:0.2,delay:0.5})
.from ("#intro",{opacity:0,duration:0.2})
.from(".logo-main",{opacity:0,y:100,duration:0.5})
.from(".word",{opacity:0,x:20,stagger:0.2,delay:-1})
.to(".logo-main",{y:-20,delay:2,duration:0.5,opacity:0})
.to(".word",{opacity:0,duration:0.5})
.to(".logo-corner",{opacity:1})
.to("#website-page",{opacity:1,y:0,duration:0.2})
.from(".card",{y:100,opacity:0,duration:0.2,stagger:0.2,delay:1})

function PageNav(page){
  switch (page){
    case "websites":
     gsap.to("#website-page",{opacity:1,y:0,duration:0.2});
     gsap.from(".card",{y:100,opacity:0,duration:0.2,stagger:0.2,delay:0.5})
     gsap.to("#design-page",{opacity:0,y:200,duration:0.2});
     gsap.to("#contact-page",{opacity:0,y:200,duration:0.2});
    break;
    case "design":
    gsap.to("#website-page",{opacity:0,y:200,duration:0.2});
    gsap.to("#design-page",{opacity:1,y:0,duration:0.2});
     gsap.from(".card",{y:100,opacity:0,duration:0.2,stagger:0.2})
    gsap.to("#contact-page",{opacity:0,y:200,duration:0.2});
    break;
    case "contact":
    gsap.to("#contact-page",{opacity:1,y:0,duration:0.2});
    gsap.to("#design-page",{opacity:0,y:200,duration:0.2});
    gsap.to("#website-page",{opacity:0,y:200,duration:0.2});
    break;

  }
}