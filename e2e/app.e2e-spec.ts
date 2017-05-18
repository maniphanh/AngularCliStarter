import { MHomeStaticContentPage } from './app.po';

describe('mhome-static-content App', () => {
  let page: MHomeStaticContentPage;

  beforeEach(() => {
    page = new MHomeStaticContentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
