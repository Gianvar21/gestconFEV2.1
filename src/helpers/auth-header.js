import Cookies from 'universal-cookie';
import { storage } from "../storage.js";
const cookies = new Cookies();


export function authHeader(isMultiPart, newToken) {


  try {

    
    const Token = storage.GetStorage("token");
/*

    console.log('----------------------');
    console.log(Token);
    console.log('----------------------');
*/
    if (Token) {

      return {
        'Content-type': 'application/json',
        'x-auth-token': `${Token}`,
      };
    } else {
      return {
        'Content-type': 'application/json',
        'x-auth-token': 'error',
      };
    }
  } catch (error) {
    return {
      'Content-type': 'application/json',
      'x-auth-token': 'error',
    };
  }


}