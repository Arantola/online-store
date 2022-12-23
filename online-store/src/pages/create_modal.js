var modal = document.querySelector(".modal-container");

var btn = document.getElementById("buyBtn");

var span = document.querySelector(".close");

btn.onclick = function() {
  modal.style.display = "block";
}


span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let valName = false;
let valPhone = false;
let valAddress = false;
let valEmail = false;
let valNumber = false;
let valData = false;
let valSecurity = false;

onload = function() {
  document.getElementById('inpName').oninput = function() {
    this.value = inName_format(this.value)
  }
  document.getElementById('inpPhone').oninput = function() {
    this.value = inpPhone_format(this.value)
  }
  document.getElementById('inpAddress').oninput = function() {
    this.value = inpAddress_format(this.value)
  }
  document.getElementById('inpEmail').oninput = function() {
    this.value = inpEmail_format(this.value)
  }

  document.getElementById('cardNumber').oninput = function() {
    this.value = cardNumber_format(this.value)
  }
  document.getElementById('cardData').oninput = function() {
    this.value = cardData_format(this.value)
  }
  document.getElementById('cardSecurity').oninput = function() {
    this.value = cardSecurity_format(this.value)
  }
}

function inName_format(value) {
  let v = value
  let parts = v.split(' ')
  let note =document.querySelectorAll('.input-error')[0]
  if (parts[1]){
    if (parts[0].length <= 3 || parts[1].length <= 3) {
      note.style.display = 'block';
      valName = false;
    } else {
      note.style.display = 'none';
      valName = true;
    }
  }
  btnActive()
  return value
}
function Name(event) {
  var code = event.keyCode;
  if ((code < 65 || code > 90) && (code < 97 || code > 122) && code !== 32) {
    event.returnValue = false
  }
}

function inpPhone_format(value) {
  let v = value
  let note = document.querySelectorAll('.input-error')[1]
  if (v.length <= 9){
    note.style.display = 'block';
    valPhone = false;
  } else {
    note.style.display = 'none';
    valPhone = true;
  }
  if (value[0] !== '+' && value.length > 0) {
    return '+' + value
  }
  btnActive()
  return value
}
function Phone(event) {
  var code = event.keyCode;

  if (code < 48 || code > 57) event.returnValue = false
}

function inpAddress_format(value) {
  let v = value
  let parts = v.split(' ')
  let note =document.querySelectorAll('.input-error')[2]
  if (parts[2]){
    if (parts[0].length <= 5 || parts[1].length <= 5 || parts[2].length <= 5) {
      note.style.display = 'block';
      valAddress = false;
    } else {
      note.style.display = 'none';
      valAddress = true;
    }
  }
  btnActive()
  return value
}

function inpEmail_format(value) {
  let v = value
  let parts = v.split(/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/)
  let note =document.querySelectorAll('.input-error')[3]
  if (!(parts[5])){
    note.style.display = 'block';
    valEmail = false;
  } else {
    note.style.display = 'none';
    valEmail = true;
  }
  btnActive()
  return value
}

function cardNumber_format(value) {
  var v = value.replace(/[^0-9]/gi, '')
  var matches = v.match(/\d{4,16}/g);
  var match = matches && matches[0] || ''
  var parts = []
  for (i=0, len=match.length; i<len; i+=4) {
    parts.push(match.substring(i, i+4))
  }
  if (parts.length) {
    if(parts.join('').length == 16){
      valNumber = true
    } else {
      valNumber = false
    }
    btnActive()
    return parts.join(' ')
  } else {
    return value
  }
}

function cardNumber(event) {
  if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false
}

function cardData_format(value) {
  var v = value.replace(/[^0-9]/gi, '')
  var matches = v.match(/\d{2,4}/g);
  var match = matches && matches[0] || ''
  var parts = []
  for (i=0, len=match.length; i<len; i+=2) {
    parts.push(match.substring(i, i+2))
  }
  
  if (parts.length) {
    if(parts[0] > 12) {
      parts.splice(0,1)
    }
    // if(parts[1] > 32) {
    //   parts.splice(1,1)
    // }
    if(parts.join('').length == 4){
      valData = true
    } else {
      valData = false
    }
    btnActive()
    return parts.join('/')
  } else {
    return value
  }
}
function cardData(event) {
  if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;
}

function cardSecurity_format(value) {
  if (value.length == 3) {
    valSecurity = true
  } else {
    valSecurity = false
  }
  btnActive()
  return value
}
function securityCode(event) {
  if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;
}

function btnActive() {
  if (valName && valPhone && valAddress && valEmail && valNumber && valData && valSecurity) {
    document.querySelector('.order-btn').classList.add("active");
  } else {
    document.querySelector('.order-btn').classList.remove("active");
  }
}
