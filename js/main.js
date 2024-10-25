function ageCalculate() {
    let today = new Date(); // store the current date
    let inputDate = new Date(document.getElementById("date-input").value); // store the input date

    let birthDate, birthMonth, birthYear; // store the final calculated age

    // division of the input date
    let birthDetails = {
        date: inputDate.getDate(),
        Year: inputDate.getFullYear(), 
        Month: inputDate.getMonth() + 1
    };

    // division of the current date
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1; 
    let currentDate = today.getDate(); // return the  day

    // condition to not make any exceptions
    if (
        birthDetails.Year > currentYear || 
        (birthDetails.Month > currentMonth && birthDetails.Year == currentYear) ||
        (birthDetails.date > currentDate && birthDetails.Month == currentMonth && birthDetails.Year == currentYear) // Corrected 'year' to 'Year'
    ) {
        displayalert("Not Born Yet");
        displayResult("-", "-", "-");
        return;
    }



    function displayalert (message)
    {
        let alertContainer = document.getElementById("alert-container");

        alertContainer.innerHTML =
        `
        <div class="alert alert-danger" role="alert">
            ${message}
        </div>
        `;
        // Optionally, you can remove the alert after a few seconds
    setTimeout(() => {
        alertContainer.innerHTML = ''; // Remove the alert after 3 seconds
    }, 2000);
    }

    // Year
    birthYear = currentYear - birthDetails.Year; // Corrected 'year' to 'Year'

    // Month
    if (currentMonth >= birthDetails.Month) {
        birthMonth = currentMonth - birthDetails.Month;
    } else {
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.Month;
    }

    // Date
    if (currentDate >= birthDetails.date) {
        birthDate = currentDate - birthDetails.date;
    } else {
        birthMonth--;
        let daysInPreviousMonth = getDaysInMonth(currentMonth - 1, currentYear);
        birthDate = daysInPreviousMonth + currentDate - birthDetails.date;

        if (birthMonth < 0) {
            birthMonth = 11;
            birthYear--;
        }
    }

    displayResult(birthDate, birthMonth, birthYear);
}

function displayResult(bDate, bMonth, bYear) {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
}

function getDaysInMonth(month, year) {
    // Adjust for January (0-based month index)
    if (month === 0) month = 12;

    // February check for leap year
    if (month === 2) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28;
    }

    // Days in each month (non-leap year)
    return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}
