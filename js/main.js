import {db} from './db.js'
import {Cart} from "./modules/cart.js"

console.log(db)

const myCard = new Cart(db);

myCard.CreateCart();

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