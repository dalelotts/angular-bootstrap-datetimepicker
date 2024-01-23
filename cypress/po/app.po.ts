const selectors = {
  dateTimePicker: 'dl-date-time-picker',
  selectedDate: '#selectedDate'
};

export const appPage = () => {
  const appUrl = '/';

  const navigateTo = (): void => {
    cy.visit(appUrl);
  };

  const getDateTimePicker = (): Cypress.Chainable => {
    return cy.get(selectors.dateTimePicker);
  }

  const getSelectedDate = (): Cypress.Chainable => {
    return cy.get(selectors.selectedDate);
  }

  return {
    navigateTo,
    getDateTimePicker,
    getSelectedDate
  }
}
