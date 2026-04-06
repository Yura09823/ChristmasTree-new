export class Cart{
    constructor(data) {
        this.db = data; 
        this.state = {
            color: 'all',
            jewerly: 'all',
            sort: 'cheap'
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
    FilterByColor(color){
        if (color === 'all') return this.db;
        return this.db.filter(tree => tree.color === color);
    }
    FilterByJewerly(status){
        return this.db.filter(tree => tree.jewerly === status);
    }
    FilterByPrice(option){
        if (option === 'cheap'){
            return this.db.sort((a, b) => b.newPrice - a.newPrice)
        }
        else{
            return this.db.sort((a, b) => a.newPrice - b.newPrice)
        } 
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
    
}
