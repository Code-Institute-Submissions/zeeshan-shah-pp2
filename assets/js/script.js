let btnStart = document.getElementsByClassName('btn-start')[0];
btnStart.addEventListener('click', funtionStart);
let modalBg = document.getElementsByClassName('modal-bg')[0];
let modalClose = document.getElementsByClassName('modal-close')[0];
let userDetails = document.getElementById('user-details');
userDetails.addEventListener('submit', userDetailsHandleSubmit);
let welcome = document.getElementById('welcome');
let modalBg1 = document.getElementsByClassName('modal-bg-1')[0];
let infoButton = document.getElementsByClassName('info-button')[0];
infoButton.addEventListener('click', infoWindow);
let modalBg2 = document.getElementsByClassName('modal-bg-2')[0];
let expenseButton = document.getElementsByClassName('addexpensebutton')[0];
expenseButton.addEventListener('click', Addexpense);
let modalClose1 = document.getElementsByClassName('modal-close-1')[0];
let modalClose2 = document.getElementsByClassName('modal-close-2')[0];
let expenseDetails = document.getElementById('expense-details');
expenseDetails.addEventListener('submit', expenseDetailsHandleSubmit);
// declaring and/or assigning initial values 
let username1AmountList = [];
let username2AmountList =[];
let username1TotalAmount = 0;
let username2TotalAmount = 0;
let payer;    
let amount;
let details;
let username1;
let username2;

/**
 * This function receives/saves the usernames, remove the welcome message and call the addexpense function
 */
function userDetailsHandleSubmit(event) {
    
    // Prevent the default submit action 
    event.preventDefault();

    // Get the two input elements
    username1 = document.getElementById('username1').value;
    username2 = document.getElementById('username2').value;
    
    // Condition to check if inputs are not empty
    if (!(username1 === '' || username2 === '')) {

        modalBg.classList.remove('bg-active'); // hide welcome page
        addExpenseDiv(); // call addExpenseDiv function 
    } else {
        alert('Please enter your data!');
    }
}

/**
 * Display the username form 
 */
function funtionStart () {

    modalBg.classList.add('bg-active'); // user data form gets visible
    
    // focus on your name(username1) input field
    document.getElementById('username1').focus();
}

modalClose.addEventListener('click', function(){
    modalBg.classList.remove('bg-active'); // back to welcome page
});

/**
 * Display information window: How to use this website
 */
function infoWindow () {

    modalBg1.classList.add('bg-active-1'); 
}

modalClose1.addEventListener('click', function(){

    modalBg1.classList.remove('bg-active-1'); // back to addExpenseDiv page if user clicks on close sign
});

/**
 * Display the add expense message
 */
function addExpenseDiv(){

    welcome.remove();
    let expenseDiv = document.getElementById('expense-div');
    expenseDiv.setAttribute('id', 'expense-div-active'); // make the div visible
}

/**
 * Display expense form: Payer selection, payment reason and the amount input fields
 */
function Addexpense () {
    modalBg2.classList.add('bg-active-2'); // payer and paid amount form

    // dropdown options
    let optionUsername1 = document.getElementById('option-username1');
    optionUsername1.value = `${username1}`;
    optionUsername1.innerText = `${username1}`;

    let optionUsername2 = document.getElementById('option-username2');
    optionUsername2.value = `${username2}`;
    optionUsername2.innerText = `${username2}`;

    // make initially amount and details input field empty and get focus on detail input field 
    document.getElementById('amount').value = "";
    document.getElementById('details').value = "";
    document.getElementById('details').focus();
}

modalClose2.addEventListener('click', function(){
    modalBg2.classList.remove('bg-active-2'); // back to addExpenseDiv page if user clicks on close sign
});

/**
 * Check if payment reason and amount fields are not empty or invalid. Call expenseRecord function and balanceCalculation funtion
 */
function expenseDetailsHandleSubmit(event) {
    // Prevent the default submit action
    event.preventDefault();
    
    // Get the two input elements
    payer = document.getElementById('payer-name').value;
    amount = parseFloat(document.getElementById('amount').value);
    details = document.getElementById('details').value;
        
    if (!isNaN(amount) && amount !== 0 && !(details === '')){
        expenseRecord(); 
        let resultDiv = document.getElementById('result-div');
        resultDiv.style.visibility = "visible";
        balanceCalculation(); 
    } else if ((details === '')){
        alert('Please give reason for the payment!');
    } else {
        alert('Please give correct amount!');
    }
}

/**
 * Make expense record and display it on the screen
 */
function expenseRecord() {

    const d = new Date();
    let expenseList = document.createElement('p');
    
    if (payer === username1){
        expenseList.setAttribute('id','expenselistusername1');
    } else {
        expenseList.setAttribute('id','expenselistusername2');
    }

    let expenseListHTML = `<p> ${payer} paid $${amount} <br> <span class="details"> ${details}</span>  <br> <span class="timestamp">${new Date()} </span></p> <hr>`;

    expenseList.innerHTML= expenseListHTML;
    
    let expenseDetailsDiv = document.getElementById('expense-details-div');

    expenseDetailsDiv.appendChild(expenseList);
}

/**
 * Calls the functions: payerPaidAmount and balanceStatement
 */
function balanceCalculation() {  

    payerPaidAmount();
    balanceStatement(); 
    modalBg2.classList.remove('bg-active-2');  
}

/**
 * Calculates the total amount paid by the payer
 */
function payerPaidAmount() {

    if (payer === username1){
        username1AmountList.push(amount);
        username1TotalAmount = username1AmountList.reduce((a, b) => {
            return a + b;
        },0);
    } else{
        username2AmountList.push(amount);
        username2TotalAmount = username2AmountList.reduce((a, b) => {
            return a + b;
        },0);
    }
}

/**
 * Checks who owes the money and calculates the amount owed
 */
function balanceStatement() {

    let table = document.getElementById('result-table');

    if (username1TotalAmount > username2TotalAmount){
        let amountdiff = ((username1TotalAmount - username2TotalAmount)/2).toFixed(2);
        let tbodycell = table.getElementsByTagName('tbody')[0].rows[0].cells;
        tbodycell[0].innerHTML = `${username2}`;   
        tbodycell[1].innerHTML = `owes`;   
        tbodycell[2].innerHTML = `$${amountdiff}`;  
    } else if (username1TotalAmount < username2TotalAmount){
        let amountdiff = ((username2TotalAmount - username1TotalAmount)/2).toFixed(2);
        let tbodycell = table.getElementsByTagName('tbody')[0].rows[0].cells;
        tbodycell[0].innerHTML = `${username1}`;   
        tbodycell[1].innerHTML = `owes`;   
        tbodycell[2].innerHTML = `$${amountdiff}`; 
    } else {
        let tbodycell = table.getElementsByTagName('tbody')[0].rows[0].cells;
        tbodycell[0].innerHTML = `Balance`;   
        tbodycell[1].innerHTML = `is`;   
        tbodycell[2].innerHTML = `settled!`; 
    }
}