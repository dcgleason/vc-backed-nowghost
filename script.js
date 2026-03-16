const form = document.getElementById("leadForm");
const note = document.getElementById("formNote");

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validateField(fieldWrapper) {
  const input = fieldWrapper.querySelector("input, select, textarea");
  if (!input) {
    return true;
  }

  let valid = true;

  if (input.type === "email") {
    valid = isValidEmail(input.value);
  } else {
    valid = input.checkValidity();
  }

  fieldWrapper.classList.toggle("invalid", !valid);
  return valid;
}

form.addEventListener("submit", (event) => {
  const fieldWrappers = form.querySelectorAll(".field");
  let isFormValid = true;

  fieldWrappers.forEach((wrapper) => {
    const valid = validateField(wrapper);
    if (!valid) {
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    event.preventDefault();
    note.textContent = "Please complete the required fields before submitting.";
    note.classList.remove("form-success");
    return;
  }

  note.textContent = "Sending...";
  note.classList.add("form-success");
});

form.querySelectorAll(".field input, .field select, .field textarea").forEach((input) => {
  input.addEventListener("blur", () => {
    const wrapper = input.closest(".field");
    if (wrapper) {
      validateField(wrapper);
    }
  });
});
