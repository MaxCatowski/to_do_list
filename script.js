const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
console.log(itemsArray);

document.querySelector(".enter").addEventListener("click", () => {
  const item = document.querySelector(".item");
  createItem(item);
});

function displayItems() {
  let html = "";
  itemsArray.forEach((i) => {
    html += `
<div class="item-list">
    <div class="input-controller  ">
      <textarea class="crossOut" disabled>${i}</textarea>
      <div class="edit-controller">
        <i class="fa-solid fa-trash deleteBtn"></i>
        <i class="fa-solid fa-pen-to-square editBtn"></i>
      </div>
    </div>
    <div class="update-controller">
      <button class="saveBtn">Save</button>
      <button class="cancelBtn">Cancel</button>
    </div>
  </div>`;
  });
  document.querySelector(".to-do-list").innerHTML = html;
  activateDeletelisteners();
  activateEditlisteners();
  activateSavelisteners();
  activateCancellisteners();
}

function activateDeletelisteners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => {
      deleteItem(i);
    });
  });
}
// classList. add/remove("class")
function activateEditlisteners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      // updateController[i].style.display = "block";
      inputs[i].classList.toggle("crossOut");
      // inputs[i].disabled = false;
      console.log("clicked");
    });
  });
}
function activateSavelisteners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
}
function activateCancellisteners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
      location.reload();
    });
  });
}

function updateItem(text, i) {
  itemsArray[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector(
    ".date"
  ).innerHTML = `${date[1]} ${date[2]} ${date[3]}`;
}

window.onload = function () {
  displayDate();
  displayItems();
};
