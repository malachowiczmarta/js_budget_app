class Budget {
  constructor() {
    const savedState = localStorage.getItem("budgetState");
    if (savedState) {
      const state = JSON.parse(savedState);
      this.incomesList = state.incomesList;
      this.outcomesList = state.outcomesList;
    } else {
      this.incomesList = [];
      this.outcomesList = [];
    }
  }

  getIncomes() {
    return this.incomesList;
  }

  getIncome(id) {
    const indexOfElement = this.incomesList.findIndex((x) => x.id == id);
    return this.incomesList[indexOfElement];
  }

  getOutcomes() {
    return this.outcomesList;
  }

  getOutcome(id) {
    const indexOfElement = this.outcomesList.findIndex((x) => x.id == id);
    return this.outcomesList[indexOfElement];
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
    this.setItemToLocalStorage();
  }

  addOutcome(newName, newPrice) {
    const outcome = {
      name: newName,
      price: Number(newPrice),
      id: this.outcomesList.length,
    };

    this.outcomesList.push(outcome);
    this.setItemToLocalStorage();
  }

  editIncome(id, newName, newPrice) {
    const indexOfElementToEdit = this.incomesList.findIndex(
      (elem) => elem.id == id
    );
    this.incomesList[indexOfElementToEdit] = {
      id,
      name: newName,
      price: Number(newPrice),
    };
    this.setItemToLocalStorage();
  }

  editOutcome(id, newName, newPrice) {
    const indexOfElementToEdit = this.outcomesList.findIndex(
      (elem) => elem.id == id
    );
    this.outcomesList[indexOfElementToEdit] = {
      id,
      name: newName,
      price: Number(newPrice),
    };
    this.setItemToLocalStorage();
  }

  deleteIncome(id) {
    this.incomesList = this.incomesList.filter(function (income) {
      return income.id !== id;
    });
    console.log(this.incomesList);
    this.setItemToLocalStorage();
  }

  deleteOutcome(id) {
    this.outcomesList = this.outcomesList.filter(function (outcome) {
      return outcome.id !== id;
    });

    this.setItemToLocalStorage();
  }

  setItemToLocalStorage() {
    const state = JSON.stringify({
      incomesList: this.incomesList,
      outcomesList: this.outcomesList,
    });

    localStorage.setItem("budgetState", state);
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
  console.log(id);
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

  let targetparagraph = document.getElementById(`income-${clickedIdIncome}`);

  targetparagraph.innerText = "";

  const incomeToEdit = budget.getIncome(clickedIdIncome);
  console.log(clickedIdIncome);
  console.log(incomeToEdit);
  let editIncomeNameInput = document.createElement("input");
  editIncomeNameInput.value = incomeToEdit.name;
  editIncomeNameInput.classList.add("edit-input-name");
  targetparagraph.appendChild(editIncomeNameInput);
  let editIncomePriceInput = document.createElement("input");
  editIncomePriceInput.value = incomeToEdit.price;
  editIncomePriceInput.classList.add("edit-input-price");
  targetparagraph.appendChild(editIncomePriceInput);

  let editSaveBtn = document.getElementById(id);
  editSaveBtn.classList.add("save-btn");
  editSaveBtn.innerHTML = '<i class="fas fa-save"></i>';

  editSaveBtn.onclick = (e) => {
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

  let editSaveBtn = document.getElementById(id);
  editSaveBtn.classList.add("save-btn");
  editSaveBtn.innerHTML = '<i class="fas fa-save"></i>';

  editSaveBtn.onclick = (e) => {
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
  let absoluteValue = Math.abs(totalSum);

  if (totalIncomeSum == totalOutcomeSum) {
    return (
      (totalSumPara.innerText = "Bilans wynosi zero"),
      totalSumPara.classList.add("blue-background")
    );
  } else if (totalIncomeSum > totalOutcomeSum) {
    return (
      (totalSumPara.innerText = `Możesz jeszcze wydać ${totalSum} złotych`),
      totalSumPara.classList.add("green-background")
    );
  }
  return (
    (totalSumPara.innerText = `Bilans jest ujemny. Jesteś na minusie ${absoluteValue} złotych`),
    totalSumPara.classList.add("orange-background")
  );
}

window.onload = () => {
  updateInterface();
};
