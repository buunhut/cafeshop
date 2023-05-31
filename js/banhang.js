// object donhang
function DonHang(
  _nhanvien,
  _ngay,
  _sophieu,
  _khachhang,
  _sanpham,
  _gia,
  _soluong,
  _thanhtien,
  _trangthai
) {
  this.nhanvien = _nhanvien;
  this.ngay = _ngay;
  this.sophieu = _sophieu;
  this.khachhang = _khachhang;
  this.sanpham = _sanpham;
  this.gia = _gia;
  this.soluong = _soluong;
  this.thanhtien = _thanhtien;
  this.trangthai = _trangthai;
}
// gán ngày tháng năm + số phiếu cho ô input
function ngayThangNamSoPhieu() {
  //lấy ngày tháng hiện tại
  var date = new Date();
  var ngay = date.getDate(); // Lấy ngày (1-31)
  var thang = date.getMonth() + 1; // Lấy tháng (0-11). Cần +1 vì tháng trong JavaScript tính từ 0-11.
  var nam = date.getFullYear(); // Lấy năm (đầy đủ bốn chữ số)

  if (("" + ngay).length < 2) {
    ngay = "0" + ngay;
  }
  if (("" + thang).length < 2) {
    thang = "0" + thang;
  }
  var ngayThangNam = nam + "-" + thang + "-" + ngay;

  var soPhieu = "";
  if (tatCaDonHang.length == 0) {
    soPhieu = 1;
  } else {
    soPhieu = Number(tatCaDonHang[0].sophieu) + 1;
  }
  // gán giá trị cho ô input ngày
  document.getElementById("ngayThangNam").value = ngayThangNam;
  //gán giá trị cho ô input số phiếu
  document.getElementById("soPhieu").value = soPhieu;
}

//lấy dữ liệu từ local,
function getLocalData() {
  var tatCaDonHangLocal = JSON.parse(localStorage.getItem("tatcadonhang"));
  if (tatCaDonHangLocal != null) {
    tatCaDonHang = tatCaDonHangLocal;
  }
  return tatCaDonHang;
}

var tatCaDonHang = [];

//lấy dữ liệu từ local
var tatCaDonHang = getLocalData();

//gán ngày tháng năm cho số phiếu
ngayThangNamSoPhieu();
// khóa số phiếu 
document.getElementById("khachHang").readOnly = true;

//bán
function ban() {
  // khóa số phiếu và khách hàng
  document.getElementById("khachHang").readOnly = true;
  document.getElementById("soPhieu").readOnly = true;
  //reset tên, sl, gia
  document.getElementById("sanPham").value = "";
  document.getElementById("giaMon").value = "";
  document.getElementById("soLuong").value = "";

  var nhanVien = "admin";
  var trangThai = "chờ";
  var ngayThangNam = domString("ngayThangNam");
  var soPhieu = domString("soPhieu");
  var khachHang = domString("khachHang");
  var sanPham = domString("sanPham");
  var gia = domNumber("giaMon");
  var soLuong = domNumber("soLuong");
  var thanhTien = soLuong * gia;
  //tạo đơn hàng
  var donHang = new DonHang(
    nhanVien,
    ngayThangNam,
    soPhieu,
    khachHang,
    sanPham,
    gia,
    soLuong,
    thanhTien,
    trangThai
  );

  //truyền đơn hàng vào tất cả đơn hàng
  tatCaDonHang.unshift(donHang);

  //lưu vào local
  localStorage.setItem("tatcadonhang", JSON.stringify(tatCaDonHang));
}

//reset
function resetForm() {
  document.getElementById("formBanHang").reset();
  ngayThangNamSoPhieu();
  // ở số phiếu và khách hàng
  document.getElementById("khachHang").readOnly = false;
}
