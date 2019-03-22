/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

export const ENTER = 'Enter';
export const SPACE = ' ';
export const PAGE_UP = 'PageUp';
export const PAGE_DOWN = 'PageDown';
export const END = 'End';
export const HOME = 'Home';
export const UP_ARROW = 'ArrowUp';
export const DOWN_ARROW = 'ArrowDown';
export const RIGHT_ARROW = 'ArrowRight';
export const LEFT_ARROW = 'ArrowLeft';

/** Utility to dispatch any event on a Node. */
export function dispatchEvent(node: Node | Window, event: Event): Event {
  node.dispatchEvent(event);
  return event;
}

/** Shorthand to dispatch a keyboard event with a specified key code. */
export function dispatchKeyboardEvent(node: Node, type: string, key: string, target?: Element): KeyboardEvent {
  return dispatchEvent(node, createKeyboardEvent(type, key, target)) as KeyboardEvent;
}

/** Dispatches a keydown event from an element. */
export function createKeyboardEvent(type: string, key: string, target?: Element) {
  const event = new KeyboardEvent(type, {
    bubbles: true,
    key: key,
    code: key,
    cancelable: true,
  });

  // // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
  // const initEventFn = (event.initKeyEvent || event.initKeyboardEvent).bind(event);
  const originalPreventDefault = event.preventDefault;

  // // Webkit Browsers don't set the keyCode when calling the init function.
  // // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
  // Object.defineProperties(event, {
  //   keyCode: {get: () => keyCode},
  //   key: {get: () => key},
  //   target: {get: () => target}
  // });

  // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
  event.preventDefault = function () {
    Object.defineProperty(event, 'defaultPrevented', {get: () => true});
    return originalPreventDefault.apply(this, arguments);
  };

  return event;
}
