(function($){

    var LEFT = false,
        RIGHT = true;

    function getWidth(element) {
        return $(element).outerWidth(true);
    }

    function getIndent( elements, current, pageSize, nextPage) {

        var result = 0, i = 0, elementWidth;

        if( nextPage ) {
            var border = current - pageSize;

            while( elements.length > i &&
                 (result - ( elementWidth = getWidth(elements[i]) ) >= border) ) {
                i++;
                result = result - elementWidth;
            }

            return elements.length === i ? current : result;
        } else {
            result = Math.min(current + pageSize, 0);
        }

        return result;

    }

    $(document).on('click','[data-component="carousel"]',function(event){
        var $target = $(event.target),
            direction;

        if( direction = $target.data('carousel-nav') ) {

            var $list = $('ol', event.currentTarget );
            var pageSize = $list.width();
            var indent = parseInt($list.css('textIndent'),10) || 0;

            indent = getIndent($list.children(), indent, pageSize, direction === "next" );

            $list.css("textIndent", indent + "px");
        }
    });

})(jQuery);