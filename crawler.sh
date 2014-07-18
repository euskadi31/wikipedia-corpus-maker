#!/bin/bash

#
# wikipedia-corpus-maker
#
# Copyright (c) 2014 Axel Etcheverry
#
# For the full copyright and license information, please view the LICENSE
# file that was distributed with this source code.
#

if [ -z $1 ]; then
    echo "Usage: $0 lang"
    exit 2;
fi

LANGUAGE=$1
CORPUS=./corpus/${LANGUAGE}

if [ ! -f ${LANGUAGE}.txt ]; then
    echo "File ${LANGUAGE}.txt not found."
    exit 2;
fi

if [ ! -d ${CORPUS} ]; then
    mkdir -p "${CORPUS}"
fi

while read url; do
    KEY=$(echo ${url} | md5)

    if [ ! -f "${CORPUS}/${KEY}.txt" ]; then
        echo "Fetching ${url}..."
        phantomjs parser.js ${url} 2> /dev/null > "${CORPUS}/${KEY}.txt"
    fi

done < ${LANGUAGE}.txt
