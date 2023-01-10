import Filters from './filters';
const filters = new Filters();

export class Listeners {
    constructor(public prices: number[], public stocks: number[]) {}
    addListeners() {
        const categorys = document.querySelector('#categorys') as HTMLElement;
        const brands = document.querySelector('#brands') as HTMLElement;
        const sliderPrice = document.querySelector('#sliderPrice') as HTMLElement;
        const sliderStock = document.querySelector('#sliderStock') as HTMLElement;
        const productsWrapper = document.querySelector('.products__wrapper') as HTMLElement;
        const allProducts: Element[] = Array.from(productsWrapper.children);
        const productsInput = document.querySelector('.products__input') as HTMLElement;
        const selectSort = document.querySelector('#selectSort') as HTMLSelectElement;
        const copyLink = document.querySelector('#copyLink') as HTMLElement;
        const productsView = document.querySelector('.products__view') as HTMLElement;
        const viewsButtons: Element[] = Array.from(productsView.children);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // const allCategorys: Element[] = Array.from(categorys.children);
        // const allBrands: Element[] = Array.from(brands.children);
        // const resetFilters = document.querySelector('#resetFilters') as HTMLElement;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // const resetFiltersEvent = (): void => {
        //   allCategorys.forEach((item) => ((item.querySelector('input') as HTMLInputElement).checked = false));
        //   allBrands.forEach((item) => ((item.querySelector('input') as HTMLInputElement).checked = false));
        //   filters.filters = [[], [], [], [], ''];
        //   //killMePls..
        //   const price1 = sliderPrice.querySelector('#first') as HTMLInputElement;
        //   const price2 = sliderPrice.querySelector('#second') as HTMLInputElement;
        //   const stock1 = sliderStock.querySelector('#first') as HTMLInputElement;
        //   const stock2 = sliderStock.querySelector('#second') as HTMLInputElement;
        //   price1.value = price1.min;
        //   price2.value = price2.max;
        //   stock1.value = stock1.min;
        //   stock2.value = stock2.max;
        //   filters.view();
        // };
        // resetFilters.addEventListener('click', () => resetFiltersEvent());
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const copyLinkEvent = (): void => {
            const copyTextarea = document.createElement('textarea');
            copyTextarea.style.position = 'fixed';
            copyTextarea.style.opacity = '0';
            copyTextarea.textContent = window.location.href;
            document.body.appendChild(copyTextarea);
            copyTextarea.select();
            document.execCommand('copy');
            document.body.removeChild(copyTextarea);
            copyLink.textContent = 'Copied!';
            setTimeout(() => (copyLink.textContent = 'Copy Link'), 1000);
        };
        copyLink.addEventListener('click', () => copyLinkEvent());
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const valueForSort = (card: Element, option: string): number =>
            Number((card.querySelector(`#${option}`) as HTMLElement).textContent);
        const selectSortEvent = (e: Event): void => {
            const target = <HTMLSelectElement>e.target;
            const optionValues: string[] = target.value.split(' ');
            if (optionValues[1] === 'ASC') {
                allProducts.sort(
                    (a: Element, b: Element) => valueForSort(a, optionValues[0]) - valueForSort(b, optionValues[0]),
                );
            } else {
                allProducts.sort(
                    (a: Element, b: Element) => valueForSort(b, optionValues[0]) - valueForSort(a, optionValues[0]),
                );
            }
            allProducts.forEach((item) => productsWrapper.append(item));
        };
        selectSort.addEventListener('change', (e) => selectSortEvent(e));
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const productsViewEvent = (e: Event): void => {
            const target = <HTMLElement>e.target;
            if (!target.classList.contains('view_active')) {
                viewsButtons.forEach((Element) => {
                    Element.classList.toggle('view_active');
                });
                allProducts.forEach((Element) => {
                    Element.classList.toggle('product_small');
                });
            }
        };
        productsView.addEventListener('click', (e) => productsViewEvent(e));
        const productsInputEvent = (e: Event): void => {
            filters.textSearch((e.target as HTMLInputElement).value);
        };
        productsInput.addEventListener('input', (e) => productsInputEvent(e));
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let priceValue1 = Number((sliderPrice.querySelector('#first') as HTMLInputElement).value);
        let priceValue2 = Number((sliderPrice.querySelector('#second') as HTMLInputElement).value);
        let stockValue1 = Number((sliderStock.querySelector('#first') as HTMLInputElement).value);
        let stockValue2 = Number((sliderStock.querySelector('#second') as HTMLInputElement).value);
        categorys.addEventListener('click', (e) => categorysEvent(e));
        brands.addEventListener('click', (e) => brandsEvent(e));
        function categorysEvent(e: Event): void {
            const target = <HTMLElement>e.target;
            if (target.classList.contains('filters__input')) {
                if ((target as HTMLInputElement).checked) {
                    filters.addCategory((target.parentNode as HTMLElement).getAttribute('data-category') as string);
                } else {
                    filters.removeCategory((target.parentNode as HTMLElement).getAttribute('data-category') as string);
                }
            }
        }
        function brandsEvent(e: Event): void {
            const target = <HTMLElement>e.target;
            if (target.classList.contains('filters__input')) {
                if ((target as HTMLInputElement).checked) {
                    filters.addBrand((target.parentNode as HTMLElement).getAttribute('data-brand') as string);
                } else {
                    filters.removeBrand((target.parentNode as HTMLElement).getAttribute('data-brand') as string);
                }
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const sliderPriceEvent = (e: Event): void => {
            const target = <HTMLInputElement>e.target;
            if (target.id === 'first') priceValue1 = Number(target.value);
            else priceValue2 = Number(target.value);
            if (priceValue2 >= priceValue1) {
                (sliderPrice.firstElementChild?.firstElementChild as HTMLElement).textContent = String(
                    this.prices[priceValue1],
                );
                (sliderPrice.firstElementChild?.lastElementChild as HTMLElement).textContent = String(
                    this.prices[priceValue2],
                );
                filters.price(this.prices[priceValue1], this.prices[priceValue2]);
            } else {
                (sliderPrice.firstElementChild?.firstElementChild as HTMLElement).textContent = String(
                    this.prices[priceValue2],
                );
                (sliderPrice.firstElementChild?.lastElementChild as HTMLElement).textContent = String(
                    this.prices[priceValue1],
                );
                filters.price(this.prices[priceValue2], this.prices[priceValue1]);
            }
        };
        (sliderPrice.querySelector('#first') as HTMLElement).addEventListener('input', (e) => sliderPriceEvent(e));
        (sliderPrice.querySelector('#second') as HTMLElement).addEventListener('input', (e) => sliderPriceEvent(e));

        const sliderStockEvent = (e: Event): void => {
            const target = <HTMLInputElement>e.target;
            if (target.id === 'first') stockValue1 = Number(target.value);
            else stockValue2 = Number(target.value);
            if (stockValue2 >= stockValue1) {
                (sliderStock.firstElementChild?.firstElementChild as HTMLElement).textContent = String(
                    this.stocks[stockValue1],
                );
                (sliderStock.firstElementChild?.lastElementChild as HTMLElement).textContent = String(
                    this.stocks[stockValue2],
                );
                filters.stock(this.stocks[stockValue1], this.stocks[stockValue2]);
            } else {
                (sliderStock.firstElementChild?.firstElementChild as HTMLElement).textContent = String(
                    this.stocks[stockValue2],
                );
                (sliderStock.firstElementChild?.lastElementChild as HTMLElement).textContent = String(
                    this.stocks[stockValue1],
                );
                filters.stock(this.stocks[stockValue2], this.stocks[stockValue1]);
            }
        };
        (sliderStock.querySelector('#first') as HTMLElement).addEventListener('input', (e) => sliderStockEvent(e));
        (sliderStock.querySelector('#second') as HTMLElement).addEventListener('input', (e) => sliderStockEvent(e));
    }
}

export default Listeners;
