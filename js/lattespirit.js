$(document).ready(function () {

    $('.ls-input').focus();

    // Control Search Modal
    var isModalOpened = false;

    button = $('#search-modal');

    button.on('shown.bs.modal', function (e) {
        isModalOpened = true;
        $('.form-control').focus();
    })

    button.on('hidden.bs.modal', function (e) {
        isModalOpened = false;
    })

    $(this).on('keyup', function(e) {
        var tag = e.target.tagName.toLowerCase();
        if (e.which === 83 && tag != 'input') {
            if (! isModalOpened) {
                button.modal('show');
            }
        }
    });

    // Dispaly Search Result
    $('.form-control').bind('input propertychange', function() {

        var keyword = $(this).val().trim().toLowerCase();

        $.ajax({
            url: '/search.json',
            dataType: 'json',
        })
        .done(function(data) {
            var items = [],
                selected = [],
                columns = ['title', 'content'];
            for (i in columns) {
                var column = columns[i];

                for (j in data) {
                    var list = '',
                        fussyCount = 0,
                        article = data[j],
                        isKeywordExists = false,
                        isFussySearchable = false,
                        isTitleNotSelected = false,
                        search = subStr = article[column].toLowerCase();

                    if (search.indexOf(keyword) >= 0) { isKeywordExists = true; }
                    if (selected.indexOf(article.title) < 0) { isTitleNotSelected = true; }


                    for (var l = 0; l < keyword.length; l++) {
                        var position = subStr.indexOf(keyword[l]);
                        if (position >= 0) {
                            fussyCount++;
                            subStr = subStr.substr(position + 1);
                        }
                    }

                    if (fussyCount == keyword.length) { isFussySearchable = true; }

                    if (
                        (isKeywordExists || isFussySearchable)
                        &&
                        isTitleNotSelected
                    ) {
                        var pushItem = new Object();
                            pushItem.title = article.title;
                            pushItem.content = article.content;
                            pushItem.url = article.url

                        items.push(pushItem);
                        selected.push(article.title);
                    }
                }
            }

            if (items.length > 0) {
                for (index in items) {
                    item = items[index];
                    if (item.title.toLowerCase() == keyword) {
                        var fullMatchKeyword = items.splice(index, 1);
                        items.unshift(fullMatchKeyword[0]);
                    }
                }

                for (index in items) {
                    item = items[index];
                    list += '<h4 class="media-heading"><h4><a href="' + item.url + '" target="_blank">' + item.title+ '</a></h4><hr>';
                }
            } else {
                list = '<center><h3>糟糕，没有找到搜索结果</h3></center>';
            }

            $('.media-body').empty().html(list);
        });
    });
});