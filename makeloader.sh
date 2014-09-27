#!/bin/sh

size=$(wc -c acid.min.rev.js | cut -d" " -f1)
loadsize=$(bc -lq <<< "$size*4")

sed "s/_SIZE_/$loadsize/" < loader.html

