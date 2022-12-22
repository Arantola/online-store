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

//
function cardNumber_format(value) {
  var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  var matches = v.match(/\d{4,16}/g);
  var match = matches && matches[0] || ''
  var parts = []
  for (i=0, len=match.length; i<len; i+=4) {
    parts.push(match.substring(i, i+4))
  }
  if (parts.length) {
    return parts.join(' ')
  } else {
    return value
  }
}
onload = function() {
  document.getElementById('cardNumber').oninput = function() {
    this.value = cardNumber_format(this.value)
  }
  document.getElementById('cardData').oninput = function() {
    this.value = cardData_format(this.value)
  }
}
function cardNumber(event) {
    var code = (event.which) ? event.which : event.keyCode;

    if ((code < 48 || code > 57) && (code > 31)) {
        return false;
    }
}

//
function cardData_format(value) {
  var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
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
    return parts.join('/')
  } else {
    return value
  }
}
function cardData(event) {
  if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;
}

function securityCode(event) {
  if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;
}