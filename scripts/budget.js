class Budget {
  incomesList = [];
  outcomesList = [];

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

  addOutcome(newName, newPrice) {
    const outcome = {
      name: newName,
      price: Number(newPrice),
      id: this.outcomesList.length,
    };

    this.outcomesList.push(outcome);
  }

  editIncome(id, newName, newPrice) {
    this.incomesList[id] = { id, name: newName, price: Number(newPrice) };
  }

  editOutcome(id, newName, newPrice) {
    this.outcomesList[id] = { id, name: newName, price: Number(newPrice) };
  }

  deleteIncome(id) {
    this.incomesList = this.incomesList.filter(function (income) {
      return income.id !== id;
    });
  }

  deleteOutcome(id) {
    this.outcomesList = this.outcomesList.filter(function (outcome) {
      return outcome.id !== id;
    });
  }
}

const budget = new Budget();

function updateInterface() {
  updateIncomeList();
  updateOutcomeList();
  updateIncomeSum();
  updateOutcomeSum();
  updateTotalSum();
}

// ADD ON CLICK##################################################################

function onAddBtnIncomeClick() {
  let incomeName = document.getElementById("incomeName");
  let incomeSum = document.getElementById("incomeSum");

  budget.addIncome(incomeName.value, incomeSum.value);

  console.log(budget);
  updateInterface();
}

function onAddBtnOutcomeClick() {
  let outcomeName = document.getElementById("outcomeName");
  let outcomeSum = document.getElementById("outcomeSum");

  budget.addOutcome(outcomeName.value, outcomeSum.value);

  console.log(budget);
  updateInterface();
}

// DELETE ON CLICK #########################################################

function onIncomeRemoveBtnClick(e) {
  let id = e.target.id;
  let splitedId = id.split("-");
  let clickedIdIncome = Number(splitedId[1]);

  budget.deleteIncome(clickedIdIncome);

  updateInterface();
}

function onOutcomeRemoveBtnClick(e) {
  let id = e.target.id;
  let splitedId = id.split("-");
  let clickedIdOutcome = Number(splitedId[1]);

  budget.deleteOutcome(clickedIdOutcome);

  updateInterface();
}

// EDIT CLICK ######################################################################

function onIncomeEditBtnClick(e) {
  let id = e.target.id;
  let splitedId = id.split("-");

  let clickedIdIncome = splitedId[1];
  console.log(clickedIdIncome);

  let targetparagraph = document.getElementById(`income-${clickedIdIncome}`);

  targetparagraph.innerText = "";

  const incomeToEdit = budget.getIncome(clickedIdIncome);

  let editIncomeNameInput = document.createElement("input");
  editIncomeNameInput.value = incomeToEdit.name;
  editIncomeNameInput.classList.add("edit-input-name");
  targetparagraph.appendChild(editIncomeNameInput);
  let editIncomePriceInput = document.createElement("input");
  editIncomePriceInput.value = incomeToEdit.price;
  editIncomePriceInput.classList.add("edit-input-price");
  targetparagraph.appendChild(editIncomePriceInput);

  let saveIncomeBtn = document.createElement("button");
  saveIncomeBtn.innerHTML = '<i class="fas fa-save"></i>';
  saveIncomeBtn.classList.add("save-btn");
  targetparagraph.appendChild(saveIncomeBtn);

  saveIncomeBtn.onclick = (e) => {
    budget.editIncome(
      clickedIdIncome,
      editIncomeNameInput.value,
      editIncomePriceInput.value
    );
    updateInterface();
  };
}

function onOutcomeEditBtnClick(e) {
  let id = e.target.id;
  let splitedId = id.split("-");
  let clickedIdOutcome = splitedId[1];

  let targetparagraph = document.getElementById(`outcome-${clickedIdOutcome}`);
  targetparagraph.innerText = "";
  const outcomeToEdit = budget.getOutcome(clickedIdOutcome);

  let editOutcomeNameInput = document.createElement("input");
  editOutcomeNameInput.value = outcomeToEdit.name;
  editOutcomeNameInput.classList.add("edit-input-name");
  targetparagraph.appendChild(editOutcomeNameInput);
  let editOutcomePriceInput = document.createElement("input");
  editOutcomePriceInput.classList.add("edit-input-price");
  editOutcomePriceInput.value = outcomeToEdit.price;
  targetparagraph.appendChild(editOutcomePriceInput);

  let saveOutcomeBtn = document.createElement("button");
  saveOutcomeBtn.classList.add("save-btn");
  saveOutcomeBtn.innerHTML = '<i class="fas fa-save"></i>';
  targetparagraph.appendChild(saveOutcomeBtn);

  saveOutcomeBtn.onclick = (e) => {
    budget.editOutcome(
      clickedIdOutcome,
      editOutcomeNameInput.value,
      editOutcomePriceInput.value
    );
    updateInterface();
  };
}

// UPDATE LIST FUNCTION ##########################################################################

function updateIncomeList() {
  let incomesListContainer = document.querySelector("#incomesListContainer");
  incomesListContainer.innerText = "";

  let incomeName = document.getElementById("incomeName");
  incomeName.value = "";
  let incomeSum = document.getElementById("incomeSum");
  incomeSum.value = "";

  const incomeArr = budget.getIncomes();

  incomeArr.forEach((income) => {
    let incomeListItemContainer = document.createElement("div");
    incomeListItemContainer.classList.add("list-item-container");
    incomeListItemContainer.classList.add("shadow");
    let incomesListContainer = document.querySelector("#incomesListContainer");
    incomesListContainer.appendChild(incomeListItemContainer);

    let incomeParagraph = document.createElement("p");
    incomeParagraph.id = `income-${income.id}`;
    incomeParagraph.classList.add("para-list-item-container");
    incomeParagraph.innerText = `${income.name} ${income.price} zł`;
    incomeListItemContainer.appendChild(incomeParagraph);

    let editIncomeBtn = document.createElement("button");
    editIncomeBtn.id = `editBtn-${income.id}`;
    editIncomeBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editIncomeBtn.classList.add("edit-btn");
    editIncomeBtn.onclick = onIncomeEditBtnClick;
    incomeListItemContainer.appendChild(editIncomeBtn);

    let deleteIncomeBtn = document.createElement("button");
    deleteIncomeBtn.id = `deleteBtn-${income.id}`;
    deleteIncomeBtn.classList.add("trash-btn");
    deleteIncomeBtn.onclick = onIncomeRemoveBtnClick;
    deleteIncomeBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    incomeListItemContainer.appendChild(deleteIncomeBtn);
  });
}

function updateOutcomeList() {
  let outcomesListContainer = document.querySelector("#outcomesListContainer");
  outcomesListContainer.innerText = "";

  let outcomeName = document.getElementById("outcomeName");
  outcomeName.value = "";
  let outcomeSum = document.getElementById("outcomeSum");
  outcomeSum.value = "";

  const outcomeArr = budget.getOutcomes();

  outcomeArr.forEach((outcome) => {
    let outcomeListItemContainer = document.createElement("div");
    outcomeListItemContainer.classList.add("list-item-container");
    outcomeListItemContainer.classList.add("shadow");
    let outcomesListContainer = document.querySelector(
      "#outcomesListContainer"
    );
    outcomesListContainer.appendChild(outcomeListItemContainer);

    let outcomeParagraph = document.createElement("p");
    outcomeParagraph.id = `outcome-${outcome.id}`;
    outcomeParagraph.classList.add("para-list-item-container");
    outcomeParagraph.innerText = `${outcome.name} ${outcome.price} zł`;
    outcomeListItemContainer.appendChild(outcomeParagraph);

    let editOutcomeBtn = document.createElement("button");
    editOutcomeBtn.id = `editBtn-${outcome.id}`;
    editOutcomeBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editOutcomeBtn.classList.add("edit-btn");
    editOutcomeBtn.onclick = onOutcomeEditBtnClick;
    outcomeListItemContainer.appendChild(editOutcomeBtn);

    let deleteOutcomeBtn = document.createElement("button");
    deleteOutcomeBtn.id = `deleteBtn-${outcome.id}`;
    deleteOutcomeBtn.classList.add("trash-btn");
    deleteOutcomeBtn.onclick = onOutcomeRemoveBtnClick;
    deleteOutcomeBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    outcomeListItemContainer.appendChild(deleteOutcomeBtn);
  });
}

function updateIncomeSum() {
  let totalIncomeSum = budget.getIncomesSum();
  let totalIncomeSumSpan = document.getElementById("totalIncomeSumSpan");
  totalIncomeSumSpan.innerText = "";
  totalIncomeSumSpan.innerText = totalIncomeSum;
}

function updateOutcomeSum() {
  let totalOutcomeSum = budget.getOutcomesSum();
  let totalOutcomeSumSpan = document.getElementById("totalOutcomeSumSpan");
  totalOutcomeSumSpan.innerText = "";
  totalOutcomeSumSpan.innerText = totalOutcomeSum;
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
