export class MyCalculator_TS {
    nCoeff;
    constructor(nCoeff) {
        this.nCoeff = nCoeff;
    }
    getResult(n) {
        //imposée par le fait que l'on dit implémenter ICalculator.
        return n * this.nCoeff;
    }
    getAutreX() {
        return "xxx";
    }
}
const dummy = MyCalculator_TS; //<< Oblige la classe MyCalculator_TS à avoir 
// pour signature de constructeur, celle que définit 
// ICalculatorConstructor !
