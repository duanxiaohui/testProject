#!/bin/bash
# shortwnl.sh
cat bigwnl.html | tr -d "\n" > wnl2.html
sed 's/>\t*</></g' wnl2.html > wnl.html
rm wnl2.html
