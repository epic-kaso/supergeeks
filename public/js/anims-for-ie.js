/**
 * Created by kaso on 9/20/2014.
 */

$(
    function(){
        /**
         * Items for hover effect;
         */
        var info_box_caption = $('.info-box:hover > .caption');
        var info_box_img = $('.info-box:hover > img');

        info_box_caption.hover(function(){
           $(this).animate({
               'height': '50%',
               'opacity': '1'
           });
            console.log('hover called');
        },function(){
            $(this).animate({
                'height': '0',
                'opacity': '0'
            });
        });
    }
)