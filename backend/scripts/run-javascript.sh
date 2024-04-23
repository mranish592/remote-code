#!/bin/bash
code_filepath=$1
output_filepath=$2
cd ../code_files
echo "executing ${code_filepath}"
chmod 511 "${code_filepath}"
ls -l
node "${code_filepath}" > "${output_filepath}" 2>&1 | time