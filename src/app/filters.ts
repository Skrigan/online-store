export class Filters {
  // [0] - categorys, [1] - brands, [2] - min, max price, [3] - min, max stock, [4] - text search
  filters: [string[], string[], number[], number[], string];

  constructor() {
    this.filters = [[], [], [], [], ''];
  }

  addCategory(category: string) {
    this.filters[0].push(category);
    this.view();
  }

  removeCategory(category: string) {
    this.filters[0] = this.filters[0].filter((item) => item !== category);
    this.view();
  }

  addBrand(brand: string) {
    this.filters[1].push(brand);
    this.view();
  }

  removeBrand(brand: string) {
    this.filters[1] = this.filters[1].filter((item) => item !== brand);
    this.view();
  }

  price(min: number, max: number) {
    this.filters[2][0] = min;
    this.filters[2][1] = max;
    this.view();
  }

  stock(min: number, max: number) {
    this.filters[3][0] = min;
    this.filters[3][1] = max;
    this.view();
  }

  textSearch(str: string) {
    this.filters[4] = str;
    this.view();
  }

  view() {
    const productContainer = document.querySelector('.products__wrapper') as HTMLElement;
    const arrCollection: Element[] = Array.from(productContainer.children);
    let found = 0;
    arrCollection.forEach((card) => {
      // если массив брэндов не пустой и карточка не имеет нужной категории;
      const cardCategory = String((card.querySelector('#category') as HTMLElement).textContent);
      const cardBrand = String((card.querySelector('#brand') as HTMLElement).textContent);
      const cardPrice = Number((card.querySelector('#price') as HTMLElement).textContent);
      const cardRating = Number((card.querySelector('#rating') as HTMLElement).textContent);
      const cardStock = Number((card.querySelector('#stock') as HTMLElement).textContent);
      if (this.filters[0].length !== 0) {
        if (!this.filters[0].includes(cardCategory)) {
          (card as HTMLElement).style.display = 'none';
          return;
        }
      }
      if (this.filters[1].length !== 0) {
        if (!this.filters[1].includes(cardBrand)) {
          (card as HTMLElement).style.display = 'none';
          return;
        }
      }
      if (this.filters[2].length !== 0) {
        if (cardPrice < this.filters[2][0] || cardPrice > this.filters[2][1]) {
          (card as HTMLElement).style.display = 'none';
          return;
        }
      }
      if (this.filters[3].length !== 0) {
        if (cardStock < this.filters[3][0] || cardStock > this.filters[3][1]) {
          (card as HTMLElement).style.display = 'none';
          return;
        }
      }
      if (this.filters[4].length !== 0) {
        const stringCompare = (str1: string, str2: string) => str1.toLowerCase().includes(str2.toLowerCase());
        if (
          !(
            stringCompare(cardCategory, this.filters[4]) ||
            stringCompare(cardBrand, this.filters[4]) ||
            stringCompare(String(cardRating), this.filters[4]) ||
            stringCompare(String(cardPrice), this.filters[4]) ||
            stringCompare(String(cardStock), this.filters[4])
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
