var $btn1 = $('.toolbox > .expand');
var $btn2 = $('.toolbox > .collect');
var $imglistbox = $('.imglistbox');
$btn1.click(function(event) {
    event.preventDefault();
    $imglistbox.css({
        display: 'block'
    });
    $(this).hide();
    $btn2.css({
        display: 'block'
    });
});
$btn2.click(function(event) {
    event.preventDefault();
    $imglistbox.css({
        display: 'none'
    });
    $(this).hide();
    $btn1.css({
        display: 'block'
    });
});

