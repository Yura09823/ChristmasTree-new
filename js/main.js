import {db} from './db.js'
import {Cart} from "./modules/cart.js"

console.log(db)

const myCard = new Cart(db);
myCard.CreateCart();

const filtersBtn = document.querySelectorAll(".filters__btn");
const jewelryBtns = document.querySelectorAll(".filters__btn--jewerly");
filtersBtn.forEach(btn =>{
    btn.addEventListener('click', (e)=>{
        const currentBtn = e.currentTarget;
        const filterValue = currentBtn.dataset.filter;

        filtersBtn.forEach(other => other.classList.remove('filters__btn--active'));
        jewelryBtns.forEach(other => other.classList.remove('filters__btn--active'));
        currentBtn.classList.add('filters__btn--active');

        let filteredData;
        if(filterValue === 'all'){
            filteredData = db;
        }
        else{
            filteredData = db.filter(tree => tree.color === filterValue);
        }
        myCard.CreateCart(filteredData);
    })
})
jewelryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const currentBtn = e.currentTarget;
        const statusStr = currentBtn.dataset.filter;
        jewelryBtns.forEach(other => other.classList.remove('filters__btn--active'));
        filtersBtn.forEach(other => other.classList.remove('filters__btn--active'));
        currentBtn.classList.add('filters__btn--active');


        const isJewerlyNeeded = (statusStr === "true");
        const filteredData = myCard.FilterByJewerly(isJewerlyNeeded);
        myCard.CreateCart(filteredData);
    });
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