@echo off
REM Pour la copie des images, ainsi que du index.htm*, vers le répertoire de sortie (l'appel au présent .bat est en fait automatique, via package.json, (lors npm run bp, notamment)).
REM Cette façon de faire, est plus simple ET MAÎTRISÉE, que l'ajout à webpack de plugins(pour les images en particulier), plugins plus ou moins compatibles... .
REM ATTENTION : ici, utiliser des anti-slashes et non des slashes (sinon la commande COPY ..., ne passe pas !!).

SET srcPath=.\_src
SET srcAssetsPath=%srcPath%/_assets
SET imgSubPath=img

SET outputPath=.\_dist


xcopy "%srcAssetsPath%/%imgSubPath%" "%outputPath%/%imgSubPath%" /e/s /d/i /y
copy "%srcPath%\*.htm*" "%outputPath%" /y