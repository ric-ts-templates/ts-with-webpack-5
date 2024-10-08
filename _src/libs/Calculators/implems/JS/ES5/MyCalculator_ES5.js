//A l'utilisation(par un .ts) de cette classe ES5...,
// on veut pouvoir imposer un TYPAGE FORT des paramètres sur les 
// méthodes appelées(y compris le constructeur).
// Ceci, selon ce que décrivent respectivement les interfaces : 
//  ICalculator et ICalculatorConstructor. (cf. .d.ts correspondants).

// Plus précisément, je veux :
//   1. que la présente classe ES5, MyCalculator_ES5, soit connue à l'EXÉCUTION !! 
//      ce qui est réalisé grâce au "MyCalculator_ES5 =" juste ci-dessous ET au  
//      un 'import "./.../MyCalculator_ES5";'.
//   1. que MyCalculator_ES5 implémente correctement ce que décrit l'interface ICalculator (TOUS typages compris),
//      cette vérif. sera automatiquement réalisée à la compil., face et suite à l'instruction : 
//       oMyInstance: ICalculator = new MyCalculator_ES5(...).
//   3. que MyCalculator_ES5 implémente correctement ce que décrit l'interface ICalculatorConstructor(typages des params du constructeur),
//      ce qui est réalisé par la ligne: 
//       declare let MyCalculator_ES5: ICalculatorConstructor;   dans MyCalculator_ES5_Constructor.d.ts.


MyCalculator_ES5 = function(nCoeff) { //<<<<< même pas besoin de la syntaxe window.MyCalculator_ES5 = ...
    this.nCoeff = nCoeff;
}

MyCalculator_ES5.prototype.getResult = function(n) {
    return n*this.nCoeff *3;
}


MyCalculator_ES5.prototype.getAutreX = function() { //<<REM.: getAutre ne fait pas partie de ICalculator.
    return "zzz";
}