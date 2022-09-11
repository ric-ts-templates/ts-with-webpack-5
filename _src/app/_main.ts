import { MyCalculator_TS } from "@myCalculatorsTSLib/MyCalculator_TS";


export class Main {
    public run(): void {

        this.test1();
    }
    
    private test1() {
        
        //================= TS ==========================
        console.log(`\n\n================= Utilisation par Typescript, d'une classe d'un source .ts, après forçage d'un TYPAGE FORT pour son constructeur ==================\n\n`);
        // const oCalculator_TS: ICalculator = new MyCalculator_TS("10"); //INTERDIT car grâce à ICalculatorConstructor, j'ai pu imposer
                                                                         //  que le param. du constructeur soit un number.
        const oCalculator_TS: ICalculator = new MyCalculator_TS(10);
        console.log(oCalculator_TS.getResult(5) === 10*5); //true
        // oCalculator_TS.getAutreX(); //INTERDIT: évidemment car cette méthode appartient à la classe MyCalculator_TS MAIS pas à l'interface ICalculator !

    }
    
}