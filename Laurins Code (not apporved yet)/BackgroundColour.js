let currentColor = '#ffffff'; // Variable to store the current color
let previousColor = ''; // Variable to store the previous color aka the present one 

// Function to set active color
function setActiveColor(color) { //this is to set the current colourt to the variable
    // Remove active class from all color options
    const colorOptions = document.querySelectorAll('.colorOption');
    colorOptions.forEach(option => {
        option.classList.remove('active');
    });

    // Set active class to selected color option (idk what that menans, aks ChatGPT)
    const selectedOption = document.querySelector(`.colorOption[data-color="${color}"]`);
    selectedOption.classList.add('active');

    // Apply selected color as background with fade animation (might wanna do these things with a css sheet in the html or so idk, might not work as intendet but idk)
    document.body.style.transition = 'background-color 0.5s ease';
    document.body.style.backgroundColor = color;

    // Show feedback to the user
    showFeedbackMessage('Color changed successfully!', 3000);

    // Send color to PHP script using Ajax --> BackgroundColourChanger.php // also make sure session opens before, idk how tho
    sendColorToPHP(color);
}

// Function to show feedback message
function showFeedbackMessage(message, duration) {
    const feedbackElement = document.createElement('div');
    feedbackElement.classList.add('feedback');
    feedbackElement.textContent = message;
    document.body.appendChild(feedbackElement);

    setTimeout(function() {
        feedbackElement.remove();
    }, duration);
}

// Function to send color to PHP script using Ajax --> BackgroundColourChanger.php
function sendColorToPHP(color) {
    fetch('BackgroundColourChanger.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ color: color }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('Color change successful:', data);
    })
    .catch(error => {
        console.error('There was a problem with the color change:', error);
    });
}

// Get color options container
const colorOptionsContainer = document.getElementById('colorOptions');

// Add event listener to color options
colorOptionsContainer.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('colorOption')) {
        const selectedColor = target.getAttribute('data-color');
        previousColor = currentColor; // Save the previous color
        currentColor = selectedColor; // Update the current color
        setActiveColor(selectedColor);
    }
});

// Function to revert to the previous color
function revertToPreviousColor() {
    setActiveColor(previousColor);
}
