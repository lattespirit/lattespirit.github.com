$(document).ready(function () {

    // Focus on input in Search Page
    $('.ls-search-page-input').focus();

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

    // Dispaly Modal Search Result
    $('.ls-modal-search-input').bind('input propertychange', function() {
        $.fn.generateSearchResult($(this), function(searchResult) {

            var display = '';
            if (searchResult.length > 0) {
                for (index in searchResult) {
                    item = searchResult[index];
                    display += '<h4 class="media-heading"><h4><a href="' + item.url + '" target="_blank">' + item.title+ '</a></h4><hr>';
                }
            } else {
                display = '<center><h3>糟糕，没有找到搜索结果</h3></center>';
            }

            $('.media-body').empty().html(display);
        });
    });

    // Display Search-Page Search Result
    $('.ls-search-page-input').bind('input propertychange', function() {
        $.fn.generateSearchResult($(this), function(searchResult) {

            var display = '';
            if (searchResult.length > 0) {
                for (index in searchResult) {
                    item = searchResult[index];
                    display += '<h4 class="media-heading"><h4><a href="' + item.url + '" target="_blank">' + item.title+ '</a></h4><hr>';
                }
            } else {
                display = '<center><h3>糟糕，没有找到搜索结果</h3></center>';
            }

            $('.media-body').empty().html(display);
        });
    });


    // Display Navbar Search Result
    $('.ls-nav-search-input').bind('input propertychange', function() {
        $.fn.generateSearchResult($(this), function(searchResult) {
            var display = '';
            if (searchResult.length > 0) {
                for (index in searchResult) {
                    item = searchResult[index];
                    display += '<h4 class="media-heading"><h4><a href="' + item.url + '" target="_blank">' + item.title+ '</a></h4><hr>';
                }
            } else {
                display = '<h4 class="text-center">糟糕，没有找到搜索结果</h4><hr>';
            }

            $('.ls-nav-search-data').empty().html(display);
        });

        if ($(this).val() != '') {
            $('.ls-nav-search-well').show();
        }
    });
    

    // Show Search Navbar on Mobile when search button hit
    $('#ls-show-search-nav-button').click(function() {
        $('#ls-nav-default').addClass('ls-hide-nav');
        $('#ls-nav-search').removeClass('ls-hide-nav');

        $('.ls-nav-search-input').focus();

    });

    // Hide Search Navbar on Mobile when hide-search-button hit 
    $('#ls-hide-search-button').click(function() {
        $('#ls-nav-default').removeClass('ls-hide-nav');
        $('#ls-nav-search').addClass('ls-hide-nav');

        $('.ls-nav-search-well').hide();
    });

    // Add stylesheet to about page according to window width
    if ($(window).width() >= 768) {
        $('#ls-about-dl').addClass('ls-about-dl');
    }

    // Generate Search Result
    $.fn.generateSearchResult = function (inputObject, callback) {

        var searchResult = [];
        var keyword = inputObject.val().trim().toLowerCase();

        $.ajax({
            url: '/search.json',
            dataType: 'json',
        })
        .done(function(data) {
            var selected = [],
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

                        searchResult.push(pushItem);
                        selected.push(article.title);
                    }
                }
            }

            if (searchResult.length > 0) {
                for (index in searchResult) {
                    item = searchResult[index];
                    if (item.title.toLowerCase() == keyword) {
                        var fullMatchKeyword = searchResult.splice(index, 1);
                        searchResult.unshift(fullMatchKeyword[0]);
                    }
                }
            }

            callback(searchResult);
        });
    }
});