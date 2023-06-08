// object donhang
function DonHang(
  _ngay,
  _sophieu,
  _khachhang,
  _sanpham,
  _gia,
  _soluong,
  _thanhtien,
  _trangthai,
  _nhanvien
) {
  this.ngay = _ngay;
  this.sophieu = _sophieu;
  this.khachhang = _khachhang;
  this.sanpham = _sanpham;
  this.gia = _gia;
  this.soluong = _soluong;
  this.thanhtien = _thanhtien;
  this.trangthai = _trangthai;
  this.nhanvien = _nhanvien;
}
//object item đơn hàng
var ItemDonHang = function (
  _ngay,
  _gio,
  _sophieu,
  _khachhang,
  _tenhang,
  _gia,
  _soluong,
  _thanhtien,
  _nhanvien,
  _trangthai
) {
  this.ngay = _ngay;
  this.gio = _gio;
  (this.sophieu = _sophieu),
    (this.khachhang = _khachhang),
    (this.tenhang = _tenhang);
  (this.gia = _gia),
    (this.soluong = _soluong),
    (this.thanhtien = _thanhtien),
    (this.nhanvien = _nhanvien),
    (this.trangthai = _trangthai);
};

//lấy ngày tháng năm
let date = new Date();
let ngay = date.getDate(); // Lấy ngày (1-31)
let thang = date.getMonth() + 1; // Lấy tháng (0-11). Cần +1 vì tháng trong JavaScript tính từ 0-11.
let nam = date.getFullYear(); // Lấy năm (đầy đủ bốn chữ số)
let gio = date.getHours() + ":" + date.getMinutes();
let nhanVien = "admin";
let trangThai = "chờ";
if (("" + ngay).length < 2) {
  ngay = "0" + ngay;
}
if (("" + thang).length < 2) {
  thang = "0" + thang;
}
// let namThangNgay = nam + "-" + thang + "-" + ngay;
let ngayThangNam = ngay + "/" + thang + "/" + nam;

let tatCaDonHang = [];
//lấy dữ liệu từ local
tatCaDonHang = getLocalDonHang();

//lấy dữ liệu từ local,
function getLocalDonHang() {
  let tatCaDonHangLocal = JSON.parse(localStorage.getItem("tatcadonhang"));

  if (tatCaDonHangLocal != null) {
    tatCaDonHang = tatCaDonHangLocal;
  }
  return tatCaDonHang;
}

// gán ngày tháng năm + số phiếu cho ô input
function ngayThangNamSoPhieu() {
  //lấy ngày tháng hiện tại
  let date = new Date();
  let ngay = date.getDate(); // Lấy ngày (1-31)
  let thang = date.getMonth() + 1; // Lấy tháng (0-11). Cần +1 vì tháng trong JavaScript tính từ 0-11.
  let nam = date.getFullYear(); // Lấy năm (đầy đủ bốn chữ số)
  if (("" + ngay).length < 2) {
    ngay = "0" + ngay;
  }
  if (("" + thang).length < 2) {
    thang = "0" + thang;
  }
  let namThangNgay = nam + "-" + thang + "-" + ngay;
  getLocalDonHang();
  let soPhieu = "";
  if (tatCaDonHang.length == 0) {
    soPhieu = 1;
  } else {
    soPhieu = Number(tatCaDonHang[0].sophieu) + 1;
  }
  // gán giá trị cho ô input ngày
  document.getElementById("ngayThangNam").value = namThangNgay;
  //gán giá trị cho ô input số phiếu
  document.getElementById("soPhieu").value = soPhieu.toLocaleString();
}

//lấy dữ liệu từ local, đổ dữ liệu vào datalist sản phẩm
function getLocalSanPham() {
  let listSanPhamLocal = JSON.parse(localStorage.getItem("listsanpham"));
  let listSanPham = listSanPhamLocal;
  let tenSanPham = "";
  if (listSanPham != null) {
    listSanPham.forEach(function (sanpham) {
      tenSanPham += `      
      <option value="${vietHoaKyTuDau(sanpham.tenmon)}">      
      `;
    });
    // đổ dữ liệu vào data list sản phẩm
    // document.getElementById("listSanPham").innerHTML = tenSanPham;
  }
}

// lấy sản phẩm từ local
getLocalSanPham();
//gán ngày tháng năm cho số phiếu
ngayThangNamSoPhieu();
// khóa số phiếu
document.getElementById("soPhieu").readOnly = true;

//show sản phẩm bán
showSanPham();
// function show sản phẩm để bán
function showSanPham() {
  //lấy dữ liệu từ local
  listSanPham = JSON.parse(localStorage.getItem("listsanpham"));

  let text = document.getElementById("sanPham").value.toLowerCase();
  let inputSanPham = boDauTiengViet(text);

  let sanPhamXuatBan = listSanPham.filter(function (item) {
    return boDauTiengViet(item.tenmon).includes(inputSanPham);
  });

  if (sanPhamXuatBan.length > 0) {
    let hienThiSanPhamBan = "";
    sanPhamXuatBan.forEach(function (sanpham, index) {
      hienThiSanPhamBan += `
    <tr>
      <td>
        <p class="tenSanPham">${vietHoaKyTuDau(sanpham.tenmon)}</p>
        <p class="giaSanPham">${Number(sanpham.giamon).toLocaleString()}đ</p>
      </td>
      <td>
        <div class="soLuongSanPham">
          <input type="text" value="" hidden>
          <input type="text" id="soLuong${index}" value="1" 
           onchange = "onChangeSoLuong('soLuong${index}', '${Number(
        sanpham.giamon
      )}', 'thanhTien${index}')"
           onkeyup = "onChangeSoLuong('soLuong${index}', '${Number(
        sanpham.giamon
      )}', 'thanhTien${index}')">
          <div class="tangGiam">
            <i class="fa-solid fa-angle-up" 
            onclick="tangSoLuong('soLuong${index}', '${Number(
        sanpham.giamon
      )}', 'thanhTien${index}')">
            </i>
            <i class="fa-solid fa-angle-down" 
            onclick="giamSoLuong('soLuong${index}', '${Number(
        sanpham.giamon
      )}', 'thanhTien${index}')">
            </i>
          </div>
        </div>
      </td>
      <td>
        <input type="text" name="" class="thanhTien" id="thanhTien${index}" value="${Number(
        sanpham.giamon
      ).toLocaleString()}" readOnly>
      </td>
      <td>
        <button type="button" class="xuatBan" id="xuatBan" 
        onclick="banHang('${sanpham.tenmon}', '${Number(
        sanpham.giamon
      )}', 'soLuong${index}')">
          <i class="fa-solid fa-hand-holding-dollar"></i>
        </button>
      </td>
    </tr>  
    `;
    });

    document.getElementById("showSanPham").classList.remove("none");
    document.getElementById("showListSanPham").innerHTML = hienThiSanPhamBan;
  } else {
    document.getElementById("showSanPham").classList.add("none");
    document.getElementById("showListSanPham").innerHTML = "";
  }
}

//render list đơn hàng
showListDongHang();
//function show list đơn hàng
function showListDongHang() {
  //lấy dữ liệu từ local
  let listDonHang = JSON.parse(localStorage.getItem("tatcadonhang"));
  console.log(listDonHang);

  if (listDonHang != null) {
    // ktra xem có bao nhiêu phiếu, lọc bỏ số phiếu trùng
    let arrSoPhieu = [];
    listDonHang.forEach(function (donhang) {
      if (donhang.trangthai == "chờ") {
        arrSoPhieu.push(donhang.sophieu);
      }
    });

    console.log(arrSoPhieu.length);
    // lọc bỏ giá trị trùng
    let listSoPhieu = [...new Set(arrSoPhieu)];
    console.log(listSoPhieu.length);
    //nếu các phiếu có dữ liệu
    if (listSoPhieu.length > 0) {
      // console.log(listSoPhieu);
      let content = "";

      //chạy qua tất cả các số phiếu
      listSoPhieu.forEach((sophieu, index) => {
        let tongTien = 0;
        let tongSoLuong = 0;

        //lấy title đơn hàng ra
        for (let i = 0; i < listDonHang.length; i++) {
          if (
            listDonHang[i].sophieu == sophieu &&
            listDonHang[i].trangthai == "chờ" &&
            listDonHang[i].nhanvien == nhanVien
          ) {
            content += `   
      <div class="donHang">
        <div class="donHangTitle">
          <div class="dateTime">
            <span>${listDonHang[i].ngay} ${listDonHang[i].gio}</span>
            <span>#SP: ${sophieu}</span>
            <span class="">${vietHoaKyTuDau(listDonHang[i].trangthai)}</span>
          </div>
          <div class="khachHang">
              <span><i class="fa-solid fa-users"></i> ${vietHoaKyTuDau(
                listDonHang[i].khachhang
              )}</span>
          </div>
        </div>
        <table>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Số lượng</th>
          <th>Thành tiền</td>
          <th></td>
        </tr>
      `;
            break;
          }
        }

        //lấy item đơn hàng ra
        listDonHang.forEach(function (donhang, index) {
          if (
            donhang.sophieu == sophieu &&
            donhang.trangthai == "chờ" &&
            donhang.nhanvien == nhanVien
          ) {
            tongTien += Number(donhang.thanhtien);
            tongSoLuong += Number(donhang.soluong);
            content += `
          <tr>
            <td>
              <p class="tenSanPham">${vietHoaKyTuDau(donhang.tenhang)}</p>
              <p class="giaSanPham">${Number(donhang.gia).toLocaleString()}đ</p>
            </td>
            <td>
              <div class="soLuongSanPham">
                <input type="text" value="" id="ma" hidden>
                <input type="text" value="${
                  donhang.soluong
                }" id="soLuongSanPham${index}" readOnly>
                <div class="tangGiam none">
                  <i class="fa-solid fa-angle-up" onclick="tangSoLuong()"></i>
                  <i class="fa-solid fa-angle-down" onclick="giamSoLuong()"></i>
                </div>
              </div>
            </td>
            <td>
              <input type="text" name="" class="thanhTien" id="thanhTien" value="${Number(
                donhang.thanhtien
              ).toLocaleString()}" readOnly>
            </td>
            <td>
              <button type="button" class="xoaBan none" id="xoaBan"
                onclick="xoaItemPhieuBanHang('${sophieu}', ${index})">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </td>
          </tr>     
          `;
          }
        });

        content += `
          <tr>
            <td class="tongTien">Tổng cộng</td>
            <td class="tongSoLuong">${tongSoLuong.toLocaleString()}</td>
            <td class="tongTien">${tongTien.toLocaleString()}</td>
          </tr>
          <tr>
            <td colspan="4" class="optionThanhToan">
              <button class="thanhToan" onclick="thanhToanDonHang('${sophieu}', ${tongTien}, '${nhanVien}')">Thanh toán</button>
              <button class="xoaDonHang" onclick="xoaDonHang('${sophieu}', '${nhanVien}')">Xóa phiếu</button>
            </td>
          </tr> 

        </table>
      </div> 
      `;
      });
      // console.log(content)
      document.getElementById("showDonHang").innerHTML = content;
    } else {
      document.getElementById("showDonHang").innerHTML = "";
    }
  } else {
    return;
  }
}

//reset
function resetForm() {
  document.getElementById("formBanHang").reset();
  ngayThangNamSoPhieu();
  // ở số phiếu và khách hàng
  document.getElementById("khachHang").readOnly = false;
}

//function tăng số lượng
function tangSoLuong(id, gia, idthanhien) {
  let soLuong = Number(
    document.getElementById(id).value.replaceAll(/[, .]/g, "")
  );
  document.getElementById(id).value = (soLuong + 1).toLocaleString();

  let soLuongInput = Number(
    document.getElementById(id).value.replaceAll(/[, .]/g, "")
  );
  let thanhTien = Number(soLuongInput * gia);
  document.getElementById(idthanhien).value = thanhTien.toLocaleString();
}
//funtion giảm số lượng
function giamSoLuong(id, gia, idthanhien) {
  let soLuong = Number(document.getElementById(id).value);
  if ((soLuong = 1)) {
    document.getElementById(id).value = 1;
  } else {
    document.getElementById(id).value = (soLuong - 1).toLocaleString();
  }

  let soLuongInput = Number(
    document.getElementById(id).value.replaceAll(/[, .]/g, "")
  );
  let thanhTien = soLuongInput * gia;
  document.getElementById(idthanhien).value = thanhTien.toLocaleString();
  console.log(thanhTien);
}
//funtion onchange số lượng
function onChangeSoLuong(id, gia, idthanhtien) {
  let soLuong = Number(
    chiLaySoCuaChuoi(document.getElementById(id).value.replaceAll(/[, .]/g, ""))
  );
  if (soLuong == 0) {
    document.getElementById(id).value = 1;
    let thanhTien = 1 * gia;
    document.getElementById(idthanhtien).value = thanhTien.toLocaleString();
  } else {
    document.getElementById(id).value = soLuong.toLocaleString();
  }
  let thanhTien = soLuong * gia;
  document.getElementById(idthanhtien).value = thanhTien.toLocaleString();
}

//function bán hàng
function banHang(tenHang, gia, idsoluong) {
  let tatCaDonHang = [];
  //lấy dữ liệu từ local
  let tatCaDonHangLocal = JSON.parse(localStorage.getItem("tatcadonhang"));
  if (tatCaDonHangLocal != null) {
    tatCaDonHang = tatCaDonHangLocal;
  }
  let soPhieu = document.getElementById("soPhieu").value;
  let khachHang = document.getElementById("khachHang").value;
  let soLuong = Number(
    document.getElementById(idsoluong).value.replaceAll(/[, .]/g, "")
  );
  let thanhTien = Number(gia * soLuong);

  if (khachHang == "") {
    document.getElementById("tbKhachHang").style.color = "red";
  } else {
    document.getElementById("tbKhachHang").style.color = "purple";
    document.getElementById("tbSanPham").style.color = "purple";
    document.getElementById("sanPham").autofocus = true;

    //reset ô search sản phẩm
    document.getElementById("sanPham").value = "";
    //khóa ô khách hàng
    document.getElementById("khachHang").readOnly = true;
    let itemDonHang = new ItemDonHang(
      ngayThangNam,
      gio,
      soPhieu,
      khachHang,
      tenHang,
      gia,
      soLuong,
      thanhTien,
      nhanVien,
      trangThai
    );

    tatCaDonHang.unshift(itemDonHang);

    //lưu lên local store
    localStorage.setItem("tatcadonhang", JSON.stringify(tatCaDonHang));

    // console.log(tatCaDonHang);
    showListDongHang();
  }
}
//function tạo phiếu mới
function taoPhieuMoi() {
  document.getElementById("khachHang").readOnly = false;
  document.getElementById("khachHang").value = "";
  document.getElementById("sanPham").value = "";
  // let soPhieu = Number(document.getElementById("soPhieu").value.replaceAll(/[, .]/g, ""));
  // document.getElementById("soPhieu").value = (soPhieu + 1).toLocaleString();

  ngayThangNamSoPhieu();
  // //load lại giao diện
  // showListDongHang();
  // // //reaload lại trang
  // // location.reload();
}
// function xóa phiếu bán hàng
function xoaDonHang(sophieu, nhanvien) {
  let xaxNhanXoa = confirm("Bạn có chắc muốn xóa phiếu số " + sophieu + "?");
  if (xaxNhanXoa == true) {
    //lấy dữ liệu từ local
    let listDonHang = JSON.parse(localStorage.getItem("tatcadonhang"));
    for (let i = 0; i < listDonHang.length; i++) {
      if (
        listDonHang[i].sophieu == sophieu &&
        listDonHang[i].nhanvien == nhanvien
      ) {
        listDonHang[i].trangthai = "xóa";
      }
    }

    //lưu dữ liệu lại vào local
    localStorage.setItem("tatcadonhang", JSON.stringify(listDonHang));
    //nếu xóa phiêu mới tạo thì reset input số phiếu
    let soPhieu = Number(
      document.getElementById("soPhieu").value.replaceAll([/[, .]/g, ""])
    );
    if (soPhieu == sophieu) {
      document.getElementById("soPhieu").value = (soPhieu + 1).toLocaleString();
      document.getElementById("khachHang").readOnly = false;
      document.getElementById("khachHang").value = "";
    }

    //load lại giao diện
    showListDongHang();
  } else {
    return;
  }
}

//function xóa item phiếu bán hàng
function xoaItemPhieuBanHang(sophieu, index) {
  alert("Số phiếu" + sophieu + "index" + index);
}

// function thanh toán
function thanhToanDonHang(sophieu, sotien, nhanvien) {
  let xacNhanThanhToan = confirm(
    "Bạn có chắc đã thu: " +
      sotien.toLocaleString() +
      "đ" +
      " của phiếu số " +
      sophieu +
      "?"
  );
  if (xacNhanThanhToan == true) {
    //lấy dữ liệu từ local
    let listDonHang = JSON.parse(localStorage.getItem("tatcadonhang"));
    listDonHang.forEach((donhang) => {
      if (
        donhang.sophieu == sophieu &&
        donhang.trangthai == "chờ" &&
        donhang.nhanvien == nhanvien
      ) {
        donhang.trangthai = "thanh toán";
      }
    });
    //lưu dữ liệu lại vào local
    localStorage.setItem("tatcadonhang", JSON.stringify(listDonHang));
    //nếu thanh toán phiêu mới tạo thì reset input số phiếu
    let soPhieu = Number(
      document.getElementById("soPhieu").value.replaceAll([/[, .]/g, ""])
    );
    if (soPhieu == sophieu) {
      document.getElementById("soPhieu").value = (soPhieu + 1).toLocaleString();
      document.getElementById("khachHang").readOnly = false;
      document.getElementById("khachHang").value = "";
    }

    // load lại giao diện
    showListDongHang();
  } else {
    return;
  }
}
