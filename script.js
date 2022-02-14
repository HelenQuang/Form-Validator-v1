const form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const username = document.getElementById("username");
const dateOfBirth = document.getElementById("dateofbirth");
const email = document.getElementById("email");
const password1 = document.getElementById("password");
const password2 = document.getElementById("password2");

//Show error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";

  const small = formControl.querySelector("small");
  small.innerText = message;
}

//Show success green border
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//Check DOB is valid
function checkDOB(input) {
  const re = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Date of birth is not valid");
  }
}

//Check required fields
function checkRequired(inputArr) {
  let isRequired = false;

  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });
}

//Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `Passwords do not match. Please try again`);
  }
}

//Add event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([
    firstName,
    lastName,
    username,
    email,
    dateOfBirth,
    password1,
    password2,
  ]);

  checkEmail(email);
  checkDOB(dateOfBirth);
  checkLength(username, 5, 15);
  checkLength(password1, 6, 10);
  checkPasswordsMatch(password1, password2);
});
