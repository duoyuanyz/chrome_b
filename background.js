var id = setInterval(function(){
    bookmarks();
}, 1600)



function bookmarks(){
    //标签
chrome.bookmarks.getTree(function(item){
    var biaoqian=false;
    var biaoqiantitle="b站学习视频";
    var bzBookmarks=[];
    var historyArray=[];
    var bookmarksArray=item;
    var isFind=false;
    
    //获取所有b站学习视频标签
    while(bookmarksArray && bookmarksArray.length>0){
        var subArray=[];
        for(var i=0;i<bookmarksArray.length;i++){
            if(!bookmarksArray){
                return;
            }
            if(isFind &&bookmarksArray[i].url!=''){
                bzBookmarks.push(bookmarksArray[i]);
            }
            if(!bookmarksArray[i].children){
                continue;
            }
            subArray.push.apply(subArray,bookmarksArray[i].children);
            if(bookmarksArray[i].title==biaoqiantitle){
                subArray=bookmarksArray[i].children;
                isFind=true;
                break;
            }
        }
        
        bookmarksArray=subArray;
    }

    //创建b站学习文件夹
    if(!isFind){
        chrome.bookmarks.create({
            title:"b站学习视频"
        }, function(){
    
        });
    }

    //处理标签
    var now = new Date();
    now.setMonth(now.getMonth()-1);
    bzBookmarks.forEach(element => {
        chrome.history.search({text:element.title,startTime:now.getTime(),endTime:new Date().getTime(),maxResults:1},function(item){
            if(item.length>0){
                var obj={
                    title:element.title,
                    url:item[0].url
                }
                chrome.bookmarks.update(element.id, obj, function(){
                    console.log(item)
                })
            }
            
        })
        
    })
})
    
}
