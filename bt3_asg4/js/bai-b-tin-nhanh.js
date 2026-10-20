
/* Chặn gửi form khi nhấn Enter */
document.querySelector("#searchbar form").addEventListener("submit", (e) => {
    e.preventDefault();
});

const oTimKiem = document.querySelector("#o-tim-kiem");
const list = document.querySelector("#list");
const boDem = document.querySelector("#bo-dem");
const khongThay = document.querySelector("#khong-thay");

const tieuDeInput = document.querySelector("#tin-tieu-de");
const noiDungInput = document.querySelector("#tin-noi-dung");
const nutDang = document.querySelector("#nut-dang");
const baoLoi = document.querySelector("#bao-loi");

// F1, F2, F3: Bộ đếm và lọc tin
function locTin() {
    const tuKhoa = oTimKiem.value.toLowerCase();
    const cacTin = list.querySelectorAll("li");
    let soTinHien = 0;

    cacTin.forEach((tin) => {
        const tieuDe = tin.querySelector("h3");
        const noiDung = tin.querySelector("p");

        const vanBan = (
            tieuDe.textContent + " " + noiDung.textContent
        ).toLowerCase();

        const khop = vanBan.includes(tuKhoa);

        tin.classList.toggle("an", !khop);

        if (khop) {
            soTinHien++;
        }
    });

    boDem.textContent =
        `Đang hiển thị ${soTinHien}/${cacTin.length} tin`;

    khongThay.textContent =
        `Không tìm thấy tin nào cho "${oTimKiem.value}"`;

    khongThay.classList.toggle("an", soTinHien > 0);
}

oTimKiem.addEventListener("keyup", locTin);

// F4: Chỉ một listener click trên #list
list.addEventListener("click", (e) => {
    const nut = e.target.closest("button.more");

    if (!nut || !list.contains(nut)) {
        return;
    }

    const tin = nut.closest("li");
    const p = tin.querySelector("p");

    const dangMo = p.classList.toggle("day-du");

    nut.textContent = dangMo ? "Thu gọn <<" : "Read more >>";
});

// F5: Đăng tin nhanh
nutDang.addEventListener("click", () => {
    const tieuDe = tieuDeInput.value;
    const noiDung = noiDungInput.value;

    if (tieuDe.trim() === "" || noiDung.trim() === "") {
        baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
        return;
    }

    const tin = document.createElement("li");

    const time = document.createElement("span");
    time.className = "time";
    time.textContent = homNay();

    const h3 = document.createElement("h3");
    h3.textContent = tieuDe;

    const p = document.createElement("p");
    p.textContent = noiDung;

    const nutMore = document.createElement("button");
    nutMore.type = "button";
    nutMore.className = "more";
    nutMore.textContent = "Read more >>";

    tin.append(time, h3, p, nutMore);
    list.prepend(tin);

    tieuDeInput.value = "";
    noiDungInput.value = "";
    baoLoi.textContent = "";

    locTin();
});

// Khởi tạo bộ đếm khi tải trang
locTin();
