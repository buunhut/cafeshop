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
  //lấy dữ liệu input
  var danhMuc = document.getElementById("danhMuc").value;
  var tenMon = document.getElementById("tenMon").value;
  var giaMon = document.getElementById("giaMon").value.replaceAll(/[.,]/g, '');

  // valid
  valid = true;
  valid = 
  checkRong("danhMuc", "tbDanhMuc") &
  checkRong("tenMon", "tbTenMon") &
  checkRong("giaMon", "tbGiaMon");

  if (!valid) {
    document.getElementById("tbKetQua").innerHTML =
      "<h3 style='color:red'>Lỗi :(</h3>";
    return;
  } else {
    document.getElementById("tbKetQua").innerHTML =
    "";

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

    renderGiaoDien();

    // lưu vào local
    localStorage.setItem("caydanhmuc", JSON.stringify(cayDanhMuc));
    // lưu vào local
    localStorage.setItem("listsanpham", JSON.stringify(listSanPham));
    setValueInput("", "", "");

    document.getElementById("tbKetQua").innerHTML =
    "<h3 style='color:purple'>Đã lưu :) </h3>";

  }
}

//render giao diện
function renderGiaoDien() {
  // hiển thị ra giao hiện
  if (cayDanhMuc.length >= 1) {
    document.getElementById("listTitle").classList.remove("none");
    document.getElementById("listKieu1").classList.remove("none");
    document.getElementById("listKieu2").classList.remove("none");
  } else {
    document.getElementById("listTitle").classList.add("none");
    document.getElementById("listKieu1").classList.add("none");
    document.getElementById("listKieu2").classList.add("none");
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
    content += `
    <tr>
      <td rowspan="${dem}">${danhMucitem}</td>
    </tr> 
  `;
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
`;
    var stt = 1;
    listSanPham.forEach(function (monItem, index) {
      // tìm được vị trí món cần lấy
      if (danhMucitem == monItem.danhmuc) {
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
}

// reset input
function setValueInput(danhmuc, ten, gia) {
  document.getElementById("danhMuc").value = danhmuc;
  document.getElementById("tenMon").value = ten;
  document.getElementById("giaMon").value = gia;
}

//valid checkRong
function checkRong(id, idTb) {
  var danhMuc = document.getElementById(id).value;
  if (danhMuc == "") {
    document.getElementById(idTb).style.color = "red";
    return false;
  } else {
    document.getElementById(idTb).style.color = "purple";
    return true;
  }
}

// onchange định dạng số
function dinhDangSo(id){
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