// Named export - Has a mane. Have as many as needed
const message = "Some message from mymodule.js";
const name = "Juan";
const location = "La Paz";
const getGreeting = (name) => {
  return `Welcome to the course ${name}`;
};

export { message, name, getGreeting, location as default };
