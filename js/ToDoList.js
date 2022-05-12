var input = document.getElementById("userInput");
var inputRemove = document.getElementById("ListElement");
var list = document.getElementById("MyList")
var I = 0;


input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    add(input.value)
    input.value = "";
    HideList();

  }
})

function add(Text) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  let checker = document.createElement("input");
  let text = document.createElement("a");
  I = I + 1;

  a.classList.add("RemoveElement");
  checker.setAttribute("type", "checkbox");
  checker.setAttribute("class", "checkbox")
  a.innerText = " X - ";
  a.setAttribute("onclick", "MyRemove(this)")
  text.innerText = I + ' | ' + Text;

  li.appendChild(checker)
  li.appendChild(a);
  li.appendChild(text);
  list.appendChild(li);

}

function MyRemove(el) {
  const parent = el.parentNode;
  const checkbox = parent.children[0];
  if (checkbox.checked) {
    parent.remove();
  } else {
    alert("Du musst erst die Checkbox Aktivieren!")
  }
}

function DelAllTrue() {
  const value = list.children.length;

  for (let i = value; i > 0; i--) {
    const RemObj = list.children[i - 1].children[0];
    if (RemObj.checked) {
      MyRemove(RemObj)
    }
  }
}

function DelAll() {
  let value = list.children.length;
  if (value === 0) {
    alert("Keine Elemente zum Löschen vorhanden!")
  } else {
    for (let i = value; i > 0; i--) {
      const RemObj = list.children[i - 1].remove();
    }
  }
  HideList();
}

function HideList() {
  if (list.children.length === 0) {
    list.style.display = "none";
  } else {
    list.style.display = "block";
  }
}
