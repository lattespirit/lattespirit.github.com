import 'jquery';
import 'bootstrap';

class Lattespirit
{
    constructor() {
        this.initConfig();
        this.handleBehavior();
        this.handleSearch();
    }

    initConfig() {
        this.isModalOpened = false; // Set Modal Closed as default
    }

    handleBehavior() {
         this.handleInputBoxInSearchPage();
         this.handleSearchModal();
         this.handleAboutPageByDevice();
         this.handleMobileSearchNavbar();
    }

    // =========================HandleBehavior Start=========================
    handleInputBoxInSearchPage() {
        $('.ls-search-page-input').focus();
    }

    handleSearchModal() {
        $('#search-modal').on('shown.bs.modal', function (e) {
            this.isModalOpened = true;
            $('.form-control').focus();
        })

        $('#search-modal').on('hidden.bs.modal', function (e) {
            this.isModalOpened = false;
        })

        $(document).on('keyup', function(e) {
            let tag = e.target.tagName.toLowerCase();
            if (
                e.which === 83 
                && tag != 'input'
                && (! this.isModalOpened)
                ) 
            {
                $('#search-modal').modal('show');
            }
        });
    }

    handleAboutPageByDevice() {
        // Add stylesheet to about page according to window width
        if ($(window).width() >= 768) {
            $('#ls-about-dl').addClass('ls-about-dl');
        }
    }

    handleMobileSearchNavbar() {
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
    }
    // =========================HandleBehavior End=========================

    handleSearch() {
        let _this = this;
        // Dispaly Modal Search Result
        $('.ls-modal-search-input').bind('input propertychange', function() {
            _this.generateSearchResult($(this), 'h4', function(display) {
                $('.media-body').empty().html(display);
            });
        });

        // Display Search-Page Search Result
        $('.ls-search-page-input').bind('input propertychange', function() {
            _this.generateSearchResult($(this), 'h4', function(display) {
                $('.media-body').empty().html(display);
            });
        });

        // Display Navbar Search Result
        $('.ls-nav-search-input').bind('input propertychange', function() {
            _this.generateSearchResult($(this), 'h4', function(display) {
                $('.ls-nav-search-data').empty().html(display);
            });

            if ($(this).val() != '') {
                $('.ls-nav-search-well').show();
            }
        });
    }

    generateSearchResult(inputObject, wrapper, additional) {
        let selectedArticles = [];
        let keyword = inputObject.val().trim().toLowerCase();
        let _this = this;

        $.ajax({
            url: '/search.json',
            dataType: 'json',
        })
        .done(function(articles) {
            let display = '',
                selectedTitle = [];

            ['title', 'content'].forEach(function(column) {

                articles.forEach(function(article) {
                    let fussyCount = 0,
                        isNotSelected = false,
                        isKeywordExists = false,
                        isFussySearchable = false,
                        body = article[column].toLowerCase(),
                        subStr = article[column].toLowerCase();

                    if (body.includes(keyword)) { isKeywordExists = true; }

                    for (let charIndex = 0; charIndex < keyword.length; charIndex++) {
                        let position = subStr.indexOf(keyword[charIndex]);
                        if (position >= 0) {
                            fussyCount++;
                            subStr = subStr.substr(position + 1);
                        }
                    }

                    if (fussyCount == keyword.length) { isFussySearchable = true; }

                    if (! selectedTitle.includes(article.title)) { isNotSelected = true; }

                    if (
                        isNotSelected
                        &&
                        (isKeywordExists || isFussySearchable)
                    ) {
                        selectedTitle.push(article.title);
                        selectedArticles.push(article);
                    }
                });
            });

            selectedArticles = _this.raiseUpFullMatchContentArticle(selectedArticles, keyword);
            
            selectedArticles = _this.raiseUpFullMatchTitleArticle(selectedArticles, keyword);

            display = _this.generateDisplay(selectedArticles, wrapper);

            additional(display);
        });
    }

    raiseUpFullMatchContentArticle(selectedArticles, keyword) {
        if (selectedArticles.length > 0) {
            let index = 0,
                selectedArticle = '';
            for (index in selectedArticles) {
                selectedArticle = selectedArticles[index];
                if (selectedArticle.content.toLowerCase().includes(keyword)) {
                    let fullMatchKeyword = selectedArticles.splice(index, 1);
                    selectedArticles.unshift(fullMatchKeyword[0]);
                }
            }
        }

        return selectedArticles;
    }

    raiseUpFullMatchTitleArticle(selectedArticles, keyword) {
        if (selectedArticles.length > 0) {
            let index = 0,
                selectedArticle = '';
            for (index in selectedArticles) {
                selectedArticle = selectedArticles[index];
                if (selectedArticle.title.toLowerCase().includes(keyword)) {
                    let fullMatchKeyword = selectedArticles.splice(index, 1);
                    selectedArticles.unshift(fullMatchKeyword[0]);
                }
            }
        }

        return selectedArticles;
    }

    generateDisplay(selectedArticles, wrapper) {
        let index = 0,
            display = '',
            selectedArticle = '';
        if (selectedArticles.length > 0) {
            for (index in selectedArticles) {
                selectedArticle = selectedArticles[index];
                display += `<${wrapper} class="media-heading"><h4><a href="${selectedArticle.url}" target="_blank">${selectedArticle.title}</a></${wrapper}><hr>`;
            }
        } else {
            display = `<${wrapper} class="text-center">糟糕，没有找到搜索结果</${wrapper}><br>`;
        }

        return display;
    }

}

(new Lattespirit);