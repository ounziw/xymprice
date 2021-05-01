function floatRound(value, num) {
    let base = Math.pow(10, num);
    return Math.round(value * base) / base;
}
jQuery(document).ready(function ($) {
    let url = "https://api.coingecko.com/api/v3/simple/price?ids=symbol&vs_currencies=jpy,usd";
    $.getJSON(url , function(data) {
        $('.xymprice').each(function (index, element) {
            let currency = $(element).data('currency');
            let num = $(element).data('num');
            let price;
            if (currency == 'usd') {
                price = data.symbol.usd;
            } else if (currency == 'jpy') {
                price = data.symbol.jpy;
            } else {
                console.log('"currency" seems invalid');
            }
            if (price > 0) {
                let price2display = floatRound(price,num);
                $(this).text(price2display);
            }

        });
    });
});