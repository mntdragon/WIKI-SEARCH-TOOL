var displayWikiData = function(){
    var linksElement = $('#links');
    var input = $('#searchString').val();
    var searchString = input.trim();
    var wikipediaUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=info&list=search&callback=wikiCallback&utf8=1&inprop=url&srsearch=" + searchString + "&srlimit=10"
// {
// 	"action": "query",
// 	"format": "json",
// 	"origin": "*",
// 	"prop": "info",
// 	"list": "search",
// 	"callback": "wikiCallback",
// 	"utf8": 1,
// 	"inprop": "url",
// 	"srsearch": "searchString",
// 	"srlimit": "10"
// }
console.log(wikipediaUrl);
    $.ajax({
        url: wikipediaUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(res){
            linksElement.empty();
            var linkList = res.query.search;
            // //output the results of Wikipedia data onto the screen
            linkList.forEach(function(item) {
                var url = 'https://en.wikipedia.org/wiki/' + item.title;
                console.log('url '+ url);
                linksElement.append(
                '<div class="resultItem"><h3 class="resultItem-title"><a href="' + url + '" target="_blank" rel="noopener">' + item.title + '</a></h3><span class="resultItem-snippet">' + item.snippet + '</span><br><a href="' + url + '" class="resultItem-link" target="_blank" rel="noopener">'+ url + '</a></div>'
                );

            });
        }
    });
    //prevent form to submit and missing it's value (the page will refresh)
    return false;
};


//hit form, run the function !
$('#searchForm').submit(displayWikiData);