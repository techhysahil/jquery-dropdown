(function ( $ ) {
 
    $.fn.dropdown = function( options ) {
 
        var settings = $.extend({
            data : [],
            placeholder : "Select option",
            className : null,
            headerWidth : null,
            headerHeight : null,
            openOnTop : false,
            search : false,
            disable : false,
            searchPlaceholder : "Search items"
        }, options );

    var dropdownData = JSON.parse(JSON.stringify(settings.data));
 

        function toggleDropdown(event){
            $(event.target).closest(".dropdown-container").toggleClass('show');
        }

        function closeDropdown(){
            $(event.target).closest(".dropdown-container").removeClass('show');   
        }

        function openDropdown(){
            $(event.target).closest(".dropdown-container").addClass('show');      
        }

        function reRenderdropdown(data,event){
            var dropdownList = $(event.target).closest('.dropdown-container').find('.items-container');
            dropdownList.empty();

            if(data.length > 0){
                $.each(data, function(index,obj){
                    $('<div />', {
                        "class": 'item',
                        "data-id": index,
                        text: obj.name,
                        click: function(e){
                            console.log("click item:"+obj.name);
                            closeDropdown(e);
                        }
                    }).appendTo(dropdownList);    
                });    
            }else{
                $('<div />', {
                    "class": 'no-item',
                    text: "No item found",
                    click: function(e){
                        closeDropdown(e);
                    }
                }).appendTo(dropdownList);  
            }
        }

        var conainerClass;
        if(settings.className){
            conainerClass = 'dropdown-container'+" "+settings.className;
        }else{
            conainerClass = 'dropdown-container'   
        }

        if(settings.disable){
            conainerClass = conainerClass+ " " + "disable"
        }

        var wrapper = this.addClass(conainerClass);

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

        if(settings.search){
            var search = $('<div />', {
                "class": 'search',
            }).appendTo(dropdown);

            var input = $('<input />', {
                "class": 'search-input',
                "name": 'search',
                "placeholder": settings.searchPlaceholder,
                keyup: function(event){
                    var searchText = $(this).val();
                    var newDropdownData =[];
                    settings.data.forEach(function(item){
                        if(item.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
                            newDropdownData.push(item);
                        }
                    })
                    reRenderdropdown(newDropdownData,event);
                }
            }).appendTo(search); 
        }

        if(dropdownData.length > 0){
            var itemsContainer = $('<div />', {
                "class": 'items-container'
            }).appendTo(dropdown);


            $.each(dropdownData, function(index,obj){
                $('<div />', {
                    "class": 'item',
                    "data-id": index,
                    text: obj.name,
                    click: function(e){
                        console.log("click item:"+obj.name);
                        closeDropdown(e);
                    }
                }).appendTo(itemsContainer);    
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