document.addEventListener('DOMContentLoaded', () => {
    // section 1 : variable declaration to connect add new product
    const nameInput = document.getElementById("product-name");
    const priceInput = document.getElementById("product-price");
    const imageInput = document.getElementById("product-image");
    const productAdd = document.getElementById("product-add");
    const productList = document.getElementById("product-list");
    // section 2 : variable declaration to connect add product to cart 
    const cartAdd = document.getElementById('cart-add');
    const cartList = document.getElementById('cart-list');


    // ----------------------------------------------------------------------

    // create empty array for add new list of product
    let productItem = [];


    // make function add prooduct for working
    productAdd.addEventListener('click', () => {
        const productName = nameInput.value.trim();
        const productPrice = priceInput.value.trim();
        const productImage = imageInput.value.trim();

        // check is not empty
        if (productName && productPrice && productImage) {
            // create a product bundle object
            const productBundle = {
                id: Date.now(),
                productName: productName,
                productPrice: productPrice,
                productImage: productImage
            }
            // add new product to productList
            productItem.push(productBundle);

            // clear input value
            nameInput.value = '';
            priceInput.value = '';
            imageInput.value = '';

            // update the product item to the product list
            renderProductList();
        } else {
            alert('Something is Empty, Please fill anything in the field')
        }
    })


    // function for display
    function renderProductList() {
        productList.innerHTML = '';
        productItem.forEach((item, index) => {
            const listItem = document.createElement('li');

            // Create product elements
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `checkbox-${index}`;


            const nameSpan = document.createElement('span');
            nameSpan.textContent = `Name: ${item.productName}`;

            const priceSpan = document.createElement('span');
            priceSpan.textContent = ` Price: $${item.productPrice}`;

            const imageSpan = document.createElement('span');
            imageSpan.innerHTML = ` <img src="${item.productImage}" style="width:50px;height:auto;">`; // Display image

            // Append spans to the list item
            listItem.appendChild(checkbox);
            listItem.appendChild(imageSpan);
            listItem.appendChild(nameSpan);
            listItem.appendChild(priceSpan);
            

            // Append the list item to the product list
            productList.appendChild(listItem);
        })
    }

    // --------------------------------------------------------------------------

    // create empty cart
    let cartItem = [];

    // make function add cart for working
    cartAdd.addEventListener('click', () => {
        productItem.forEach((item, index) => {
            const checkbox = document.getElementById(`checkbox-${index}`);
            if (checkbox.checked) {
                cartItem.push(item);
            }}
        );
        renderCartList();        
    });

    function deleteCartItem(id) {
        cartItem = cartItem.filter(item => item.id !== id);
        renderCartList();
    }


    // function display cart list
    function renderCartList() {
        cartList.innerHTML = '';
        cartItem.forEach((item, index) => {
            const listItemOfCart = document.createElement('li');

            // Create product elements
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `checkbox-${index}`;

            const nameSpan = document.createElement('span');
            nameSpan.textContent = `Name: ${item.productName}`;

            const priceSpan = document.createElement('span');
            priceSpan.textContent = ` Price: $${item.productPrice}`;

            const imageSpan = document.createElement('span');
            imageSpan.innerHTML = ` <img src="${item.productImage}" style="width:50px;height:auto;">`; // Display image


            // delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Remove';
            deleteBtn.addEventListener('click', () => deleteCartItem(item.id));

            // Append spans to the cart list item
            listItemOfCart.appendChild(checkbox);
            listItemOfCart.appendChild(imageSpan);
            listItemOfCart.appendChild(nameSpan);
            listItemOfCart.appendChild(priceSpan);
            listItemOfCart.appendChild(deleteBtn);
            

            // Append the list item to the cart list
            cartList.appendChild(listItemOfCart);


        });
    }

})