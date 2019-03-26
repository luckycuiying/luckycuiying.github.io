
// let $box = $('#box');
// $box.click(function(evt){
//     var target = evt.target;//是原生对象，不是jquery对象
//     while(target.tagName.toLowerCase()!== 'ul'){
//         if(target.getAttribute('data-index')){
//             console.log(target.getAttribute('data-index'))
//             return target.getAttribute('data-index');
//         }
//         target = target.parentNode;
//     }
// })


// let $box = document.querySelector("#box");
// $box.addEventListener("click", function (evt) {
//     var target = evt.target;
//     while(target.tagName.toLowerCase()!== 'ul'){
//         if(target.getAttribute('data-index')){
//             console.log(target.getAttribute('data-index'))
//             return target.getAttribute('data-index');
//         }
//         target = target.parentNode;
//     }
// }, false);
//
//
//
//
//
//
//
let $lis = document.querySelectorAll("#box li");
for (var i = 0; i < $lis.length; i++) {
    $lis[i].addEventListener("click", function (evt) {
        // this !=== evt.target
        // currentTarget === this
        alert(this.getAttribute('data-index'))
    }, false);
}