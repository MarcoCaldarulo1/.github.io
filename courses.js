document.addEventListener("DOMContentLoaded", function() {
    // Variables
    const calendar = document.getElementById("calendar");
    const currentMonth = document.getElementById("current-month");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");
    const timeSlotsContainer = document.getElementById("time-slots-container");
    const timeSlots = document.querySelectorAll(".time-slot");
    const continueButtonContainer = document.querySelector(".continue-container");
    const continueButton = document.getElementById("continue-button");
    let selectedDate = null;
    let currentDate = new Date();

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

    function handleTimeSlotClick(event) {
        timeSlots.forEach(slot => slot.classList.remove("selected"));
        event.target.classList.add("selected");
        continueButtonContainer.classList.remove("hidden");
    }

    // Event Listeners
    prevMonthButton.addEventListener("click", function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthButton.addEventListener("click", function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    timeSlots.forEach(slot => {
        slot.addEventListener("click", handleTimeSlotClick);
    });

    // Initial Render
    updateCalendar();
});

