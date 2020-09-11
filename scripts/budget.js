class Budget {
  incomesList = [{ id: 0, name: "Test 1", price: 10.0 }];
  outcomesList = [
    { id: 0, name: "Test 1", price: 10.0 },
    { id: 1, name: "Test 1", price: 10.0 },
  ];

  getIncomes() {
    return this.incomesList;
  }

  getIncome(id) {
    return this.incomesList[id];
  }

  getOutcomes() {
    return this.outcomesList;
  }

  getOutcome(id) {
    return this.outcomesList[id];
  }

  getIncomesSum() {
    const incomeSum = this.incomesList
      .map((income) => income.price)
      .reduce((sum, price) => {
        return sum + price;
      }, 0);

    return incomeSum;
  }

  getOutcomesSum() {
    const outcomeSum = this.outcomesList
      .map((outcome) => outcome.price)
      .reduce((sum, price) => {
        return sum + price;
      }, 0);

    return outcomeSum;
  }
  getBalance() {
    return this.getIncomesSum() - this.getOutcomesSum();
  }

  addIncome(newName, newPrice) {
    const income = {
      name: newName,
      price: Number(newPrice),
      id: this.incomesList.length,
    };

    this.incomesList.push(income);
  }

  editIncome(id, newName, newPrice) {
    this.incomesList[id] = { id, name: newName, price: Number(newPrice) };
  }

  deleteIncome(id) {
    this.incomesList = this.incomesList.filter(function (income) {
      return income.id !== id;
    });
  }
}

const budget = new Budget();

// UI nic z logiki tutaj ponizej ######################################################
// onclick function ######################################################

function onAddBtnClick() {
  let incomeName = document.getElementById("incomeName");
  let incomeSum = document.getElementById("incomeSum");
  //   let incomeSumValueNumber = Number(incomeSum.value);

  budget.addIncome(incomeName.value, incomeSum.value);

  console.log(budget);
  updateInterface();
}

function onRemoveBtnClick(e) {
  let id = e.target.id;
  let splitedId = id.split("-");
  let clickedId = Number(splitedId[1]);

  budget.deleteIncome(clickedId);
  updateInterface();
}

function onEditBtnClick(e) {
  let id = e.target.id;
  let splitedId = id.split("-");

  let clickedId = Number(splitedId[2]);
  let targetparagraph = document.getElementById(splitedId[2]);
  targetparagraph.innerText = "";

  const incomeToEdit = budget.getIncome(clickedId);

  let editNameInput = document.createElement("input");
  editNameInput.value = incomeToEdit.name;
  targetparagraph.appendChild(editNameInput);
  let editPriceInput = document.createElement("input");
  editPriceInput.value = incomeToEdit.price;
  targetparagraph.appendChild(editPriceInput);

  let saveBtn = document.createElement("button");
  saveBtn.innerText = "Zapisz";
  targetparagraph.appendChild(saveBtn);

  //   let editPriceInputNumber = Number(editPriceInput.value);

  saveBtn.onclick = (e) => {
    budget.editIncome(clickedId, editNameInput.value, editPriceInput.value);
    updateInterface();
  };
}

function updateInterface() {
  uptadeIncomeList();
  updateIncomeSum();
  updateTotalSum();
}

function uptadeIncomeList() {
  let listContainer = document.querySelector("#incomeListContainer");
  listContainer.innerText = "";
  let incomeName = document.getElementById("incomeName");
  incomeName.value = "";
  let incomeSum = document.getElementById("incomeSum");
  incomeSum.value = "";

  const incomeArr = budget.getIncomes();

  incomeArr.forEach((income) => {
    let incomeListItemContainer = document.createElement("div");
    incomeListItemContainer.classList.add("income-list-item-container");
    let incomeListContainer = document.querySelector("#incomeListContainer");
    incomeListContainer.appendChild(incomeListItemContainer);

    let incomeParagraph = document.createElement("p");
    incomeParagraph.id = income.id;
    incomeParagraph.innerText = `${income.name} ${income.price} zł`;
    incomeListItemContainer.appendChild(incomeParagraph);

    let editBtn = document.createElement("button");
    editBtn.id = `editBtn-income-${income.id}`;
    editBtn.innerText = "Edycja";
    editBtn.classList.add("incomeEditBtn");
    editBtn.onclick = onEditBtnClick;
    incomeListItemContainer.appendChild(editBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.id = `deleteBtn-${income.id}`;
    deleteBtn.classList.add("incomeTrashBtn");
    deleteBtn.onclick = onRemoveBtnClick;
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    incomeListItemContainer.appendChild(deleteBtn);
  });
}

function updateIncomeSum() {
  let totalIncomeSum = budget.getIncomesSum();
  let totalIncomeSumSpan = document.getElementById("totalIncomeSumSpan");
  totalIncomeSumSpan.innerText = "";
  totalIncomeSumSpan.innerText = totalIncomeSum;
}

function updateTotalSum() {
  let totalSum = budget.getBalance();
  let totalIncomeSum = budget.getIncomesSum();
  let totalOutcomeSum = budget.getOutcomesSum();
  let totalSumPara = document.getElementById("totalSumPara");

  if (totalIncomeSum == totalOutcomeSum) {
    return (totalSumPara.innerText = "Bilans wynosi zero");
  } else if (totalIncomeSum > totalOutcomeSum) {
    return (totalSumPara.innerText = `Możesz jeszcze wydać ${totalSum} złotych`);
  }
  return (totalSumPara.innerText = `Bilans jest ujemny. Jesteś na minusie ${totalSum} złotych`);
}

window.onload = () => {
  updateInterface();
};
