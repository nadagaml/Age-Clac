const months = [31,28,31,30,31,30,31,31,30,31,30,31];

function ageCalculate()
{
  let today = new Date();
  let inputDate = new Date( document.getElementById("date-input").value);

  //------- store the final calculated age ----------
  let birthDay, birthMonth, birthYear; 

  //------- discribe the inputdate ----------
  let birthDetails =
  {
    day : inputDate.getDate(),
    Month : inputDate.getMonth()+1 , 
    Year : inputDate.getFullYear()
  }

  //---- discribe today date ---------
  let currentYear = today.getFullYear()
  let currentMonth = today.getMonth()+1
  let currentDay = today.getDate();

  
  leapyear(birthDetails.Year)

  // 0- Validation To prevent users from selecting a future date in a date input

  if(
    birthDetails.Year> currentYear ||
    (birthDetails.Month > currentMonth && birthDetails.Year == currentYear) ||
    (birthDetails.day > currentDay && birthDetails.Month == currentMonth && birthDetails.Year == currentYear)
    ){

        displayalert("Not Born Yet ,Future date is not allowed!");
        displayResult("-", "-", "-");
        return;
  }




// the user inter the correct date

//1- Year
birthYear = currentYear - birthDetails.Year;

//2-Month
if (currentMonth >= birthDetails.Month)
{
    birthMonth = currentMonth - birthDetails.Month;
}
else
{
    birthYear--;
    birthMonth = 12 + currentMonth - birthDetails.Month
}

//3-Day
if(currentDay >= birthDetails.day)
{
    birthDay = currentDay - birthDetails.day;
}
else
{
    birthMonth -- ;
    let days = months [currentMonth - 2];
    birthDay = days + currentDay - birthDetails.day;
    if(birthMonth < 0)
    {
        birthMonth = 11;
        birthYear --;
    }
}
console.log("day "+ birthDay+ "\n" ,
    "Month " + birthMonth,
    "year " + birthYear 
    
)

displayResult(birthDay, birthMonth, birthYear);
}




//leapyear

function leapyear(LYear)
{
    if(LYear % 4 == 0 ||(LYear % 100 == 0 && LYear % 400 == 0) )
        {
            months [1] = 29
        }

        else
        {
            months[1]=28
        }
}



//dispaly 
function displayResult(bDay, bMonth, bYear) {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDay;
}



// --------------- Dispaly Alert ----------------
function displayalert(message)
{
    let alertContent =  document.getElementById("alert-container");

    alertContent.innerHTML = 
    `
    <div class="alert alert-danger" role="alert">
            ${message}
        </div>
    `
    setTimeout(()=>
    {
        alertContent.innerHTML = ''
    }, 3000);
}


