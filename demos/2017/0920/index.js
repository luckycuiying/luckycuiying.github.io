
var arr= [8,3,1,5,6,7,8,3,4,6];
function unique(){
    var res = [];
    var res2 = [] // 重复出现的元素
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        for (var j = 0; j < res.length; j++) {//j=0 j==length
            if(res[j]===item){
                break
            }
        }
        if(j===res.length){
            res.push(item)
        }
    }
    alert(res) ;
}
var  newA = unique;
newA();
function unique2(){
    var newArray = [];
    for (var i = 0; i < arr.length; i++) {
        var ele = arr[i];
        if(newArray.indexOf(ele) ===-1){
            newArray.push(ele);
        }
    }
    alert(newArray);
}
var  newA2 = unique2;
newA2();

// 利用对象键值对方法  原理：
//1> 把数组中的每一项当做一个对象的属性名和属性值存储起来。
// 2> 但是在每一次存储之前，我们首先判断当前这一项（n） 是否在对象中已经存在了 obj[n]
// 3> 如果值是N 说明对象已经存在这一项了，也就说明了N在之前数组中已经出现过一次N了，证明当前值已经重复了，我们在数组中删除这一项。
// 4> 如果值是undefined  说明对象中还没有这一项，也就是当前这一项还没有在数组中出现过，我们就把当前这一项当做对象的属性名和属性值存储进去即可
var arr2 = [2,3,4,5,6,2,3,4,5,6]
    var obj = {}
    for (var i = 0; i < arr.length; i++) {
        var cur = arr[i]
        if(obj[cur] == cur){ //说明对象已经存在这一项了，也就说明了cur在之前数组中已经出现过一次N了，证明当前值已经重复了，我们在数组中删除这一项。
            arr.splice(i,1); //我们就把当前这一项删除
            i--; // 因为splice() 改变原数组的length 也就是数组塌陷的现象。 所以我们删除一项后不加加。
            continue //如果存在怎执行删除，否则就执行continue 后面的代码。
        }
        obj[cur] = cur;// 把数组中的每一项当做一个对象的属性名和属性值存储对obj对象里。
    }
    obj=null;
console.log(arr2)
//splice()  存在问题，删除当前项，后面的所有索引都发生改变，如果后面有一千万项，就非常耗费性能
// 优化splice()  解决原理： 把末尾那一项的值拿过来替换当前项，在把数组末尾的那一项删除
    Array.prototype.myUnique=function(){
        var  obj = {};
        for (var i = 0; i < this.length; i++) {
          var cur = this[i];
          if(obj[cur] ===cur){
            this[i] = this[this.length-1];
            this.length--;
            i--;
            continue;
          }
          obj[cur] = cur;
          return this;
        }
        obj = null;
    }
    arr2.myUnique()

 
