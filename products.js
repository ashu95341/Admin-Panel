const expiredOrder = document.getElementById("expired");
const lowStockOrder = document.getElementById("lowstock")


function addHomepage(){
    
    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
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
        if(!expiredOrder.checked && allorders[i].orderStatus == "New"){
            continue;
        }else if(!lowStockOrder.checked && allorders[i].orderStatus == "Packed"){
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
            
            id_row.innerHTML = allorders[i].id;
            customer_row.innerHTML = allorders[i].medicineName;
            date_row.innerHTML = allorders[i].medicineBrand;
            amount_row.innerHTML = allorders[i].expirydate;
            
            
            rowCreate.appendChild(id_row);
            rowCreate.appendChild(customer_row);
            rowCreate.appendChild(date_row);
            rowCreate.appendChild(amount_row);
            
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
    expiredOrder.addEventListener("click", function(){
        console.log(expiredOrder.checked);
        fetchOrders(allorders);
    });
    
    lowStockOrder.addEventListener("click", function(){
        console.log(lowStockOrder.checked);
        fetchOrders(allorders);
    });
    


}



addHomepage()