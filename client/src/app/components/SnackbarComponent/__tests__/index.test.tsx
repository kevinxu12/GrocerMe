import * as React from 'react';
import SnackbarComponent  from '..';
import renderer from 'react-test-renderer';
import { TestComponent } from 'utils/test';

const renderPage = () =>
  renderer.create(
      <SnackbarComponent component = {TestComponent}/>
  );

describe('<Snackbar Component  />', () => {
  
    it('Snackbar wrapper default', () => {
      const sw = renderPage();
      expect(sw.toJSON()).toMatchSnapshot();
    });
  });