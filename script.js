let productDiv = document.querySelector(".product")
let category = document.querySelector(".categoryList")

var all = [];

var displayProduct = async (allCheckCat = []) => {
    productDiv.innerHTML = '';

    let product = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    let finalProduct = await product.json();
    console.log(finalProduct?.categories)
    finalProduct?.categories.forEach((element) => {
        if (!all.includes(element.category_name)) {
            category.innerHTML += ` <label>
            <input type="checkbox" onclick='categoryFilter()' value="${element.category_name}"> &nbsp; ${element.category_name}&nbsp;&nbsp;
            </label>`
            all.push(element.category_name)
        }
        console.log(`Category Name : ${element.category_name}`);

        if (allCheckCat.length == 0) {
            allCheckCat = all;
        }

        if (allCheckCat.includes(element.category_name)) {
            element.category_products.forEach((item) => {
                productDiv.innerHTML += `<div class="productItems">
                <h6>${item.vendor}</h6>
                <hr/>
                <img src=${item.image}>
                <h6>${item.badge_text === null ? "" : item.badge_text}</h6>
                <h6>Price Rs. ${item.price} | <span>${item.compare_at_price}</span></h6>
                <h5>${item.title}</h5>
                </div>`
            })
        }
    })


}
displayProduct();

let categoryFilter = () => {
    let Input = document.querySelectorAll("input[type='checkbox']");
    let checkdata = [];
    Input.forEach((element) => {
        if (element.checked) {
            checkdata.push(element.value);
        }
    })
    displayProduct(checkdata)
}