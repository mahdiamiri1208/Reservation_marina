const ordersApiUrl = 'http://avatoop.com/marina_kish/api/orders/admin/index';
const productsApiUrl = 'http://avatoop.com/marina_kish/api/products/admin/index';
const usersApiUrl = 'http://avatoop.com/marina_kish/api/users/index';

const token = localStorage.getItem('Token');
if (!token) {
    console.error("توکن یافت نشد، لطفاً وارد شوید.");
    window.location.href = "/Theme/trizen/trizen-rtl/nima-part/index.html";
}

let products = [];
let users = [];

async function fetchActiveOrders() {
    try {
        const response = await fetch(ordersApiUrl, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error('خطا در دریافت سفارشات');

        const data = await response.json();
        const activeOrders = data.order;

        populateOrdersTable(activeOrders);
    } catch (error) {
        showResponseModal(`خطا: ${error.message}`, 'error');
    }
}

async function fetchDataAndRender() {
    try {
        await Promise.all([renderProductArrays(), renderUserArrays()]);
        await fetchActiveOrders();
    } catch (error) {
        console.error("خطا در دریافت داده‌ها:", error);
    }
}

async function renderProductArrays() {
    try {
        const response = await fetch(productsApiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        products = data.product;
    } catch (error) {
        showResponseModal(`خطا در دریافت محصولات: ${error.message}`, 'error');
    }
}

async function renderUserArrays() {
    try {
        const response = await fetch(usersApiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        users = data.users.data;
    } catch (error) {
        showResponseModal(`خطا در دریافت کاربران: ${error.message}`, 'error');
    }
}

document.addEventListener('DOMContentLoaded', fetchDataAndRender);

function populateOrdersTable(orders) {
    console.log("داده‌های کاربران:", users);
    console.log("داده‌های محصولات:", products);

    const orderContainer = document.querySelector('.order-container');
    orderContainer.innerHTML = '';
    
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'table-striped');

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>شماره</th>
            <th>نام محصول (آیدی)</th>
            <th>کد ملی کاربر</th>
            <th>سانس</th>
            <th>تعداد</th>
            <th>قیمت کل</th>
            <th>وضعیت</th>
            <th>کد تخفیف</th>
            <th>تاریخ رزرو</th>
            <th>تاریخ ایجاد</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    orders.forEach(order => {
        const product = products.find(p => p.id == order.product_id);
        const user = users.find(u => u.id == order.user_id);

        console.log(`سفارش ${order.id} - محصول: ${product ? product.name : "نامشخص"} - کاربر: ${user ? user.national_code : "نامشخص"}`);

        const productName = product ? product.name : 'نامشخص';
        const userNationalCode = user ? user.national_code : 'نامشخص';
        const totalPrice = order.factor ? order.factor.total_price : 'نامشخص';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${productName} (${order.product_id})</td>
            <td>${userNationalCode}</td>
            <td>${order.sans_id}</td>
            <td>${order.number}</td>
            <td>${totalPrice}</td>
            <td>فعال</td>
            <td>${order.off_code}</td>
            <td>${order.day_reserved ? order.day_reserved.split("T")[0] : "نامشخص"}</td>
            <td>${order.created_at ? order.created_at.split("T")[0] : "نامشخص"}</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    orderContainer.appendChild(table);
}

function showResponseModal(message, type) {
    const modalBody = document.getElementById('responseModalBody');
    modalBody.innerHTML = `<p class="${type === 'success' ? 'text-success' : 'text-danger'}">${message}</p>`;
    $('#responseModal').modal('show');
}
