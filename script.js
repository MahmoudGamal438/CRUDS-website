let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search_txt = document.getElementById("search-txt");
let search_title = document.getElementById("search-title");
let search_category = document.getElementById("search-category");

let mood = "create"; // Create mode
let temp; // Temporary variable for update mode


//  showData();
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = ' #f4f5f5ff';
        total.style.color = 'black';
    } else {
        total.innerHTML = "";
        total.style.background = "#c4cacaff";
        total.style.color = "white";
    }

}

let dataProduct;
if (localStorage.getItem("products") == null) {
    dataProduct = [];
} else {
    dataProduct = JSON.parse(localStorage.getItem("products"));
}

create.onclick = function () {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };

    if(title.value!='' && price.value!='' && count.value<100 && category.value!='')
        {
             if (mood === "create") {
                 if (newProduct.count > 1) {
                     for (let i = 0; i < newProduct.count; i++) {
                         dataProduct.push(newProduct);
                     }
                 } else {
                     dataProduct.push(newProduct);
                 }
             } else {
                 dataProduct[temp] = newProduct; // Update the product at the temp index
                 create.innerHTML = "Create"; // Reset the button text
                 mood = "create"; // Switch back to create mode
                 count.style.display = "block"; // Show the count input
         
            }
        }
    localStorage.setItem("products", JSON.stringify(dataProduct));
    console.log(dataProduct);

    clearData();
    showData();
}

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
function showData() {
    getTotal();
    let table = "";
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].count}</td>
                <td>${dataProduct[i].category}</td>
                <td><button class="update" onclick="updateData(${i})">Update</button></td>
                <td><button class="delete" onclick="deleteData(${i})">Delete</button></td>
            </tr>`;

    }
    document.getElementById("tbody").innerHTML = table;

    let deleteAll = document.getElementById("delete-all");
    if (dataProduct.length > 0) {
        deleteAll.innerHTML = `<button id="delete-all-btn" onclick="deleteAllData()">Delete All (${dataProduct.length})</button>`;
    } else {
        deleteAll.innerHTML = "";
    }
}
showData();
function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(dataProduct));
    showData();
}

function deleteAllData() {
    // dataProduct = [];
    // localStorage.setItem("products", JSON.stringify(dataProduct));
    localStorage.clear();
    dataProduct.splice(0, dataProduct.length);
    showData();
}

function updateData(i) {
    // Get the product to update
    let product = dataProduct[i];

    // Fill the input fields with the product data
    title.value = product.title;
    price.value = product.price;
    taxes.value = product.taxes;
    ads.value = product.ads;
    discount.value = product.discount;
    getTotal();
    count.style.display = "none";
    category.value = product.category;
    create.innerHTML = "Update";
    mood = "update";
    temp = i; // Switch to update mode
    scroll({
        top: 0,
        behavior: "smooth"
    });

    showData();
}
let searchMood = "title"; // Default search mood

function getSearchMood(id) {
    let search_txt = document.getElementById("search-txt");
    if (id == "search-title") {
        searchMood = "title";
        search_txt.placeholder = "Search by title";
    } else {
        searchMood = "category";
        search_txt.placeholder = "Search by category";
    }
    search_txt.focus();
    search_txt.value = "";
    showData(); // Show all data when switching search mood
}

function searchData(value) {
    let table = "";
    if (searchMood === "title") 
    {
        for (let i = 0; i < dataProduct.length; i++)
              {
                if (dataProduct[i].title.includes(value.toLowerCase()))
                 {
                      table += `
                      <tr>
                          <td>${i + 1}</td>
                          <td>${dataProduct[i].title}</td>
                                <td>${dataProduct[i].price}</td>
                          <td>${dataProduct[i].taxes}</td>
                          <td>${dataProduct[i].ads}</td>
                          <td>${dataProduct[i].discount}</td>
                          <td>${dataProduct[i].total}</td>
                          <td>${dataProduct[i].count}</td>
                          <td>${dataProduct[i].category}</td>
                          <td><button class="update" onclick="updateData(${i})">Update</button></td>
                          <td><button class="delete" onclick="deleteData(${i})">Delete</button></td>
                      </tr>`;
                  }
                }
    }
    else 
        {
           for (let i = 0; i < dataProduct.length; i++)
             {
                if (dataProduct[i].category.includes(value.toLowerCase())) 
                    {
                    table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                         <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].count}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button class="update" onclick="updateData(${i})">Update</button></td>
                        <td><button class="delete" onclick="deleteData(${i})">Delete</button></td>
                      </tr>`;
                  }    
                 }
          }
    document.getElementById("tbody").innerHTML = table;
}