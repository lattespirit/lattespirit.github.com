function renderSearch(docObject) {
    $('.ls-input').bind('input propertychange', function() {
        var keyword = docObject.val().trim().toLowerCase();

        $.ajax({
            url: '/search.json',
            dataType: 'json',
        })
        .done(function(data) {
            var items = [],
                columns = ['title', 'content'],
                selected = [];
            for (i in columns) {
                var column = columns[i];

                for (j in data) {
                    var article = data[j],
                        search = subStr = article[column].toLowerCase(),
                        list = '',
                        isKeywordExists = false,
                        isTitleNotSelected = false,
                        isFussySearchable = false,
                        fussyCount = 0;

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
                            pushItem.description = article.description;
                            pushItem.url = article.url

                        items.push(pushItem);
                        selected.push(article.title);
                    }
                }
            }

            for (index in items) {
                item = items[index];
                if (item.title.toLowerCase() == keyword) {
                    var fullMatchKeyword = items.splice(index, 1);
                    items.unshift(fullMatchKeyword[0]);
                }
            }

            for (index in items) {
                item = items[index];
                list += '<li><a href="' + item.url + '">' + item.title + '</li>';
            }

            $('.s-ul').empty().html(list);
        });
    });
}

function controlModal(docObject) {
    var isModalOpened = false;

    modal = $('#search-modal');

    modal.on('show.bs.modal', function (e) {
        isModalOpened = true;
    })

    modal.on('hidden.bs.modal', function (e) {
        isModalOpened = false;
    })

    docObject.on('keyup', function(e) {
        var tag = e.target.tagName.toLowerCase();
        if (e.which === 83 && tag != 'input') {
            if (! isModalOpened) {
                modal.modal('show');
            }
        }
    });
}

$(document).ready(function () {
    // Control Search Modal
    controlModal($(this));

    // Dispaly Search Result
    renderSearch($(this));
});