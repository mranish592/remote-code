#!/bin/bash
code_filepath=$1
output_filepath=$2
cd ${CODE_FILES_PATH}
echo "executing ${code_filepath}"
chmod 511 "${code_filepath}"
ls -l
time node "${code_filepath}" > "${output_filepath}" 2>&1