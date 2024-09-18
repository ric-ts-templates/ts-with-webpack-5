@REM @echo off

SET srcPath=.\_src
SET srcAssetsPath=%srcPath%/_assets
SET imgSubPath=img

SET outputPath=.\_dist

xcopy "%srcAssetsPath%/%imgSubPath%" "%outputPath%/%imgSubPath%" /e/s /d/i /y
copy "%srcPath%\*.htm*" "%outputPath%" /y