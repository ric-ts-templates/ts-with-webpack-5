import { CalculatorFactory } from "@MyCalculatorsLib/_CalculatorFactory";


export class Main {
    public run(): void {

        this.test1();
    }
    
    private test1() {
        const n : number = 5;
        const coeff : number = 10;

        const oCalculator: ICalculator = CalculatorFactory.getCalculator(coeff); //Choix du ICalculator concret : TS ou ES6 ou ES5.
        const result : number = oCalculator.getResult(5);
        console.log(`result=${result}`);

        // console.log( result === coeff*n ); //true si MyCalculator_TS
        // console.log( result === coeff*n*2 ); //true si MyCalculator_ES6
        // console.log( result === coeff*n*3 ); //true si MyCalculator_ES5
        // oCalculator.getAutreX(); //INTERDIT: évidemment car cette méthode n'appartient pas à l'interface ICalculator ! (elle n'appartient qu'au type concret : MyCalculator_xxx).

    }
    
}