import { MyStudentPalFrontPage } from './app.po';

describe('my-student-pal-front App', () => {
  let page: MyStudentPalFrontPage;

  beforeEach(() => {
    page = new MyStudentPalFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
