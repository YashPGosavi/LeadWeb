let myLeads = [];
const inputEl = document.getElementById("input-el");
const savebutton = document.getElementById("save-El");
const deletebutton = document.getElementById("delete-El");
const ulEl = document.getElementById("ul-El");
const tabbutton = document.getElementById("tab-El");


tabbutton.addEventListener("click", function () {
  
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leads) {
    let listitems = "";
    for (let i = 0; i < leads.length; i++) {
        listitems += `
              <li>
                     <a href='${leads[i]}' target='_blank'> 
                            ${leads[i]}
                     </a>
              </li>
              `;

        /* innerHTML helps to add function inside the html.
        Other Method to innerHTML
            let li = document.createElement('li');
            li.textContent=leads[i];
            ulEl.append(li);
        
        */
    }
    ulEl.innerHTML = listitems;
}


savebutton.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = ""; // clear inputfield
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
}
)

deletebutton.addEventListener("dblclick", function () {
    myLeads = [];
    localStorage.clear();
    render(myLeads);
})