
alert(123)
function f1(){
    var dfd = $.Deferred();
    setTimeout(function(){
    console.log('1111');
    dfd.resolve();
    },500);
    return dfd.promise;
}
f1().then.f2();