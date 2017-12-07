(function ( $ ) {
 
    $.fn.dropdown = function( options ) {
 
        var settings = $.extend({
            data : [],
            placeholder : "Select option",
            className : null,
            headerWidth : null,
            headerHeight : null,
            openOnTop : false
        }, options );
 

        function toggleDropdown(event){
            $(event.target).closest(".dropdown-container").toggleClass('show');
        }

        function closeDropdown(){
            $(event.target).closest(".dropdown-container").removeClass('show');   
        }

        function openDropdown(){
            $(event.target).closest(".dropdown-container").addClass('show');      
        }

        var conainerClass;
        if(settings.className){
            conainerClass = 'dropdown-container'+" "+settings.className;
        }else{
            conainerClass = 'dropdown-container'   
        }

        var wrapper = $('<div />', {
                "class": conainerClass
            });

        var header = $('<div />', {
            "class": 'header',
            click: function(e){
                toggleDropdown(e)
            }
        }).appendTo(wrapper);

        var selecteditem = $('<div />', {
            "class": 'selected-text',
            text: settings.placeholder
        }).appendTo(header);

        var dropdown = $('<div />', {
            "class": 'dropdown'
        }).appendTo(wrapper);

        if(settings.data.length > 0){
            $.each(settings.data, function(index,obj){
                $('<div />', {
                    "class": 'item',
                    "data-id": index,
                    text: obj.name,
                    click: function(e){
                        closeDropdown(e);
                    }
                }).appendTo(dropdown);    
            });    
        }else{
            $('<div />', {
                "class": 'no-item',
                text: "No item found",
                click: function(e){
                    closeDropdown(e);
                }
            }).appendTo(dropdown);  
        }

        // Close Dropdown when click outside
        $(document).on("click",function(event) {
            var ele = $('.dropdown-container');
            if(!ele.find(event.target).length > 0 && $('.dropdown-container').hasClass("show")){
                $('.dropdown-container').removeClass('show');
            }
        });
        

        





        return this.append(wrapper);
        this.append('<div class="dropdown-wrapper"></div>')
 
    };
 
}( jQuery ));