var $ = document;
let dashboardAreaHasTouristSection = $.getElementById("dashboardAreaHasTouristSection");
let addNewTouristBtn = $.getElementById("addNewTouristBtn");
let pTagAboutTourist = $.getElementById("pTagAboutTourist");
let dashboardAreaNoTouristSection = $.getElementById("dashboardAreaNoTouristSection");
let pTagLoading = $.getElementById("pTagLoading");
let dashboardAreaHasTourist = $.getElementById("dashboardAreaHasTourist");

const id = localStorage.getItem('id');
const token = localStorage.getItem('Token');

if (!id) {
    console.error("ID کاربر در localStorage موجود نیست.");
}

window.addEventListener('DOMContentLoaded', () => {
    getAllTourist()

    const firstName_lastName = localStorage.getItem('firstName_lastName');

    let navNameOfUser = document.getElementById('navNameOfUser');
    let sidebarNameOfUser = document.getElementById('sidebarNameOfUser');
    
    navNameOfUser.innerHTML = ' <i class="la la-user font-size-24"></i>' + firstName_lastName;
    sidebarNameOfUser.innerHTML = `
    <span class="d-flex flex-column align-items-center">
        <i class="la la-user font-size-70 d-flex justify-content-center" style="margin-bottom:-20px;"></i><br>
        ${firstName_lastName}
    </span>
`;
})


function getAllTourist(){

    dashboardAreaHasTouristSection.classList.add('d-none')
    dashboardAreaNoTouristSection.classList.add('d-none')

    if (!token) {
        console.error("توکن یافت نشد، لطفاً وارد شوید.");
        window.location.href = "/Theme/trizen/trizen-rtl/nima-part/index.html";
        return;
    }

    pTagAboutTourist.textContent = "در حال بارگذاری..."

    fetch(`http://avatoop.com/marina_kish/api/passengers/index?user_id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && Array.isArray(data.data) && data.data.length > 0) {

            pTagLoading.classList.add('d-none')
            dashboardAreaHasTouristSection.classList.add('d-block')

            let counter = 1
            dashboardAreaHasTourist.innerHTML = ''
            data.data.forEach(user => {


                let gender = "";

                switch (user.gender) {
                    case "mail":
                        gender = "مرد";
                        break;
                    case "female":
                        gender = "زن";
                        break;
                    default:
                        gender = "نامشخص";
                        break;
                }

                let dateString = user.birth_day;
                let date = new Date(dateString);
                let day = String(date.getDate()).padStart(2, '0');
                let month = String(date.getMonth() + 1).padStart(2, '0');
                let year = date.getFullYear();

                dashboardAreaHasTourist.insertAdjacentHTML('beforeend', `
                    <tr>
                        <th scope="row"><i class="mr-1 font-size-18"></i>${counter}</th>
                        <td>
                            <div class="table-content">
                                <h3 class="title">${user.name}</h3>
                            </div>
                        </td>
                        <td>${user.national_code}</td>
                        <td>${user.phone}</td>
                        <td>${year}-${month}-${day}</td>
                        <td>${gender}</td>
                        <td>
                            <div class="table-content" style="width:35px">
                               <button class="theme-btn theme-btn-small" type="button" data-toggle="modal" data-target="#changeTouristModal" id="changeTouristBtn" tourist-userid="${user.id}">ویرایش</button>
                            </div>
                        </td>
                        <td>
                            <div class="table-content" style="width:35px">
                               <button class="theme-btn theme-btn-danger-rgb theme-btn-small" type="button" data-toggle="modal" data-target="#removeTouristModal" id="removeTouristBtn" tourist-userid="${user.id}">حذف</button>
                            </div>
                        </td>
                    </tr>
                    `)
                    counter++
                })
        } else {
            pTagLoading.parentElement.classList.add("mt-0");
            pTagLoading.classList.add('d-none')
            dashboardAreaNoTouristSection.classList.add('d-block')
            pTagAboutTourist.textContent = "لیست گردشگران خالی است"

        }
    })
    .catch(error => {
        console.error('خطا در دریافت اطلاعات کاربر:', error);
    });
}