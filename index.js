const logInComponent = document.getElementById("logIn");
const loggedInComponent = document.getElementById("loggedIn");
const newOrder = document.getElementById("new");
const packedOrder = document.getElementById("packed")
const transitOrder = document.getElementById("intransit");
const deliveredOrder = document.getElementById("delivered")
// const productsComponent = document.getElementById("products")

function showCorrectComponent(){
    if(localStorage.getItem("loggedIn") === "true"){
        logInComponent.remove();

        document.body.appendChild(loggedInComponent);
    }else{
        loggedInComponent.remove();
        
        document.body.appendChild(logInComponent);
    }
}









function loginUser(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let found = false;
    if(username === password){
        found = true;
        alert("Login Successful")
    }else{
        alert("Please enter valid Credentials!")
    }

    localStorage.setItem("loggedIn", found)
    showCorrectComponent();
}



function addHomepage(){
    
    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",
        true
    );

    xhr.onreadystatechange = function(){
        if(xhr.status === 200 && xhr.readyState === xhr.DONE){
            const allorders = Object.values(JSON.parse(this.response));
            // console.log(allorders);
            fetchOrders(allorders);
            clickEvents(allorders);
        }
    };
    xhr.send();


}

function fetchOrders(allorders){
    for(let i=0; i < allorders.length; i++){
        let count = 0;
        // console.log(newOrder.checked.value) //same to #new:checked
        // console.log(allorders[i].customerName);
        if(!newOrder.checked && allorders[i].orderStatus == "New"){
            continue;
        }else if(!packedOrder.checked && allorders[i].orderStatus == "Packed"){
            continue;
        }else if(!transitOrder.checked && allorders[i].orderStatus == "InTransit"){
            continue;
        }else if(!deliveredOrder.checked && allorders[i].orderStatus == "Delivered"){
            continue;
        } else{
            count ++;
            console.log(count);

            const parent = document.getElementById("orders-page")
            // console.log(parent);
            const rowCreate = document.createElement("tr");
            const id_row = document.createElement("td");
            const customer_row = document.createElement("td");
            const date_row = document.createElement("td");
            const amount_row = document.createElement("td");
            const status_row = document.createElement("td");

            id_row.innerHTML = allorders[i].id;
            customer_row.innerHTML = allorders[i].customerName;
            date_row.innerHTML = allorders[i].orderDate;
            amount_row.innerHTML = allorders[i].amount;
            status_row.innerHTML = allorders[i].orderStatus;
            
            rowCreate.appendChild(id_row);
            rowCreate.appendChild(customer_row);
            rowCreate.appendChild(date_row);
            rowCreate.appendChild(amount_row);
            rowCreate.appendChild(status_row);
            parent.appendChild(rowCreate);
        }
        

        // console.log(document.querySelector('#new:checked').value);
        // console.log(document.querySelector('#new:checked').value);
        // console.log(allorders[i].orderStatus != "New");
        // if(Boolean(document.querySelector('#new:checked').value) == true){
        //     console.log("12")
        //     parent.remove(allorders[i].orderStatus != "New")

        // }
        
        
    }
}

function clickEvents(allorders){
    newOrder.addEventListener("click", function(){
        console.log(newOrder.checked);
        fetchOrders(allorders);
    });
    
    packedOrder.addEventListener("click", function(){
        console.log(packedOrder.checked);
        fetchOrders(allorders);
    });
    transitOrder.addEventListener("click", function(){
        console.log(transitOrder.checked);
        fetchOrders(allorders);
    });
    deliveredOrder.addEventListener("click", function(){
        console.log(deliveredOrder.checked);
        fetchOrders(allorders);
    });


}


function logout(){
    localStorage.setItem("loggedIn", false);
    showCorrectComponent();
}
addHomepage();
showCorrectComponent();

function productsPage(){
    loggedInComponent.remove();
    location.replace('../products.html');
    
}



