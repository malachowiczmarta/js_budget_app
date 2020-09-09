let incomeArr = [];
let totalIncomeSum = [];
const incomeObj = {};


// onclick function ######################################################

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

function onEditRemoveBtnClick(e) {
    const item = e.target;
    let incomeSum = document.getElementById('incomeSum');
    let index = totalIncomeSum.indexOf(incomeSum.value);

    if (item.classList[0] === 'incomeTrashBtn') {
        item.parentElement.remove();
        totalIncomeSum.splice(index, 1);
        incomeArr.splice(index, 1);
    };

    // if (item.classList[0] === 'incomeEditBtn') {
    //     let parent = item.parentElement;
        
    //     let li = parent.firstChild;
    //     li.innerText = ""
    //     // li.innerHTML = '<input type="text" id="editInputText" placeholder="edycja tekst"><input type="text" id="editInputSum" placeholder="kwota">'       
         
    //     let editNameInput = document.createElement('input');

    //     let editPriceInput = document.createElement('input');

    //     li.appendChild(editNameInput)
    //     li.appendChild(editPriceInput)
        
    //     let editInputText = document.getElementById('editInputText');
    //     editInputText.addEventListener("keyup", function(event) {
    //         if (event.keyCode === 13) {

    //         }
    //     })
    // }

    updateIncomeSum ()

};



// another function ######################################################

function uptadeIncomeList () {

    let ul = document.querySelector('#incomeList');
    ul.innerText = '';
    let income = document.getElementById('incomeName');
    income.value = '';
    let incomeSum = document.getElementById('incomeSum');
    incomeSum.value = '';

    incomeArr.forEach(elem => {
        let divIncome = document.createElement('div');
        divIncome.classList.add('income-list-item-container');
        let ul = document.querySelector('#incomeList');
        ul.appendChild(divIncome);


        let li = document.createElement('li');
        li.classList.add('income-list-item');
        li.innerText = elem;
        li.id = incomeArr.indexOf(elem);
        divIncome.appendChild(li);

        let editBtn = document.createElement('button');
        editBtn.innerText = 'Edycja';
        editBtn.classList.add('incomeEditBtn');
        editBtn.onclick = onEditRemoveBtnClick;
        editBtn.id = 'incomeEditBtn';
        divIncome.appendChild(editBtn);

        let trashBtn = document.createElement('button');
        trashBtn.classList.add('incomeTrashBtn');
        trashBtn.onclick = onEditRemoveBtnClick;
        trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        divIncome.appendChild(trashBtn);
    });
};

function updateIncomeSum () {
    let sum = 0;
    
    totalIncomeSum.forEach(elem => {
        let number = parseFloat(elem);
        sum = sum + number;
    });

    let totalIncomeSumText = document.getElementById('totalIncomeSumText');
    totalIncomeSumText.innerText = sum + 'zł';

};


