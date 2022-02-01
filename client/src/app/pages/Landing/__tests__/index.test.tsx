
import * as React from 'react';
import { HomePage } from 'app/pages/Landing';
import { render } from '@testing-library/react';

describe('<Landing  />', () => {
    it('Landing Page default', () => {
      const landing = render(<HomePage/>);
      expect(landing.container.firstChild).toMatchSnapshot();
    });
  });