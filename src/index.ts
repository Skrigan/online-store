import './main.scss';
import Print from './app/print';
import Listeners from './app/listeners';
const print = new Print();
print.drawProduct();
const listeners = new Listeners(print.prices, print.stocks, print.product);
listeners.addListeners();
