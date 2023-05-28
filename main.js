// LỚP OBJECT
var LopMon = function (_danhmuc, _tenmon, _giamon) {
  this.danhmuc = _danhmuc;
  this.tenmon = _tenmon;
  this.giamon = _giamon;
};

// THÊM MÓN
var cayDanhMuc = [];
// lấy dữ liệu từ local
var cayDanhMucLocal = JSON.parse(localStorage.getItem("caydanhmuc"));
if (cayDanhMucLocal != null) {
  cayDanhMuc = cayDanhMucLocal;
}

var listSanPham = [];
// lấy dữ liệu từ local
var listSanPhamLocal = JSON.parse(localStorage.getItem("listsanpham"));
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
    document.getElementById("listTitle").classList.add("none");
    document.getElementById("listKieu1").classList.add("none");
    document.getElementById("listKieu2").classList.add("none");
  } else {
    document.getElementById("listTitle").classList.remove("none");
    document.getElementById("listKieu1").classList.remove("none");
    document.getElementById("listKieu2").classList.remove("none");
  }

  var content = "";
  cayDanhMuc.forEach(function (danhMucitem) {
    // lấy đc danh mục ra rồi
    var dem = 1;
    for (var n = 0; n < listSanPham.length; n++) {
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

  // hiển thị ra giao hiện kiều 2
  var content = "";
  cayDanhMuc.forEach(function (danhMucitem) {
    var dem = 1;
    for (var n = 0; n < listSanPham.length; n++) {
      if (danhMucitem == listSanPham[n].danhmuc) {
        dem++;
      }
    }
    if (dem > 1) {
      content += `
    <tr>
      <th colspan="4">${danhMucitem}</th>
    </tr> 
    <tr>
      <th>Stt</th>
      <th>Tên món</th>
      <th>Giá</th>
      <th><i class="fa-solid fa-gear"></i></th>
    </tr>
    <tbody id="listSanPham2">

  `;
    }

    var stt = 1;
    listSanPham.forEach(function (monItem, index) {
      // tìm được vị trí món cần lấy
      if (monItem.danhmuc == danhMucitem) {
        content += `
            <tr>
              <td class="number">${stt++}</td>
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

    `
    </tbody>
    `;
  });
  document.getElementById("listSanPham2").innerHTML = content;
}

// xóa sản phẩm
function xoaSanPham(index, danhmuc, ten) {
  var xacNhan = confirm("Bạn có chắc muốn xóa?");
  if (xacNhan == true) {
    listSanPham.splice(index, 1);

    // tìm vị trí danh mục
    var viTri = -1;
    cayDanhMuc.forEach(function (item, index) {
      if (item == danhmuc) {
        viTri = index;
      }
    });

    var count = 0;
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

  //set icon black + thông báo ""
  setAllDone("tbDanhMuc", "tbTenMon", "tbGiaMon");
  document.getElementById("tbKetQua").innerHTML = "<h3 style='color:purple;'>Đã xóa thành công :)</h3>"
}

//  sửa sản phẩm
function suaSanPham(index) {
  // lấy dữ liệu sản phẩm cần sửa
  var danhmuc = listSanPham[index].danhmuc;
  var ten = listSanPham[index].tenmon;
  var gia = Number(listSanPham[index].giamon).toLocaleString();
  // gán dữ liệu sản phầm cần sửa vào ô input
  setValueInput(danhmuc, ten, gia);
  //đóng nút thêm
  document.getElementById("button").innerHTML = `
  <button id="suaSanPham" onclick="capNhatMon('${index}')" type="button">Cập nhật</button>
  `;
  //set icon black + thông báo ""
  setAllDone("tbDanhMuc", "tbTenMon", "tbGiaMon");
  document.getElementById("tbKetQua").innerHTML = "";
}

// cập nhật sản phẩm
function capNhatMon(index) {
  // var viTri = index;
  // lấy dữ liệu input
  layDuLieuChinhSua(index);
}

// lấy dữ liệu 
function layDuLieuInput() {
  //lấy dữ liệu input
  var danhMuc = document.getElementById("danhMuc").value;
  var tenMon = document.getElementById("tenMon").value;
  var giaMon = document.getElementById("giaMon").value.replaceAll(/[.,]/g, "");

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
    for (var i = 0; i < listSanPham.length; i++) {
      if (tenMon == listSanPham[i].tenmon) {
        document.getElementById("tbTenMon").style.color = "red";
        document.getElementById("tbKetQua").innerHTML =
          "<h3 style='color:red'>Lỗi, Sản phẩm đã có rồi :( </h3>";
        return;
      }
    }

    if (cayDanhMuc.length === 0) {
      cayDanhMuc.push(danhMuc);
      var mon = new LopMon(danhMuc, tenMon, giaMon);
      listSanPham.push(mon);
    } else {
      var count = 0;
      for (var i = 0; i < cayDanhMuc.length; i++) {
        if (danhMuc != cayDanhMuc[i]) {
          count++;
          if (count == cayDanhMuc.length) {
            cayDanhMuc.push(danhMuc);
          }
        }
      }
      var mon = new LopMon(danhMuc, tenMon, giaMon);
      listSanPham.push(mon);
    }

    document.getElementById("tbKetQua").innerHTML =
      "<h3 style='color:purple'>Đã tạo thành công :) </h3>";

    setValueInput("", "", "");
  }
}

//lấy dữ liệu lúc chỉnh sửa
function layDuLieuChinhSua(index) {
  //lấy dữ liệu input
  var danhMuc = document.getElementById("danhMuc").value;
  var tenMon = document.getElementById("tenMon").value;
  var giaMon = document.getElementById("giaMon").value.replaceAll(/[.,]/g, "");

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
    var countSp = 0;
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
        var mon = new LopMon(danhMuc, tenMon, giaMon);
        listSanPham[index] = mon;
      } else {
        var count = 0;
        for (var i = 0; i < cayDanhMuc.length; i++) {
          if (danhMuc != cayDanhMuc[i]) {
            count++;
            if (count == cayDanhMuc.length) {
              cayDanhMuc.push(danhMuc);
            }
          }
        }
        var mon = new LopMon(danhMuc, tenMon, giaMon);
        listSanPham[index] = mon;
        var countSp = 0;
        for (var i = 0; i < listSanPham.length; i++) {
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




          setAllDone("tbDanhMuc", "tbTenMon", "tbGiaMon")
          document.getElementById("tbKetQua").innerHTML =
            "<h3 style='color:purple'>Cập nhật thành công :) </h3>";
            

          //render
          renderGiaoDien();
          setValueInput("", "", "");
          document.getElementById("button").innerHTML = `
            <button id="themSanPham" onclick="themMon()" type="button">Thêm</button>
          `;
        }
      }
    }
  }
}

// reset input
function setValueInput(danhmuc, ten, gia) {
  document.getElementById("danhMuc").value = danhmuc;
  document.getElementById("tenMon").value = ten;
  document.getElementById("giaMon").value = gia;
}

//set icon black + thông báo ""
function setAllDone(iddanhmuc, idten, idgiamon) {
  document.getElementById(iddanhmuc).style.color = "black";
  document.getElementById(idten).style.color = "black";
  document.getElementById(idgiamon).style.color = "black";
}

//valid checkRong
function checkRong(id, idTb) {
  var danhMuc = document.getElementById(id).value;
  if (danhMuc == "") {
    document.getElementById(idTb).style.color = "red";
    return false;
  } else {
    document.getElementById(idTb).style.color = "black";
    return true;
  }
}

// onchange định dạng số
function dinhDangSo(id) {
  n = document.getElementById(id).value;
  //chỉ lấy số từ input
  var chiLaySo = /[0-9]/g;
  var number = "";
  var checkInput = n.match(chiLaySo);
  if (checkInput) {
    checkInput.forEach(function (item) {
      number += item;
      checkInput = number;
    });
    checkInput = checkInput.toString();
  }
  document.getElementById(id).value = Number(checkInput).toLocaleString();
  return checkInput;
}

//
