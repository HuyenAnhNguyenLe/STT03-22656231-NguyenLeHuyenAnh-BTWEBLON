$(document).ready(() => {
    let productInCart = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];

    setCartLength();

    $(".add-to-cart").on("click", function() {
        let parent = $(this).closest(".product_box");
        let idProduct = parent.find(".idProduct").val();
        let checkProduct = productInCart.some(value => value.id === idProduct);

        let product = {
            id: idProduct,
            Avatar: parent.find(".imageP").val(),
            Name: parent.find(".nameP").val(),
            Price: parent.find(".priceP").val(),
        };

        if (!checkProduct) {
            productInCart.unshift({
                ...product,
                quantity: 1
            });
            localStorage.setItem("products", JSON.stringify(productInCart));
        } else {
            let getIndex = productInCart.findIndex(value => value.id === idProduct);
            let existingProduct = productInCart[getIndex];
            productInCart[getIndex] = {
                ...existingProduct,
                quantity: ++existingProduct.quantity
            };
            localStorage.setItem("products", JSON.stringify(productInCart));
        }

        setCartLength();
        alert("Sản phẩm đã được thêm vào giỏ hàng!"); // Thông báo cho người dùng
    });

    function setCartLength() {
        if (!productInCart || productInCart.length === 0) {
            $("#totalCart").html(0);
        } else {
            $("#totalCart").html(productInCart.length);
        }
    }
});