// LỚP OBJECT
let LopMon = function (_danhmuc, _tenmon, _giamon, _nguoidung) {
  this.danhmuc = _danhmuc;
  this.tenmon = _tenmon;
  this.giamon = _giamon;
  this.nguoidung = _nguoidung;
};

// THÊM MÓN
let cayDanhMuc = [];
// lấy dữ liệu từ local
let cayDanhMucLocal = JSON.parse(localStorage.getItem("caydanhmuc"));
if (cayDanhMucLocal != null) {
  cayDanhMuc = cayDanhMucLocal;
}

let listSanPham = [];
// lấy dữ liệu từ local
let listSanPhamLocal = JSON.parse(localStorage.getItem("listsanpham"));
if (listSanPhamLocal != null) {
  listSanPham = listSanPhamLocal;
}

// render giao diện
renderGiaoDien();

function themMon() {
  layDuLieuInput();

  renderGiaoDien();

  // lưu vào local
  localStorage.setItem("caydanhmuc", JSON.stringify(cayDanhMuc));
  // lưu vào local
  localStorage.setItem("listsanpham", JSON.stringify(listSanPham));
}

//render giao diện
function renderGiaoDien() {
  // hiển thị ra giao hiện
  if (listSanPham.length < 1) {
    document.getElementById("mainList").classList.add("none");
  } else {
    document.getElementById("mainList").classList.remove("none");
  }

  let content = "";
  cayDanhMuc.forEach(function (danhMucitem) {
    // lấy đc danh mục ra rồi
    let dem = 1;
    for (let n = 0; n < listSanPham.length; n++) {
      if (danhMucitem == listSanPham[n].danhmuc) {
        dem++;
      }
    }
    if (dem > 1) {
      content += `
      <tr>
        <td rowspan="${dem}">${danhMucitem}</td>
      </tr> 
    `;
    }
    listSanPham.forEach(function (monItem, index) {
      // tìm được vị trí món cần lấy
      if (danhMucitem == monItem.danhmuc) {
        content += `
          <tr>
            <td>${monItem.tenmon}</td>
            <td class="number">${Number(monItem.giamon).toLocaleString()}</td>
            <td>
              <button onclick="suaSanPham('${index}')"><i class="fa-regular fa-pen-to-square"></i></button>
              <button onclick="xoaSanPham('${index}', '${monItem.danhmuc}', '${monItem.tenmon}')"><i class="fa-solid fa-trash-can"></i></button>
            </td>
          </tr>            
        `;
      }
    });
  });
  document.getElementById("listSanPham").innerHTML = content;

}

// xóa sản phẩm
function xoaSanPham(index, danhmuc, ten) {
  let xacNhan = confirm("Bạn có chắc muốn xóa " + vietHoaKyTuDau(ten) + " ?");
  if (xacNhan == true) {
    listSanPham.splice(index, 1);

    // tìm vị trí danh mục
    let viTri = -1;
    cayDanhMuc.forEach(function (item, index) {
      if (item == danhmuc) {
        viTri = index;
      }
    });

    let count = 0;
    listSanPham.forEach(function (item) {
      if (item.danhmuc == danhmuc) {
        count++;
      }
    });
    if (count == 0) {
      cayDanhMuc.splice(viTri, 1);
    }
  }

  renderGiaoDien();
  // lưu vào local
  localStorage.setItem("caydanhmuc", JSON.stringify(cayDanhMuc));
  // lưu vào local
  localStorage.setItem("listsanpham", JSON.stringify(listSanPham));

  //set icon purple + thông báo ""
  setAllDone("tbDanhMuc", "tbTenMon", "tbGiaMon");
  document.getElementById("tbKetQua").innerHTML =
    "<h3 style='color:purple;'>Đã xóa thành công :)</h3>";
}

// nút sửa sản phẩm
function suaSanPham(index) {
  // tắt nút tạo sản phẩm
  // tatMenu();
  // mở form tạo sản phẩm
  document.getElementById("mainForm").classList.remove("none");

  // lấy dữ liệu sản phẩm cần sửa
  let danhmuc = listSanPham[index].danhmuc.toLowerCase();
  let ten = listSanPham[index].tenmon.toLowerCase();
  let gia = Number(listSanPham[index].giamon).toLocaleString();
  // gán dữ liệu sản phầm cần sửa vào ô input
  setValueInput(danhmuc, ten, gia, "");
  //đóng nút thêm
  document.getElementById("button").innerHTML = `
  <button id="suaSanPham" onclick="capNhatMon('${index}')" type="button">
    <i class="fa-solid fa-floppy-disk"></i>
    Lưu
  </button>
  `;
  //set icon purple + thông báo ""
  setAllDone("tbDanhMuc", "tbTenMon", "tbGiaMon");
  document.getElementById("tbKetQua").innerHTML = "";
}

// cập nhật sản phẩm
function capNhatMon(index) {
  // lấy dữ liệu input
  layDuLieuChinhSua(index);
}

// lấy dữ liệu
function layDuLieuInput() {
  //lấy dữ liệu input
  let danhMuc = document.getElementById("danhMuc").value.toLowerCase();
  let tenMon = document.getElementById("tenMon").value.toLowerCase();
  let giaMon = document.getElementById("giaMon").value.replaceAll(/[.,]/g, "");
  let nguoiDung = "admin";

  // valid
  valid = true;
  valid =
    checkRong("danhMuc", "tbDanhMuc") &
    checkRong("tenMon", "tbTenMon") &
    checkRong("giaMon", "tbGiaMon");

  if (!valid) {
    document.getElementById("tbKetQua").innerHTML =
      "<h3 style='color:red'>Lỗi, Không được bỏ trống :(</h3>";
    return;
  } else {
    document.getElementById("tbKetQua").innerHTML = "";

    // ktra xem sản phẩm có chưa, nếu có thì ko tạo nữa
    for (let i = 0; i < listSanPham.length; i++) {
      if (tenMon == listSanPham[i].tenmon) {
        document.getElementById("tbTenMon").style.color = "red";
        document.getElementById("tbKetQua").innerHTML =
          "<h3 style='color:red'>Lỗi, Sản phẩm đã có rồi :( </h3>";
        return;
      }
    }

    if (cayDanhMuc.length === 0) {
      cayDanhMuc.push(danhMuc);
      let mon = new LopMon(danhMuc, tenMon, giaMon, nguoiDung);
      listSanPham.push(mon);
    } else {
      let count = 0;
      for (let i = 0; i < cayDanhMuc.length; i++) {
        if (danhMuc != cayDanhMuc[i]) {
          count++;
          if (count == cayDanhMuc.length) {
            cayDanhMuc.push(danhMuc);
          }
        }
      }
      let mon = new LopMon(danhMuc, tenMon, giaMon, nguoiDung);
      listSanPham.push(mon);
    }

    document.getElementById("tbKetQua").innerHTML =
      "<h3 style='color:purple'>Đã tạo thành công :) </h3>";

    setValueInput("", "", "", "");
  }
}

//lấy dữ liệu lúc chỉnh sửa
function layDuLieuChinhSua(index) {
  //lấy dữ liệu input
  let danhMuc = document.getElementById("danhMuc").value.toLowerCase();
  let tenMon = document.getElementById("tenMon").value.toLowerCase();
  let giaMon = document.getElementById("giaMon").value.replaceAll(/[.,]/g, "");
  let nguoiDung = "admin";

  // valid
  valid = true;
  valid =
    checkRong("danhMuc", "tbDanhMuc") &
    checkRong("tenMon", "tbTenMon") &
    checkRong("giaMon", "tbGiaMon");

  if (!valid) {
    document.getElementById("tbKetQua").innerHTML =
      "<h3 style='color:red'>Lỗi, Không được bỏ trống :(</h3>";
    return;
  } else {
    document.getElementById("tbKetQua").innerHTML = "";

    // ktra xem sản phẩm có chưa, đếm sản phẩm đã có
    let countSp = 0;
    listSanPham.forEach(function (item, index) {
      if (item.tenmon == tenMon) {
        countSp++;
      }
    });
    if (countSp > 1) {
      document.getElementById("tbKetQua").innerHTML =
        "<h3 style='color:red'>Trùng tên sản phẩm :(</h3>";
      return;
    } else {
      if (cayDanhMuc.length === 0) {
        cayDanhMuc.push(danhMuc);
        let mon = new LopMon(danhMuc, tenMon, giaMon, nguoiDung);
        listSanPham[index] = mon;
      } else {
        let count = 0;
        for (let i = 0; i < cayDanhMuc.length; i++) {
          if (danhMuc != cayDanhMuc[i]) {
            count++;
            if (count == cayDanhMuc.length) {
              cayDanhMuc.push(danhMuc);
            }
          }
        }
        let mon = new LopMon(danhMuc, tenMon, giaMon, nguoiDung);
        listSanPham[index] = mon;
        let countSp = 0;
        for (let i = 0; i < listSanPham.length; i++) {
          if (listSanPham[i].tenmon == tenMon) {
            countSp++;
          }
        }
        if (countSp >= 2) {
          document.getElementById("tbKetQua").innerHTML =
            "<h3 style='color:red'>Trùng tên sản phẩm :(</h3>";
          return;
        } else {
          // lưu vào local
          localStorage.setItem("caydanhmuc", JSON.stringify(cayDanhMuc));
          // lưu vào local
          localStorage.setItem("listsanpham", JSON.stringify(listSanPham));

          setAllDone("tbDanhMuc", "tbTenMon", "tbGiaMon");
          document.getElementById("tbKetQua").innerHTML =
            "<h3 style='color:purple'>Cập nhật thành công :) </h3>";

          //render
          renderGiaoDien();
          setValueInput("", "", "", "");
          document.getElementById("button").innerHTML = `
            <button id="themSanPham" onclick="themMon()" type="button">
              <i class="fa-solid fa-circle-plus"></i>
              Thêm
            </button>
          `;
        }
      }
    }
  }
}

// reset input
function setValueInput(danhmuc, ten, gia, tim) {
  document.getElementById("danhMuc").value = danhmuc;
  document.getElementById("tenMon").value = ten;
  document.getElementById("giaMon").value = gia;
  document.getElementById("timKiem").value = tim;
}


// tìm kiếm sản phảm
function timKiemSanPham() {
  let str = document.getElementById("timKiem").value.toLowerCase();
  let tenCanTim = boDauTiengViet(str);
  let dataTimDuoc = listSanPham.filter(function (item) {
    return boDauTiengViet(item.tenmon).includes(tenCanTim);
  });
  // console.log(dataTimDuoc);

  if (dataTimDuoc.length < 1) {
    // document.getElementById("mainList").classList.add("none");
    // document.getElementById("listKieu1").classList.add("none");
    // document.getElementById("listKieu2").classList.add("none");
    document.getElementById("listSanPham").innerHTML = "";
  } else {
    document.getElementById("mainList").classList.remove("none");
    // document.getElementById("listKieu1").classList.remove("none");
    // document.getElementById("listKieu2").classList.remove("none");
  }

  let content = "";
  cayDanhMuc.forEach(function (danhMucitem) {
    // lấy đc danh mục ra rồi
    let dem = 1;
    for (let n = 0; n < dataTimDuoc.length; n++) {
      if (danhMucitem == dataTimDuoc[n].danhmuc) {
        dem++;
      }
    }
    if (dem > 1) {
      content += `
      <tr>
        <td rowspan="${dem}">${danhMucitem}</td>
      </tr> 
    `;
    }
    dataTimDuoc.forEach(function (monItem, index) {
      // tìm được vị trí món cần lấy
      if (danhMucitem == monItem.danhmuc) {
        content += `
          <tr>
            <td>${monItem.tenmon}</td>
            <td class="number">${Number(monItem.giamon).toLocaleString()}</td>
            <td>
              <button onclick="suaSanPham('${index}')"><i class="fa-regular fa-pen-to-square"></i></button>
              <button onclick="xoaSanPham('${index}', '${
          monItem.danhmuc
        }')"><i class="fa-solid fa-trash-can"></i></button>
            </td>
          </tr>            
        `;
      }
    });
  });
  document.getElementById("listSanPham").innerHTML = content;
}

