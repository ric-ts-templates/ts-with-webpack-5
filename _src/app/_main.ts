import { Temp } from "./../lib"; //mon dossier lib/ contient bien un index.ts qui exporte la classe Temp.


//Tient compte du param. paths dans tsconfig.json uniquement grâce au plugin : tsconfig-paths-webpack-plugin
import { Temp2 } from "@myOtherLib/sousDossier"; //Classe Temp2 exportée via autreLib/sousDossier/index.ts.
import { Temp22 } from "@myOtherLib/sousDossier/Temp22"; //Je n'ai pas mis (exprès) l'export de la classe
                                                         //Temp22, dans autreLib/sousDossier/index.ts
                                                         //contrairement à ce que j'ai fait poour la classe 
                                                         //Temp2.


export class Main {
    public run(): void {
        console.log(`READY`);
        
        (new Temp()).sayHello();
        (new Temp22()).sayNice();
        (new Temp2()).sayGoodbye();
    }

}