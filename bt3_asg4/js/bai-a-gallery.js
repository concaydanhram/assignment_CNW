
const anhLon = document.querySelector("#gallery > div > img");
const dsAnhNho = document.querySelectorAll("#gallery ul li img");
const khungAnhNho = document.querySelector("#gallery ul");
const oTimKiem = document.getElementById("o-tim-kiem");

console.log(dsAnhNho.length);

console.log(khungAnhNho.firstChild.nodeType);
console.log(khungAnhNho.childNodes.length);
console.log(dsAnhNho[0].parentNode.nodeName);

const chuThich = document.createElement("p");
chuThich.id = "chu-thich";
chuThich.textContent = "Bấm vào ảnh nhỏ để đổi ảnh lớn.";
anhLon.parentNode.append(chuThich);

function doiAnh(e) {
    if (e.target.nodeName !== "IMG") {
        return;
    }

    anhLon.src = `images/${e.target.alt}.jpg`;
    chuThich.textContent = `Đang xem: ${e.target.alt}.jpg`;

    for (const anh of dsAnhNho) {
        anh.parentNode.className = "";
    }

    e.target.parentNode.className = "dang-chon";
}

khungAnhNho.addEventListener("click", doiAnh);

const GOI_Y = "Enter search query";

oTimKiem.addEventListener("focus", () => {
    if (oTimKiem.value === GOI_Y) {
        oTimKiem.value = "";
    }
});

oTimKiem.addEventListener("blur", () => {
    if (oTimKiem.value === "") {
        oTimKiem.value = GOI_Y;
    }
});

const nutKhoa = document.getElementById("nut-khoa");

nutKhoa.addEventListener("click", (e) => {
    khungAnhNho.removeEventListener("click", doiAnh);
    chuThich.textContent = "Thư viện ảnh đã khoá.";

    console.log(e.type);
    console.log(e.target.id);
});

const dsBaiViet = document.querySelector("#posts ul");
const mucMoi = document.createElement("li");
const tieuDe = document.createElement("h5");

tieuDe.textContent = "Khuyến mãi <b>thiệp cưới</b>";
mucMoi.append(tieuDe);
dsBaiViet.prepend(mucMoi);

console.log(dsBaiViet.querySelectorAll("li").length);
