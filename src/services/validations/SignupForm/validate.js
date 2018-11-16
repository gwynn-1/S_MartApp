import validate from "validate.js";
import rule from './rule';

export default function validateSignupForm(params) {
    var result = validate(params,rule,{fullMessages : false});
    if(result){
        return result;
    }
    return false;
}