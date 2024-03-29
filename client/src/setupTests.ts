/**
 * @file Import testing modules
 * @author Kevin Xu
 * jest-dom adds custom jest matchers for asserting on DOM nodes.
 * allows you to do things like:
 * expect(element).toHaveTextContent(/react/i)
 * learn more: https://github.com/testing-library/jest-dom
 */
import '@testing-library/jest-dom/extend-expect';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'jest-enzyme';
import 'jest-styled-components';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
