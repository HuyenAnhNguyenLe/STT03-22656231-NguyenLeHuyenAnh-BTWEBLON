$(document).ready(function() {
    // Hàm đăng ký tài khoản
    function register(event) {
        event.preventDefault();
        if (kiemtraDauVao()) {
            let username = $('#regUsername').val().trim();
            let password = $('#regPassword').val().trim();
            let email = $('#regEmail').val().trim();
            let fullname = $('#regFullname').val().trim();
            let regmessage = $('#regmessage');

            let users = JSON.parse(localStorage.getItem('users')) || {};

            if (users[username]) {
                regmessage.text('Tài khoản đã tồn tại.').css('color', 'red');
            } else {
                users[username] = { username, password, email, fullname };
                localStorage.setItem('users', JSON.stringify(users));
                regmessage.text('Đăng ký thành công!').css('color', 'green');
            }
        }
    }

    // Hàm đăng nhập tài khoản
    function login(event) {
        event.preventDefault();
        let username = $('#loginUsername').val().trim();
        let password = $('#loginPassword').val().trim();
        let loginmessage = $('#loginmessage');

        if (!username || !password) {
            loginmessage.text('Vui lòng nhập đầy đủ tài khoản và mật khẩu').css('color', 'red');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || {};
        let storeUser = users[username];

        if (storeUser && storeUser.password === password) {
            localStorage.setItem("username", username);
            window.location.href = 'giohang.html';
        } else {
            loginmessage.text('Sai tài khoản hoặc mật khẩu').css('color', 'red');
        }
    }

    // Hàm kiểm tra đầu vào đăng ký
    function kiemtraDauVao() {
        let error = false;
        error = kiemtraThongTin("#regUsername", "#txtTkError", "Hãy nhập tên tài khoản.") || error;
        error = kiemtraThongTin("#regPassword", "#txtMkError", "Hãy nhập mật khẩu.") || error;
        error = kiemtraThongTin("#regEmail", "#txtEmailError", "Hãy nhập email.") || error;
        error = kiemtraThongTin("#regFullname", "#txtHotenError", "Hãy nhập họ và tên.") || error;
        return !error;
    }

    // Hàm kiểm tra chung cho các trường
    function kiemtraThongTin(selector, errorSelector, errorMessage) {
        let value = $(selector).val().trim();
        if (value === "") {
            $(errorSelector).text(errorMessage).show();
            return true;
        } else {
            $(errorSelector).hide();
            return false;
        }
    }

    // Gán sự kiện cho nút đăng ký và đăng nhập
    $("#register-form").submit(register);
    $("#login-form").submit(login);

    // Đăng xuất
    $("#logoutButton").click(function() {
        localStorage.removeItem("username");
        location.reload();
    });

    // Kiểm tra người dùng đăng nhập
    function kiemtraDangNhap() {
        let storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            $("#userName").text(storedUsername);
            $("#userInfo, #logoutButton").show();
            $("#loginLink").hide();
        } else {
            $("#loginLink").show();
            $("#userInfo, #logoutButton").hide();
        }
    }
    kiemtraDangNhap();

    // Modal đăng ký
    $("#btnOpenDK").click(function(event) {
        event.preventDefault();
        $("#myModal").modal("show");
    });

    // Đóng Modal và reset form
    $(".close, #btnClose").click(function() {
        $("#myModal").modal("hide");
        $("#register-form")[0].reset();
        $(".error-message").hide();
    });

    // Thông báo "Quên mật khẩu?"
    $("#btnMK").click(function(event) {
        event.preventDefault();
        $("#loginmessage").text("Thì thôi :)! Haha").css('color', 'red').show();
    });
});