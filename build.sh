#!/bin/sh
cd ../
mkdir output
cp -R ./JOBIS-FE/. ./output
cp -R ./output ./JOBIS-FE/
cd ./output/JOBIS-FE
rm -r .github
