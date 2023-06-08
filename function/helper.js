
// function mở form
function moForm() {
  document.getElementById("mainForm").classList.toggle("height360");
}

// function tắt form
function tatForm() {
  document.getElementById("mainForm").classList.toggle("height360");
  setThongBao("tbDanhMuc", "tbTenMon", "tbGiaMon", "tbKetQua");

}

//set icon purple + thông báo ""
function setAllDone(iddanhmuc, idten, idgiamon) {
  document.getElementById(iddanhmuc).style.color = "purple";
  document.getElementById(idten).style.color = "purple";
  document.getElementById(idgiamon).style.color = "purple";
}


// function set thông báo
function setThongBao(tbdanhmuc, tbten, tbgia, tbketqua){
  document.getElementById(tbdanhmuc).style.color = "purple";
  document.getElementById(tbten).style.color = "purple";
  document.getElementById(tbgia).style.color = "purple";
  document.getElementById(tbketqua).innerHTML = "";
  document.getElementById("formTaoSanPham").reset();
}

//function reset thông báo khi click vào input
function clickInput(){
  document.getElementById("tbKetQua").innerHTML = "";
}

//funtion viết hoa các ký tự đầu tiên trong chuỗi
function vietHoaKyTuDau(str) {
  let words = str.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(' ');
}

// nút tạo sản phẩm
function nutTatMoForm() {
  setThongBao("tbDanhMuc", "tbTenMon", "tbGiaMon", "tbKetQua");
  document.getElementById("button").innerHTML = `
  <button id="themSanPham" onclick="themMon()" type="button">
    <i class="fa-solid fa-circle-plus"></i>
    Thêm
  </button>
`;
  document.getElementById("tbKetQua").innerHTML = "";
}

//nút tắt form tạo sản phẩm
function nutTatMoForm() {
  // moMenu();
  tatForm();
}

//Function DOM
function domString(id){
  return document.getElementById(id).value;    
}
function domNumber(id){
  return Number(document.getElementById(id).value.replaceAll(/[.,]/g, ""));    
}


// chức năng valid
// kiểm tra rỗng
function checkRong(id, idTb) {
  let danhMuc = document.getElementById(id).value;
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
  let chiLaySo = /[0-9]/g;
  let number = "";
  let checkInput = n.match(chiLaySo);
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
    let nameA = a.toLowerCase();
    let nameB = b.toLowerCase();
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
    let nameA = a.tenmon.toLowerCase();
    let nameB = b.tenmon.toLowerCase();
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
    let nameA = a.tenmon.toLowerCase();
    let nameB = b.tenmon.toLowerCase();
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
    let nameA = Number(a.giamon.replaceAll(/[, .]/g, ""));
    let nameB = Number(b.giamon.replaceAll(/[, .]/g, ""));
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
    let nameA = Number(a.giamon.replaceAll(/[, .]/g, ""));
    let nameB = Number(b.giamon.replaceAll(/[, .]/g, ""));
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

// function bỏ dấu tiếng việt
function boDauTiengViet(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
//function chỉ lấy số của chuỗi
function chiLaySoCuaChuoi(str) {
  let numberRegex = /\d+/g;
  let numbers = str.match(numberRegex);
  let result = numbers ? numbers.join("") : "";
  return result;
}


