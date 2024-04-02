// Selecting DOM elements
const productDiv = document.querySelector(".product");
const category = document.querySelector(".categoryList");
const searchInput = document.querySelector("#searchInput");
const cartList = document.getElementById('cartList');
const showCartBtn = document.getElementById('showCartBtn');

let all = [];
let cartItems = [];


const displayProduct = async (allCheckCat = []) => {
    productDiv.innerHTML = '';

    try {
        let product = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        let finalProduct = await product.json();

        finalProduct?.categories.forEach((element) => {
            if (!all.includes(element.category_name)) {
                category.innerHTML += ` <label>
                <input type="checkbox" onclick='categoryFilter()' value="${element.category_name}"> &nbsp; ${element.category_name}&nbsp;&nbsp;
                </label>`;
                all.push(element.category_name);
            }

            if (allCheckCat.length === 0 || allCheckCat.includes(element.category_name)) {
                element.category_products.forEach((item) => {
                    if (item.title.toLowerCase().includes(searchInput.value.toLowerCase()) || item.vendor.toLowerCase().includes(searchInput.value.toLowerCase()) || element.category_name.toLowerCase().includes(searchInput.value.toLowerCase())) {
                        productDiv.innerHTML += `<div class="productItems">
                        <h6>${item.vendor}</h6>
                        <hr/>
                        <img src=${item.image}>
                        <h6>${item.badge_text === null ? "" : item.badge_text}</h6>
                        <h6>Price Rs.<span> ${item.price}</span> | <s>${item.compare_at_price}</s></h6>
                        <h5>${item.title}</h5>
                        <button class="addToCartBtn btn btn-primary" onclick="addToCart('${item.title}', ${item.price})">Add to Cart</button>
                        </div>`;
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
};

let categoryFilter = () => {
    let Input = document.querySelectorAll("input[type='checkbox']");
    let checkdata = [];
    Input.forEach((element) => {
        if (element.checked) {
            checkdata.push(element.value);
        }
    });
    displayProduct(checkdata);
};

searchInput.addEventListener('input', () => {
    displayProduct();
});

const addToCart = (title, price) => {
    let existingItem = cartItems.find(item => item.title === title);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ title, price, quantity: 1 });
    }

    cartList.innerHTML = '';
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.title} - Rs. ${item.price} - Quantity: ${item.quantity}`;
        // Add a remove button for each item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeItem(item.title);
        });
        listItem.appendChild(removeButton);
        cartList.appendChild(listItem);
    });


};

const removeItem = (title) => {
    cartItems = cartItems.filter(item => item.title !== title);
    // Update cart list display after removing the item
    cartList.innerHTML = '';
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.title} - Rs. ${item.price} - Quantity: ${item.quantity}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeItem(item.title);
        });

        listItem.appendChild(removeButton);
        cartList.appendChild(listItem);
    });
};

const showCartItems = () => {
};

showCartBtn.addEventListener('click', () => {
    showCartItems();
});

displayProduct();