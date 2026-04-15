import {db} from './db.js'
import {Cart} from "./modules/cart.js"

const savedDataFav = localStorage.getItem('user_favs');
const savedDataBuy = localStorage.getItem('user_buy');

let favourites = savedDataFav ? JSON.parse(savedDataFav) : {};
let cartItems = savedDataBuy ? JSON.parse(savedDataBuy) : {};

const myCard = new Cart(db);

myCard.state.favorites = favourites;
myCard.state.cart = cartItems;

myCard.CreateCart();

const city_select = document.getElementById('city-select');

city_select.addEventListener('change', (e)=>{
    document.title = `Santa Tree's | ${e.target.value}`
})

// MODAL WINDOWS START

const modal__basket = document.querySelector('.modal__basket')
const basket_open = document.getElementById('basket');
const basket_close = document.getElementById('basket_close');
const header = document.querySelector('.header__container');


const toggleModalBasket = ()=>{
    modal__basket.classList.toggle('toggle');

    if (modal__basket.classList.contains('toggle')) {
        document.body.style.overflowY = 'hidden';
        header.style.pointerEvents = 'none';
    } else {
        document.body.style.overflowY = 'auto';
        header.style.pointerEvents = 'all';
    }
}

basket_open.addEventListener('click', toggleModalBasket)
basket_close.addEventListener('click', toggleModalBasket)


// MODAL WINDOWS END

// CARD BUTTONS START
const catalog__container = document.getElementById("catalog__content");

catalog__container.addEventListener("click", (e) => {
    const target = e.target;

    const favBtn = target.closest(".item__fav");
    if (favBtn) {
        const id = favBtn.dataset.id;
        if (favourites[id]) {
            delete favourites[id];
            favBtn.classList.remove("item__fav--active");
        } else {
            favourites[id] = true;
            favBtn.classList.add("item__fav--active");
        }
        console.log(`fav: ${favourites[id]}`)

        //localStorage.setItem('user_favs', JSON.stringify(favourites));
        return; 
    }

    const buyBtn = target.closest(".item__buy");
    if (buyBtn) {
        const id = buyBtn.dataset.id;

        cartItems[id] = true; 
        
        buyBtn.innerText = "У кошику";
        myCard.createCartBuy();
        console.log(`buy: ${cartItems[id]}`)

        //localStorage.setItem('user_buy', JSON.stringify(cartItems));
    }
});
// CARD BUTTONS END

// FILTERS START

const filtersBtn = document.querySelectorAll(".filters__btn");
filtersBtn.forEach(btn =>{
    btn.addEventListener('click', (e)=>{
        const currentBtn = e.currentTarget;

        filtersBtn.forEach(other => other.classList.remove('filters__btn--active'));
        currentBtn.classList.add('filters__btn--active');

        myCard.state.color = currentBtn.dataset.filter;
        myCard.applyFilters();
    })
})

const jewelryBtns = document.querySelectorAll(".filters__btn--jewerly");
jewelryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const currentBtn = e.currentTarget;
        const status = currentBtn.dataset.filter;
        jewelryBtns.forEach(other => other.classList.remove('filters__btn--active'));
        currentBtn.classList.add('filters__btn--active');


        myCard.state.jewerly = (status === "all") ? "all" : (status === "true");
        myCard.applyFilters();
    });
});

const select = document.getElementById('price-sort');
select.addEventListener('change', (e) => {
    myCard.state.sort = e.target.value;
    myCard.applyFilters();
});

// FILTERS END

let swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    loop:true,
    autoplay:{
        delay:6000
    }
});

function initChart(){
    const ctx = document.getElementById('priceChart');

    new Chart(ctx, {
        type: 'bar', 
        data: {
            labels: db.map(tree => `#${tree.id}`), 
            datasets: [{
                label: 'Ціна (грн)',
                data: db.map(tree => tree.newPrice),
                backgroundColor: '#D51544',   
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            indexAxis: 'y', 
            responsive: true,
            maintainAspectRatio: false, 
            plugins: {
                legend: { display: false }, 
                title: {
                    display: true,
                    text: 'Порівняння цін асортименту',
                    color: '#000',
                    font: { size: 24, family: 'Montserrat' }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#686870' }
                },
                y: {
                    ticks: { color: '#000', font: { weight: 'bold' } }
                }
            }
        }
    });
}

initChart();