// tắt mở thanh menu
//function tắt menu
function tatMenu() {
  document.getElementById("menu").classList.add("none");
  document.getElementById("nutTaoSanPham").classList.add("none");
  document.getElementById("nutBanHang").classList.add("none");
  document.getElementById("nutChotCa").classList.add("none");
  document.getElementById("nutBaoCao").classList.add("none");
}

//function mở thanh menu
function moMenu() {
  document.getElementById("menu").classList.remove("none");
  document.getElementById("nutTaoSanPham").classList.remove("none");
  document.getElementById("nutBanHang").classList.remove("none");
  document.getElementById("nutChotCa").classList.remove("none");
  document.getElementById("nutBaoCao").classList.remove("none");
}

// function mở form
function moForm() {
  document.getElementById("mainForm").classList.remove("none");
}

// function tắt form
function tatForm() {
  document.getElementById("mainForm").classList.add("none");
}

// chức năng valid
// kiểm tra rỗng
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

// định dạng số
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

// chức năng sort
// sort danh mục
function sortDanhMucAz() {
  cayDanhMuc.sort();
  renderGiaoDien();
  document.getElementById("danhMucAz").classList.add("none");
  document.getElementById("danhMucZa").classList.remove("none");
}
function sortDanhMucZa() {
  cayDanhMuc.sort((a, b) => {
    var nameA = a.toLowerCase();
    var nameB = b.toLowerCase();
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  });
  renderGiaoDien();
  document.getElementById("danhMucAz").classList.remove("none");
  document.getElementById("danhMucZa").classList.add("none");
}
//sort sản phẩm
function sortSanPhamAz() {
  listSanPham.sort((a, b) => {
    var nameA = a.tenmon.toLowerCase();
    var nameB = b.tenmon.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  renderGiaoDien();
  document.getElementById("sanPhamAz").classList.add("none");
  document.getElementById("sanPhamZa").classList.remove("none");
}
function sortSanPhamZa() {
  listSanPham.sort((a, b) => {
    var nameA = a.tenmon.toLowerCase();
    var nameB = b.tenmon.toLowerCase();
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  });
  renderGiaoDien();
  document.getElementById("sanPhamAz").classList.remove("none");
  document.getElementById("sanPhamZa").classList.add("none");
}
// sort giá
function sortGiaAz() {
  listSanPham.sort((a, b) => {
    var nameA = a.giamon.toLowerCase();
    var nameB = b.giamon.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  renderGiaoDien();
  document.getElementById("giaAz").classList.add("none");
  document.getElementById("giaZa").classList.remove("none");
}
function sortGiaZa() {
  listSanPham.sort((a, b) => {
    var nameA = a.giamon.toLowerCase();
    var nameB = b.giamon.toLowerCase();
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  });
  renderGiaoDien();
  document.getElementById("giaAz").classList.remove("none");
  document.getElementById("giaZa").classList.add("none");
}
