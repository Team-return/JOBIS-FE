#!/bin/sh
cd ../
mkdir output
cp -R ./JOBIS-FE/. ./output
cp -R ./output ./JOBIS-FE/
cd ./output
ls -al
rm -rf .github
ls -al
