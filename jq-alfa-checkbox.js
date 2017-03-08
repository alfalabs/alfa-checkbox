/*  jq-alfa-checkbox.js  17.3.8

    dependency: jquery

    CSS <style> tag is injected into <head> it can be overriden by user <style> set in <body> with !important; directive

    <input type="checkbox" class="alfa-checkbox" name="nameOfDataField" />
    NOTE:
    unique name property is required! (needed for posting <form> and to associate <Label>)
    id is set by code id=name

    $(document).ready(function () {
        $.alfaCheckbox('.alfa-checkbox', {
            onChange: function () { formDirty = true; $('button[type=submit]').show(); }
        });

        // to set value of checkbox programmatically:

        $.alfaCheckbox('#id', {set:true});

    });

    

 */

; (function ($) {
    'use strict';

    $.alfaCheckbox = function (el, options ) {

        options = options || {};

        if (typeof options.set === 'boolean') {
            if ($(el).prop('disabled')) return;
            $(el).prop('checked', options.set).change();
            return;
        }

        var me = this;

        me.dirty = false;
        

        var init = function () {

            injectCSS();

            $(el).each(function (i) {
                var elem = this;
                
                var name = $(this).attr('name');
                $(elem).removeAttr('name'); // this name will be used by shadowing hidden input tag, so it has to be removed

                //var id = 'alfa-checkbox-' + i; // id is needed for label
                var id = name;
                $(elem).attr('id', id);

                $(elem).wrap('<div class="alfa-checkbox">');

                /*  NOTE:
                    all <input type="hidden"> will be submitted by for FORM post
                    as opposed to <input type="checkbox"> where only 'checked' items are posted as string "on", leaving false values lost!
                */
                if (name) {
                    var val = ($(elem).prop('checked')) ? 'value="true"' : 'value="false"';
                    $(elem).before('<input type="hidden" name="' + name + '" ' + val + ' />'); 
                }

                $(elem).after('<label for="' + id + '"></label>')
                $(elem).removeClass('alfa-checkbox');

                $(elem).change(function (e) {
                    $(elem).prev().attr('value', $(this).prop('checked')); // prev is hidden input, this value from hidden input will be posted to server
                    //if ($(this).prop('checked')) { $(this).attr('checked', 'checked') } else { $(this).removeAttr('checked') }
                    me.dirty = true;
                    if (options.onChange) options.onChange();
                });

            });
        }

        init();


        function injectCSS() {

            // resize
            var size = $('.alfa-checkbox').width();
            size = size < 16 ? 16 : size; // set minimum size
            //console.log($('.alfa-checkbox').width());

            var x = size / 18; // 18 was used previously so it stuck

            var css = '\
    .alfa-checkbox {  \
        position: relative; \
        display: inline-block; \
    } \
    .alfa-checkbox label { \
        width: '+(x*18)+'px; \
        height: '+ (x * 18) +'px; \
    } \
    .alfa-checkbox label:after { \
        width: '+ (x * 15) +'px; \
        height: '+ (x * 7) +'px; \
        top: 0; \
        border: '+ (x * 4) +'px solid black; \
    } \
    .alfa-checkbox label { \
        cursor: pointer; \
        position: absolute; \
        left: 0; \
        background: #d5d5d5; \
        border: 1px solid #757575; \
    } \
    .alfa-checkbox label:after { \
        opacity: 0.1; \
        content: \'\'; \
        position: absolute; \
        background: transparent; \
        border-top: none; \
        border-right: none; \
        -webkit-transform: rotate(-45deg); \
        -moz-transform: rotate(-45deg); \
        -o-transform: rotate(-45deg); \
        -ms-transform: rotate(-45deg); \
        transform: rotate(-45deg); \
    } \
    .alfa-checkbox input[type=checkbox]:checked + label:after { \
        opacity: 1; \
    } \
    .alfa-checkbox input[disabled] ~ label { \
        border-color: #2f2f2f; \
        cursor: default; \
    } \
    .alfa-checkbox input[disabled] ~ label:after { \
        opacity: 0; \
    }';

            $('head').append('<style id="alfa-checkbox-style">' + css + '</style>');

        }

    }
})(jQuery);