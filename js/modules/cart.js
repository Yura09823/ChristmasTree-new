export class Cart{
    constructor(data) {
        this.db = data; 
        this.state = {
            color: 'all',
            jewerly: 'all',
            sort: 'cheap',
            favorites: {},
            cart: {}
        }
    }
    CreateCart(render = this.db){
        const container = document.getElementById("catalog__content");
        let content = "";
        for(let i = 0; i < render.length; i++){
            const tree = render[i];
            content += `
                <article class="catalog__item">
                    <div class="item-image__wrapper">
                        <img class="item__image" src="./img/${tree.img}.avif" alt="${tree.name}" loading="lazy">
                    </div>
                    <h3 class="item__title">${tree.name} <span class="item-id">#${tree.id}</span></h3>
                    <ul class="item__specs">
                        <li>Вага: <span class="item-weight">${tree.weight} кг</span></li>
                        <li>Висота: <span class="item-height">${tree.height} м</span></li>
                    </ul>
                    <div class="item__price-block">
                        <span class="price-old">${tree.oldPrice} грн</span>
                        <span class="price-new">${tree.newPrice} грн</span>
                    </div>
                    <div class="item__actions">
                        <button class="item__fav" data-id="${tree.id}">До обраного</button>
                        <button class="item__buy" data-id="${tree.id}">Придбати</button>
                    </div>
                </article>
            `;
        }
        container.innerHTML = content;
        console.log('render ', render)
    }
    applyFilters(){
        let result = [...this.db];
        if (this.state.color != 'all'){
            result = result.filter(item => item.color === this.state.color);
        }

        if (this.state.jewerly != 'all'){
            result = result.filter(item => item.jewerly === this.state.jewerly)
        }

        result.sort((a, b) =>{
            return this.state.sort === 'cheap' ? a.newPrice - b.newPrice : b.newPrice - a.newPrice;
        })

        this.CreateCart(result);
    }
    createCartBuy() {
        const container = document.querySelector('.modal__container');
        if (!container) return; // 

        let content = ``;
        
        // 1. Отримуємо масив ID з нашого об'єкта favorites/cart
        // Наприклад: ["001", "005"]
        const idsInCart = Object.keys(this.state.cart);

        // 2. Фільтруємо основну базу даних, щоб отримати тільки ті ялинки, які ми купили
        const products = this.db.filter(item => idsInCart.includes(String(item.id)));

        products.forEach(item => {
            content += `
                <div class="modal__card">
                    <div class="modal__first">
                        <img src="./img/${item.img}.avif" alt="${item.name}" class="modal__img">
                        <div class="modal__title">
                            <p class="modal__name">${item.name}</p>
                            <p class="modal__id">#${item.id}</p>
                        </div>
                    </div>
                    <div class="modal__calc">
                        <div class="modal__price">${item.newPrice} грн</div>
                        <button type="button" class="modal__button minus" data-id="${item.id}">-</button>
                        <p class="modal__result">1</p>
                        <button type="button" class="modal__button plus" data-id="${item.id}">+</button>
                    </div>
                    <div class="modal__close-item" data-id="${item.id}"></div>
                </div>
            `;
        });

        container.innerHTML = content;
    }
}
