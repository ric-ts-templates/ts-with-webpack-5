import { MyCalculator_TS } from "./implems/TS/MyCalculator_TS";
// import { MyCalculator_ES6 } from "./implems/JS/ES6/MyCalculator_ES6"; //<< Version avec non typage fort des params du constructeur.
import { MyCalculator_ES6 } from "./implems/JS/ES6/MyCalculator_ES6_Constructor"; //pour le typage fort des params du constructeur.
import "./implems/JS/ES5/MyCalculator_ES5";
export class CalculatorFactory {
    static getCalculator(numberParam) {
        // const oCalculator : ICalculator = this.getCalculator_TS(numberParam);
        // const oCalculator : ICalculator = this.getCalculator_ES6(numberParam);
        const oCalculator = this.getCalculator_ES5(numberParam);
        return oCalculator;
    }
    static getCalculator_TS(numberParam) {
        // const oCalculator_TS: ICalculator = new MyCalculator_TS("10"); //INTERDIT car grâce à ICalculatorConstructor, j'ai pu imposer
        //  que le param. du constructeur soit un number.
        const oCalculator_TS = new MyCalculator_TS(numberParam);
        return oCalculator_TS;
    }
    static getCalculator_ES6(numberParam) {
        // const oCalculator_ES6: ICalculator = new MyCalculator_ES6("10"); //INTERDIT car grâce à ICalculatorConstructor, j'ai pu imposer
        //  que le param. du constructeur soit un number.
        const oCalculator_ES6 = new MyCalculator_ES6(numberParam);
        return oCalculator_ES6;
    }
    static getCalculator_ES5(numberParam) {
        // const oCalculator_ES5: ICalculator = new MyCalculator_ES5("10"); //INTERDIT car grâce à ICalculatorConstructor, j'ai pu imposer
        //  que le param. du constructeur soit un number.
        const oCalculator_ES5 = new MyCalculator_ES5(numberParam);
        return oCalculator_ES5;
    }
}
