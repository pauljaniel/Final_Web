
function changeModalHeaderColor(status){
  let modalHeader = document.getElementById('modal-header');
  modalHeader.classList.remove('bg-warning','bg-success','bg-success','bg-primary','bg-danger');
  let fstatus       = document.getElementById('field-status');
  fstatus.classList.remove('text-bg-warning','text-bg-secondary','text-bg-success','text-bg-danger')
  switch (status) { 
    case 'add':
      modalHeader.classList.add('bg-success');
      break; 
    default:
      modalHeader.classList.add('bg-secondary');
      fstatus.classList.add('text-bg-danger');
      break;                    
  } 
}


function addorderrecord() {
  const randomNumber = Math.floor(Math.random() * 10000);
  const newordernumber = `${randomNumber}`;
  console.log(newordernumber);
    let name    = document.getElementById('name');
    let status      = document.getElementById('field-status');
    let title       = document.getElementById('foods');
    let dateCreated = document.getElementById('date-ordered');
    let targetDate  = document.getElementById('expirationdate');
    let requestedBy = document.getElementById('drinks');
    let assignedTo  = document.getElementById('store');
    let addons  = document.getElementById('addons');
  
    const tblRow   = document.querySelector("#new");
    const tblBody  = tblRow.querySelector('tbody');
    let newRow = null;
    newRow     = tblBody.insertRow();

    let col1 = '';
    let col2 = '';
    let col3 = '';
    let col4 = '';
    let col5 = '';
    let col6 = '';
    let col7 = '';
    let col8 = '';
    let col9 = '';

    col1 = newRow.insertCell(0);
    col2 = newRow.insertCell(1);
    col3 = newRow.insertCell(2);
    col4 = newRow.insertCell(3);
    col5 = newRow.insertCell(4);
    col6 = newRow.insertCell(5);
    col7 = newRow.insertCell(6);
    col8 = newRow.insertCell(7);
    col9 = newRow.insertCell(8);
  
    col1.outerHTML = `<th class="align-middle fs-6">${newordernumber}</th>`;
    col2.outerHTML = `<td class="align-middle fs-6">${title.value}</td>`;
    col3.outerHTML = `<td class="align-middle fs-6">${requestedBy.value}</td>`;
    col4.outerHTML = `<td class="align-middle fs-6">${addons.value}</td>`;
    col5.outerHTML = `<td class="align-middle fs-6">${dateCreated.value}</td>`;
    col6.outerHTML = `<td class="align-middle fs-6">${targetDate.value}</td>`;
    col7.outerHTML = `<td class="align-middle fs-6">${name.value}</td>`;
    col8.outerHTML = `<td class="align-middle"><span class="badge rounded-pill text-bg-secondary">New Order</span></td>`;
    col9.outerHTML = `<td class="align-middle text-center">
                        <button class="btn btn-info vieworder" >view</button>
                        <button class="btn btn-warning editorder" >Edit</button>
                      </td>`;
    
  }
  

function breakByHTMLChars(statusHtml = ""){
  const tagRegex = /<[^>]*>/g;
  const resultArray = statusHtml.split(tagRegex);

  return resultArray.filter(item => item.trim() !== '');
}
function showHideTableButtons(row){
  const columns = row.getElementsByTagName('td'); 
  const status = breakByHTMLChars(columns[6].innerHTML);
}
function showHideModalButtons(row, state =''){
  const columns = row.getElementsByTagName('td'); 
  const status = breakByHTMLChars(columns[6].innerHTML);
  const modalMain = document.querySelector('#vieworders');
  removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete,#modal-btn-save,#modal-btn-create");
  removeBtns.forEach(btnCol => {
    btnCol.classList.add('d-none');
  });
  if(status.includes("completed")){
    removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });
  } else if(status.includes("New Order")){
    removeBtns = modalMain.querySelectorAll("#modal-btn-complete");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });
    if(state == ""){
      showBtns = modalMain.querySelectorAll("#modal-btn-process");
      showBtns.forEach(btnCol => {
        btnCol.classList.remove('d-none');
      });
    } else {
      showBtns = modalMain.querySelectorAll("#modal-btn-process");
      showBtns.forEach(btnCol => {
        btnCol.classList.add('d-none');
      });

      showBtns = modalMain.querySelectorAll("#modal-btn-save");
      showBtns.forEach(btnCol => {
        btnCol.classList.remove('d-none');
      });
    }
    
  } else if(status.includes("Processing")){
    removeBtns = modalMain.querySelectorAll("#modal-btn-process");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });

    if(state == ""){
      showBtns = modalMain.querySelectorAll("#modal-btn-complete");
      showBtns.forEach(btnCol => {
        btnCol.classList.remove('d-none');
      });
    } else {
      showBtns = modalMain.querySelectorAll("#modal-btn-complete");
      showBtns.forEach(btnCol => {
        btnCol.classList.add('d-none');
      });

      showBtns = modalMain.querySelectorAll("#modal-btn-save");
      showBtns.forEach(btnCol => {
        btnCol.classList.remove('d-none');
      });
    }  
  } 

  
}

function removeRowHightlight(){
  document.querySelectorAll('tr').forEach(row => {
    row.classList.remove('table-active');
     
  });
}

function addGlobalEventListener(type, selector, callback){
  document.addEventListener(type, e => {
    if(e.target.matches(selector)) callback(e);
  });
}


function assignRowFieldValues(row) {
    const orderno  = row.getElementsByTagName('th');
    const columns   = row.getElementsByTagName('td');
    let modalLabel  = document.getElementById('view');
    let modalTitle  = document.getElementById('ordernumber');
    let name    = document.getElementById('name');
    let status      = document.getElementById('field-status');
    let title       = document.getElementById('foods');
    let dateCreated = document.getElementById('date-ordered');
    let targetDate  = document.getElementById('expirationdate');
    let requestedBy = document.getElementById('drinks');
    let assignedTo  = document.getElementById('store');
    let addons  = document.getElementById('addons');
    const statusArray = ['Processing','New Order','completed','overdue'];

    row.classList.add('table-active');
    

    textContentArray = breakByHTMLChars(columns[6].innerHTML);
    
    modalTitle.innerHTML =`${orderno[0].textContent} [${textContentArray.join("/")}]`;
    changeModalHeaderColor(columns[6].textContent.toLowerCase());
    name.value    = columns[5].textContent;
    status.value      = textContentArray.join("/");
    title.value       = columns[0].textContent;
    dateCreated.value = columns[3].textContent;
    targetDate.value  = columns[4].textContent;
    requestedBy.value = columns[1].textContent;
    assignedTo.value  = 'addons';
    addons.value  = columns[2].textContent;
}
function clearFieldValues() {
  let modalLabel  = document.getElementById('view');
  let modalTitle  = document.getElementById('view');
  let name    = document.getElementById('name');
  let status      = document.getElementById('field-status');
  let title       = document.getElementById('foods');
  let dateCreated = document.getElementById('date-ordered');
  let targetDate  = document.getElementById('expirationdate');
  let requestedBy = document.getElementById('drinks');
  let assignedTo  = document.getElementById('store');
  let addons  = document.getElementById('addons');
  const statusArray = ['Processing','New Order','completed','overdue'];

  let date = new Date();
  date.setDate(date.getDate() + 7);
  newDateTarget = date.toISOString().split('T')[0];

  modalTitle.innerHTML =`ORDER <span class="fw-bold" id="ordernumber"></span>`;
  changeModalHeaderColor("add");
  name.value    = '';
  status.value      = 'New Order';
  title.value       = '';
  dateCreated.value = new Date().toISOString().split('T')[0];
  targetDate.value  = newDateTarget;
  requestedBy.value = '';
  assignedTo.value  = "Janiel's Cafe";
  addons.value  = '';
  status.setAttribute("disabled","");
  dateCreated.setAttribute("disabled","");
  assignedTo.setAttribute("disabled","");

  removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete,#modal-btn-save");
  removeBtns.forEach(btnCol => {
    btnCol.classList.add('d-none');
  });
  showBtns = modalMain.querySelectorAll("#modal-btn-create");
  showBtns.forEach(btnCol => {
    btnCol.classList.remove('d-none');
  });
}




document.addEventListener('DOMContentLoaded', function() {
  addButton = document.querySelector('#addorder');
  editButton = document.querySelectorAll('.editorder');
  modalMain = document.querySelector('#vieworders');
  activeRow = null;

  document.querySelectorAll('.table tbody tr').forEach(row => {
    showHideTableButtons(row);
    row.addEventListener('dblclick', () => {
      const columns = row.getElementsByTagName('td');
      const firstName = columns[1].textContent;
      const lastName = columns[2].textContent;

      const status = document.getElementById("status");
      console.log(columns[0].textContent);
      const animalArray = [];
      for (var i = 0; i < status.length; i++) {
        animalArray.push(status[i].textContent);
      }
      
    });


    
  });

  
  addGlobalEventListener("click",'.vieworder', e => {
    removeRowHightlight();

    let modalView = document.querySelector("#vieworders")
    let myModal = new bootstrap.Modal(modalView);
    myModal.show();

    let row         = e.target.parentElement.parentElement;
    activeRow       = row;

    assignRowFieldValues(row);

    showHideModalButtons(row);
  });

  addGlobalEventListener("click",'.editorder', e => {
    removeRowHightlight();

    let modalView = document.querySelector("#vieworders")
    let myModal = new bootstrap.Modal(modalView);
    myModal.show();

    let row         = e.target.parentElement.parentElement;
    activeRow       = row;
    
    assignRowFieldValues(row);

    // remove disable attribute in fields
    const inputFields = document.querySelectorAll(".form-control");
    inputFields.forEach(input => {
      if(input.id != "orderserved") input.removeAttribute("disabled");
    });

    showHideModalButtons(row,"edit");
    
  });


  addButton.addEventListener('click', function(){
    let modalView = document.querySelector("#vieworders");
    const createButton = modalView.querySelector("#modal-btn-create");
    myModal = new bootstrap.Modal(modalView);
    console.log(myModal);
    myModal.show();

    const inputFields = document.querySelectorAll(".form-control");
    inputFields.forEach(input => {
      if(input.id != "orderserved") input.removeAttribute("disabled");
    
    });

    clearFieldValues();

    



  });

  const createButton = document.querySelector("#modal-btn-create");
  createButton.addEventListener('click', function(event){
    const forms = document.querySelectorAll('.requires-validation');
    
    Array.from(forms).forEach(function (form) {
      if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          
      } else {
        addorderrecord();
        myModal.hide();
      }
      form.classList.add('was-validated');
    })
  });


  modalMain.addEventListener("hidden.bs.modal", function(){
    if(activeRow != null) activeRow.classList.remove('table-active');
    
     // add disable attribute in fields
     const inputFields = document.querySelectorAll(".form-control");
     inputFields.forEach(input => {
       if(input.id != "orderserved") input.setAttribute("disabled","");
     });

     const forms = document.querySelectorAll(".requires-validation");
     forms.forEach(form => {
      form.classList.remove('was-validated');
     });
  });

  

  addGlobalEventListener("click",'#modal-btn-complete', e => {
    const tblRow   = document.querySelector("#table-completed");
    const tblBody  = tblRow.querySelector('tbody');
    const orderno = activeRow.querySelectorAll('th');
    const columns  = activeRow.querySelectorAll('td');
    
    let newRow     = tblBody.insertRow();

    let col1 = newRow.insertCell(0);
    let col2 = newRow.insertCell(1);
    let col3 = newRow.insertCell(2);
    let col4 = newRow.insertCell(3);
    let col5 = newRow.insertCell(4);
    let col6 = newRow.insertCell(5);
    let col7 = newRow.insertCell(6);
    let col8 = newRow.insertCell(7);
    let col9 = newRow.insertCell(8);

    col1.outerHTML = orderno[0].outerHTML;
    col2.outerHTML = columns[0].outerHTML;
    col3.outerHTML = columns[1].outerHTML;
    col4.outerHTML = columns[2].outerHTML;
    col5.outerHTML = columns[3].outerHTML;
    col6.outerHTML = columns[4].outerHTML;
    col7.outerHTML = columns[5].outerHTML;
    col8.outerHTML = `<td class="align-middle"><span class="badge rounded-pill text-bg-success">completed</span></td>`;
    col9.outerHTML = `<td class="align-middle text-center">
                        <button class="btn btn-info vieworder" >view</button>
                        <button class="btn btn-warning editorder d-none" >Edit</button>
                      </td>`;
    
    activeRow.remove();
  });

  addGlobalEventListener("click",'#modal-btn-process', e => {
    const tblRow   = document.querySelector("#processing");
    const tblBody  = tblRow.querySelector('tbody');
    const orderno = activeRow.querySelectorAll('th');
    const columns  = activeRow.querySelectorAll('td');
    
    let newRow     = tblBody.insertRow();

    let col1 = newRow.insertCell(0);
    let col2 = newRow.insertCell(1);
    let col3 = newRow.insertCell(2);
    let col4 = newRow.insertCell(3);
    let col5 = newRow.insertCell(4);
    let col6 = newRow.insertCell(5);
    let col7 = newRow.insertCell(6);
    let col8 = newRow.insertCell(7);
    let col9 = newRow.insertCell(8);

    col1.outerHTML = orderno[0].outerHTML;
    col2.outerHTML = columns[0].outerHTML;
    col3.outerHTML = columns[1].outerHTML;
    col4.outerHTML = columns[2].outerHTML;
    col5.outerHTML = columns[3].outerHTML;
    col6.outerHTML = columns[4].outerHTML;
    col7.outerHTML = columns[5].outerHTML;
    col8.outerHTML = `<td class="align-middle"><span class="badge rounded-pill text-bg-warning">Processing</span></td>`;
    col9.outerHTML = `<td class="align-middle text-center">
                        <button class="btn btn-info vieworder" >view</button>
                      </td>`;
    
    activeRow.remove();
  });

  addGlobalEventListener("click",'#modal-btn-save', e => {
    const tblRow   = document.querySelector("#processing");
    const tblBody  = tblRow.querySelector('tbody');
    const orderno = activeRow.querySelectorAll('th');
    const columns  = activeRow.querySelectorAll('td');
    
    let name    = document.getElementById('name');
    let status      = document.getElementById('field-status');
    let title       = document.getElementById('foods');
    let dateCreated = document.getElementById('date-ordered');
    let targetDate  = document.getElementById('expirationdate');
    let requestedBy = document.getElementById('drinks');
    let assignedTo  = document.getElementById('store');
    let addons  = document.getElementById('addons');
    
    columns[5].textContent = name.value;
    columns[0].textContent = title.value       
    columns[3].textContent = dateCreated.value 
    columns[4].textContent = targetDate.value  
    columns[1].textContent = requestedBy.value 
    columns[2].textContent = addons.value  
    
  });
});


// const createButto = document.querySelector ("#addorder");
// createButto.addEventListener('click', function(){
//   addButtonListener()
  
// });

function generateToast(text) {
  
}