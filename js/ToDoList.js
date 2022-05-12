/*
Copyright (c) 2022 by Louis Dittmar
This program is free software: you can redistribute it and/or modify

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */


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
    alert("You must first activate the checkbox!")
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
    alert("No elements to delete!")
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
