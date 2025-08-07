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

  // Convert degrees to radians
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Custom evaluator for expressions like sin(30)
  function calculateResult() {
  try {
    let expr = display.value;

    // Handle function without parentheses: sin30 → sin(30)
    expr = expr.replace(/(sin|cos|tan|cot|sec|cosec|sqrt)(\d+(\.\d+)?)/g, '$1($2)');

    // Now replace trig functions with Math equivalents in radians
    expr = expr.replace(/sin\(([^)]+)\)/g, (_, val) => `Math.sin(toRadians(${val}))`);
    expr = expr.replace(/cos\(([^)]+)\)/g, (_, val) => `Math.cos(toRadians(${val}))`);
    expr = expr.replace(/tan\(([^)]+)\)/g, (_, val) => `Math.tan(toRadians(${val}))`);
    expr = expr.replace(/cot\(([^)]+)\)/g, (_, val) => `(1 / Math.tan(toRadians(${val})))`);
    expr = expr.replace(/sec\(([^)]+)\)/g, (_, val) => `(1 / Math.cos(toRadians(${val})))`);
    expr = expr.replace(/cosec\(([^)]+)\)/g, (_, val) => `(1 / Math.sin(toRadians(${val})))`);
    expr = expr.replace(/sqrt\(([^)]+)\)/g, (_, val) => `Math.sqrt(${val})`);
    expr = expr.replace(/([0-9.]+)\^2/g, (_, val) => `Math.pow(${val}, 2)`);
    expr = expr.replace(/\^/g, '**');

    // Evaluate expression
    const result = new Function("toRadians", `return ${expr}`)(toRadians);
    display.value = result;
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
    else appendToDisplay(value);
  });

  // Enter key support
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      calculateResult();
    }
  });
});
