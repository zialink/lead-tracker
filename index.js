let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                
                <a target='_blank' href="${leads[i]}">
                    ${leads[i]}
                </a>
                <img src='matt-icons_cancel.svg' data-index="${i}" class='cancel-img' />
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
  deleteItem();
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

function deleteItem() {
  const cancelIcon = document.querySelectorAll(".cancel-img");
  for (let i = 0; i < cancelIcon.length; i++) {
    let item = cancelIcon[i];

    item.addEventListener("click", function () {
      let index = parseInt(item.dataset.index);
      let editLeads = JSON.parse(localStorage.getItem("myLeads"));
      editLeads.splice(index, 1);
      myLeads = editLeads;
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render(myLeads);
    });
  }
}
