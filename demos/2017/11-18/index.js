
        
   var docs = [
            {
                id: 1,
                words: ['hello',"world"]
            },
            {
                id: 2,
                words: ['hello',"kids"]
            },
            {
                id: 3,
                words: ['zzzz',"hello"]
            },
            {
                id: 4,
                words: ['world',"kids"]
            }
        ];
        function findDocList(docs,arr){
            var arr2 = [];
           for (var i = 0; i < docs.length; i++) {
                var cur = docs[i].words;
                var curId = docs[i].id;
                var sucess =true;
                for (var j = 0; j < arr.length; j++) {
                      if(cur.indexOf(arr[j])===-1){
                        sucess = false;
                        break;
                      }  
                }
                if(sucess==true){
                    arr2.push(curId)
                }

            }
           return (arr2) 
        }
    var res = findDocList(docs,['hello']) //文档1，文档2，文档3
    console.log(res)

    var res2 = findDocList(docs,['hello','world']) //文档1
    console.log(res2)