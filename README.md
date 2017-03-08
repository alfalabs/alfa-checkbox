# alfa-checkbox
### jquery plugin for checkbox passing checked and unchecked items to server. 
Native `<input type="checkbox">` in `<form>` `post` passes only checked items as string "on". Unchecked items data is lost. It is impossible to uncheck something!<br>This plugin will pass data for each checkbox as string "true" or "false"

#### live demo:
[alfalabs checkbox demo](https://alfalabs.github.io/alfa-checkbox/jq-alfa-checkbox.html)

#### dependency: jquery.slim

CSS `<style>` tag is injected into `<head>` it can be overriden by user `<style>` set in `<body>` with `!important;` directive<br>
global CSS class name used: `alfa-checkbox` see [example](jq-alfa-checkbox.html) with overriden styles.

#### how to use:
attach class name to `<input>` checkbox tag
```html
<input type="checkbox" class="alfa-checkbox" name="nameOfDataField" />
```

NOTE:<br>
unique `name` property is required! (needed for posting `<form>` data and to associate `<Label>`)
<br>`id` is set by code `id=name`

```javascript
$(document).ready(function () {

	// initialize all checkboxes
    $.alfaCheckbox('.alfa-checkbox', {
		// optional callback function example:
        onChange: function () { formDirty = true; $('button[type=submit]').show(); }
    });

    // to set value of checkbox programmatically:
    $.alfaCheckbox('#id', {set:true});

});
```
see [html example](jq-alfa-checkbox.html) how to use.
