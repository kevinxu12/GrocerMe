import * as React from 'react';
import { NotFoundPage } from '..';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import renderer from 'react-test-renderer';

const renderPage = () =>
  renderer.create(
    <HelmetProvider>
      <NotFoundPage />
    </HelmetProvider>
  );

describe('<NotFoundPage  />', () => {
  
    it('Not found page default', () => {
      const pr = renderPage();
      expect(pr.toJSON()).toMatchSnapshot();
    });
  });