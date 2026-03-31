export class Cart{
    constructor(data) {
        this.db = data; 
    }
    CreateCart(){
        const container = document.getElementById("catalog__content");
        let content = "";
        for(let i = 0; i < this.db.length; i++){
            console.log(`Рендеримо ялинку №${i}:`, this.db[i].id);
            const tree = this.db[i];
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
            container.innerHTML = content;
        }
    }
    
}
