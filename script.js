const weeks = ["Sun","Mon","Tue","Wed", "Thu","Fri","Sat"];
const weeks_full = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


const months_full = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


function calendarMaker(year) {
    let monthList = [];
    for(let month=0;month<12;month++) {
        // console.log("month = " + month)
        let numOfDays = new Date(year,month+1,0).getDate();
        // javascript month is 0 based index, however we're still using month+1 because using 0 as the day parameter gives us the last date of previous month.
        // so while looking for the last date of janunary what I did is set the month to february and set the day as 0. This gave the last date ore prevous month. from which number of days of january could be easily found out 

        let dayList = [];
        for(let day =1;day<=numOfDays;day++) {
            let specificDay = new Date(year,month,day);
            // console.log(specificDay);
            // console.log("day = " + day)
            var dayDetails = {
                tarikh: specificDay.getDate(),
                day: specificDay.getDay()
            }
            dayList.push(dayDetails);
        }
        // console.log("Another Month");
        monthList.push(dayList);


    }
    
    return monthList;
}
// global variables from dom
const section = document.querySelector("section");
const main = document.querySelector("main");

let renderer = {
    createTable : (monthData) => {
        console.log("rendering month..")
        console.log(monthData);

        const mytable = document.createElement("table");
        main.appendChild(mytable);

        const thead = document.createElement("thead");
        mytable.appendChild(thead);
       
        const tbody = document.createElement("tbody");
        // console.clear();
        console.log(tbody);
        mytable.appendChild(tbody);
        console.log("tbody appended")
        
        const thead_tr = document.createElement("tr");
        thead.appendChild(thead_tr);
        
        // displaying the heading
        for (i in weeks) {
            const td = document.createElement("td");
            td.innerText = weeks[i];
            thead_tr.appendChild(td);
        }
       
        // const tr = document.createElement("tr");
        // tbody.appendChild(tr);
        // calculating how many rows are required

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
                let startday = counter+j+monthData[0].day;
                td.classList.add(`gatey-${counter+j-monthData[0].day+1}`);
                
                // start filling the dates inside the box only after the interation; which makes first date display on the particular day 

                if(counter+j >= monthData[0].day &&  (counter+j-monthData[0].day) <= monthData.length) {
                    console.log(monthData.length)
                    td.innerText = monthData[counter+j-monthData[0].day].tarikh;
                    console.log(counter+j-monthData[0].day);
                    tbody.appendChild(tr);

                }
                tr.appendChild(td);
            }
            counter+=7;
        }
        
        console.log(monthList);
        
    }
}

const monthList = calendarMaker("2005");
console.log("printing monthlist");
console.log(monthList);
const month=11
renderer.createTable(monthList[month]);
// alert("month = " + months_full[month])

// left with the issue of not displaying the date which takes 7 rows to display 