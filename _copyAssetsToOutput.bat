@echo off
CLS

REM L'appel au présent .bat est en fait automatisé, via package.json, (lors npm run bp, notamment).

REM Ci-dessous, par "GLOBAL", j'entends : "propre à l'application (donc hors librairies (persos ou non))".
REM
REM .BAT pour la copie des images(globales et spécifiques), et des *.*css spécifiques (non bundlés), ainsi que de tous les *.htm*, 
REM vers le répertoire de sortie. (Rem.: les fichiers globaux de styles, sont eux, gérés côté webpack (cf. fichier de config.common)).
REM  Cette façon de faire (copie), est plus simple ET MAÎTRISÉE, que l'ajout à webpack de plugins(pour les images en particulier), plugins plus ou moins compatibles... .

REM >> ATTENTION : ici, utiliser des anti-slashes et non des slashes (sinon la commande COPY ..., ne passe pas !!).


SET outputAssetsSubPath=_assets
SET srcGlobalAssetsSubPath=_globalAssets
SET imgSubPath=img
SET stylesSubPath=styles


SET srcRootPath=.\_src
SET srcLibsRootPath=%srcRootPath%\libs
SET srcAppRootPath=%srcRootPath%\app
SET srcGlobalAssetsPath=%srcAppRootPath%/%srcGlobalAssetsSubPath%

SET src_img_assets_to_copy=*.jpg, *.png
SET src_styles_assets_to_copy=*.*css

SET outputRootPath=.\_dist
SET outputAssetsPath=%outputRootPath%\%outputAssetsSubPath%

SET outputImgPath=%outputAssetsPath%\%imgSubPath%
SET outputStylesPath=%outputAssetsPath%\%stylesSubPath%


REM ==========================================================
IF NOT EXIST "%outputRootPath%" MD "%outputRootPath%"



REM -------------- Recopie (à plat) des *.htm*, se trouvant dans l'arborescence %srcRootPath%, ---------------
REM                vers %outputRootPath% .
CALL :CopyFiles "%srcRootPath%" "*.htm*" "%outputRootPath%"


REM -------------- Recopie des images(globales) se trouvant dans %srcGlobalAssetsPath%/%imgSubPath%, ---------------
REM                vers %outputImgPath%. Les fichiers globaux de styles étant, eux, gérés ailleurs (par bundling via webpack). 
xcopy "%srcGlobalAssetsPath%/%imgSubPath%" "%outputImgPath%" /e/s /d/i /y


REM -------------- Recopie (à plat) des images SPÉCIFIQUES, se trouvant dans l'arborescence %srcLibsRootPath%, ---------------
REM                vers %outputImgPath% .
CALL :CopyFiles "%srcLibsRootPath%" "%src_img_assets_to_copy%" "%outputImgPath%"

REM -------------- Recopie (à plat) de fichiers SPÉCIFIQUES de styles (fichiers non bundlés), se trouvant dans l'arborescence %srcLibsRootPath%, ---------------
REM                vers %outputStylesPath% .
CALL :CopyFiles "%srcLibsRootPath%" "%src_styles_assets_to_copy%" "%outputStylesPath%"




GOTO :EOF



REM ======= Fonction chargee de copier, à plat à la racine de %3, tous les fichiers de l'arborescence %1 qui vérifient %2 =======
REM
REM PARAM. %1 : arborescence où chercher les fichiers sources à copier
REM PARAM. %2 : critères des fichiers à considérer
REM PARAM. %3 : répertoire voué à recevoir à plat, une copie de ces fichiers (dossier créé si inexistant).
REM
:CopyFiles
	SETLOCAL

		SET __FILES_ROOT_PATH__=%~1
    SET __FILES_CRITERIAS__=%~2
    SET __DESTI_FOLDER__=%~3

		@REM ECHO.
		@REM ECHO ====== FUNC : CopyFiles ======
		@REM ECHO.
		@REM ECHO __FILES_ROOT_PATH__='%__FILES_ROOT_PATH__%'
    @REM ECHO __FILES_CRITERIAS__='%__FILES_CRITERIAS__%'
    @REM ECHO __DESTI_FOLDER__='%__DESTI_FOLDER__%'
		@REM ECHO.
		@REM PAUSE
		@REM ECHO. & ECHO.

    IF NOT EXIST "%__DESTI_FOLDER__%" MD "%__DESTI_FOLDER__%"

    FOR /r "%__FILES_ROOT_PATH__%" %%i in (%__FILES_CRITERIAS__%) do @COPY "%%i" "%__DESTI_FOLDER__%"

    ECHO.

	(ENDLOCAL
	)
GOTO :EOF
