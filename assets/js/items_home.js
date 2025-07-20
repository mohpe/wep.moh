// جلب ملف JSON الذي يحتوي على بيانات المنتجات
fetch("assets/product/products.json")

  // تحويل البيانات المستلمة من JSON إلى كائنات JavaScript قابلة للمعالجة
  .then(response => response.json())

  // بعد تحويل البيانات بنجاح، يتم تنفيذ الكود التالي
  .then(data => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    // الحصول على عناصر HTML لعرض المنتجات حسب الفئة
    const swiper_items_sale = document.getElementById("swiper_items_sale");
    const swiper_elctronics = document.getElementById("swiper_elctronics");
    const swiper_appliances = document.getElementById("swiper_appliances");
    const swiper_mobiles = document.getElementById("swiper_mobiles");

    // دالة لإنشاء عنصر المنتج HTML بناءً على المنتج والفئة
    function generateProductHTML(product, container) {
      const isTnCart = cart.some(cartItem => cartItem.id === product.id); // التحقق هل المنتج في السلة

      const old_price_paragraph = product.old_price
        ? `<p class="old_price">$${product.old_price}</p>` : "";

      const percent_disc_div = product.old_price
        ? `<span class="sale_present">%${Math.floor((product.old_price - product.price) / product.old_price * 100)}</span>` : "";

      const productHTML = `
        <div class="swiper-slide product">
          ${percent_disc_div}

          <div class="img_product">
            <a href="#"><img src="${product.img}" alt=""></a>
          </div>

          <div class="stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>

          <p class="name_product"><a href="#">${product.name}</a></p>

          <div class="price">
            <p><span>$${product.price}</span></p>
            ${old_price_paragraph}
          </div>

          <div class="icons">
            <span class="btn_add_cart ${isTnCart ? 'active' : ''}" data-id="${product.id}">
              <i class="fa-solid fa-cart-shopping"></i> ${isTnCart ? 'Item in cart' : 'add to cart'}
            </span>
            <span class="icon_product"><i class="fa-regular fa-heart"></i></span>
          </div>
        </div>
      `;
      container.innerHTML += productHTML;
    }

    // تمرير المنتجات حسب الفئة
    data.forEach(product => {
      if (product.old_price) {
        generateProductHTML(product, swiper_items_sale);
      }
      if (product.catetory === "electronics") {
        generateProductHTML(product, swiper_elctronics);
      }
      if (product.catetory === "appliances") {
        generateProductHTML(product, swiper_appliances);
      }
      if (product.catetory === "mobiles") {
        generateProductHTML(product, swiper_mobiles);
      }
    });
  })

  // في حال حدوث خطأ أثناء جلب البيانات من الملف JSON
  .catch(error => {
    console.error("Fetch error:", error); // طباعة الخطأ في الكونسول
  });






    











   