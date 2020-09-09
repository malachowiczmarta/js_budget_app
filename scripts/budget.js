let incomeArr = [];
let totalIncomeSum = [];

function onAddBtnClick() {
    let income = document.getElementById('incomeName');
    let incomeSum = document.getElementById('incomeSum');
    let incomeTextList = income.value + ' ' + incomeSum.value + 'zł';

    incomeArr.push(incomeTextList);
    console.log(incomeArr); 

    totalIncomeSum.push(incomeSum.value);
    console.log(totalIncomeSum); 

    uptadeIncomeList ()
    updateIncomeSum ()

    console.log(updateIncomeSum ());
};

function uptadeIncomeList () {

    let ul = document.querySelector('#incomeList');
    ul.innerText = '';
    let income = document.getElementById('incomeName');
    income.value = '';
    let incomeSum = document.getElementById('incomeSum');
    incomeSum.value = '';

    incomeArr.forEach(elem => {
        let li = document.createElement('li');
        li.innerText = elem;
        let ul = document.querySelector('#incomeList');
        ul.appendChild(li);
    });
};

function updateIncomeSum () {
    let sum = 0;
    
    totalIncomeSum.forEach(elem => {
        let number = parseFloat(elem);
        sum = sum + number;
    });

    let totalIncomeSumText = document.getElementById('totalIncomeSumText');
    totalIncomeSumText.innerText = sum;

}


