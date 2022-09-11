//REM. : le contenu des fichiers .d.ts est parfaitement considéré et exploité par le compilo.(uniquement).
//Rappel : un fichier .d.ts ne peut contenir d'affectations.
interface ICalculatorConstructor {
    new (nCoeff: number): ICalculator; //Signature de constructeur exigée.
}