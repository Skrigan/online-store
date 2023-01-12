import Filters from './filters';
const filters = new Filters();

type Product = {
    category: string;
    brand: string;
    title: string;
    price: number;
    stock: number;
    images: string[];
    description: string;
    discountPercentage: number;
    rating: number;
};

export class Listeners {
    constructor(public prices: number[], public stocks: number[], public product: Product[]) {}
    addListeners() {
        const categorys = document.querySelector('#categorys') as HTMLElement;
        const brands = document.querySelector('#brands') as HTMLElement;
        const sliderPrice = document.querySelector('#sliderPrice') as HTMLElement;
        const sliderStock = document.querySelector('#sliderStock') as HTMLElement;
        const productsWrapper = document.querySelector('.products__wrapper') as HTMLElement;
        const allProducts: Element[] = Array.from(productsWrapper.children);
        const productsInput = document.querySelector('.products__input') as HTMLInputElement;
        const selectSort = document.querySelector('#selectSort') as HTMLSelectElement;
        const copyLink = document.querySelector('#copyLink') as HTMLElement;
        const productsView = document.querySelector('.products__view') as HTMLElement;
        const viewsButtons: Element[] = Array.from(productsView.children);
        const allCategorys: Element[] = Array.from(categorys.children);
        const allBrands: Element[] = Array.from(brands.children);
        const resetFilters = document.querySelector('#resetFilters') as HTMLElement;
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        const pageProduct = document.querySelector('.page-product') as HTMLElement;
        const containerMain = document.querySelector('.container_main') as HTMLElement;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const hashChange = () => {
            console.log('hash = ', window.location.hash);
            console.log('href = ', window.location);
            const hash: string[] = window.location.hash.split('=');
            const productIndex = Number(hash[1]);
            const maxIndex = this.product.length - 1;
            if (hash[0] === '#product?id' && productIndex <= maxIndex && productIndex >= 0) {
                containerMain.style.display = 'none';
                (pageProduct.querySelector('#prodCategory') as HTMLElement).textContent = this.product[productIndex][
                    'category'
                ].toUpperCase();
                (pageProduct.querySelector('#prodBrand') as HTMLElement).textContent = this.product[productIndex][
                    'brand'
                ].toUpperCase();
                (pageProduct.querySelector('#prodTitle') as HTMLElement).textContent = this.product[productIndex][
                    'title'
                ].toUpperCase();
                (pageProduct.querySelector('#prodHeader') as HTMLElement).textContent = this.product[productIndex][
                    'title'
                ].toUpperCase();
                (pageProduct.querySelector(
                    '#prodImg',
                ) as HTMLElement).style.backgroundImage = `url(${this.product[productIndex]['images'][0]})`;

                (pageProduct.querySelector('#prodDescription') as HTMLElement).textContent = this.product[productIndex][
                    'description'
                ];
                (pageProduct.querySelector('#prodPercentage') as HTMLElement).textContent = String(
                    this.product[productIndex]['discountPercentage'],
                );
                (pageProduct.querySelector('#prodRating') as HTMLElement).textContent = String(
                    this.product[productIndex]['rating'],
                );
                (pageProduct.querySelector('#prodStock') as HTMLElement).textContent = String(
                    this.product[productIndex]['stock'],
                );
                (pageProduct.querySelector('#prodSecondBrand') as HTMLElement).textContent = this.product[productIndex][
                    'brand'
                ];
                (pageProduct.querySelector('#prodSecondCategory') as HTMLElement).textContent = this.product[
                    productIndex
                ]['category'];
                (pageProduct.querySelector(
                    '#prodPrice',
                ) as HTMLElement).textContent = `€${this.product[productIndex]['price']}`;
                pageProduct.style.display = 'block';
            } else {
                containerMain.style.display = 'flex';
                pageProduct.style.display = 'none';
            }
        };
        hashChange();
        window.addEventListener('hashchange', () => hashChange());
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const resetFiltersEvent = (): void => {
            allCategorys.forEach((item) => ((item.querySelector('input') as HTMLInputElement).checked = false));
            allBrands.forEach((item) => ((item.querySelector('input') as HTMLInputElement).checked = false));
            filters.clearFilters();
            //   //killMePls..
            const price1 = sliderPrice.querySelector('#first') as HTMLInputElement;
            const price2 = sliderPrice.querySelector('#second') as HTMLInputElement;
            const stock1 = sliderStock.querySelector('#first') as HTMLInputElement;
            const stock2 = sliderStock.querySelector('#second') as HTMLInputElement;
            price1.value = price1.min;
            price2.value = price2.max;
            stock1.value = stock1.min;
            stock2.value = stock2.max;
            priceValue1 = Number(price1.min);
            priceValue2 = Number(price2.max);
            stockValue1 = Number(stock1.min);
            stockValue2 = Number(stock2.max);
            productsInput.value = '';
            comparingSliderValues(sliderPrice, Number(price1.min), Number(price2.max), this.prices, filters.price);
            comparingSliderValues(sliderStock, Number(stock1.min), Number(stock2.max), this.stocks, filters.stock);
        };
        resetFilters.addEventListener('click', () => resetFiltersEvent());
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
        let priceValue1 = Number((sliderPrice.querySelector('#first') as HTMLInputElement).value);
        let priceValue2 = Number((sliderPrice.querySelector('#second') as HTMLInputElement).value);
        let stockValue1 = Number((sliderStock.querySelector('#first') as HTMLInputElement).value);
        let stockValue2 = Number((sliderStock.querySelector('#second') as HTMLInputElement).value);
        const comparingSliderValues = (
            element: HTMLElement,
            value1: number,
            value2: number,
            arr: number[],
            callback: (value1: number, value2: number) => void,
        ) => {
            if (value2 >= value1) {
                (element.firstElementChild?.firstElementChild as HTMLElement).textContent = String(arr[value1]);
                (element.firstElementChild?.lastElementChild as HTMLElement).textContent = String(arr[value2]);
                callback.call(filters, arr[value1], arr[value2]);
            } else {
                (element.firstElementChild?.firstElementChild as HTMLElement).textContent = String(arr[value2]);
                (element.firstElementChild?.lastElementChild as HTMLElement).textContent = String(arr[value1]);
                callback.call(filters, arr[value2], arr[value1]);
            }
        };
        const sliderPriceEvent = (e: Event): void => {
            const target = <HTMLInputElement>e.target;
            if (target.id === 'first') priceValue1 = Number(target.value);
            else priceValue2 = Number(target.value);
            comparingSliderValues(sliderPrice, priceValue1, priceValue2, this.prices, filters.price);
        };
        (sliderPrice.querySelector('#first') as HTMLElement).addEventListener('input', (e) => sliderPriceEvent(e));
        (sliderPrice.querySelector('#second') as HTMLElement).addEventListener('input', (e) => sliderPriceEvent(e));
        const sliderStockEvent = (e: Event): void => {
            const target = <HTMLInputElement>e.target;
            if (target.id === 'first') stockValue1 = Number(target.value);
            else stockValue2 = Number(target.value);
            comparingSliderValues(sliderStock, stockValue1, stockValue2, this.stocks, filters.stock);
        };
        (sliderStock.querySelector('#first') as HTMLElement).addEventListener('input', (e) => sliderStockEvent(e));
        (sliderStock.querySelector('#second') as HTMLElement).addEventListener('input', (e) => sliderStockEvent(e));
    }
}

export default Listeners;
