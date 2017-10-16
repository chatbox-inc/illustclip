document.getElementById('btn_pageTop').addEventListener('click', function() {
    backToTop();
});

function backToTop() {
    let x1 = x2 = x3 = 0;
    let y1 = y2 = y3 = 0;
    if (document.documentElement) {
        x1 = document.documentElement.scrollLeft || 0;
        y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
        x2 = document.body.scrollLeft || 0;
        y2 = document.body.scrollTop || 0;
    }
    x3 = window.scrollX || 0;
    y3 = window.scrollY || 0;
    let x = Math.max(x1, x2, x3);
    let y = Math.max(y1, y2, y3);
    window.scrollTo(Math.floor(x / 2), Math.floor(y / 2));
    if (x > 0 || y > 0) {
        window.setTimeout('backToTop()', 30);
    }
}
