This directive provides all of the user facing functionality to input a date and/or time using the keyboard.              |

## Model date types

Import the module corresponding to the desired data type of the date in the model.
* Native JavaScript Date: import `DlDateTimePickerDateModule`
* Moment Date: import `DlDateTimePickerMomentModule`
* Milliseconds (local): import `DlDateTimePickerNumberModule`
* String (local): import `DlDateTimePickerStringModule`

A `DateAdapter` is used to adapt the data type in the model to the `number` data type 
used internally by the date/time picker.

If you need a different data type than what is currently supported, you can extend 
`DlDateAdapter<D>` to provide the data type you need then override the `DlDateAdapter` 
provider in `app.module.ts` to use your new class. 

`providers: [{provide: DlDateAdapter, useClass: MyCustomDateAdapter}],`

## Display format

The display format is defined in the `DL_DATE_TIME_DISPLAY_FORMAT` token and is injected into this component
to control the display format.

`DL_DATE_TIME_DISPLAY_FORMAT` defaults to `moment`'s `lll` long date format. 
Override `DL_DATE_TIME_DISPLAY_FORMAT` if you do not like the default format.

`{provide: DL_DATE_TIME_DISPLAY_FORMAT, useValue: '<what ever format you want goes here>'}` 

## Input formats

This directive supports multiple input formats, as defined in the `DL_DATE_TIME_INPUT_FORMATS` token.
When the user inputs a string value into a text box, this directive attempts to parse the input
using one of the specified formats, in the order the format occur in the array. 

Once one of the formats is able to parse the user input, the date is set in the model. 

**Nota bene** For convenience `DL_DATE_TIME_INPUT_FORMATS` defaults to support multiple formats, 
which can dramatically slow down parsing performance. It can also result in successfully parsing 
a date using a format that is not appropriate for your use case. 

Consider overriding the `DL_DATE_TIME_INPUT_FORMATS` token to only include the specific formats required by your project. 
 
`{provide: DL_DATE_TIME_INPUT_FORMATS, useValue: ['<input format zero>', ..., '<input format N>']}` 
 
See moment's [parsing multiple formats](https://momentjs.com/guides/#/parsing/multiple-formats/) 
page for more information on how these date formats are used. 
