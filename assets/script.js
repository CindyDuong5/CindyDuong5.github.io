
// ==================== Code for getting the pay rate input field when hiring option is chosen ====================
let hiringRadioButton = document.querySelector('#hiring');
let questionRadioButton = document.querySelector('#question');
let commentRadioButton = document.querySelector('#comment');

// Variable to make sure that the form is only printed once no matter how many times the hiring button is clicked
var clicked = 0;

// Adding event listeners
hiringRadioButton.addEventListener('click', function() {
    if (clicked == 0) {
        generatePayRateInput();
        clicked++;
    }
});

questionRadioButton.addEventListener('click', function() {
    if (clicked > 0) {
        deletePayRateInput();
        clicked = 0;
    }
});

commentRadioButton.addEventListener('click', function() {
    if (clicked > 0) {
        deletePayRateInput();
        clicked = 0;
    }
});

// Function to generate the pay rate input field
function generatePayRateInput() {
    // Creating a label
    const node1 = document.createElement("label");
    const textNode = document.createTextNode("Expected Hourly Rate: ");
    node1.appendChild(textNode);
    node1.id = 'hiring-rate-label';

    // Creating the input Field
    const node2 = document.createElement("input");
    node2.id = 'hiring-rate-input';
    node2.type = 'number';
    node2.step = '1.0';
    node2.placeholder = 'Hourly Pay';
    node2.classList.add('format')

    const container = document.createElement('div');
    container.id = 'pay-rate-container';
    container.appendChild(node1);
    container.appendChild(node2);

    document.querySelector(".radio-btns").appendChild(container);
}

// Function to delete the pay rate input field
function deletePayRateInput() {
    const container = document.getElementById('pay-rate-container');
    if (container) {
        container.parentNode.removeChild(container);
    }
}

// ==================== Form Validation Code ====================
let messages = [];
const form = document.getElementById('myform');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    messages = [];

    // Calling all the validation functions
    validateName();
    validateEmail();
    validateAddress();
    validatePostalCode();
    validateMessage();

    // Only validating the pay rate if hiring option was clicked
    if (clicked > 0) {
        payRateValidation();
    }

    // Displaying the errors
    if (messages.length > 0) {
        e.preventDefault();
        errorElement.innerHTML = `
        <h3>Incorrect Inputs Provided:</h3>
        <pre>${messages.join('\r\n')}</pre>
        `;
    }
})

form.addEventListener('reset', (e) => {
    messages = [];
    errorElement.innerHTML = '';
})

// Validation for the name input
function validateName() {
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const nameRegex = /^[A-Za-z]+$/;
  
  if (!firstName.value.trim()) {
    messages.push('- First name is required');
  } else if (!nameRegex.test(firstName.value)) {
    messages.push('- Valid first name is required: should contain only alphabetical characters');
  }
  
  if (!lastName.value.trim()) {
    messages.push('- Last name is required');
  } else if (!nameRegex.test(lastName.value)) {
    messages.push('- Valid last name is required: should contain only alphabetical characters');
  }
}

// Validation for email input
function validateEmail() {
    const email = document.getElementById('email');
    if (nullChecker(email, 'Email')) {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!(email.value.match(validRegex))) {
            messages.push("- Please enter a valid email address");
        }
    }    
}

// Validation for address
function validateAddress() {
    const address = document.getElementById('address');
    if (nullChecker(address, 'Address')) {
        if (address.value.length < 10) {
            messages.push("- Address should be at least 10 characters long");
        }
    }
}

// Validation for postal code
function validatePostalCode() {
    let postalCode = document.getElementById('PostalCode');
    let validRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!(postalCode.value.match(validRegex))) {
        messages.push("- Invalid Postal Code");
    }
}

function validateMessage() {
    const message = document.getElementById('message');
    if (nullChecker(message, 'Message')) {
        if (message.value.length < 5) {
            messages.push("- Message should be at least 5 characters long");
        }
    }
}

// Validation for the pay rate input field
function payRateValidation() {
    let payRateInput = document.getElementById('hiring-rate-input');
    if (payRateInput.value <= 0) {
        messages.push("- Enter an appropriate expected hourly pay rate")
    }
}

// Ensures that the element is not empty
function nullChecker(element, elementName) {
    result = true;
    if (element.value === '' || element.value == null) {
        messages.push(`- ${elementName} is required`);
        result = false;
    }

    return result;
}

// Ensures that all the characters in the input field are alphabets
function areAlphabets(element, message) {
    let validRegex = /^[A-Za-z\s]+$/;
    if (!(element.value.match(validRegex))) {
        messages.push(message);
    }
}

