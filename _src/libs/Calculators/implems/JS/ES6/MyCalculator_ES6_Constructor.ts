//Rem.: pas possible de faire d'affectation dans un .d.ts, je suis donc passé par ce .ts.


//L'import ci-dessous récupère l'entièreté de la DÉFINITION de la classe ES6 cible d'origine, 
// à savoir celle exportée par "./MyCalculator_ES6.js", classe qui y est nommée : MyCalculator_ES6.
//Durant cet import donc, je la renomme ici en : MyCalculator_ES6_Legacy,
//ceci, afin de pouvoir la réexporter plus bas sous le nom d'origine : MyCalculator_ES6 !!
// MAIS, tout EN LUI AJOUTANT 1 contrainte, à savoir :
//    que son constructeur sera désormais considéré comme ayant pour signature celle que définit ICalculatorConstructor.
//    Ce qui permettra au compilo. de checker cet aspect (respect du typage fort des paramètres qui seront transmis au constructeur).

import { MyCalculator_ES6 as MyCalculator_ES6_Legacy} from "./MyCalculator_ES6.js";


export const MyCalculator_ES6: ICalculatorConstructor = MyCalculator_ES6_Legacy; //<< comme un Constructeur local exporté.

//REM.: dans le .ts qui importera ce MyCalculator_ES6 là :
//        lorsqu'on écrira :  const oMyCalculator: ICalculator = new MyCalculator_ES6(X);
//        alors seront vérifiés par le compilo., ces 3 points :
//          1. que ce MyCalculator_ES6 implémente bien ICalculator avec donc les bons types pour les valeurs de retour des méthodes 
//            concernées...
//          2. que les appels de ces méthodes se font bien avec le bon nombre et le bon type des paramètres, tels que stipulés dans
//             ICalculator. 
//
//          3. >>> et enfin, gâce au typage ICalculatorConstructor imposé ci-dessus, que l'invocation du constructeur : 
//              (ici new MyCalculator_ES6(X))
//            s'aligne bien avec la signature stipulée ci-dessus (via ICalculatorConstructor).
//            Autrement dit, dans le cas présent : le X transmis, devra obligatoirement être un number !
//            >>>>>>>> LE SEUL INTÉRÊT du présent source est en effet uniquement ce dernier point !! <<<<<<
//             en effet, si le .ts (_main.ts) importait lui-même DIRECTEMENT ".../lib/ES6/MyCalculator_ES6.js"
//               (ce que l'on fait donc à sa place ici),
//             et faisait : const oMyCalculator: ICalculator = new MyCalculator_ES6(X);
//             alors les 2 premiers points seraient déjà couverts, mais.., pas le dernier !!
//
//  Cette approche (de réexport après ajout d'une contrainte sur le constructeur), n'aurait pas été possible si le code cible 
//  était de l'ES5 pur, car il n'y a pas de notion d'import/export (MyCalculator_ES5), en ES5 !