# Angular bootstrap date & time picker  v0.2.4
================================

Native AngularJS datetime picker directive styled by Twitter Bootstrap 3
[![Build Status](https://travis-ci.org/dalelotts/angular-bootstrap-datetimepicker.png?branch=master)](https://travis-ci.org/dalelotts/angular-bootstrap-datetimepicker)
[![devDependency Status](https://david-dm.org/dalelotts/angular-bootstrap-datetimepicker/dev-status.png)](https://david-dm.org/dalelotts/angular-bootstrap-datetimepicker#info=devDependencies)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/dalelotts/angular-bootstrap-datetimepicker/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[Home / demo page](http://dalelotts.github.io/angular-bootstrap-datetimepicker/)

# (Almost) Complete re-write

This project started as an AngularJS specific re-write of the [bootstrap-datetimepicker project](https://github.com/smalot/bootstrap-datetimepicker).
Only the CSS file from the bootstrap-datetimepicker project was re-used.

#Dependencies

Requires:
 * AngularJS 1.2.11 or higher (1.0.x will not work)
 * moment.js for date parsing and formatting
 * bootstrap's dropdown component (`dropdowns.less`)
 * bootstrap's glyphicons for arrows

#Testing
We use karma and jshint to ensure the quality of the code. The easiest way to run these checks is to use grunt:

```
npm install -g grunt-cli
npm install
```

The karma task will try to open Chrome as a browser in which to run the tests. Make sure this is available or change the configuration in test\test.config.js

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

### on-set-time
Attribute on datetimepicker element

If the value of the on-set-time attribute is a function, the date time picker will call this function
passing in the selected value and previous value.
```html
<datetimepicker data-ng-model="data.date" data-on-set-time="onTimeSet"></datetimepicker>
```
This function will be called when the user selects a value on the minView.
```javascript
$scope.onTimeSet = function (newDate, oldDate) {
    console.log(newDate);
    console.log(oldDate);
}
```

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

When used within a Bootstrap dropdown, the selector specified in dropdownSelector will toggle the dropdown when a date/time is selected.

### weekStart

Number.  Default: 0

Allows to set a week's starting day. Should be between 0 and 6.

```html
<datetimepicker data-ng-model="data.date" data-datetimepicker-config="{'weekStart': 1}"></datetimepicker>
```

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

All internationalization is handled by Moment.js, see Moment's documention for details.

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
