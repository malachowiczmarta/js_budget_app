// zrobić tak żeby wszystko dodawało się do jednej tablicy ale dodać klucz type do objektów

class Budget {
  constructor() {
    const savedState = localStorage.getItem("budgetState");
    if (savedState) {
      const state = JSON.parse(savedState);
      this.itemsList = state.itemsList;
    } else {
      this.itemsList = [];
    }
  }

  getItemsList(type) {
    const itemArr = this.itemsList.filter(function (item) {
      return item.type == type;
    });
    return itemArr;
  }

  getItem(id) {
    const indexOfElement = this.itemsList.findIndex((elem) => elem.id == id);
    return this.itemsList[indexOfElement];
  }

  getOutcomes() {
    return this.outcomesList;
  }

  getOutcome(id) {
    const indexOfElement = this.outcomesList.findIndex((elem) => elem.id == id);
    return this.outcomesList[indexOfElement];
  }

  getIncomesSum(type) {
    const incomeSum = this.getItemsList(type)
      .map((income) => income.price)
      .reduce((sum, price) => {
        return sum + price;
      }, 0);

    return incomeSum;
  }

  getOutcomesSum(type) {
    const outcomeSum = this.getItemsList(type)
      .map((outcome) => outcome.price)
      .reduce((sum, price) => {
        return sum + price;
      }, 0);

    return outcomeSum;
  }
  getBalance() {
    return this.getIncomesSum("income") - this.getOutcomesSum("outcome");
  }

  addItem(newName, newPrice, lastId, type) {
    const item = {
      name: newName,
      price: Number(newPrice),
      id: lastId,
      type: type,
    };

    console.log(item);

    this.itemsList.push(item);

    console.log(this.itemsList);

    this.setItemToLocalStorage();
  }

  editIncome(newName, newPrice, id, type) {
    const indexOfElementToEdit = this.itemsList.findIndex(
      (elem) => elem.id == id
    );
    this.itemsList[indexOfElementToEdit] = {
      name: newName,
      price: Number(newPrice),
      id,
      type,
    };
    this.setItemToLocalStorage();
  }

  editOutcome(newName, newPrice, id, type) {
    const indexOfElementToEdit = this.itemsList.findIndex(
      (elem) => elem.id == id
    );
    this.itemsList[indexOfElementToEdit] = {
      name: newName,
      price: Number(newPrice),
      id,
      type,
    };
    this.setItemToLocalStorage();
  }

  deleteIncome(id) {
    this.itemsList = this.itemsList.filter(function (income) {
      return income.id !== id;
    });
    console.log(this.incomesList);
    this.setItemToLocalStorage();
  }

  deleteOutcome(id) {
    this.itemsList = this.itemsList.filter(function (outcome) {
      return outcome.id !== id;
    });

    this.setItemToLocalStorage();
  }

  setItemToLocalStorage() {
    // const state = JSON.stringify({
    //   incomesList: this.incomesList,
    //   outcomesList: this.outcomesList,
    // });
    // localStorage.setItem("budgetState", state);
  }
}

const budget = new Budget();
let lastId = 0;

function updateInterface() {
  updateIncomeList();
  updateOutcomeList();
  updateIncomeSum();
  updateOutcomeSum();
  updateTotalSum();
}

// ADD ON CLICK##################################################################

function onAddBtnClick(elem) {
  let name = "";
  let sum = "";
  if (elem.id == "buttonAddIncome") {
    name = document.getElementById("incomeName");
    sum = document.getElementById("incomeSum");
  } else {
    name = document.getElementById("outcomeName");
    sum = document.getElementById("outcomeSum");
  }

  let type = name.name;

  console.log(type);
  console.log(name.value);
  console.log(sum.value);
  console.log(budget);

  budget.addItem(name.value, sum.value, lastId, type);

  lastId++;

  updateInterface();
}

// function onAddBtnOutcomeClick() {
//   let outcomeName = document.getElementById("outcomeName");
//   let outcomeSum = document.getElementById("outcomeSum");

//   budget.addOutcome(outcomeName.value, outcomeSum.value, lastId);

//   lastId++;

//   console.log(budget);
//   updateInterface();
// }

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
  console.log(clickedIdIncome);

  let targetparagraph = document.getElementById(`income-${clickedIdIncome}`);

  targetparagraph.innerText = "";

  const incomeToEdit = budget.getItem(clickedIdIncome);
  const incomeToEditType = incomeToEdit.type;
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
      editIncomeNameInput.value,
      editIncomePriceInput.value,
      Number(clickedIdIncome),
      incomeToEditType
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
  const outcomeToEdit = budget.getItem(clickedIdOutcome);
  const outcomeToEditType = outcomeToEdit.type;

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
      editOutcomeNameInput.value,
      editOutcomePriceInput.value,
      Number(clickedIdOutcome),
      outcomeToEditType
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
  let type = incomeName.name;

  const incomeArr = budget.getItemsList(type);

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
  let type = outcomeName.name;

  const outcomeArr = budget.getItemsList(type);

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
  const type = "income";
  let totalIncomeSum = budget.getIncomesSum(type);
  let totalIncomeSumSpan = document.getElementById("totalIncomeSumSpan");
  totalIncomeSumSpan.innerText = "";
  totalIncomeSumSpan.innerText = totalIncomeSum;
}

function updateOutcomeSum() {
  const type = "outcome";
  let totalOutcomeSum = budget.getOutcomesSum(type);
  let totalOutcomeSumSpan = document.getElementById("totalOutcomeSumSpan");
  totalOutcomeSumSpan.innerText = "";
  totalOutcomeSumSpan.innerText = totalOutcomeSum;
}

function updateTotalSum() {
  let totalSum = budget.getBalance();
  let totalIncomeSum = budget.getIncomesSum("income");
  let totalOutcomeSum = budget.getOutcomesSum("outcome");
  let totalSumPara = document.getElementById("totalSumPara");
  let absoluteValue = Math.abs(totalSum);

  if (totalIncomeSum == totalOutcomeSum) {
    totalSumPara.innerText = "Bilans wynosi zero";
    totalSumPara.style.backgroundColor = "#0d2137";
  } else if (totalIncomeSum > totalOutcomeSum) {
    totalSumPara.innerText = `Możesz jeszcze wydać ${totalSum} złotych`;
    totalSumPara.style.backgroundColor = "#238e23";
  } else {
    totalSumPara.innerText = `Bilans jest ujemny. Jesteś na minusie ${absoluteValue} złotych`;
    totalSumPara.style.backgroundColor = "#f85b00";
  }
}

window.onload = () => {
  updateInterface();
};
