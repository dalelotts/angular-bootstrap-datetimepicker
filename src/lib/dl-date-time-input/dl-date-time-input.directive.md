This directive provides all of the user facing functionality to input dates and/or times.              |

## Supported date types

Import the module corresponding to the desired data type of the date in the model.
* Native JavaScript Date: import 'DlDateTimeInputDateModule'
* Moment Date: import 'DlDateTimeInputMomentModule'
* Milliseconds (local): import 'DlDateTimeInputNumberModule'
* String (local): import 'DlDateTimePInputStringModule'

A `DateAdapter` is used to adapt the data type in the model to the `number` data type 
used internally by the date/time input directive.

If you need a different data type than what is currently supported, you can extend 
`DlDateAdapter<D>` to provide the data type you need then override the `DlDateAdapter` 
provider in `app.module.ts` to use your new class. 

`providers: [{provide: DlDateAdapter, useClass: MyCustomDateAdapter}],`

### String Date Adapter Formats
The display, input and `model` formats for dates are injected using the 
`DL_DATE_TIME_DISPLAY_FORMAT`, `DL_STRING_DATE_MODEL_FORMAT` and `DL_DATE_TIME_INPUT_FORMATS` tokens.

`DL_DEFAULT_DATE_TIME_FORMAT` defaults to `moment`'s `lll` long date format. 
This is the default display format for this directive.

If you want a different display, override the injection token in `app.module.ts` 
i.e `{provide: DL_DATE_TIME_DISPLAY_FORMAT, useValue: '<what ever format you want goes here>'}` 

**Nota bene** For convenience `DL_DATE_TIME_INPUT_FORMATS` defaults to multiple formats, 
which can dramatically slow down paring performance. Consider overriding this token to only include 
the formats required by your project. 
 
See moment's [parsing multiple formats](https://momentjs.com/guides/#/parsing/multiple-formats/) 
page for more information on how these date formats are used. 
