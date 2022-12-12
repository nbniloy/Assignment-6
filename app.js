const loadNav = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNav(data.data.news_category))
}


const displayNav = (categories) => {
    const container = document.getElementById('nav-container')
    categories.forEach(category => {
        const create = document.createElement('ul')
        create.classList.add('navbar-nav')
        create.classList.add('d-flex')
        create.innerHTML =
            `   <li class="nav-item">
       <a onclick = "loadDetails('${category.category_id}') " class="nav-link active fw-bold ms-lg-5 mt-lg-2" aria-current="page" href="#" >${category.category_name}</a>
     </li>`
        container.appendChild(create)



    });


}

const loadDetails = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data))
    toggleSpinner(true)

}
const displayData = (details) => {
    const cardContainer = document.getElementById('body-card')
    cardContainer.innerHTML = ""


    const categoryNumber = document.getElementById('category-number')
    categoryNumber.innerHTML =
        `<p class = "d-block bg-light fw-bold">${details.length} Items Found</p>`

    details.forEach(detail => {
        const divCreate = document.createElement('div')
        console.log(detail);
        divCreate.innerHTML =
            `
            <div class="card mb-3 " data-bs-toggle="modal" data-bs-target="#exampleModal"'>
                <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${detail.image_url}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${detail.title}</h5>
                                    <p class="card-text">${detail.details.slice(0, 400) + '...'}</p>
                                    <div class="d-flex">
                                        <div class="d-flex  mt-2 text-muted">
                                            <img class="rounded-circle" width="40" height="40" src="${detail.author.img}" alt="" srcset="">
                                            <p class = "mx-2">${detail.author.name}</p> 
                                            <p class ="mx-1">${detail.author.published_date}</p>
                                        </div>

                                        <div class = "mx-5 d-flex ">
                                            <img src="download.jfif" width="40" height="40" alt="">
                                            <p class ="mx-1 mt-2 fw-bold">${detail.total_view}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                </div>
            </div>
        
        `
        cardContainer.appendChild(divCreate)
    });
    toggleSpinner(false)
}




const toggleSpinner = (isLoading) => {
    const toggleSpinner = document.getElementById('spinnerShow');

    if (isLoading) {
        toggleSpinner.classList.remove('d-none')
    }
    else {
        toggleSpinner.classList.add('d-none')
    }

}


const loadModal = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`
    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data))
}


const displayModal = (modals) => {
    const container = document.getElementById('modal-Container')
    modals.forEach(modal => {
        const create = document.createElement('div')
        create.innerHTML = `  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel" class="titleId">${modal.title}}</h1>
                    <img src = '${modal.image_url}' width = '100' height = '100'> 
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${modal.details}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>`
        container.appendChild(create)
    });
}



loadModal()
loadNav()



