type filtersObj = {
    categorys: string[];
    brands: string[];
    price: number[];
    stock: number[];
    text: string;
};

export class Filters {
    //price[0] = min, price[1] = max; stock[0] = min, stock[1] = max
    filters: filtersObj = {
        categorys: [],
        brands: [],
        price: [],
        stock: [],
        text: '',
    };

    clearFilters() {
        this.filters['categorys'] = [];
        this.filters['brands'] = [];
        this.filters['price'] = [];
        this.filters['stock'] = [];
        this.filters['text'] = '';
    }

    addCategory(category: string) {
        this.filters['categorys'].push(category);
        this.view();
    }

    removeCategory(category: string) {
        this.filters['categorys'] = this.filters['categorys'].filter((item) => item !== category);
        this.view();
    }

    addBrand(brand: string) {
        this.filters['brands'].push(brand);
        this.view();
    }

    removeBrand(brand: string) {
        this.filters['brands'] = this.filters['brands'].filter((item) => item !== brand);
        this.view();
    }

    price(min: number, max: number) {
        this.filters['price'][0] = min;
        this.filters['price'][1] = max;
        this.view();
    }

    stock(min: number, max: number) {
        this.filters['stock'][0] = min;
        this.filters['stock'][1] = max;
        this.view();
    }

    textSearch(str: string) {
        this.filters['text'] = str;
        this.view();
    }

    view() {
        const productContainer = document.querySelector('.products__wrapper') as HTMLElement;
        const arrCollection: Element[] = Array.from(productContainer.children);
        let found = 0;
        arrCollection.forEach((card) => {
            const cardCategory = String((card.querySelector('#category') as HTMLElement).textContent);
            const cardBrand = String((card.querySelector('#brand') as HTMLElement).textContent);
            const cardPrice = Number((card.querySelector('#price') as HTMLElement).textContent);
            const cardRating = Number((card.querySelector('#rating') as HTMLElement).textContent);
            const cardStock = Number((card.querySelector('#stock') as HTMLElement).textContent);
            if (this.filters['categorys'].length !== 0) {
                if (!this.filters['categorys'].includes(cardCategory)) {
                    (card as HTMLElement).style.display = 'none';
                    return;
                }
            }
            if (this.filters['brands'].length !== 0) {
                if (!this.filters['brands'].includes(cardBrand)) {
                    (card as HTMLElement).style.display = 'none';
                    return;
                }
            }
            if (this.filters['price'].length !== 0) {
                if (cardPrice < this.filters['price'][0] || cardPrice > this.filters['price'][1]) {
                    (card as HTMLElement).style.display = 'none';
                    return;
                }
            }
            if (this.filters['stock'].length !== 0) {
                if (cardStock < this.filters['stock'][0] || cardStock > this.filters['stock'][1]) {
                    (card as HTMLElement).style.display = 'none';
                    return;
                }
            }
            if (this.filters['text'].length !== 0) {
                const stringCompare = (str1: string, str2: string) => str1.toLowerCase().includes(str2.toLowerCase());
                if (
                    !(
                        stringCompare(cardCategory, this.filters['text']) ||
                        stringCompare(cardBrand, this.filters['text']) ||
                        stringCompare(String(cardRating), this.filters['text']) ||
                        stringCompare(String(cardPrice), this.filters['text']) ||
                        stringCompare(String(cardStock), this.filters['text'])
                    )
                ) {
                    (card as HTMLElement).style.display = 'none';
                    return;
                }
            }
            found += 1;
            (card as HTMLElement).style.display = 'inline-flex';
        });
        if (found === 0) (document.querySelector('.products__not-found') as HTMLElement).style.display = 'block';
        else (document.querySelector('.products__not-found') as HTMLElement).style.display = 'none';

        (document.querySelector('.products__quantity') as HTMLElement).textContent = String(found);
    }
}

export default Filters;
