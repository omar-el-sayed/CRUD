var productNameInput = document.getElementById('productNameInput'); // Input Kolo
var productPriceInput = document.getElementById('productPriceInput'); // Input Kolo
var productCategoryInput = document.getElementById('productCategoryInput'); // Input Kolo
var productDescInput = document.getElementById('productDescInput'); // Input Kolo
var productNameAlert = document.getElementById('productNameAlert');
var productCategoryAlert = document.getElementById('productCategoryAlert');
var addBtn = document.getElementById("addBtn"); // Input Kolo
var searchInput = document.getElementById('searchInput');
var updateIndex;

var productsContainer;

if (localStorage.getItem('myProducts') == null) { // new client hasn't have any data
    productsContainer = [];
}
else { // old client has data
    productsContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProducts(productsContainer);
}

function addProduct() {
    if (validateProductName() == true && validateProductCategory() == true) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        };
        productsContainer.push(product);
        localStorage.setItem('myProducts', JSON.stringify(productsContainer));
        displayProducts(productsContainer);
        clearForm();
    }
    else {
        window.alert('Form Invalid');
    }
}

function displayProducts(productsList) {
    var cartoona = ``;
    for (var i = 0; i < productsList.length; i++) {
        cartoona += `<tr>
        <td>`+ (i + 1) + `</td>
        <td>`+ productsList[i].name + `</td>
        <td>`+ productsList[i].price + `</td>
        <td>`+ productsList[i].category + `</td>
        <td>`+ productsList[i].desc + `</td>
        <td><button onclick="changeFormForUpdate(`+ i + `);" class="btn btn-outline-warning font-italic">Update</button></td>
        <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-danger font-italic">Delete</button></td>
        </tr>`;
    }
    document.getElementById('productsBody').innerHTML = cartoona;
}

function clearForm() {
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDescInput.value = '';
    productNameInput.classList.remove('is-valid');
    productCategoryInput.classList.remove('is-valid');
    addBtn.classList.add('btn-outline-info');
    addBtn.classList.remove('btn-outline-warning');
}

function updateProducts() {
    if (validateProductName() == true && validateProductCategory() == true) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        };
        productsContainer[updateIndex] = product;
        localStorage.setItem('myProducts', JSON.stringify(productsContainer));
        displayProducts(productsContainer);
        clearForm();
        addBtn.innerHTML = 'Add Product';
    }
    else {
        window.alert('Form Invalid');
    }
}

function changeFormForUpdate(productIndex) {
    updateIndex = productIndex;
    productNameInput.value = productsContainer[productIndex].name;
    productPriceInput.value = productsContainer[productIndex].price;
    productCategoryInput.value = productsContainer[productIndex].category;
    productDescInput.value = productsContainer[productIndex].desc;
    addBtn.innerHTML = 'Update';
    addBtn.classList.add('btn-outline-warning');
    addBtn.classList.remove('btn-outline-info');
}

function deleteProduct(productIndex) {
    productsContainer.splice(productIndex, 1);
    localStorage.setItem('myProducts', JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}

function searchProducts(searchTerm) {
    var searchResult = [];
    for (var i = 0; i < productsContainer.length; i++) {
        if ((productsContainer[i].name).toLowerCase().includes(searchTerm.toLowerCase()) ||
            (productsContainer[i].category).toLowerCase().includes(searchTerm.toLowerCase())) {
            //TODO: exist
            searchResult.push(productsContainer[i]);
        }
    }
    displayProducts(searchResult);
}

function validateProductName() {
    var regex = /^[A-Z][A-Z]?[a-z]{0,8}$/;
    if (regex.test(productNameInput.value)) {
        productNameInput.classList.add('is-valid');
        productNameInput.classList.remove('is-invalid');
        productNameAlert.classList.replace('d-block', 'd-none');
        return true;
    }
    else {
        productNameInput.classList.add('is-invalid');
        productNameInput.classList.remove('is-valid');
        productNameAlert.classList.replace('d-none', 'd-block');
        return false;
    }
}

function validateProductCategory() {
    var regex = /^[A-Z][a-z]{1,8}$/;
    if (regex.test(productCategoryInput.value)) {
        productCategoryInput.classList.add('is-valid');
        productCategoryInput.classList.remove('is-invalid');
        productCategoryAlert.classList.replace('d-block', 'd-none');
        return true;
    }
    else {
        productCategoryInput.classList.add('is-invalid');
        productCategoryInput.classList.remove('is-valid');
        productCategoryAlert.classList.replace('d-none', 'd-block');
        return false;
    }
}

addBtn.addEventListener('click', function () {
    if (addBtn.innerHTML == 'Add Product') {
        addProduct();
    }
    else {
        updateProducts();
    }
});
searchInput.addEventListener('keyup', function () {
    searchProducts(this.value);
});
productNameInput.addEventListener('keyup', validateProductName);
productCategoryInput.addEventListener('keyup', validateProductCategory);