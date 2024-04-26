import 'jest-preset-angular/setup-jest';


import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// declare const require: any;

// First, initialize the Angular testing environment.
if (!getTestBed().platform) {
  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );
}
// // Then we find all the tests.
// const context = require.context('./', true, /\.spec\.ts$/);
// // And load the modules.
// context.keys().map(context);

