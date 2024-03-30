function getProductStorange() {
    localStorage.getItem('productList') ? productList = JSON.parse(localStorage.getItem('productList')) : productList = [];
}