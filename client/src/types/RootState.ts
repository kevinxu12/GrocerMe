/**
 * @file Typing for the rootstate of the redux store
 * @author Kevin Xu
 */

import { RoleCode } from './rest';

// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface AuthState {
  username: String;
  roles: RoleCode[];
}
export interface RootState {
  auth: AuthState; // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
