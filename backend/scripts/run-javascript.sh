#!/bin/bash
filepath=$1
cd ../code_files
echo "executing ${filepath}"
node ${filepath} > output.txt
pwd