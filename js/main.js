import {db} from './db.js'
import {Cart} from "./modules/cart.js"

console.log(db)

const myCard = new Cart(db);

myCard.CreateCart();
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



let swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    loop:true,
    autoplay:{
        delay:5000
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