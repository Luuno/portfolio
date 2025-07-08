const PASSWORD = 'luuk123';

const userInput = prompt("Enter password");

if (userInput !== PASSWORD) {
  alert("Unauthorized");
  window.location.href = '/';
}
