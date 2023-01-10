import json from './product.json';

type Product = {
  category: string;
  brand: string;
  title: string;
  price: number;
  stock: number;
  images: string[];
};

export class Print {
  product: Product[];
  prices: number[];
  stocks: number[];

  constructor() {
    this.product = json;
    this.prices = [];
    this.stocks = [];
  }

  drawProduct() {
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
    const filterListTemp = document.querySelector('#filterListTemp') as HTMLTemplateElement;
    const sliderPrice = document.querySelector('#sliderPrice') as HTMLElement;
    const sliderStock = document.querySelector('#sliderStock') as HTMLElement;
    const categorys = new Map<string, number>();
    const brands = new Map<string, number>();
    const prices = new Set<number>();
    const stocks = new Set<number>();
    //подсчёт все категорий брэндов цен и стоков а также печать карточек////////////////////////////////////////
    json.forEach((item) => {
      categorys.has(item.category)
        ? categorys.set(item.category, Number(categorys.get(item.category)) + 1)
        : categorys.set(item.category, 1);
      brands.has(item.brand)
        ? brands.set(item.brand, Number(brands.get(item.brand)) + 1)
        : brands.set(item.brand, 1);
      prices.add(item.price);
      stocks.add(item.stock);
      const clone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
      (clone.querySelector('#category') as HTMLElement).textContent = item.category;
      (clone.querySelector('#brand') as HTMLElement).textContent = item.brand;
      (clone.querySelector('#name') as HTMLElement).textContent = item.title;
      (clone.querySelector('#price') as HTMLElement).textContent = String(item.price);
      (clone.querySelector('#rating') as HTMLElement).textContent = String(item.rating);
      (clone.querySelector('#stock') as HTMLElement).textContent = String(item.stock);
      (clone.querySelector('.product') as HTMLElement).style.backgroundImage = `url(${item.images[0]})`;
      (document.querySelector('.products__wrapper') as HTMLElement).append(clone);
    });
    this.prices = Array.from(prices).sort((a, b) => a - b);
    this.stocks = Array.from(stocks).sort((a, b) => a - b);
    //печать всех чекбоксов/////////////////////////////////////////////////////////////////////////////////////
    for (const item of categorys) {
      const clone = filterListTemp.content.cloneNode(true) as HTMLElement;
      (clone.querySelector('.filters__label') as HTMLElement).textContent = item[0];
      (clone.querySelector('.filters__label') as HTMLElement).setAttribute('for', item[0]);
      (clone.querySelector('.filters__input') as HTMLElement).setAttribute('id', item[0]);
      (clone.querySelector('.filters__quantity_all') as HTMLElement).textContent = String(item[1]);
      (clone.querySelector('.filters__checkbox') as HTMLElement).setAttribute('data-category', item[0]);
      (document.querySelector('#categorys') as HTMLElement).append(clone);
    }
    for (const item of brands) {
      const clone = filterListTemp.content.cloneNode(true) as HTMLElement;
      (clone.querySelector('.filters__label') as HTMLElement).textContent = item[0];
      (clone.querySelector('.filters__label') as HTMLElement).setAttribute('for', item[0]);
      (clone.querySelector('.filters__input') as HTMLElement).setAttribute('id', item[0]);
      (clone.querySelector('.filters__quantity_all') as HTMLElement).textContent = String(item[1]);
      (clone.querySelector('.filters__checkbox') as HTMLElement).setAttribute('data-brand', item[0]);
      (document.querySelector('#brands') as HTMLElement).append(clone);
    }
    //setup слайдеров///////////////////////////////////////////////////////////////////////////////////////////
    const sliderSetup = (item: HTMLInputElement, index: number, arr: number[]) => {
      item.setAttribute('min', '0');
      item.setAttribute('max', `${arr.length - 1}`);
      if (index == 0) {
        item.setAttribute('value', '0');
        (item.parentNode?.parentNode?.firstElementChild
          ?.firstElementChild as HTMLElement).textContent = `${arr[0]}`;
      } else {
        item.setAttribute('value', `${arr.length - 1}`);
        (item.parentNode?.parentNode?.firstElementChild?.lastElementChild as HTMLElement).textContent = `${arr[arr.length - 1]
          }`;
      }
    };
    sliderPrice.querySelectorAll('input').forEach((item, index) => sliderSetup(item, index, this.prices));
    sliderStock.querySelectorAll('input').forEach((item, index) => sliderSetup(item, index, this.stocks));
  }
}

export default Print;
