# alfa-checkbox
html checkbox passing unchecked items to server. Native &lt;input type="checkbox"> does not do it.

dependency: jquery

CSS <style> tag is injected into <head> it can be overriden by user <style> set in <body> with !important; directive

<input type="checkbox" class="alfa-checkbox" name="nameOfDataField" />
NOTE:
unique name property is required! (needed for posting <form> and to associate <Label>)
id is set by code id=name

````javascript
$(document).ready(function () {
    $.alfaCheckbox('.alfa-checkbox', {
        onChange: function () { formDirty = true; $('button[type=submit]').show(); }
    });

    // to set value of checkbox programmatically:

    $.alfaCheckbox('#id', {set:true});

});
````
