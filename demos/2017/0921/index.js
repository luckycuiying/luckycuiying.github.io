var person = function(){
    this.name ='多多';
    this.say = function(){
        return 'Remember'
    }
}
var woman = function(){
    this.say = function(){
        return '亲们~多多关照'
    }
}
woman.prototype = new person();
var x = new woman();
// alert('这位美女的名字是'+x.name+';'+'美女对大家说：“'+x.say()+'”')
function a(){
    this.text = 'a的弹窗'
}
function b(){
    this.text = 'b的弹窗'
}
function c(){
    var x = new a();
    y = new b();
    return y
}
c()
// alert(y.text)
