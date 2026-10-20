
/* BÀI B — Giỏ hàng của xưởng in */

// DỮ LIỆU ĐÃ CHO — không sửa
const DANH_MUC = [
	{ id: "TC01", ten: "Thiệp cưới cotton", loai: "thiep cuoi", gia: 1500 },
	{ id: "TC02", ten: "Thiệp cưới kraft", loai: "thiep cuoi", gia: 900 },
	{ id: "DT01", ten: "Danh thiếp ép kim", loai: "danh thiep", gia: 1200 },
	{ id: "PB01", ten: "Phong bì lót lụa", loai: "phu kien", gia: 500 }
];

class GioHang {
	constructor() {
		this.dsDong = [];
	}

	// 1. Thêm sản phẩm
	them(sanPham, soLuong) {
		if (
			typeof soLuong !== "number" ||
			!Number.isInteger(soLuong) ||
			soLuong <= 0
		) {
			return false;
		}

		const dong = this.dsDong.find(sp => sp.id === sanPham.id);

		if (dong) {
			dong.soLuong += soLuong;
		} else {
			this.dsDong.push({
				id: sanPham.id,
				ten: sanPham.ten,
				loai: sanPham.loai,
				gia: sanPham.gia,
				soLuong: soLuong
			});
		}

		return true;
	}

	// 2. Xóa sản phẩm theo ID
	xoa(id) {
		const index = this.dsDong.findIndex(sp => sp.id === id);

		if (index === -1) {
			return false;
		}

		this.dsDong.splice(index, 1);
		return true;
	}

	// 3. Tổng tiền cả giỏ
	tongTien() {
		return this.dsDong.reduce(
			(tong, sp) => tong + sp.gia * sp.soLuong,
			0
		);
	}

	// 4. Thống kê theo loại
	thongKeTheoLoai() {
		const ketQua = {};

		for (const sp of this.dsDong) {
			ketQua[sp.loai] =
				(ketQua[sp.loai] || 0) + sp.gia * sp.soLuong;
		}

		return ketQua;
	}

	// 5. Dòng có thành tiền lớn nhất
	dongDatNhat() {
		if (this.dsDong.length === 0) {
			return null;
		}

		let max = this.dsDong[0];

		for (const sp of this.dsDong) {
			if (sp.gia * sp.soLuong > max.gia * max.soLuong) {
				max = sp;
			}
		}

		return {
			...max,
			thanhTien: max.gia * max.soLuong
		};
	}

	// 6. Trả về danh sách bản sao
	layDanhSach() {
		return this.dsDong.map(sp => ({
			...sp,
			thanhTien: sp.gia * sp.soLuong
		}));
	}

	// 7. Xuất JSON, mỗi dòng đúng 5 thuộc tính
	xuatJSON() {
		const dsJSON = this.dsDong.map(sp => ({
			id: sp.id,
			ten: sp.ten,
			loai: sp.loai,
			gia: sp.gia,
			soLuong: sp.soLuong
		}));

		return JSON.stringify(dsJSON);
	}
}

// 8. Khôi phục giỏ hàng từ JSON
function napGioHang(chuoiJSON) {
	const dsDong = JSON.parse(chuoiJSON);
	const gio = new GioHang();

	gio.dsDong = dsDong.map(sp => ({
		id: sp.id,
		ten: sp.ten,
		loai: sp.loai,
		gia: sp.gia,
		soLuong: sp.soLuong
	}));

	return gio;
}

// CHẠY THỬ — không sửa
const gio = new GioHang();

gio.them(DANH_MUC[0], 100);
gio.them(DANH_MUC[3], 200);
gio.them(DANH_MUC[0], 50);

veGioHang(gio.layDanhSach(), gio.tongTien());
console.table(gio.layDanhSach());
hienThi(`JSON gửi lên máy chủ: ${gio.xuatJSON()}`);
