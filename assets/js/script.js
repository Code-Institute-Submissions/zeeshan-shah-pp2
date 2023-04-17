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
let username1amountList = [];
let username2amountList =[];
let username1totalamount = 0;
let username2totalamount = 0;
let payer;    
let amount;
let details;
let username1;
let username2;


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

function funtionStart () {
    modalBg.classList.add('bg-active'); // user data form gets visible
    
    // focus on your name(username1) input field
    document.getElementById('username1').focus();
}


modalClose.addEventListener('click', function(){
    modalBg.classList.remove('bg-active'); // back to welcome page
});

function infoWindow () {
    modalBg1.classList.add('bg-active-1'); 
}

modalClose1.addEventListener('click', function(){
    modalBg1.classList.remove('bg-active-1'); // back to addExpenseDiv page if user clicks on close sign
});

function addExpenseDiv(){
    welcome.remove();
    let expenseDiv = document.getElementById('expense-div');
    expenseDiv.setAttribute('id', 'expense-div-active'); // make the div visible
}

function Addexpense () {
    modalBg2.classList.add('bg-active-2'); // payer and paid amount form

    // dropdown options
    let optionUsername1 = document.getElementById('option-username1');
    optionUsername1.value = ('value',`${username1}`);
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

    //balanceCalculation(); 
}


function expenseRecord() {

    const d = new Date();
    let expenseList = document.createElement('p');
    
    if (payer === username1){
        expenseList.setAttribute('id','expenselistusername1');
    } else {
        expenseList.setAttribute('id','expenselistusername2');
    }

    let expenseListHTML = `<p> ${payer} paid $${amount} <br> <font face="Montserrat Alternates" font size="4" color="black"> ${details} </font> <br> <span><font face="arial" font size="2.5" color="#016FB9">${new Date()} </font> </span></p> <hr>`;

    expenseList.innerHTML= expenseListHTML;
    
    let expenseDetailsDiv = document.getElementById('expense-details-div');

    expenseDetailsDiv.appendChild(expenseList);
}

function balanceCalculation() {  

    payerPaidAmount();
    balanceStatement(); 
    modalBg2.classList.remove('bg-active-2');  
/*
    if (!isNaN(amount) && amount !== 0){
        payerPaidAmount();
        balanceStatement(); 
        modalBg2.classList.remove('bg-active-2');         
    } else {
    alert('Please give correct amount!');
    }  
*/
}

function payerPaidAmount() {

    if (payer === username1){
        username1amountList.push(amount);
        username1totalamount = username1amountList.reduce((a, b) => {
            return a + b;
        },0);
    } else{
        username2amountList.push(amount);
        username2totalamount = username2amountList.reduce((a, b) => {
            return a + b;
        },0);
    }
}

function balanceStatement() {

    let table = document.getElementById('result-table');

    if (username1totalamount > username2totalamount){
        let amountdiff = ((username1totalamount - username2totalamount)/2).toFixed(2);
        let tbodycell = table.getElementsByTagName('tbody')[0].rows[0].cells;
        tbodycell[0].innerHTML = `${username2}`;   
        tbodycell[1].innerHTML = `owes`;   
        tbodycell[2].innerHTML = `$${amountdiff}`;  
       
    } else if (username1totalamount < username2totalamount){
        let amountdiff = ((username2totalamount - username1totalamount)/2).toFixed(2);
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