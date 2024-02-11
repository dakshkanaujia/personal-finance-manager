var addbtn_E = document.getElementById('add-btn-Expense');
var expenses = document.getElementById('expenses');

var addbtn_I = document.getElementById('add-btn-Income');
var Income = document.getElementById('Income');

var addbtn_Inv = document.getElementById('add-btn-Investments');
var Investments = document.getElementById('Investments');

var displayElement = document.getElementById('odometer');
var uid = new ShortUniqueId();
var addItem = document.getElementById('addItem');
addItem.style.display = 'none';
var createBtn = false;
var addItemBtn_isActive = false;
var currentID = '';
let i = -1;
var ind = 0;
var pos = 0;
var neg = 0;
var userInput = "";
var username = document.getElementById('username');
var deleteBtn = document.getElementById('delete-btn');
var delCounter = 0;

var myObj = {
    name : "",
    data : [
        // {
        //     id:"Dyt03B",
        //     parent_option:"expenses",
        //     title:"grocery",
        //     value:"12$",
        // },
    ]
};

deleteBtn.addEventListener('click',function(){
    if(delCounter>0){
        localStorage.removeItem('financeData');
        myObj = {
            name : "",
            data : [
            ]
        };
        location.reload();
    }else{
        alert("ALERT! all your data will be deleted");
        alert("Click again to delete");
        delCounter++;
    }
});
var parsedData = JSON.parse(localStorage.getItem('financeData'));
if (myObj && myObj.data != null && parsedData && parsedData.data != null && Array.isArray(myObj.data) && parsedData.data.length > 0) {
    myObj.data = myObj.data.concat(parsedData.data);
    // myObj.name = (parsedData.name);
}

if(parsedData && parsedData.name && parsedData.name.length>0){
    myObj.name = parsedData.name;
}

function cleanItems(){
    myObj.data = myObj.data.filter(item => item.value !== "0000");
}

setTimeout(function() {
    if (myObj.name === "" || myObj.name === null || myObj.name === undefined) {
        do {
            userInput = prompt("Enter your Name!");
        } while (userInput === null || userInput.trim() === "");
        myObj.name = userInput;
        setToStorage();
    }
    username.innerText = myObj.name + ",";
}, 100);

cleanItems();

// if(parsedData!=null){
//     myObj.data = parsedData.data;
// }

function setToStorage(){
    localStorage.setItem('financeData', JSON.stringify(myObj));
    myObj = JSON.parse(localStorage.getItem('financeData'));
    ind = myObj.data.length;
}

setToStorage();



restoreElements();
updateDisplay();

function restoreElements(){
    var parent_option ;
    var symbol;
    var color;
    if(myObj==null || myObj.data===null || myObj.data.length==0){
        return;
    }else{
        for(var element of myObj.data){
            if(element!=null){
            if(element.parent_option === "expenses"){
                parent_option = expenses;
                symbol = "money_off";
                color = "danger";
            }
            else if(element.parent_option === "Income"){
                parent_option = Income;
                symbol = "attach_money"
                color = "primary";
            }
            else if(element.parent_option === "Investments"){
                parent_option = Investments;
                symbol = "savings";
                color = "success";
            }
            
                var uniqID = element.id;
                var title = element.title;
                var price = element.value;
                // document.getElementById(id_of_Title).innerText = element.title;
                // document.getElementById(id_of_Price).innerText = element.value;
                createRestoredElements(color, symbol , parent_option , uniqID , title, price);
            }
        }        
    }
}

function createRestoredElements(option,symbol_icon, parent_option, uniqID, title, price){
    var parent_div = document.createElement('div');
    parent_div.classList.add('d-flex','flex-row');
    parent_div.classList.add('border', 'rounded', `border-${option}`, 'text-dark', 'mt-4', 'Element');
    parent_div.style.width = "19vw";
    
    var icon = document.createElement('i');
    icon.classList.add('material-symbols-outlined', 'chevron_right', 'p-2', 'fw-medium','justify-content-center','m-1');
    icon.innerText = symbol_icon;
    icon.style.width = "1vw";
    icon.fontSize = "40px";
    
    var title_div = document.createElement('div');
    title_div.setAttribute('id',uniqID);
    title_div.classList.add('custom-textarea','ms-3','ps-3', 'border-start',`border-${option}`, 'Element');
    title_div.textContent = title;
    title_div.style.width = "12vw";
    title_div.style.height = "5vh";

    var price_div = document.createElement('div');
    price_div.classList.add('custom-textarea','border-start','ps-3', `border-${option}`, 'Element');
    price_div.setAttribute('id', `${uniqID}-price`);
    price_div.innerText = price;
    price_div.style.width = "7vw";
    price_div.style.height = "5vh";

    parent_div.appendChild(icon);
    parent_div.appendChild(title_div);
    parent_div.appendChild(price_div);
    parent_option.appendChild(parent_div);    
}
// myElement.classList.add('border', 'rounded', 'border-light', 'text-light', 'mt-4');


addbtn_E.addEventListener('click', function() {
    // check();                 
    createElement("danger", "money_off", expenses, "expenses");
});

addbtn_I.addEventListener('click', function() {
    // check();
    createElement("primary", "attach_money", Income, "Income");
});

addbtn_Inv.addEventListener('click', function() {
    // check();
    createElement("success", "savings", Investments, "Investments");
});

addItem.addEventListener('click',function(){
    // updateDisplay();
    if(addItemBtn_isActive == true){
        check();
        updateDisplay();
        setToStorage();
        if(addItemBtn_isActive==false){
            addItem.style.display = 'none';
        }
    }
})
var uniqID = uid.rnd();


function check(){
    var target = document.getElementById(currentID);
    var id_of_Price = (currentID+"-price");
    var ele = document.getElementById(id_of_Price);
    if(!check_valid_price(id_of_Price)){
        alert("Enter Valid Price");
        // grand.removeChild(parent);      
    }else{
        target.contentEditable = false;
        ele.contentEditable = false;
        addItem.style.display = 'none';
        addItemBtn_isActive = false;
        myObj.data[ind].title = target.innerText;
        myObj.data[ind].value = ele.innerText;
        setToStorage(); 
    }
}
function check_valid_price(id){
    let str = document.getElementById(id).innerText;
    str = (str.replace('$',''));
    if(str===''){
        return false;
    }
    if(isNaN(str)){
        document.getElementById(id).innerText = '$';
    }
    return (!isNaN(str))
}

function createElement(option,symbol_icon, parent_option, string){
    if(addItemBtn_isActive){
        alert("Add previous item")
        return;
    }
    uniqID = uid.rnd();
    createBtn = true;
    addItemBtn_isActive = true;
    var parent_div = document.createElement('div');
    parent_div.classList.add('d-flex','flex-row');
    parent_div.classList.add('border', 'rounded', `border-${option}`, 'text-dark', 'mt-4', 'Element');
    parent_div.style.width = "19vw";
    
    var icon = document.createElement('i');
    icon.classList.add('material-symbols-outlined', 'chevron_right', 'p-2', 'fw-medium','justify-content-center','m-1');
    icon.innerText = symbol_icon;
    icon.style.width = "1vw";
    icon.fontSize = "40px";
    
    var title_div = document.createElement('div');
    title_div.setAttribute('id',uniqID);
    title_div.classList.add('custom-textarea','ms-3','ps-3', 'border-start',`border-${option}`, 'Element');
    title_div.textContent = "Title....";
    title_div.contentEditable = "true";
    title_div.style.width = "12vw";
    title_div.style.height = "5vh";

    var price_div = document.createElement('div');
    price_div.classList.add('custom-textarea','border-start','ps-3', `border-${option}`, 'Element');
    price_div.setAttribute('id', `${uniqID}-price`);
    price_div.innerText = "$...."
    price_div.contentEditable = "true";
    price_div.style.width = "7vw";
    price_div.style.height = "5vh";
    
    parent_div.appendChild(icon);
    parent_div.appendChild(title_div);
    parent_div.appendChild(price_div);
    
    
    parent_option.appendChild(parent_div);
    obj = {
            "title" : string,
            "value" : "0000",
            "id" : uniqID,
            "parent_option" : string
    }

    myObj.data.push(obj);
    // setToStorage();

    title_div.addEventListener('click',function(){
        if(title_div.innerHTML==="Title...."){
            title_div.innerHTML = '&nbsp;';
        }
    })
    price_div.addEventListener('click',function(){
        if(price_div.innerHTML === '$....')
        price_div.innerHTML = '$';
    })

    
    currentID = uniqID;
    addItem.style.display = 'flex';
    createBtn = false;
    i++;
}

// setInterval(function() {
//     updateDisplay();
// }, 1000);

function updateDisplay() {
    var total = calculateTotal();
    
    if (displayElement) {
        displayElement.innerHTML = total;
    }
}

function calculateTotal() {
    var pos = 0;
    var neg = 0;
    for (let d of myObj.data) {
        if(d!==null){
        var value = d.value.replace('$', ''); // Remove '$' from the value
        var numericValue = parseInt(value);

        if (!isNaN(numericValue)) { // Check if it's a valid number
            if (d.parent_option === "expenses") {
                neg += numericValue;
            } else {
                pos += numericValue;
            }
        }
        }
    }

    return pos - neg;
}


