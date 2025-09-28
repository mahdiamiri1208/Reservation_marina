document.addEventListener("DOMContentLoaded", function () {
    const productsApiUrl = "http://avatoop.com/marina_kish/api/marina_suggestion";
    const productsContainer = document.getElementById("marina-suggestion");
    const noProductsMessage = document.getElementById("no-products-message");
    const pTagLoadingSuggestion = document.getElementById("pTagLoadingSuggestion");

    // دکمه‌های اسکرول
    const scrollLeftBtnSuggestion = document.getElementById("scroll-left-btn-suggestion");
    const scrollRightBtnSuggestion = document.getElementById("scroll-right-btn-suggestion");

    // عرض یک محصول
    let productWidth = 0;

    // دریافت محصولات از API
    // fetch(productsApiUrl)
    //     .then(response => response.json())
    //     .then(productsData => {
    //         if (productsData.data.length == 0) {
    //             noProductsMessage.textContent = "محصولی وجود ندارد";
    //             return;
    //         } else {
    //             noProductsMessage.textContent = '';
    //         }
    //         if (productsData.data && productsData.data !== 0) {
    //             productsData.data.forEach(product => {
    //                 const productCard = document.createElement("div");
    //                 productCard.classList.add("product-card");

    //                 fetch(`http://avatoop.com/marina_kish/api/media/get_image/product/${product.id}`)
    //                     .then(response => response.json())
    //                     .then(imageData => {
    //                         let productImage = '';
    //                         if (imageData.data && Array.isArray(imageData.data) && imageData.data.length > 0) {
    //                             productImage = imageData.data[0]; // اولین تصویر محصول
    //                         }
    //                         productCard.innerHTML = `
    //                             <a href="/Theme/trizen/trizen-rtl/Mahdi_Meydan_miri/html part/product-single.html?id=${product.id}" 
                      
    //                                class="product-card"
    //                                product_id="${product.id}">
    //                                 <img src="${productImage}" alt="${product.name}" class="product-image" 
    //                                      onerror="this.onerror=null; this.src='default.jpg';">
    //                                 <h3 class="product-name mt-2 font-size-16">${product.name}</h3>
    //                                 <p class="product-time d-flex font-size-14 pl-3"><i class="la la-clock"></i>&nbsp;${product.time} دقیقه</p>
    //                                 <div class="card-price d-flex align-items-center justify-content-between mb-3 mt-2">
    //                                     <p class="product-price d-flex font-size-14 pl-3">${product.price.toLocaleString()}&nbsp;&nbsp;تومان</p>
    //                                 </div>

    //                                 <a class="card-link" href="/Theme/trizen/trizen-rtl/Mahdi_Meydan_miri/html part/product-single.html?id=${product.id}">مشاهده جزئیات<i class="la la-angle-left"></i></a>

           
    //                             </a>
    //                         `;

    //                         productCard.querySelector(".product-card").addEventListener("click", function (event) {
    //                             event.preventDefault();
    //                             let product_id = this.getAttribute("product_id");
    //                             localStorage.setItem("product_id", product_id);

    //                             window.location.href = `/Theme/trizen/trizen-rtl/Mahdi_Meydan_miri/html part/product-single.html?id=${product_id}`;

    //                         });
    //                         productsContainer.appendChild(productCard);

    //                         // محاسبه عرض یک محصول
    //                         if (productWidth === 0) {
    //                             productWidth = productCard.offsetWidth + 20; // عرض محصول + فاصله بین محصولات
    //                         }
    //                     })
    //                     .catch(error => console.error(`خطا در دریافت تصویر محصول ${product.id}:`, error));
    //             });

    //             pTagLoadingSuggestion.parentElement.classList.add("mt-0");
    //             pTagLoadingSuggestion.classList.add("d-none");
    //         } else {
    //             pTagLoadingSuggestion.classList.add('d-none');
    //             noProductsMessage.textContent = "خطا در دریافت اطلاعات محصولات";
    //         }
    //     })
    //     .catch(error => {
    //         console.error("خطا در دریافت محصولات:", error);
    //     });

    // اسکرول محصولات به اندازه یک محصول با کلیک روی دکمه‌ها
    scrollLeftBtnSuggestion.addEventListener("click", () => {
        productsContainer.scrollBy({
            left: -220,
            behavior: 'smooth' // اسکرول نرم
        });
    });

    scrollRightBtnSuggestion.addEventListener("click", () => {
        productsContainer.scrollBy({
            left: 220,
            behavior: 'smooth' // اسکرول نرم
        });
    });
});