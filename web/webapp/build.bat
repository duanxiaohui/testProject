cd %~dp0

call spm build

echo "copy dist files"

copy /y dist\qqgroup.js sea-modules\webapp\main\1.0.0\qqgroup.js
copy /y dist\qzone.js sea-modules\webapp\main\1.0.0\qqzone.js

echo "delete dist files"

rmdir dist /s

pause