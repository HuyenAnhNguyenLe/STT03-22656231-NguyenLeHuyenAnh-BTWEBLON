// Lấy dữ liệu từ localStorage hoặc khởi tạo nếu không có
let productInCart = JSON.parse(localStorage.getItem("products")) || [];
let totalMoneyInCart = JSON.parse(localStorage.getItem("totalMoney")) || 0;

// Gọi hàm hiển thị khi tải trang
setCartLength();
renderProduct();
updateTotalMoney();

// Hiển thị sản phẩm trong giỏ hàng
function renderProduct() {
    const loadProductInCart = $("#loadProductInCart");
    loadProductInCart.html(""); // Xóa nội dung cũ

    if (productInCart.length === 0) {
        loadProductInCart.html(`
            <div class="col-12 cartNone">
                <div class="textNone">
                    Bạn đang không có sản phẩm nào trong giỏ hàng!
                </div>
                <hr>
                <div>
                    <a href="products.html" class="btn btn-dark">QUAY LẠI MUA HÀNG</a>
                </div>
            </div>
        `);
        return;
    }

    // Sử dụng forEach thay vì map vì không cần trả về mảng mới
    productInCart.forEach((p, index) => {
        loadProductInCart.append(`
            <div class="col-lg-3 col-sm-6">
                <div class="product_box">
                    <h4 class="bursh_text">Tên sản phẩm</h4>
                    <a href="products1.html"><img src="${p.Avatar}" /></a>
                    <div style="padding: 10px">
                        <h3>${p.Name}</h3>
                        <h3>${formatMoney(p.Price * p.quantity)}<sup>đ</sup></h3>
                        <h3>Số lượng: ${p.quantity}</h3>
                        <button class="btn" onclick="plusQuantity(${index})">+</button>
                        <button class="btn" onclick="minusQuantity(${index}, ${p.quantity})">-</button>
                    </div>
                </div>
            </div>
        `);
    });
}

// Xóa toàn bộ sản phẩm trong giỏ hàng
$("#deleteAll").on("click", () => {
    productInCart = [];
    localStorage.setItem("products", JSON.stringify(productInCart));
    renderProduct();
    updateTotalMoney();
    setCartLength();
});

// Tính tổng tiền và lưu lại trong localStorage
function updateTotalMoney() {
    const total = productInCart.reduce((sum, p) => sum + p.quantity * p.Price, 0);
    $("#totalMoney").html(formatMoney(total) + `<sup>đ</sup>`);
    localStorage.setItem("totalMoney", JSON.stringify(total));
}

// Tăng số lượng sản phẩm
function plusQuantity(index) {
    productInCart[index].quantity++;
    localStorage.setItem("products", JSON.stringify(productInCart));
    renderProduct();
    updateTotalMoney();
}

// Giảm số lượng sản phẩm hoặc xóa sản phẩm nếu số lượng bằng 1
function minusQuantity(index, quantity) {
    if (quantity > 1) {
        productInCart[index].quantity--;
    } else {
        productInCart.splice(index, 1);
    }
    localStorage.setItem("products", JSON.stringify(productInCart));
    renderProduct();
    updateTotalMoney();
}

// Hiển thị tổng số sản phẩm trong giỏ
function setCartLength() {
    $("#totalCart").html(productInCart.length);
}

// Định dạng tiền tệ
function formatMoney(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Hiển thị tổng số lượng sản phẩm trong quá trình thanh toán
function displayCheckoutInfo() {
    const totalQuantity = productInCart.reduce((total, p) => total + p.quantity, 0);
    $("#totalProductQuantity").html(totalQuantity || 0);
}
// Hàm kiểm tra thông tin thanh toán
function btnTT(event) {
    event.preventDefault(); // Ngăn chặn form gửi đi nếu có lỗi

    let name = $('#name').val().trim();
    let nameErrorMsg = $("#nameErrorMsg");

    let email = $('#email').val().trim();
    let emailErrorMsg = $("#emailErrorMsg");

    let phone = $('#phone').val().trim();
    let phoneErrorMsg = $("#phoneErrorMsg");

    let address = $('#address').val().trim();
    let addressErrorMsg = $("#addressErrorMsg");

    let regmessage = $('#regmessage');

    let isValid = true;

    // Kiểm tra từng trường và hiển thị thông báo lỗi
    if (name === "") {
        nameErrorMsg.text("Hãy nhập tên người nhận.").show();
        isValid = false;
    } else {
        nameErrorMsg.hide();
    }

    if (email === "") {
        emailErrorMsg.text("Hãy nhập tài khoản email.").show();
        isValid = false;
    } else {
        emailErrorMsg.hide();
    }

    if (phone === "") {
        phoneErrorMsg.text("Hãy nhập số điện thoại.").show();
        isValid = false;
    } else {
        phoneErrorMsg.hide();
    }

    if (address === "") {
        addressErrorMsg.text("Hãy nhập địa chỉ nhận hàng.").show();
        isValid = false;
    } else {
        addressErrorMsg.hide();
    }

    // Nếu thông tin hợp lệ, tiến hành xử lý
    if (isValid) {
        regmessage.text('Thanh toán thành công!').css('color', 'green');
        productInCart = [];
        localStorage.removeItem("products");
        renderProduct();
        updateTotalMoney();
        setCartLength();
        displayCheckoutInfo();
    }
}


// Gắn hàm kiểm tra vào nút hoàn tất thanh toán
$('#btnTT').click(btnTT);

// Gọi hàm hiển thị số lượng sản phẩm và tổng tiền khi tải trang
displayCheckoutInfo();