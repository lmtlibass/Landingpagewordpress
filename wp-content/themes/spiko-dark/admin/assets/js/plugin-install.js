jQuery(document).ready(function($) {
    'use strict';
    var this_obj = spiko_dark_companion_install;
    $(document).on('click', '.spicethemes-plugin-install', function(event) {
        event.preventDefault();
        var button = $(this);
        var slug = button.data('slug');
        button.text(this_obj.installing + '...').addClass('updating-message');
        wp.updates.installPlugin({
            slug: slug,
            success: function(data) {
                button.attr('href', data.activateUrl);
                button.text(this_obj.activating + '...');
                button.removeClass('button-secondary updating-message spicethemes-plugin-install');
                button.addClass('button-primary spicethemes-plugin-activate');
                button.trigger('click');
            },
            error: function(data) {
                console.log('error', data);
                button.removeClass('updating-message');
                button.text(this_obj.error);
            },
        });
    });
    $(document).on('click', '.spicethemes-plugin-activate', function(event) {
        event.preventDefault();
        var button = $(this);
        var url = button.attr('href');
        if (typeof url !== 'undefined') {
            // Request plugin activation.
            jQuery.ajax({
                async: true,
                type: 'GET',
                url: url,
                beforeSend: function() {
                    button.text(this_obj.activating + '...');
                    button.removeClass('button-secondary');
                    button.addClass('button-primary activate-now updating-message');
                },
                success: function(data) {
                    location.reload();
                }
            });
        }
    });
    $(document).on('click', '.action-watch', function(event) {
        event.preventDefault();
        var action_id = $(this).parents('.action').attr('id');
        var $icon =   $(this).children('.dashicons');
        if(action_id){
            $.ajax({
                url: this_obj.ajax_url,
                type: 'POST',
                data: {action: 'spiko_dark_update_rec_acts', action_id:action_id},
                success:function(data) {
                    if($icon.hasClass('dashicons-visibility')){
                        $icon.removeClass('dashicons-visibility');
                        $icon.addClass('dashicons-hidden');
                    }else{
                        $icon.removeClass('dashicons-hidden');
                        $icon.addClass('dashicons-visibility');
                    }
                }
            });
        }        
    });
    $(document).on('click', '.spicethemes-customizer-notification-dismiss', function(event) {
        event.preventDefault();
        var $container = $(this).parent();
        var $icon_child = $(this).children('i.fa'); 
        if($icon_child.hasClass('fa-refresh')){
            return;
        }
        var slug = $(this).data('slug');
        var sdata = {};
        if(slug){
            sdata.action = 'spiko_dark_hide_customizer_notice';
            sdata.chilly_plugin_slug = slug;
        }else{
            sdata.action = 'spiko_dark_hide_customizer_companion_notice';
        }
        $icon_child.removeClass('fa-times').addClass('fa-refresh fa-spin');
        $.ajax({
            url: this_obj.ajax_url,
            type: 'POST',
            data: sdata,
            success:function(data) {
                console.log(data);
                $container.remove();
            }
        });
    });   
});
jQuery(function(){
	var $mainspiko_dark=jQuery('#main-content');
	$cat_links=jQuery('ul.categories-filters li a');
	
	$cat_links.on('click',function(e){
		e.preventDefault();
		$e1=jQuery(this);
		var value=$e1.attr("href");
		$mainspiko_dark.animate({opacity:"0.5"});
		$mainspiko_dark.load(value + "#getting_started",function(){
		$mainspiko_dark.animate({opacity:"1"});	
		});
	});
});