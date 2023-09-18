"use strict";
const weeks = ["Sun","Mon","Tue","Wed", "Thu","Fri","Sat"];
const weeks_full = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


const months_full = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

//  handling the input from menu forms
const month_lt_btn  = document.getElementById("month_left_toggle_btn");
const month_rt_btn = document.getElementById("month_right_toggle_btn");
const monthlist = document.getElementById("monthlist");
const yearlistInput  = document.getElementById("yearlist");
const calTitle = document.getElementById("menubar_center");

for(let i=1900;i<=2050;i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = i;
    yearlistInput.appendChild(option);
}

function calendarMaker(year) {
    let monthList = [];
    for(let month=0;month<12;month++) {
        let numOfDays = new Date(year,month+1,0).getDate();
        // javascript month is 0 based index, however we're still using month+1 because using 0 as the day parameter gives us the last date of previous month.
        // so while looking for the last date of janunary what I did is set the month to february and set the day as 0. This gave the last date ore prevous month. from which number of days of january could be easily found out 

        let dayList = [];
        for(let day =1;day<=numOfDays;day++) {
            let specificDay = new Date(year,month,day);
            var dayDetails = {
                tarikh: specificDay.getDate(),
                day: specificDay.getDay()
            }
            dayList.push(dayDetails);
        }
        monthList.push(dayList);


    }
    
    return monthList;
}
// global variables from dom
const section = document.querySelector("section");
const main = document.querySelector("main");

let renderer = {
    createTable : (monthData) => {

        const mytable = document.createElement("table");
        mytable.id="calendarTable";
        main.appendChild(mytable);

        const thead = document.createElement("thead");
        mytable.appendChild(thead);
       
        const tbody = document.createElement("tbody");
        
        mytable.appendChild(tbody);
        // console.log("tbody appended")
        
        const thead_tr = document.createElement("tr");
        thead.appendChild(thead_tr);
        
        // displaying the heading
        for (let i in weeks) {
            const td = document.createElement("td");
            td.innerText = weeks[i];
            if(i==0) {
                td.style.color = "red";
            }
            thead_tr.appendChild(td);
        }
       
        let counter = 0;
        for (let i=0;i<6;i++) {
            const tr = document.createElement("tr");
            tr.classList.add(`row-${i}`);  
            
            for(let j=0;j<7;j++) {
                
                // to handle the undefined element error when counter+j exceds the highest index of the array
                if((counter+j-monthData[0].day) == monthData.length) {
                    break;
                }
                const td = document.createElement("td");
                td.classList.add(`cell-${counter+j}`);
                
                td.classList.add(`gatey-${counter+j-monthData[0].day+1}`);

                // adding event listener to selected day 
                td.addEventListener("click",(event)=>{
                    console.log(event.target.classList[1])
                    let clickedBox = event.target;
                    renderer.state.date = clickedBox.innerText;
                    renderer.state.day = new Date(renderer.state.year,renderer.state.month,clickedBox.innerText).getDay();
                    // alert(renderer.state.day)
                    renderer.uiUpdate();
                    console.log("I was clicked")
                })
                
                // start filling the dates inside the box only after the interation; which makes first date display on the particular day 

                if(counter+j >= monthData[0].day &&  (counter+j-monthData[0].day) <= monthData.length) {
                    
                    td.innerText = monthData[counter+j-monthData[0].day].tarikh;
                    
                    tbody.appendChild(tr);

                }
                tr.appendChild(td);
            }
            counter+=7;
        }
        
    },
    loadDate: function(year,month,date=0) {
      try{
        const table = document.getElementById("calendarTable");
        main.removeChild(table);

      }catch(error) {}

        let monthList = calendarMaker(year);
        this.createTable(monthList[month]);
        this.state.year = year;
        this.state.month = month;
        this.state.date = date;
        // updating on the ui
        monthlist.value = renderer.state.month;
        
        yearlistInput.value = renderer.state.year;

    },
    state: {
        year:null,
        month: null,
        date: null,
        day: null,
        actualYear : null,
        actualMonth : null,
        actualDate : null,
        actualDay : null
    },
    stateUpdate: function(year,month) {
        renderer.state.month = month;
        
        this.uiUpdate();
        let day = new Date(renderer.state.year,renderer.state.month,renderer.state.date).getDay();
        calTitle.innerText = ` ${weeks[day]} ${renderer.state.date} ${months_full[renderer.state.month]} ${renderer.state.year} `;
    },
    uiUpdate: function()  {
        this.loadDate(renderer.state.year,renderer.state.month,renderer.state.date);
        monthlist.value = renderer.state.month;
        yearlist.value = renderer.state.year;
        if(renderer.state.date >0) {
          calTitle.innerText = ` ${weeks[renderer.state.day]} ${renderer.state.date} ${months_full[renderer.state.month]} ${renderer.state.year} `;
        }else{
          calTitle.innerText = `${months_full[renderer.state.month]} ${renderer.state.year} `;

        }
        try {
            
        
        const selectedBox = document.getElementsByClassName(`gatey-${this.state.date}`)[0];
        selectedBox.id = "selected";
        
        }catch(error) {}

        this.applyHoverEffectToTarikhCells();
        this.sundayStyle();

    },
    goToToday: function() {
        
        renderer.state.year = renderer.state.actualYear;
        renderer.state.month = renderer.state.actualMonth;
        renderer.state.date = renderer.state.actualDate;
        
        renderer.loadDate(renderer.state.year,renderer.state.month,renderer.state.date);
        renderer.stateUpdate(renderer.state.year,renderer.state.month);
        
    },
    applyHoverEffectToTarikhCells: function() {

        let cells = document.querySelectorAll("td");

        cells.forEach(item => {
            if(item.classList[1] != undefined) {
                let x = item.classList[1].split("-")[1];
                if(x>0) {
                    item.classList.add("gateyBoxes")
                }
            }
        })

    },
    sundayStyle: function() {
        
    let sundayCells = document.querySelectorAll("td");
    sundayCells.forEach(item=> {
        // console.log(item)
        if(item.classList[1] != undefined) {
            let x = item.classList[0].split("-")[1];
            if(parseInt(x) % 7 == 0 ) {
                item.classList.add("sunday");
            }

        }
    })
    }
    
}




function initialize() {
     // Your code here
     let mydate = new Date();
     let year = mydate.getFullYear();
     let month = mydate.getMonth();
     let date = mydate.getDate();  
     let day = mydate.getDay();  
     
    
     // maintaining state
     renderer.state.actualYear = year;
     renderer.state.actualMonth = month;
     renderer.state.actualDate = date;
     renderer.state.actualDay = day;

     renderer.loadDate(year,month,date);
     calTitle.innerText = ` ${weeks[day]} ${renderer.state.date} ${months_full[renderer.state.month]} ${renderer.state.year} `;
     const selectedBox = document.getElementsByClassName(`gatey-${renderer.state.date}`)[0];
     selectedBox.id = "selected";
     renderer.applyHoverEffectToTarikhCells();
     renderer.sundayStyle();

     // making the gotoday button functional
    const goTodayBtn = document.getElementById("goTodayBtn");
    goTodayBtn.addEventListener("click",renderer.goToToday)

    // loading audio
    
}
initialize();




let audio = new Audio("./media/audios/page_turning.mp3");


month_lt_btn.addEventListener("click",()=> {
    audio.play();
    let month = renderer.state.month -1;
    
    if(month<0) {
        renderer.state.year--;
        month =  (((renderer.state.month-1) % 12)+12)%12;
        
    }

    let year = renderer.state.year;

    renderer.stateUpdate(year,month);

})

month_rt_btn.addEventListener("click",()=> {
    audio.play();
    
    let month = renderer.state.month +1;
    

    if(month>11) {
        renderer.state.year++;
        month =  (((renderer.state.month+1) % 12)+12)%12;
        
    }

    let year = renderer.state.year;

    renderer.stateUpdate(year,month);
})

monthlist.addEventListener("change",() =>{
    audio.play();
    let month = monthlist.value;
    let year = renderer.state.year;
    renderer.stateUpdate(year,month);
})

yearlistInput.addEventListener("change",()=> {
    audio.play();
    let year = yearlist.value;
    renderer.state.year = year;
    console.log(yearlist.value)
    let month = monthlist.value;
    renderer.stateUpdate(year,month);
    
});

