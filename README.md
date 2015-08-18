# Angular bootstrap date & time picker version: 0.3.13
================================

Native AngularJS datetime picker directive styled by Twitter Bootstrap 3

[![MIT License][license-image]][license-url]
[![Build Status](https://travis-ci.org/dalelotts/angular-bootstrap-datetimepicker.png?branch=master)](https://travis-ci.org/dalelotts/angular-bootstrap-datetimepicker)
[![devDependency Status](https://david-dm.org/dalelotts/angular-bootstrap-datetimepicker/dev-status.png)](https://david-dm.org/dalelotts/angular-bootstrap-datetimepicker#info=devDependencies)
[![PayPal donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=F3FX5W6S2U4BW&lc=US&item_name=Dale%20Lotts&item_number=angular%2dbootstrap%2ddatetimepicker&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted "Donate one-time to this project using Paypal")
<a href="https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fabout.twitter.com%2Fresources%2Fbuttons&amp;text=Check%20out%20this%20%23AngularJS%20directive%20that%20makes%20it%20dead%20simple%20for%20users%20to%20select%20dates%20%26%20times&amp;tw_p=tweetbutton&amp;url=https%3A%2F%2Fgithub.com%2Fdalelotts%2Fangular-bootstrap-datetimepicker&amp;via=dalelotts" target="_blank">
  <img src="http://jpillora.com/github-twitter-button/img/tweet.png"></img>
</a>


[Home / demo page](http://dalelotts.github.io/angular-bootstrap-datetimepicker/)

# Upgrading to 0.3.x

<code>weekStart</code> has been removed. This directive uses the locale aware 
[moment.js day of week](http://momentjs.com/docs/#/get-set/weekday/) to
determine which day is the first day of the week. If you would like a first 
day of week that is not standard for the locale you can create a 
[custom locale](http://momentjs.com/docs/#/customization/) 

## Easier to control width

The width of the entire control is set in css, which you can easily override.

## Better localization support

This directive uses localized date formats when available. One exception is the title
of the month view - moment does not (yet) have a localized format for month and year.

# (Almost) Complete re-write

This project started as an AngularJS specific re-write of the [bootstrap-datetimepicker project](https://github.com/smalot/bootstrap-datetimepicker).
Only the CSS file from the bootstrap-datetimepicker project was re-used.

#Dependencies

Requires:
 * AngularJS 1.2.26 or higher (1.0.x will not work)
 * moment.js 2.8.3 or higher for date parsing and formatting
 * bootstrap's glyphicons for arrows (Can be overridden in css)
 
optional:
 * bootstrap's dropdown component (`dropdowns.less`)

#Testing
We use karma and jshint to ensure the quality of the code. The easiest way to run these checks is to use gulp:

```
npm install
npm test
```

The karma task will try to open Chrome as a browser in which to run the tests.
Make sure Chrome is available or change the browsers setting in karma.config.js

#Usage
We use bower for dependency management. Add

```json
dependencies: {
    "angular-bootstrap-datetimepicker": "latest"
}
```

To your bower.json file. Then run

```html
bower install
```

This will copy the angular-bootstrap-datetimepicker files into your components folder, along with its dependencies.

Add the css:

```html
<link rel="stylesheet" href="components/bootstrap/dist/css/bootstrap.css">
<link rel="stylesheet" href="components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css"/>
```

Load the script files in your application:
```html
<script type="text/javascript" src="components/moment/moment.js"></script>
<script type="text/javascript" src="components/bootstrap/dist/js/bootstrap.js"></script>
<script type="text/javascript" src="components/angular/angular.js"></script>
<script type="text/javascript" src="components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js"></script>
```

Add the date module as a dependency to your application module:

```html
var myAppModule = angular.module('MyApp', ['ui.bootstrap.datetimepicker'])
```

Apply the directive to your form elements:

```html
<datetimepicker data-ng-model="data.date"></datetimepicker>
```

## Callback functions


### before-render
Attribute on datetimepicker element

If the value of the before-render attribute is a function, the date time picker will call this function
before rendering a new view, passing in data about the view.

```html
<datetimepicker data-ng-model="data.date" data-before-render="beforeRender($view, $dates, $leftDate, $upDate, $rightDate)"></datetimepicker>
```
This function will be called every time a new view is rendered.
```javascript
$scope.beforeRender = function ($view, $dates, $leftDate, $upDate, $rightDate) {
    var index = Math.floor(Math.random() * $dates.length);
    $dates[index].selectable = false;
}
```

The following parameters are supplied by this directive :
 * '$view' the name of the view to be rendered
 * '$dates' a (possibly empty) array of DateObject's (see source) that the user can select in the view.
 * '$leftDate' the DateObject selected if the user clicks the left arrow.
 * '$upDate' the DateObject selected if the user clicks the text between the arrows.
 * '$rightDate' the DateObject selected if the user clicks the right arrow.


```
DateObject {
    utcDateValue: Number - UTC time value of this date object. It does NOT contain time zone information so take that into account when comparing to other dates (or use localDateValue function).
    localDateValue: FUNCTION that returns a Number - local time value of this date object - same as moment.valueOf() or Date.getTime().
    display: String - the way this value will be displayed on the calendar.
    active: true | false | undefined - indicates that date object is part of the model value.
    selectable: true | false | undefined - indicates that date value is selectable by the user.
    past: true | false | undefined - indicates that date value is prior to the date range of the current view.
    future: true | false | undefined - indicates that date value is after the date range of the current view.
}
```
Setting the .selectable property of a DateObject to false will prevent the user from being able to select that date value.

### on-set-time
Attribute on datetimepicker element

If the value of the on-set-time attribute is a function, the date time picker will call this function
passing in the selected value and previous value.
```html
<datetimepicker data-ng-model="data.date" data-on-set-time="onTimeSet(newDate, oldDate)"></datetimepicker>
```
This function will be called when the user selects a value on the minView.
```javascript
$scope.onTimeSet = function (newDate, oldDate) {
    console.log(newDate);
    console.log(oldDate);
}
```

data-on-set-time="onTimeSet()"  <-- This will work

data-on-set-time="onTimeSet"    <-- **This will NOT work, the ()'s are required**


## Configuration Options

### startView

String.  Default: 'day'

The view that the datetimepicker should show when it is opened.
Accepts values of :
 * 'minute' for the minute view
 * 'hour' for the hour view
 * 'day' for the day view (the default)
 * 'month' for the 12-month view
 * 'year' for the 10-year overview. Useful for date-of-birth datetimepickers.

### minView

String. 'minute'

The lowest view that the datetimepicker should show.

### minuteStep

Number.  Default: 5

The increment used to build the hour view. A button is created for each <code>minuteStep</code> minutes.

### dropdownSelector

When used within a Bootstrap dropdown and jQuery, the selector specified in dropdownSelector will toggle the dropdown when a date/time is selected.

**NOTE:** dropdownSelector **requires** jquery and bootstrap.js. If do not have these available do not specify this option. If you do, an error will
 be logged and this option will be removed.

### icons

Object. Default: {left: 'glyphicon glyphicon-arrow-left', right: 'glyphicon glyphicon-arrow-right'}

Specify classes for the buttons with arrows.


## Working with ng-model
The angular-bootstrap-datetimepicker directive requires ng-model and the picked date/time is automatically synchronized with the model value.

This directive also plays nicely with validation directives such as ng-required.

The angular-bootstrap-datetimepicker directive stores and expects the model value to be a standard javascript Date object.

## ng-required directive
If you apply the required directive to element then the form element is invalid until a date is picked.

Note: Remember that the ng-required directive must be explicitly set, i.e. to "true".

## Examples

### Inline component.

```html
<datetimepicker data-ng-model="data.date" ></datetimepicker>
```
### Inline component with data bound to the page with the format specified via date filter:

```html
<datetimepicker data-ng-model="data.date" ></datetimepicker>
```
```
<p>Selected Date: {{ data.date | date:'yyyy-MM-dd HH:mm' }}</p>
```

Display formatting of the date field is controlled by Angular filters.

### As a drop-down:

```html
<div class="dropdown">
    <a class="dropdown-toggle" id="dLabel" role="button" data-toggle="dropdown" data-target="#" href="">
        Click here to show calendar
    </a>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
        <datetimepicker data-ng-model="data.date"
                        data-datetimepicker-config="{ dropdownSelector: '.dropdown-toggle' }"></datetimepicker>
    </ul>
</div>
```
In this example, the drop-down functionality is controlled by Twitter Bootstrap.
The <code>dropdownSelector</code> tells the datetimepicker which element is bound to the Twitter Bootstrap drop-down so
the drop-down is toggled closed after the user selectes a date/time.

### Drop-down component with associated input box.
```html
<div class="dropdown">
    <a class="dropdown-toggle my-toggle-select" id="dLabel" role="button" data-toggle="dropdown" data-target="#" href="">
        <div class="input-append"><input type="text" class="input-large" data-ng-model="data.date"><span class="add-on"><i
                class="icon-calendar"></i></span>
        </div>
    </a>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
        <datetimepicker data-ng-model="data.date"
                        data-datetimepicker-config="{ dropdownSelector: '.my-toggle-select' }"></datetimepicker>
    </ul>
</div>
```
In this example, the drop-down functionality is controlled by Twitter Bootstrap.
The <code>dropdownSelector</code> tells the datetimepicker which element is bound to the Twitter Bootstrap drop-down so
the drop-down is toggled closed after the user selectes a date/time.

## I18N

All internationalization is handled by Moment.js, see Moment's documentation for details.
In most cases, all that is needed is a call to ```moment.locale(String)```

# Screenshots

## Year view

![Datetimepicker year view](https://raw.github.com/dalelotts/angular-bootstrap-datetimepicker/master/screenshots/year.png)

This view allows the user to select the year for the target date.
If the year view is the minView, the date will be set to midnight on the first day of the year

## Month view

![Datetimepicker month view](https://raw.github.com/dalelotts/angular-bootstrap-datetimepicker/master/screenshots/month.png)

This view allows the user to select the month in the selected year.
If the month view is the minView, the date will be set to midnight on the first day of the month.

## Day view (Default)

![Datetimepicker day view](https://raw.github.com/dalelotts/angular-bootstrap-datetimepicker/master/screenshots/day.png)

This view allows the user to select the the day of the month, in the selected month.
If the day view is the minView, the date will be set to midnight on the day selected.

## Hour view

![Datetimepicker hour view](https://raw.github.com/dalelotts/angular-bootstrap-datetimepicker/master/screenshots/hour.png)

This view allows the user to select the hour of the day, on the selected day.
If the hour view is the minView, the date will be set to the beginning of the hour on the day selected.

## Minute view

![Datetimepicker minute view](https://raw.github.com/dalelotts/angular-bootstrap-datetimepicker/master/screenshots/minute.png)

This view allows the user to select a specific time of day, in the selected hour.
By default, the time is displayed in 5 minute increments. The <code>minuteStep</code> property controls the increments of time displayed.
If the minute view is the minView, which is is by default, the date will be set to the beginning of the hour on the day selected.

## License

angular-bootstrap-datetimepicker is freely distributable under the terms of the [MIT license](LICENSE).

## Donating
Support this project and other work by Dale Lotts via [gittip][gittip-dalelotts].

[![Support via Gittip][gittip-badge]][gittip-dalelotts]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip-dalelotts]: https://www.gittip.com/dalelotts/

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

