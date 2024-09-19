@echo off
CLS

REM Pour la copie des images, ainsi que du index.htm*, vers le répertoire de sortie (l'appel au présent .bat est en fait automatique, via package.json, (lors npm run bp, notamment)).
REM Cette façon de faire, est plus simple ET MAÎTRISÉE, que l'ajout à webpack de plugins(pour les images en particulier), plugins plus ou moins compatibles... .
REM ATTENTION : ici, utiliser des anti-slashes et non des slashes (sinon la commande COPY ..., ne passe pas !!).

REM les css globaux sont eux, gérés par Webpack.
SET outputAssetsSubPath=_assets
SET srcGlobalAssetsSubPath=_globalAssets
SET imgSubPath=img
SET cssSubPath=css


SET srcRootPath=.\_src
SET srcGlobalAssetsPath=%srcRootPath%/%srcGlobalAssetsSubPath%

SET srcAppRootPath=%srcRootPath%\app
SET src_img_assets_to_copy=*.jpg, *.png
SET src_css_assets_to_copy=*.*css

SET outputRootPath=.\_dist
SET outputAssetsPath=%outputRootPath%\%outputAssetsSubPath%

SET outputImgPath=%outputAssetsPath%\%imgSubPath%
SET outputCssPath=%outputAssetsPath%\%cssSubPath%


REM ==========================================================
IF NOT EXIST "%outputRootPath%" MD "%outputRootPath%"


REM -------------- Recopie des index.htm*, ---------------
REM                vers %outputRootPath% 
copy "%srcRootPath%\*.htm*" "%outputRootPath%" /y

REM -------------- Recopie des images(globales) se trouvant dans %srcGlobalAssetsPath%/%imgSubPath%, ---------------
REM                vers %outputImgPath% 
xcopy "%srcGlobalAssetsPath%/%imgSubPath%" "%outputImgPath%" /e/s /d/i /y

REM -------------- Recopie (à plat) des images SPÉCIFIQUES, se trouvant dans l'arborescence %srcAppRootPath%, ---------------
REM                vers %outputImgPath% .
@REM CALL :CopyFiles "%srcAppRootPath%" "%src_img_assets_to_copy%" "%outputImgPath%"

REM -------------- Recopie (à plat) de css SPÉCIFIQUES non bundlés, se trouvant dans l'arborescence %srcAppRootPath%, ---------------
REM                vers %outputCssPath% .
@REM CALL :CopyFiles "%srcAppRootPath%" "%src_css_assets_to_copy%" "%outputCssPath%"




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
