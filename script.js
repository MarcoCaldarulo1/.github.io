// Navigation bar background change on scroll
window.addEventListener('scroll', function() {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = '#2c3e50'; // Darker color when scrolling for contrast
    } else {
        nav.style.backgroundColor = '#1E90FF'; // Set to your desired color for non-scroll state
    }
});

// Toggle mobile menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: 'YOUR_API_KEY', // Use your Google API Key here
        clientId: 'YOUR_CLIENT_ID', // Use your Google Client ID here
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar.events"
    }).then(function () {
        // On load, attach an event listener to the booking button
        document.getElementById("book-appointment-button").addEventListener("click", handleAuthClick);
    });
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn().then(() => {
        const date = document.getElementById('available-dates').value;
        const time = document.getElementById('time-slots').value;

        let startDateTime = new Date(`${date}T${time}`).toISOString();
        let endDateTime = new Date(new Date(startDateTime).getTime() + 60 * 60 * 1000).toISOString(); // Adds 1 hour

        var event = {
            'summary': 'Booked Appointment with Marco Caldarulo',
            'description': 'One-on-one consultation session.',
            'start': {
                'dateTime': startDateTime,
                'timeZone': 'Europe/Rome' // Adjust to your timezone
            },
            'end': {
                'dateTime': endDateTime,
                'timeZone': 'Europe/Rome'
            }
        };

        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });

        request.execute(function (event) {
            alert('Appointment booked: ' + event.htmlLink);
        });
    });
}

// Load the Google API
gapi.load('client:auth2', handleClientLoad);


// Booking Calendar Interaction
document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const timeSlots = document.querySelector('.time-slots');
    const continueButton = document.getElementById('continue-button');
    let selectedDate;

    // Set up calendar navigation buttons (if applicable)
    document.querySelectorAll('.calendar-nav-button').forEach(button => {
        button.addEventListener('click', (e) => {
            // Handle changing months/weeks in the calendar
        });
    });

    // Handle date selection from the calendar
    calendar.addEventListener('click', (e) => {
        if (e.target.classList.contains('date')) {
            selectedDate = e.target.dataset.date; // Assume date elements have data-date attributes
            // Highlight the selected date and show time slots
            document.querySelectorAll('.date').forEach(d => d.classList.remove('selected'));
            e.target.classList.add('selected');
            loadTimeSlots(selectedDate);
        }
    });

    // Handle time slot selection
    timeSlots.addEventListener('click', (e) => {
        if (e.target.classList.contains('time-slot')) {
            document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
            e.target.classList.add('selected');
        }
    });

    // Handle continue button click for booking
    continueButton.addEventListener('click', handleAuthClick);
});

// Load available time slots for the selected date
function loadTimeSlots(date) {
    const timeSlots = document.querySelector('.time-slots');
    timeSlots.innerHTML = ''; // Clear existing time slots
    // Add available time slots for the selected date
    // These would ideally be fetched from a server or a preset list
    const availableTimes = ['09:00', '09:30', '10:00', '12:00', '12:30', '13:00'];
    availableTimes.forEach(time => {
        const slot = document.createElement('div');
        slot.classList.add('time-slot');
        slot.textContent = time;
        timeSlots.appendChild(slot);
    });
}



