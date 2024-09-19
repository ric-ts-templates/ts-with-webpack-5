class MyCommonConfigurationClass {

  getCommonConfig() {
    const oPathTool = require("path");

    const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

    const srcRootPath = "./_src";
    const srcAppRootPath = `${srcRootPath}/app`;
    const outputRootPath = "./../_dist";

    const jsSubPath = "js";
    const outputAssetsSubPath = "_assets";
    const srcGlobalAssetsSubPath = "_globalAssets";
    const stylesSubPath = "styles";
    const outputAssetsPath = `${outputRootPath}/${outputAssetsSubPath}`;
    const srcGlobalAssetsPath = `${srcAppRootPath}/${srcGlobalAssetsSubPath}`;


    const oCommonConfig = {

      entry: {
        //--- Ensemble des fichiers à "bundler" ----
    
         // 1er bundle :  ici 1 seul fichier .ts + bien sûr indirectement ses dépendances (.ts & .js) éventuelles.
         //               Le nom du bundle une fois buildé, sera (cf. output.filename ci-dessous) :  
         //                 allJS.bundle.js et il sera mis dans le sous-dossier jsSubPath
         //                 du répertoire : outputRootPath.    
         // Ce allJS.bundle.js sera bien sûr à inclure dans index.html, via <script src="...">.
         // NECESSITE bien sûr un TS loader(parse/transpile des TS pour les intégrer au bundle) 
            [`${jsSubPath}/allJS`]: [
                                      `${srcRootPath}/app/index.ts` //point d'entrée
                                    ], 
    
    
         // 2eme bundle :  plusieurs fichiers de styles, mergés en 1 bundle à partir.
         //                (remarque: lorsque doublon de règle de style, la dernière apparue fait foi).
         //                Le nom du bundle une fois buildé, sera (cf. output.filename ci-dessous) :  
         //                  someStyles.bundle.js, et il sera mis dans le sous-dossier stylesSubPath
         //                  du répertoire : outputAssetsPath.    
         // Ce someStyles.bundle.js sera bien sûr à inclure dans index.html, via <script src="...">.
         //  Remarque : bien que ce bundle à inclure contiennent du code javascript,
         //             les règles de styles feront bien leur effet sur l'html !
         // NECESSITE bien sûr un css loader(lecture des css pour les intégrer au dit bundle) 
         //          + un style loader (rendre ces styles exploitables par du html)
         [`${stylesSubPath}/someStyles`]: [ //Mettre ici, tous les noms de css à bundler (doivent tous se trouver dans srcGlobalAssetsPath/stylesSubPath).
                                            "index" //index.css
                                          ] 
                                          .map(stylesFileName => `${srcGlobalAssetsPath}/${stylesSubPath}/${stylesFileName}.css`)
                                        ,
    
      }
      ,output: {
          path: oPathTool.resolve(__dirname, outputRootPath)        
          // ,filename: "[name].bundle.js"
          , filename: ({ chunk }) => { //Pour pouvoir conditionné le nommage et chemin desti. des bundles.
            // console.log(chunk);
            let outputBundleFile = "[name].bundle.js"; //[name]  = valeur de chacune des clefs de l'objet entry ci-dessus. Par ex. : `${jsSubPath}/allJS` .
            if (!chunk.name.startsWith(jsSubPath)) {
              outputBundleFile = `${outputAssetsPath}/${outputBundleFile}`;
            }
            console.log(outputBundleFile);
            return outputBundleFile; //bundle généré dans outputRootPath
          },                                        
      }
    
    
      //--------------------------------------
    
      , module: {
        
        //-- Divers loader et, patterns des fichiers les concernant --
        rules: [ 
          //Pour gestion des fichiers .ts :
          {
            test: /\.ts$/  //Extension des fichiers à traiter (ne pas mettre entre guillemets !)
            ,use: [ 
              { loader: "ts-loader"  }  //Parse et rend utilisable le contenu des fichiers .ts
            ]
          },
    
          //Pour gestion des fichiers .css
          {
            test: /\.css$/  //Extension des fichiers à traiter (ne pas mettre entre guillemets !)
            ,use: [ 
               { loader: "style-loader" }, //Gestion de l'inclusion des styles détectés.
               { loader: "css-loader" } //Parse et rend utilisable le contenu des fichiers .css
            ] ///<<<<<< ATTENTION : IL FAUT mettre "style-loader" avant "css-loader" sinon plantage !! <<<<<<<<
          },
          
        ]
      }
      ,resolve: {
        extensions: [ ".ts", ".js" ], // ".js" juste rajouté pour pouvoir traiter aussi en entrée des .js.
    
        alias:{ //MAPPAGES, pour imports de : modules avec chemin non-relatifs (cf. projets Typescript d'essais)
    
        },
    
        plugins: [
          new TsconfigPathsPlugin({ //Plugin permettant que la rubrique "paths:" du tsconfig.json, soit bien prise en compte et exploitable par le code .ts.
            configFile: "./tsconfig.json"
          }),
        ]    
    
      }
    
    };
    return oCommonConfig;

  }// Fin getCommonConfig()

  getConfig() {
    const oCommonConfig = this.getCommonConfig();
    const oSpecificConfig = this.getSpecificConfig(); //Pattern Template Method(Méthode normalement abstraite ici).
                                                      //Donc à définir par classes enfants.   

    const oConfig = Object.assign(oCommonConfig, oSpecificConfig);

    console.log("\n-- CONFIGURATION -- ");
    console.log(oConfig);
    console.log(`\n\n`);    

    return oConfig;
  }
  
  static getCompleteConfig(configurationClass, webPackEnvironmentVars) {
    console.log("\n-- WebPack ENV. VARS -- ");
    console.log(webPackEnvironmentVars);
    console.log(`\n`);

    const oMyConfiguration = new configurationClass(webPackEnvironmentVars);
    const oCompleteConfig = oMyConfiguration.getConfig(); 

    return oCompleteConfig;
  }

}

module.exports = MyCommonConfigurationClass; //Afin de pouvoir en hériter...