
/* BÀI A — Trang News lấy dữ liệu từ JSON */

// Máy chủ gửi về một chuỗi JSON chứa 5 bài viết.
const duLieuTho = '[' +
	'{"id":1,"title":"Khai trương xưởng in mới","date":"01-03-2012","views":320,"tags":["su kien","xuong in"],"draft":false},' +
	'{"id":2,"title":"Mẫu thiệp cưới mùa thu","date":"15-03-2012","views":870,"tags":["thiep cuoi","mau moi"],"draft":false},' +
	'{"id":3,"title":"Hướng dẫn chọn giấy cotton","date":"02-04-2012","views":540,"tags":["huong dan","giay"],"draft":false},' +
	'{"id":4,"title":"Bảng giá 2013","date":"20-04-2012","views":0,"tags":["bang gia"],"draft":true},' +
	'{"id":5,"title":"Ưu đãi in danh thiếp","date":"05-05-2012","views":870,"tags":["khuyen mai","mau moi"],"draft":false}' +
	']';

// Phần 1: JSON → mảng object
const dsBai = JSON.parse(duLieuTho);

// Phần 2: Thêm / bớt phần tử
dsBai.push({
	id: 6,
	title: "Tuyển thực tập sinh",
	date: "10-05-2012",
	views: 45,
	tags: ["tuyen dung"],
	draft: true
});

dsBai.unshift({
	id: 0,
	title: "Thông báo nghỉ lễ",
	date: "30-04-2012",
	views: 120,
	tags: ["thong bao"],
	draft: false
});

const baiCuoi = dsBai.pop();
console.log(baiCuoi.id); // 6

const baiDau = dsBai.shift();
console.log(dsBai.length); // 5

// Phần 3: Thuộc tính của object
const baiMot = dsBai[0];
baiMot.noiBat = true;
baiMot["tac gia"] = "Ban biên tập";

delete baiMot.noiBat;
console.log(baiMot.noiBat); // undefined

// Phần 4: Kiểu tham chiếu
const baiGhim = dsBai[1];
baiGhim.title = "[GHIM] " + baiGhim.title;
console.log(dsBai[1].title);
// [GHIM] Mẫu thiệp cưới mùa thu

// Phần 5: filter / map / reduce
const daDang = dsBai.filter(bai => bai.draft === false);
console.log(daDang.length); // 4

const dsTieuDe = daDang.map(bai => bai.title.toUpperCase());

const tongLuotXem = daDang.reduce(
	(tong, bai) => tong + bai.views,
	0
);
console.log(tongLuotXem); // 2600

// Nếu bỏ đối số thứ hai của reduce: B
// Giá trị ban đầu sẽ là object đầu tiên trong mảng.

// Bài nhiều lượt xem nhất; nếu bằng nhau giữ bài đứng trước.
const baiHot = daDang.reduce(
	(max, bai) => bai.views > max.views ? bai : max
);
console.log(baiHot.id); // 2

// Callback của map không return
const thu = daDang.map(bai => {
	bai.views + 1;
});
console.log(thu[0]); // undefined

// Phần 6: Đếm số bài theo thẻ
const demThe = {};

daDang.forEach(bai => {
	for (const the of bai.tags) {
		demThe[the] = (demThe[the] || 0) + 1;
	}
});

console.log(demThe["mau moi"]); // 2

// Phần 7: Class
class BaiViet {
	constructor(duLieu) {
		this.title = duLieu.title;
		this.date = duLieu.date;
		this.views = duLieu.views;
	}

	tomTat() {
		return `${this.date} — ${this.views} lượt xem`;
	}
}

const dsBaiViet = daDang.map(duLieu => new BaiViet(duLieu));

// Phần 8: Object → JSON
const guiDi = JSON.stringify(dsBaiViet[0]);
console.log(guiDi);

// Chuỗi JSON không chứa phương thức tomTat: không

// Hiển thị
veDanhSachTin(dsBaiViet);

hienThi(
	`Đã đăng: ${daDang.length} bài — tổng ${tongLuotXem} lượt xem — bài hot: #${baiHot.id}`
);

hienThi(`Tiêu đề: ${dsTieuDe.join(" | ")}`);

for (const the in demThe) {
	hienThi(`#${the}: ${demThe[the]} bài`);
}
