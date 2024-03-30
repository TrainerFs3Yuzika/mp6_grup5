// cart
let cartIcon = document.querySelector('#cart-icon');
let addToCart = document.querySelector('.add-cart');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
// buka cart
cartIcon.onclick = () => {
        cart.classList.add("active");
    }
    // tutup cart
closeCart.onclick = () => {
    cart.classList.remove("active");
}

addToCart.onclick = () => {
    cart.classList.add("active");
}

// cart bekerja js
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Fungsi Pembuatan
function ready() {
    // Hapus item dari keranjang
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    // Quantity
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // button buy
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}
// buy button
function buyButtonClicked() {
    // alert("Your Order is Placed");
    swal({
        title: "Your Order is Placed",
        icon: "error",
        buttons: true,
    });
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}
//Hapus item dari keranjang
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal()
}
// Quantity changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}
//Add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}
document.addEventListener('DOMContentLoaded', function() {
    var closeAlertBtn = document.querySelector('.close-alert');
    closeAlertBtn.addEventListener('click', function() {
        document.getElementById('alert').style.display = 'none';
    });
});

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            swal({
                title: "Barang telah di tambahkan di keranjang",
                icon: "info",
            });
            return;
        }
    }
    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- Remove cart -->
    <i class="bx bxs-trash-alt cart-remove"></i>
`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);

    // setLocalStorageProduk(title, productImg, price, 1)
}

// function setLocalStorageProduk(produk, img, harga, qty) {
//     localStorage.setItem(`produk`, JSON.stringify({
//         produk: produk,
//         gambar: img,
//         harga: harga,
//         qty: qty
//     }))
// }

// update total
function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = priceElement.innerText.replace("Rp", "").replace(".", "")
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
    // if price contain some cents value
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "Rp" + total.toLocaleString("id-ID");

}


function cariProduk() {
    // Ambil nilai inputan pencarian
    var input = document.getElementById("searchInput").value.toUpperCase();
    // Ambil semua kotak produk
    var productBoxes = document.querySelectorAll(".shop-content.produk-tampil .product-box");

    // Loop melalui setiap kotak produk
    productBoxes.forEach(function(box) {
        var title = box.querySelector(".product-title").textContent.toUpperCase();

        // Jika judul produk cocok dengan inputan, tampilkan kotak produk, jika tidak, sembunyikan
        if (title.indexOf(input) > -1) {
            box.style.display = "";
        } else {
            box.style.display = "none";
        }
    });

    // Set ukuran kembali ke ukuran aslinya setelah pencarian
    document.querySelector(".shop-content.produk-tampil").style.gridTemplateColumns = "repeat(auto-fill, minmax(200px, 1fr))";
}