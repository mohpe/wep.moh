 // ✅ جلب قائمة التصنيفات
let category_nav_list = document.querySelector(".category_nav_list");

// ✅ فتح/إغلاق قائمة التصنيفات
function Open_Categ_list() {
  category_nav_list.classList.toggle("active");
}

// ✅ فتح/إغلاق قائمة التنقل
let nav_links = document.querySelector(".nav_links");

function open_Manu() {
  nav_links.classList.toggle("active");
}

// ✅ فتح/إغلاق السلة
var cart = document.querySelector('.cart');

function open_close_cart() {
  cart.classList.toggle("active");
}

// ✅ إعداد سلايدر باستخدام Swiper
var swiper = new Swiper(".slide-swp", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true,
  },
  autoplay: {
    delay: 2500,
  },
  loop: true,
});

// ✅ استدعاء بيانات المنتجات من ملف JSON
fetch("assets/product/products.json")
  .then(response => response.json())
  .then(data => {
    const addToCartButtons = document.querySelectorAll(".btn_add_cart");

    addToCartButtons.forEach(button => {
      button.addEventListener("click", (event) => {
        const productId = event.currentTarget.getAttribute("data-id");
        const selectedProduct = data.find(product => product.id == productId);

        if (selectedProduct) {
          addToCart(selectedProduct);
          updateButtonsState(productId);
        }
      });
    });

    syncButtonsWithCart();
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });


// ✅ دالة لإضافة منتج إلى السلة
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}


// ✅ دالة لتحديث محتوى السلة في الواجهة
function updateCart() {
  const cartItemsContainer = document.getElementById("cart_items");
  const checkout_items = document.getElementById("checkout_items");
  const price_cart_total = document.querySelector('.price_cart_total');
  const count_item_cart = document.querySelector('.Count_item_cart');
  const count_item_header = document.querySelector('.count_time_header');
  const subtotal_checkout = document.querySelector(".subtotal_checkout");
  const total_checkout = document.querySelector(".total_checkout");

    let items_input= document.getElementById("items")   
  let total_price_input= document.getElementById("total_price")   
  let count_Items_input= document.getElementById("count_Items") 

  cartItemsContainer.innerHTML = "";
  if (checkout_items){  checkout_items.innerHTML = "" ;


  items_input.value ="";
  total_price_input.value ="";
  count_Items_input.value ="";
}  

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total_Price = 0;
  let total_count = 0;

  cart.forEach((item, index) => {
    let total_Price_item = item.price * item.quantity;
    total_Price += total_Price_item;
    total_count += item.quantity;

    // chek out input
  if (checkout_items){
    items_input.value += item.name +"  ---  "+ "price : " +total_Price_item + "  ---  " + "count : " + item.quantity + "\n"

    total_price_input.value = total_Price + 20
    count_Items_input.value = total_count
 }

    // ✅ HTML السلة الجانبية
    cartItemsContainer.innerHTML += `
      <div class="item_cart">
        <img src="${item.img}" alt="">
        <div class="content">
          <h4>${item.name}</h4>
          <p class="price_cart">$${total_Price_item}</p>
          <div class="quantity_control">
            <button class="decrease_quantity" data-index="${index}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increase_quantity" data-index="${index}">+</button>
          </div>
        </div>
        <button class="delete_item" data-index="${index}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;

    // ✅ HTML صفحة الدفع (checkout)
    if (checkout_items) {
      checkout_items.innerHTML += `
        <div class="item_cart">
          <div class="image_name">
            <img src="${item.img}" alt="">
            <div class="content">
              <h4>${item.name}</h4>
              <p class="price_cart">$${total_Price_item}</p>
              <div class="quantity_control">
                <button class="decrease_quantity" data-index="${index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="increase_quantity" data-index="${index}">+</button>
              </div>
            </div>
          </div>
          <button class="delete_item" data-index="${index}">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
    }
  });

  // ✅ تحديث السعر والعدد في واجهة المستخدم
  if (price_cart_total) price_cart_total.innerHTML = `$${total_Price}`;
  if (count_item_cart) count_item_cart.innerHTML = total_count;
  if (count_item_header) count_item_header.innerHTML = total_count;
  if (subtotal_checkout) subtotal_checkout.innerHTML = `$${total_Price}`;
  if (total_checkout) total_checkout.innerHTML = `$${total_Price + 20}`;

  // ✅ إعداد أزرار + و - بعد إدخال العناصر
  const increaseButtons = document.querySelectorAll('.increase_quantity');
  increaseButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.currentTarget.getAttribute('data-index');
      changeQuantity(index, 1);
    });
  });

  const decreaseButtons = document.querySelectorAll('.decrease_quantity');
  decreaseButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.currentTarget.getAttribute('data-index');
      changeQuantity(index, -1);
    });
  });

  // ✅ إعداد أزرار الحذف
  const deleteButtons = document.querySelectorAll('.delete_item');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.currentTarget.getAttribute('data-index');
      removeFromCart(index);
    });
  });
}


// ✅ دالة لحذف منتج من السلة
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) {
    const removedId = cart[index].id;
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    updateButtonsState(removedId);
  }
}


// ✅ دالة لتغيير كمية منتج
function changeQuantity(index, amount) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index]) {
    cart[index].quantity += amount;

    if (cart[index].quantity < 1) cart[index].quantity = 1;

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }
}


// ✅ دالة لتحديث حالة زر "add to cart" للمنتج
function updateButtonsState(productId) {
  const allMatchingButtons = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`);
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const inCart = cart.some(item => item.id == productId);

  allMatchingButtons.forEach(button => {
    if (inCart) {
      button.classList.add('active');
      button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> item in cart`;
    } else {
      button.classList.remove('active');
      button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> add to cart`;
    }
  });
}


// ✅ مزامنة حالة الأزرار عند تحميل الصفحة
function syncButtonsWithCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const allButtons = document.querySelectorAll('.btn_add_cart');

  allButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> add to cart`;
  });

  cart.forEach(item => {
    const matchingButtons = document.querySelectorAll(`.btn_add_cart[data-id="${item.id}"]`);
    matchingButtons.forEach(btn => {
      btn.classList.add('active');
      btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> item in cart`;
    });
  });
}


// ✅ عند تحميل الصفحة، يتم تحديث السلة والأزرار تلقائيًا
window.addEventListener('DOMContentLoaded', () => {
  updateCart();
  syncButtonsWithCart();
}); 




