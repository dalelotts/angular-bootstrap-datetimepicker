/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

export const ENTER = 13;
export const SPACE = 32;
export const PAGE_UP = 33;
export const PAGE_DOWN = 34;
export const END = 35;
export const HOME = 36;
export const UP_ARROW = 38;
export const DOWN_ARROW = 40;
export const RIGHT_ARROW = 39;
export const LEFT_ARROW = 37;

/** Utility to dispatch any event on a Node. */
export function dispatchEvent(node: Node | Window, event: Event): Event {
  node.dispatchEvent(event);
  return event;
}

/** Shorthand to dispatch a keyboard event with a specified key code. */
export function dispatchKeyboardEvent(node: Node, type: string, keyCode: number, key?: string, target?: Element): KeyboardEvent {
  return dispatchEvent(node, createKeyboardEvent(type, keyCode, target, key)) as KeyboardEvent;
}

/** Dispatches a keydown event from an element. */
export function createKeyboardEvent(type: string, keyCode: number, target?: Element, key?: string) {
  const event = new KeyboardEvent(type, {
    bubbles: true,
    key: key,
    code: keyCode.toString(10),
    cancelable: true,
  });

  // // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
  // const initEventFn = (event.initKeyEvent || event.initKeyboardEvent).bind(event);
  const originalPreventDefault = event.preventDefault;

  // Webkit Browsers don't set the keyCode when calling the init function.
  // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
  Object.defineProperties(event, {
    keyCode: {get: () => keyCode},
    key: {get: () => key},
    target: {get: () => target}
  });

  // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
  event.preventDefault = function () {
    Object.defineProperty(event, 'defaultPrevented', {get: () => true});
    return originalPreventDefault.apply(this, arguments);
  };

  return event;
}
