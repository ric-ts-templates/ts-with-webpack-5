//REM. : le contenu des fichiers .d.ts est parfaitement considéré et exploité par le compilo.(uniquement).
//Rappel : un fichier .d.ts ne peut contenir d'affectations.


//interface ICalculator extends ICalculatorConstructor { //<<< pour une raison assez obscure, si ICalculator
//                                                             contenait donc : new (nCoeff: number): ICalculator;
//                                                             MyCalculator_TS serait considéré comme n'implémentant 
//                                                             pas ICalculator !! :/
//                                                           C'est pourquoi j'ai bien séparé en 2 interfaces !
interface ICalculator {
    //new (nCoeff: number): ICalculator;
    getResult(n: number): number;
}

