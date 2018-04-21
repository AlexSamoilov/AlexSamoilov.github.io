var myNodelist = document.getElementsByTagName('li');
for (var i = 0; i < myNodelist.length; i++) {
  createCloseButton(myNodelist[i]);
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("The field dont't be empty!");
  } 
  else {
    var li = document.createElement("li");
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    document.getElementById('myUL').appendChild(li);

    createCloseButton(li);

    document.getElementById('myInput').value = "";
  }
}

function createCloseButton(node) {
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  node.appendChild(span);
  span.onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}