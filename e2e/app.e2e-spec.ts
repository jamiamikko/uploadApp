import { Week3t1Page } from './app.po';

describe('week3t1 App', function() {
  let page: Week3t1Page;

  beforeEach(() => {
    page = new Week3t1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
