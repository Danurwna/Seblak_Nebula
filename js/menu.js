// Variabel global untuk menyimpan riwayat pemesanan
let orderHistory = [];

// Data menu dan topping (contoh data)
const dataMenu = [
  { id: 1, nama: "Seblak Original", harga: 15000 },
  { id: 2, nama: "Seblak Pedas", harga: 18000 },
  { id: 3, nama: "Seblak Keju", harga: 20000 },
];

const dataTopping = [
  { id: 1, nama: "Telur", harga: 2000 },
  { id: 2, nama: "Sosis", harga: 3000 },
  { id: 3, nama: "Kerupuk", harga: 1000 },
  { id: 4, nama: "Sayur", harga: 2000 },
  { id: 5, nama: "Macaroni", harga: 1000 },
  { id: 6, nama: "Ceker", harga: 3000 },
];

// Fungsi untuk menampilkan menu seblak
// Fungsi untuk menampilkan menu seblak
function displayMenu() {
  const menuContainer = document.getElementById("menu");
  menuContainer.innerHTML = ""; // Clear previous content
  dataMenu.forEach((menu) => {
    const div = document.createElement("div");
    div.className = "form-check";
    div.innerHTML = `
        <input class="form-check-input" type="radio" name="menu" id="menu-${menu.id}" value="${menu.id}">
        <label class="form-check-label" for="menu-${menu.id}">
          ${menu.nama} - Rp ${menu.harga}
        </label>
      `;
    menuContainer.appendChild(div);
  });
}

// Fungsi untuk menampilkan topping
function displayToppings() {
  const toppingContainer = document.getElementById("toppings");
  toppingContainer.innerHTML = ""; // Clear previous content
  dataTopping.forEach((topping) => {
    const div = document.createElement("div");
    div.className = "form-check";
    div.innerHTML = `
        <input class="form-check-input" type="checkbox" name="topping" id="topping-${topping.id}" value="${topping.id}">
        <label class="form-check-label" for="topping-${topping.id}">
          ${topping.nama} - Rp ${topping.harga}
        </label>
        <input class="topping-quantity" type="number" id="topping-quantity-${topping.id}" value="1" min="1">
      `;
    toppingContainer.appendChild(div);
  });
}

// Fungsi untuk menambahkan pemesanan
function placeOrder() {
  const selectedMenu = document.querySelector('input[name="menu"]:checked');
  const selectedToppings = document.querySelectorAll(
    'input[name="topping"]:checked'
  );

  if (!selectedMenu) {
    alert("Silakan pilih setidaknya satu menu.");
    return;
  }

  let orderSummary = "<h3>Pesanan Anda:</h3>";
  let total = 0;

  // Menu
  const menuData = dataMenu.find((menu) => menu.id == selectedMenu.value);
  orderSummary += `<h4>Menu:</h4><p>${menuData.nama} - Rp ${menuData.harga}</p>`;
  total += menuData.harga;

  // Topping
  let selectedToppingData = [];
  if (selectedToppings.length > 0) {
    orderSummary += "<h4>Topping:</h4>";
    selectedToppings.forEach((topping) => {
      const toppingData = dataTopping.find((item) => item.id == topping.value);
      const quantity = document.getElementById(
        `topping-quantity-${topping.value}`
      ).value;
      orderSummary += `<p>${toppingData.nama} (x${quantity}) - Rp ${
        toppingData.harga * quantity
      }</p>`;
      total += toppingData.harga * quantity;
      selectedToppingData.push({ ...toppingData, quantity: quantity });
    });
  }

  orderSummary += `<h4>Total: Rp ${total}</h4>`;

  // Menambahkan pemesanan ke riwayat pemesanan
  const orderData = {
    menu: menuData,
    toppings: selectedToppingData,
    total: total,
    date: new Date().toLocaleString(),
  };

  orderHistory.push(orderData);
  displayOrderHistory();

  document.getElementById("orderSummary").innerHTML = orderSummary;
  $("#myModal").modal("show");
}

// Fungsi untuk menampilkan riwayat pemesanan
function displayOrderHistory() {
  const historyContainer = document.getElementById("orderHistory");
  historyContainer.innerHTML = "";

  if (orderHistory.length === 0) {
    historyContainer.innerHTML = "<p>Tidak ada riwayat pemesanan.</p>";
  } else {
    orderHistory.forEach((order, index) => {
      const orderCard = document.createElement("div");
      orderCard.className = "card mb-3";
      orderCard.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">Pemesanan #${index + 1}</h5>
            <p class="card-text">Total: Rp ${order.total}</p>
            <p class="card-text">Tanggal: ${order.date}</p>
          </div>
        `;

      const menuList = document.createElement("ul");
      menuList.className = "list-group list-group-flush";
      const menuItem = document.createElement("li");
      menuItem.className = "list-group-item";
      menuItem.textContent = `${order.menu.nama} - Rp ${order.menu.harga}`;
      menuList.appendChild(menuItem);

      const toppingList = document.createElement("ul");
      toppingList.className = "list-group list-group-flush";
      order.toppings.forEach((topping) => {
        const toppingItem = document.createElement("li");
        toppingItem.className = "list-group-item";
        toppingItem.textContent = `${topping.nama} (x${
          topping.quantity
        }) - Rp ${topping.harga * topping.quantity}`;
        toppingList.appendChild(toppingItem);
      });

      orderCard.appendChild(menuList);
      orderCard.appendChild(toppingList);
      historyContainer.appendChild(orderCard);
    });
  }
}

// Panggil fungsi untuk menampilkan menu dan topping saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  displayMenu();
  displayToppings();
});
