(function ( $ ) {
 
    $.fn.dropdown = function( options ) {

        this.each(function() {
            var element = this;
            var $element = $(this);
            if(typeof(options) === "string"){
                if(options === "open"){
                    openAction(element);
                }else if(options === "close"){
                    closeAction(element);
                }else if(options === "toggle"){
                    toggleAction(element);
                }else if(options === "destroy"){
                    destroy(element)
                }
                // else if(options === "getSelected"){
                //     getSelectedItem(element);
                // }
            }else{
                var settings = $.extend({
                    data : [],
                    placeholder : "Select option",
                    className : null,
                    headerWidth : null,
                    headerHeight : null,
                    openOnTop : false,
                    search : false,
                    disable : false,
                    searchPlaceholder : "Search items",
                    selecteditem : null,
                    theme : 'normal',

                    // Callbacks
                    onOptionSelect : function(){},
                    onOpen : function(){},
                    onClose : function(){}
                }, options );

                init();
            } 
        });

        function getSelectedItem(element){

        }

        function destroy(element){
            if(element.hasClass('dropdown-container')){
                element.removeClass('dropdown-container');
            }
            if(element.hasClass('show')){
                element.removeClass('show');
            }
            if(element.hasClass('flat-ui')){
                element.removeClass('flat-ui');
            }
            element.empty()

        }

        function init(){
            var dropdownData = JSON.parse(JSON.stringify(settings.data));
            if(!settings.selecteditem){
                settings.selecteditem = dropdownData[0];
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

            if(settings.theme === "flat"){
                conainerClass = conainerClass+" "+"flat-ui"
            }

            var wrapper = element.addClass(conainerClass);

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
                            closeDropdown(e);
                            if(settings.onOptionSelect && typeof settings.onOptionSelect === "function"){
                                settings.onOptionSelect(obj.name);
                            }
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
                    closeDropdown(event);
                }
            });

            return element.append(wrapper);
        }

        function toggleAction(element){
            element.hasClass('show') ? element.removeClass('show'): element.addClass('show');
        }

        function openAction(element){
            element.hasClass('show') ? "": element.addClass('show');
        }

        function closeAction(element){
            element.hasClass('show') ? element.removeClass('show'): "";
        }

        function toggleDropdown(event){
            if($(event.target).closest(".dropdown-container").hasClass('show')){
                closeDropdown(event);
            }else{
                openDropdown(event);
            }
        }

        function closeDropdown(event){
            $('.dropdown-container .search-input').val("");
            reRenderdropdown(settings.data);
            $(".dropdown-container").removeClass('show');   
            $(event.target).closest(".dropdown-container").find('.search-input').blur();

            if(settings.onClose && typeof settings.onClose === "function"){
                settings.onClose(settings.selecteditem, settings.data);
            }
        }

        function openDropdown(event){
            $(event.target).closest(".dropdown-container").addClass('show');      
            $(event.target).closest(".dropdown-container").find('.search-input').focus();

            if(settings.onOpen && typeof settings.onOpen === "function"){
                settings.onOpen(settings.selecteditem, settings.data);
            }
        }

        function reRenderdropdown(data,event){
            if(event){
                var dropdownList = $(event.target).closest('.dropdown-container').find('.items-container');    
            }else{
                var dropdownList = $('.dropdown-container').find('.items-container');    
            }
            dropdownList.empty();

            if(data.length > 0){
                $.each(data, function(index,obj){
                    $('<div />', {
                        "class": 'item',
                        "data-id": index,
                        text: obj.name,
                        click: function(e){
                            if(settings.onOptionSelect && typeof settings.onOptionSelect === "function"){
                                settings.onOptionSelect(obj.name);
                            }
                            settings.selecteditem = obj;
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
 
    };
 
}( jQuery ));