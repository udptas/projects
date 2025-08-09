// Modal Pop up and modal pop down

const addBtn = document.querySelector('.add-btn');
const modalCont = document.querySelector('.modal-cont');
const taskArea = document.querySelector('.textArea-cont');
const mainCont = document.querySelector('.main-cont');
const allPriorityColors = document.querySelectorAll('.priority-color')
const toolBoxPriorityColors = document.querySelectorAll('.color')

const lockClass = 'fa-lock'
const unLockClass = 'fa-lock-open'

const colors = ["lightpink", "lightgreen", "lightblue", "black"]
const resetColor= "reset"
// Flags
let addBtnFlag = false
let modalPriorityColor = "lightgreen"

// To save akk the tickers
const ticketArr = [];

// Now once the UI loads it should display the already create dtickets, whose data
//are on the local storage
function init(){
    // 1. check the localStorage data
    const data = localStorage.getItem("ticketArr");
    console.log("ticket array fetched", data)
    if(data){
        const jsonData = JSON.parse(data)
        // 2. Need to show i.e. again create the tickets in the UI
        for(let i=0; i<jsonData.length; i++){
            const ticketData = jsonData[i]
            createTicket(ticketData.task, ticketData.id, ticketData.color)
        }
    }
}

init()

addBtn.addEventListener('click', function(){
    addBtnFlag = !addBtnFlag;
    console.log(addBtnFlag);
    if(addBtnFlag === true){
        // Open the modal
        modalCont.style.display = 'flex';
    }
    else{
        // close the modal
        modalCont.style.display = 'none';
    }
});

// Modal Event to get the task and createTicket

modalCont.addEventListener('keydown', function(e){
    if(e.key=='Shift'){
        let task = taskArea.value;
        // let id = (Math.random()*1000000).toFixed(0)
        // console.log(id)
        let id = shortid()
        console.log(id)
        createTicket(task, id, modalPriorityColor);
        taskArea.value = '';
        modalCont.style.display = 'none';
        addBtnFlag = false;
    }

});

 // Create Ticket Function
 function createTicket(task, id, ticketColor){
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");

    ticketCont.innerHTML = `
    <div class="ticket-color" style="background-color: ${ticketColor};"></div>
    <div class="ticket-id">${id}</div>
    <div class="ticket-area">${task}</div>
    <div class="ticket-lock">
        <i class="fa-solid fa-lock"></i>
    </div>
</div>
    `;

    mainCont.appendChild(ticketCont);
    handleLock(ticketCont, id)
    handleColor(ticketCont, id)

    //The below part is for handling the ticket
    ticketData = {
        id: id,
        task: task,
        color: ticketColor
    }
    console.log("ticketData", ticketData)
    ticketArr.push(ticketData)
    console.log("ticket array", ticketArr)
    updateLocalStorage();
 }

allPriorityColors.forEach(function(colorElement){
    // console.log(colorElement)
    colorElement.addEventListener('click', function(){
        allPriorityColors.forEach(function(colors){
            // console.log(colors)
            colors.classList.remove("active")
            // console.log(colors)
        });
        colorElement.classList.add("active");
        console.log(colorElement.classList)
        modalPriorityColor = colorElement.classList[0];
    });

});

function handleLock(ticket, ticketID){
    ticketLockCont = ticket.querySelector('.ticket-lock');
    ticketLockIcon = ticketLockCont.children[0]
    // console.log(ticketLockCont)
    let ticketTaskArea = ticket.querySelector('.ticket-area')

    ticketLockIcon.addEventListener('click', function(){
        console.log("Clicked on the lock")
        if(ticketLockIcon.classList.contains(lockClass)){
            // console.log("lock class")
            ticketLockIcon.classList.remove(lockClass)
            ticketLockIcon.classList.add(unLockClass)
            ticketTaskArea.setAttribute("contenteditable", "true")
        } else{
            // console.log("unlock class")
            ticketLockIcon.classList.remove(unLockClass)
            ticketLockIcon.classList.add(lockClass)
            ticketTaskArea.setAttribute("contenteditable", "false")
        }
    // Updating the changed text in the Local Storgae=> so that it can be retrived while refreshing
    const updatedText = ticketTaskArea.textContent;
    // console.log("updatedText", updatedText)
    for(let i=0; i<ticketArr.length; i++){
        const obj = ticketArr[i]
        if(obj.id == ticketID){
            obj.task = updatedText;
        } 
    console.log(ticketArr)
    updateLocalStorage();
    }
    })
    
 }


function handleColor(ticket, ticketID){
    let ticketColorBand = ticket.querySelector(".ticket-color");
    ticket.addEventListener("click", function(){
        let currColor = ticketColorBand.style.backgroundColor
        // console.log("current color:", currColor)

        let currColorIndex = colors.findIndex(function(colors){
            return colors ===currColor;
        })

        currColorIndex +=1;

        let newColorIndex = currColorIndex % colors.length;
        let newColor = colors[newColorIndex];
        // console.log(newColor);
        ticketColorBand.style.backgroundColor = newColor;

        // Updating the changed color in the Local Storgae=> so that it can be retrived while refreshing
        for(let i=0; i<ticketArr.length; i++){
            const obj = ticketArr[i]
            if(obj.id == ticketID){
                obj.color = newColor
            }
        }
        updateLocalStorage()
    })
}


toolBoxPriorityColors.forEach(function(colors){
    colors.addEventListener('click', function(){
        let allTickets = document.querySelectorAll('.ticket-cont');
        // console.log(allTickets)
        let currentSelectedColor = colors.classList[0];
        console.log(currentSelectedColor);
        if(currentSelectedColor==resetColor){
            allTickets.forEach(function (ticket) {
                ticket.style.display='block';
            });
        } else {
            allTickets.forEach(function (ticket) {
            let ticketColorBand = ticket.querySelector('.ticket-color')
            console.log(ticketColorBand);
            if(ticketColorBand.style.backgroundColor ===currentSelectedColor){
                ticket.style.display='block';
            }else{
                ticket.style.display='none';
                }
            })
    }
        
    })
        
})


function updateLocalStorage(){
    localStorage.setItem("ticketArr", JSON.stringify(ticketArr))
}
