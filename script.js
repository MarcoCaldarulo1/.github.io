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
