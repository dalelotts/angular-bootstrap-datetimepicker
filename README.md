# Project : angular-bootstrap-datetimepicker
================================

Native AngularJS datetime picker directive styled by Twitter Bootstrap
[![Build Status](https://travis-ci.org/smalot/bootstrap-datetimepicker.png?branch=master)](https://travis-ci.org/smalot/bootstrap-datetimepicker)

[Homepage](http://www.malot.fr/bootstrap-datetimepicker/)

[Demo page](http://www.malot.fr/bootstrap-datetimepicker/demo.php)

# (Almost) Complete re-write

This project started as an AngularJS specific re-write of the [bootstrap-datetimepicker project](https://github.com/smalot/bootstrap-datetimepicker).
Only the CSS file from the bootstrap-datetimepicker project was re-used.

# Screenshots

## Year view

![Datetimepicker year view](https://raw.github.com/dalelotts/angular-bootstrap-datetimepicker/master/screenshots/year.png)

This view allows the user to select the year for the target date.
If the year view is the minView, the date will be set to midnight on the first day of the year

## Month view

![Datetimepicker month view](https://raw.github.com/dalelotts/angular-bootstrap-datetimepicker/master/screenshots/month.png)

This view allows the user to select the month in the selected year.
If the month view is the minView, the date will be set to midnight on the first day of the month.

## Day view

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


# Example

Attached to a field with the format specified via options:

```html
<datetimepicker data-ng-model="data.date" ></datetimepicker>
```
<p>Selected Date: {{ data.date | date }}</p>
```

Formatting of the date field is controlled by Angular filters.
Attached to a field with the format specified via markup:

```html
<input type="text" value="2012-05-15 21:05" id="datetimepicker" data-date-format="yyyy-mm-dd hh:ii">
```
```javascript
$('#datetimepicker').datetimepicker();
```

As a drop-down:

```html
<div class="dropdown">
    <a class="dropdown-toggle" id="dLabel" role="button" data-toggle="dropdown" data-target="#" href="#">
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


## Dependencies

Requires:
 * jQuery for selector functionality not supported by jQuery lite that comes with Angular
 * moment.js for date parsing and formatting
 * bootstrap's dropdown component (`dropdowns.less`)
 * bootstrap's sprites (`sprites.less` and associated images) for arrows


## Options

### startView

String.  Default: 'month'

The view that the datetimepicker should show when it is opened.
Accepts values of :
 * 'minute' for the minute view
 * 'hour' for the hour view
 * 'day' for the day view
 * 'month' for the 12-month view (the default)
 * 'year' for the 10-year overview. Useful for date-of-birth datetimepickers.

### minView

String. 'minute'

The lowest view that the datetimepicker should show.

### minuteStep

Number.  Default: 5

The increment used to build the hour view. A button is created for each <code>minuteStep</code> minutes.

## Markup

Inline component.

```html
<datetimepicker data-ng-model="data.date" ></datetimepicker>
```

Drop-down component with associated input box.
```html
<div class="dropdown">
    <a class="dropdown-toggle" id="dLabel" role="button" data-toggle="dropdown" data-target="#" href="#">
        <div class="input-append"><input type="text" class="input-large" data-ng-model="data.date"><span class="add-on"><i
                class="icon-calendar"></i></span>
        </div>
    </a>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
        <datetimepicker data-ng-model="data.date"
                        data-datetimepicker-config="{ dropdownSelector: '.dropdown-toggle' }"></datetimepicker>
    </ul>
</div>
```

## I18N

All internationalization is handled by Moment.js, see Moment's documention for details.