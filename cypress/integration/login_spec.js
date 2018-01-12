function expectPathname(pathname) {
  return location => expect(location.pathname).to.eq(pathname);
}
describe('Log in', () => {
  it(`takes you through the login flow you're not authenticated`, () => {
    cy.visit('/');

    // Redirects us to the login screen
    cy.location().should(expectPathname('/login'));
    // Which should display a login form
    cy.get('h3.title').should('contain', 'Login');
    cy.get('p.subtitle').should('contain', 'Please login to proceed');

    // Perform login
    cy.login();

    // Redirects us to /
    cy.location().should(expectPathname('/'));

    // Which should be the members search
    cy.get('.MemberSearch-title').should('contain', 'Member search');
  });

  it(`redirects you to the member search page if you're authenticated`, () => {
    cy.login();
    cy.location().should(expectPathname('/'));

    // Visiting /login when logged in
    cy.visit('/login');

    // Redirects us back to root
    cy.location().should(expectPathname('/'));

    // Which should be the members search
    cy.get('.MemberSearch-title').should('contain', 'Member search');
  });
});

describe('Searching', () => {
  it('allows you to search for members', () => {
    cy.login();
    cy.get('.MemberSearch button[type=submit]').should('be.disabled');
    cy.get('.MemberSearch #email').type('vincent@sumofus.org');
    cy.get('.MemberSearch button[type=submit]').should('not.be.disabled');

    cy.get('.MemberSearch button[type=submit]').click();

    // first it displays Searching...
    cy.get('.Dashboard-results').should('contain', 'Searching');

    // then after that...
    cy.get('.MemberCard .media-content p strong').should('contain', 'Vince');
    cy.get('.MemberCard .media-content p strong').should('contain', 'Martinez');
    cy.get('.MemberCard .media-content p small').should('contain', 'Joined');

    cy.get('.MemberCard .media-right .tag').should('contain', 'subscribed');
    cy.screenshot('search-results');

    cy.get('.MemberCard .media-content').click();
    cy.location().should(expectPathname('/member/12358459'));
  });
});
