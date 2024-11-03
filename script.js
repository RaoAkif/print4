// Static Data
const senderData = {
    name: "Rao Ahsen Riaz",
    mobile: "03014649956",
    address: "82 Patiala House, Race Course Road, Lahore"
};

// Input Element Variables
const receiverNameInput = document.getElementById('receiver-name');
const receiverMobileInput = document.getElementById('receiver-mobile');
const receiverAddressInput = document.getElementById('receiver-address');
const amountInput = document.getElementById('amount');
const weightInput = document.getElementById('weight');

// Set Static Sender Data
document.getElementById('sender-name').textContent = senderData.name;
document.getElementById('sender-mobile').textContent = senderData.mobile;
document.getElementById('sender-address').textContent = senderData.address;

// Function to add a new form and scroll to the bottom
function addForm() {
    const originalForm = document.querySelector('.card');
    const newForm = originalForm.cloneNode(true);

    // Clear input values in the new form
    newForm.querySelectorAll('input').forEach(input => input.value = '');

    // Append the cloned form to the container
    document.getElementById('form-container').appendChild(newForm);

    // Scroll to the newly added form
    newForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


// Function to clear all forms
function clearForm() {
    document.querySelectorAll('#form-container input').forEach(input => input.value = '');
}

function createPrintableCards() {
    // Create a container for the printable content
    const printContainer = document.createElement('div');
    printContainer.id = 'print-container';

    // Inject the print styles for a two-card layout with extra spacing for the 7th and 8th items
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        #print-container {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap; /* Allow multiple rows */
            gap: 10px; /* Spacing between cards */
        }

        .print-card {
            width: 48%; /* Two cards side-by-side with some spacing */
            padding: 8px; /* Reduce padding for compact layout */
            margin: 10px auto; /* Center and control margin */
            border-radius: 4px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
            font-size: 0.8em; /* Smaller font size for compact layout */
        }

            /* Apply extra margin-top to every 7th and 8th item in each group of 6 */
            .print-card:nth-child(4n + 5), 
            .print-card:nth-child(4n + 6) {
                margin-top: 70px;
            }

        .print-card-header {
            padding-bottom: 5px;
            margin-bottom: 5px;
        }

        .print-logo {
            width: 15px;
            height: 15px;
        }

        .print-divider {
            height: 15px;
        }

        .print-title {
            font-size: 1.2em; /* Smaller title font */
        }

        .print-section {
            padding: 8px;
            margin-bottom: 8px;
            border-radius: 4px;
            font-size: 0.9em;
        }

        .print-section-label {
            font-size: 1em;
        }

        .print-field {
            font-size: 1.6em;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .print-field label {
            font-weight: bold;
            width: 80px; /* Adjust label width */
            margin-right: 8px; /* Smaller margin */
        }
    `;
    document.head.appendChild(styleElement);

    // Clone each form card with filled data and add to the print container
    document.querySelectorAll('.card').forEach(card => {
        const clonedCard = card.cloneNode(true);

        clonedCard.querySelectorAll('input').forEach(input => {
            const value = input.value || 'N/A';
            const label = input.parentElement.querySelector('label').textContent;
            input.parentElement.innerHTML = `<label>${label}</label><span>${value}</span>`;
        });

        // Apply print classes to cloned elements
        clonedCard.classList.add('print-card');
        clonedCard.querySelector('.card-header').classList.add('print-card-header');
        clonedCard.querySelector('.logo').classList.add('print-logo');
        clonedCard.querySelector('.divider').classList.add('print-divider');
        clonedCard.querySelector('.title').classList.add('print-title');
        clonedCard.querySelectorAll('.section').forEach(section => section.classList.add('print-section'));
        clonedCard.querySelectorAll('.section-label').forEach(label => label.classList.add('print-section-label'));
        clonedCard.querySelectorAll('.field').forEach(field => field.classList.add('print-field'));

        // Append each cloned card to the print container
        printContainer.appendChild(clonedCard);
    });

    // Append the print container to the body temporarily
    document.body.appendChild(printContainer);

    // Generate PDF with html2pdf
    html2pdf().from(printContainer).save().then(() => {
        // Cleanup: Remove the print container and injected styles after PDF creation
        document.body.removeChild(printContainer);
        document.head.removeChild(styleElement);
    });
}

// Event listener for the print button
document.querySelector('.print-button').addEventListener('click', createPrintableCards);
