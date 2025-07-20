// ✅ السلايدر الأول: تهيئة Swiper لعنصر يملك الكلاس "slide-swp"
var swiper = new Swiper(".slide-swp", {
  pagination: {
    el: ".swiper-pagination",       // مكان ظهور النقاط السفلية (أسفل السلايدر)
    dynamicBullets: true,           // جعل النقاط تتغير حسب الشريحة النشطة
    clickable: true                 // إمكانية التنقل بين الشرائح بالضغط على النقاط
  },
  autoplay: {
    delay: 2500,                    // تأخير زمني 2.5 ثانية قبل الانتقال التلقائي للشريحة التالية
  },
  loop: true                        // جعل الشرائح تدور بشكل لا نهائي
});


// ❌ الكود التالي مكرر لنفس العنصر ونفس الإعدادات تمامًا، لذا من الأفضل **حذفه** لتجنب المشاكل
// إعادة تعريف نفس الـ swiper بنفس الكلاس قد يسبب تعارضًا
/*
var swiper = new Swiper(".slide-swp", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true
  },
  autoplay: {
    delay: 2500,
  },
  loop: true
});
*/


// ✅ السلايدر الثاني: لعرض المنتجات (Product Slider)
var swiper = new Swiper(".slide_product", {
  slidesPerView: 5,                // عرض 5 شرائح (منتجات) في نفس الوقت
  spaceBetween: 20,                // المسافة بين كل منتج والآخر 20px

  autoplay: {
    delay: 2500,                   // التشغيل التلقائي كل 2.5 ثانية
  },

  navigation: {
    nextEl: ".swiper-button-next", // الزر لعرض الشريحة التالية
    prevEl: ".swiper-button-prev"  // الزر للعودة للشريحة السابقة
  },

  loop: true ,
  breakpoints:{
    1200:{
      slidesPerView:5,
      spaceBetween:20
    },
    1000:{
      slidesPerView:4,
      spaceBetween:20
    },
    700:{
      slidesPerView:3,
      spaceBetween:15
    },
    0:{
      slidesPerView:2,
      spaceBetween:10
    },
  }                      // إعادة تشغيل العرض من البداية بعد آخر شريحة
});

