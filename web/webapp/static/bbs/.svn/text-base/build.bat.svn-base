cd %~dp0

call spm build

echo "copy dist files"

copy /y dist\main.js ..\..\sea-modules\webapp\bbs\1.0.0\main.js

echo "delete dist files"

rmdir dist /s

pause