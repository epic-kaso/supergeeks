/**
 * Nav Menu
 */

$(
    function(){
        window.menustate = {open: false};
    var menu_item =  $('ul.super-nav li a');
    var drop_down_menu = $('.drop-menu-bar');

    menu_item.click(function(){
        var $status = window.menustate.open;
        if($status == true && this ===  window.menustate.active){
            set_unactive(this);
            hide();
        }else{
            set_active(this);
            reveal();
            show_my_menu($(this).attr('id'));
        }
    });

    //menu_item.hover(function(){
    //    var $status = window.menustate.open;
    //    if(this ===  window.menustate.active){
    //        return;
    //    }
    //    if($status == true){
    //        show_my_menu($(this).attr('id'));
    //    }
    //},function(){
    //    var $status = window.menustate.open;
    //    if(this ===  window.menustate.active){
    //        return;
    //    }
    //    if($status == true){
    //        show_prev_menu();
    //    }
    //});

        function set_active(item){
            menu_item.parent().removeClass('active');
            $(item).parent().addClass('active');
            window.menustate.active = item;
        }

        function set_unactive(item){
            menu_item.parent().removeClass('active');
            $(item).parent().removeClass('active');
        }
        function show_my_menu(id){
            var menu = $('ul[data-menu-id="'+id+'"]');
            var menus = $('.drop-menu-bar .container ul');

            menus.hide();
            menu.fadeIn(400);
        }

        function show_prev_menu(){
            show_my_menu($(window.menustate.active).attr('id'));
        }

        function reveal(){
            if(!drop_down_menu.hasClass('show-drop-menu')){
                drop_down_menu
                    .addClass('show-drop-menu');
            }
            window.menustate.open = true;
        }

        function hide(){
            if(drop_down_menu.hasClass('show-drop-menu')){
                drop_down_menu
                    .removeClass('show-drop-menu');
            }
            window.menustate.open = false;
        }
});

