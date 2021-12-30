// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
interface HomeState {
  username: String;
}
export interface RootState {
  home: HomeState; // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
