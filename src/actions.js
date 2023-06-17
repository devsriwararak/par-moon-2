// actions.js
export const SELECT_BUTTON = 'SELECT_BUTTON';

export function selectButton(value) {
  return { type: SELECT_BUTTON, payload: value }
}
