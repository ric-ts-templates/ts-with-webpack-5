//A l'utilisation(par un .ts) de cette classe ES6...,
// on veut pouvoir imposer un TYPAGE FORT des paramètres sur les 
// méthodes appelées(y compris le constructeur).
// Ceci, selon ce que décrivent respectivement les interfaces : 
//  ICalculator et ICalculatorConstructor. (cf. .d.ts correspondants).


export class MyCalculator_ES6 {
  constructor(nCoeff) {
      this.nCoeff = nCoeff;
  }

  getResult(n) {
      return n*this.nCoeff *2;
  }


  getAutre() { //<<REM.: getAutre ne fait pas partie de ICalculator.
      return "zzz";
  }
}