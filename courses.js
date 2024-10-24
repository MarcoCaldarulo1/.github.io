document.addEventListener("DOMContentLoaded", function() {
    // Variables
    const calendar = document.getElementById("calendar");
    const currentMonth = document.getElementById("current-month");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");
    const timeSlotsContainer = document.getElementById("time-slots-container");
    const continueButtonContainer = document.querySelector(".continue-container");
    const continueButton = document.getElementById("continue-button");
    let selectedDate = null;
    let currentDate = new Date();
    let selectedTimeSlots = [];

    // Helper Functions
    function updateCalendar() {
        calendar.innerHTML = "";
        currentMonth.textContent = currentDate.toLocaleString("default", { month: "long", year: "numeric" });
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement("div");
            calendar.appendChild(emptyCell);
        }

        // Add day cells
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement("div");
            dayCell.classList.add("calendar-day");
            dayCell.textContent = day;
            dayCell.addEventListener("click", function() {
                selectDate(day);
            });
            calendar.appendChild(dayCell);
        }
    }

    function selectDate(day) {
        selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        document.getElementById("selected-date").textContent = selectedDate.toDateString();
        highlightSelectedDay(day);
        generateTimeSlots();
        timeSlotsContainer.classList.remove("hidden");
        continueButtonContainer.classList.add("hidden");
    }

    function highlightSelectedDay(day) {
        const dayCells = calendar.querySelectorAll(".calendar-day");
        dayCells.forEach(cell => {
            if (parseInt(cell.textContent) === day) {
                cell.classList.add("selected");
            } else {
                cell.classList.remove("selected");
            }
        });
    }

    function generateTimeSlots() {
        // Clear previous slots
        timeSlotsContainer.innerHTML = "";

        // Create Morning Section
        const morningSection = document.createElement("div");
        morningSection.classList.add("time-slots-container-section");
        const morningHeader = document.createElement("h4");
        morningHeader.textContent = "Morning";
        morningSection.appendChild(morningHeader);
        const morningSlotsContainer = document.createElement("div");
        morningSlotsContainer.classList.add("time-slots");
        const morningSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];
        morningSlots.forEach(slot => {
            const slotButton = createSlotButton(slot);
            morningSlotsContainer.appendChild(slotButton);
        });
        morningSection.appendChild(morningSlotsContainer);
        timeSlotsContainer.appendChild(morningSection);

        // Create Afternoon Section
        const afternoonSection = document.createElement("div");
        afternoonSection.classList.add("time-slots-container-section");
        const afternoonHeader = document.createElement("h4");
        afternoonHeader.textContent = "Afternoon";
        afternoonSection.appendChild(afternoonHeader);
        const afternoonSlotsContainer = document.createElement("div");
        afternoonSlotsContainer.classList.add("time-slots");
        const afternoonSlots = ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"];
        afternoonSlots.forEach(slot => {
            const slotButton = createSlotButton(slot);
            afternoonSlotsContainer.appendChild(slotButton);
        });
        afternoonSection.appendChild(afternoonSlotsContainer);
        timeSlotsContainer.appendChild(afternoonSection);
    }

    function createSlotButton(slot) {
        const slotButton = document.createElement("button");
        slotButton.classList.add("time-slot");
        slotButton.textContent = slot;
        slotButton.addEventListener("click", handleTimeSlotClick);
        return slotButton;
    }

    function handleTimeSlotClick(event) {
        const selectedSlot = event.target.textContent;
        if (selectedTimeSlots.includes(selectedSlot)) {
            selectedTimeSlots = selectedTimeSlots.filter(slot => slot !== selectedSlot);
            event.target.classList.remove("selected");
        } else {
            selectedTimeSlots.push(selectedSlot);
            event.target.classList.add("selected");
        }
        continueButtonContainer.classList.toggle("hidden", selectedTimeSlots.length === 0);
    }

    function sendCalendarInvite(email) {
        // Here you would integrate with a backend or use a service like Google Calendar API or Outlook API to send the invite.
        alert(`Calendar invite sent to ${email} for ${selectedDate.toDateString()} from ${selectedTimeSlots[0]} to ${selectedTimeSlots[selectedTimeSlots.length - 1]}`);
    }

    continueButton.addEventListener("click", function() {
        const userEmail = prompt("Please enter your email:");
        if (userEmail) {
            sendCalendarInvite(userEmail);
        }
    });

    // Event Listeners
    prevMonthButton.addEventListener("click", function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthButton.addEventListener("click", function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    // Initial Render
    updateCalendar();
});
