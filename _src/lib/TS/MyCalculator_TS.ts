export class MyCalculator_TS implements ICalculator { //REM.: ICalculator est définie dans un .d.ts, donc pas d'import à en réaliser pour pouvoir s'en servir.
    constructor(private nCoeff: number) { //La signature de ce constructeur sera imposée plus bas
    }

    getResult(n: number): number { //L'existence de cette méthode et sa signature est bien entendu 
                                   //imposée par le fait que l'on dit implémenter ICalculator.
        return n*this.nCoeff;
    }


    getAutreX(): string { //<<REM.: getAutreX ne fait pas partie de ICalculator.
        return "xxx";
    }    
}
const MyCalculator_TS_Constructor: ICalculatorConstructor = MyCalculator_TS; //<< Oblige la classe MyCalculator_TS à avoir 
                                                                             // pour signature de constructeur, celle que définit 
                                                                             // ICalculatorConstructor !
