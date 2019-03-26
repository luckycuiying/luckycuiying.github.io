function Fn(num){
    this.a = num;
    this.b= function(){
        console.log(this.a);
    }
}
Fn.prototype.b = function(){
    console.log(this.a)
}
Fn.prototype.c = function(){
    this.b();
}
var f1 = new Fn(100);
var f2 = new Fn(200);
f1.b() // 100
f1._proto_.b() //100
f1.c() //100
f1._proto_c() //100
Fn.prototype.c();  //100
 




console.log(f1.b = f2.b) //false
console.log(f1.c = f2.c) //true
console.log(f1.b = Fn.prototype.b) //false
console.log(f1._proto_.b = f2._proto_b) //true
console.log(f1._proto_.b = Fn.prototype.b) //true
