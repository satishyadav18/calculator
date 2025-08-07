document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Append value to display
  function appendToDisplay(value) {
    display.value += value;
  }

  // Clear display
  function clearDisplay() {
    display.value = "";
  }

  // Delete last character
  function deleteLast() {
    display.value = display.value.slice(0, -1);
  }

  // Calculate result securely
  function calculateResult() {
    try {
      display.value = new Function("return " + display.value)();
    } catch {
      display.value = "Error";
    }
  }

  // Calculate percentage
  function calculatePercentage() {
    try {
      display.value = parseFloat(display.value) / 100;
    } catch {
      display.value = "Error";
    }
  }

  // Calculate trigonometric and other functions
  function calculateFunction(func) {
    try {
      let value = parseFloat(display.value);
      if (isNaN(value)) throw "Invalid input";
  
      switch (func) {
        case 'sin': display.value = Math.sin(value); break;
        case 'cos': display.value = Math.cos(value); break;
        case 'tan': display.value = Math.tan(value); break;
        case 'cot': display.value = value !== 0 ? 1 / Math.tan(value) : "Error"; break;
        case 'sec': display.value = value % 90 !== 0 ? 1 / Math.cos(value) : "Error"; break;
        case 'cosec': display.value = value !== 0 ? 1 / Math.sin(value) : "Error"; break;
        case 'sqrt': display.value = value >= 0 ? Math.sqrt(value) : "Error"; break;
        case '^2': display.value = Math.pow(value, 2); break;
        default: display.value = "Error";
      }
    } catch {
      display.value = "Error";
    }
  }
  

  // Dark/Light Mode Toggle
  function toggleTheme() {
    const isDarkMode = document.body.classList.toggle("dark");
    themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }
  
  // Apply saved theme preference
  if (localStorage.getItem("theme") === "dark") toggleTheme();
  
  // Event Listener
  themeToggle.addEventListener("click", toggleTheme);
  
  // Event delegation for buttons
  document.querySelector(".buttons").addEventListener("click", (event) => {
    const value = event.target.dataset.value;
    if (!value) return;

    if (value === "C") clearDisplay();
    else if (value === "DEL") deleteLast();
    else if (value === "=") calculateResult();
    else if (value === "%") calculatePercentage();
    else if (["sin", "cos", "tan", "cot", "sec", "cosec", "sqrt", "^2"].includes(value)) calculateFunction(value);
    else appendToDisplay(value);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      calculateResult();
    }
  });

});