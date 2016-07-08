#!/bin/sh

for jsp in `find wannianlibaidu -name "*.jsp" -print` ;
do
    perl -pi -e 's/(src|href)=(.)(\/wannianlibaidu\/)/$1=$2http:\/\/s.365rili.com$3/gi' $jsp
    perl -pi -e 's/(src|href)=(.)(\/js\/)/$1=$2http:\/\/s.365rili.com$3/gi' $jsp
done

for css in `find wannianlibaidu -name "*.css" -print` ;
do
    perl -pi -e 's/(url.)(\/wannianlibaidu\/)/$1http:\/\/s.365rili.com$2/gi' $css
    perl -pi -e 's/(src=.)(\/wannianlibaidu\/)/$1http:\/\/s.365rili.com$2/gi' $css
done

for js in `find wannianlibaidu -name "*.js" -print` ;
do
    perl -pi -e 's/(src=.)(\/wannianlibaidu\/)/$1http:\/\/s.365rili.com$2/gi' $js
done
