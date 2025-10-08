// Initial stock data (to simulate a fetch from a back-end/API)
let stocks = [
    { symbol: 'AAPL', price: 175.00, change: 0.50 },
    { symbol: 'GOOGL', price: 2800.00, change: -15.50 },
    { symbol: 'TSLA', price: 950.00, change: 10.25 },
    { symbol: 'AMZN', price: 3400.00, change: -5.75 },
    { symbol: 'MSFT', price: 300.00, change: 1.10 },
    { symbol: 'NVDA', price: 550.00, change: 3.45 }
];

const stockTicker = document.getElementById('stockTicker');

/**
 * Renders the initial stock items to the ticker.
 */
function renderTicker() {
    stockTicker.innerHTML = '';
    stocks.forEach(stock => {
        const item = document.createElement('div');
        item.classList.add('ticker-item');
        item.id = `stock-${stock.symbol}`;
        
        // Determine initial color class
        const changeClass = stock.change >= 0 ? 'price-up' : 'price-down';

        item.innerHTML = `
            <span class="ticker-symbol">${stock.symbol}</span>
            <span class="ticker-price ${changeClass}">$${stock.price.toFixed(2)}</span>
            <span class="ticker-change ${changeClass}">${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}</span>
        `;
        stockTicker.appendChild(item);
    });
}

/**
 * Simulates real-time data updates and refreshes the display.
 */
function updateTickerData() {
    // 1. Simulate fetching new data for each stock
    stocks = stocks.map(stock => {
        // Generate a random change (-1.50 to +1.50)
        const randomChange = (Math.random() * 3) - 1.5; 
        
        // Calculate the new price and change
        const newPrice = Math.max(0.01, stock.price + randomChange); // Ensure price > 0
        const newChange = newPrice - stock.price; 

        return {
            symbol: stock.symbol,
            price: newPrice,
            change: newChange
        };
    });

    // 2. Update the DOM for each stock
    stocks.forEach(stock => {
        const itemElement = document.getElementById(`stock-${stock.symbol}`);
        if (itemElement) {
            const priceElement = itemElement.querySelector('.ticker-price');
            const changeElement = itemElement.querySelector('.ticker-change');
            
            // Determine color class
            const changeClass = stock.change >= 0 ? 'price-up' : 'price-down';
            
            // Update classes and text
            priceElement.className = `ticker-price ${changeClass}`;
            changeElement.className = `ticker-change ${changeClass}`;
            
            priceElement.textContent = `$${stock.price.toFixed(2)}`;
            changeElement.textContent = `${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}`;
        }
    });
}

// Initial rendering
renderTicker();

// Set up the "real-time" update interval (e.g., update every 3 seconds)
setInterval(updateTickerData, 3000);