#! /bin/bash

actualOutput=$( echo `node fillForm.js << EOF 
vivek
1999-11-11
gym,cricket
9411358023
kunj vihar
dehradun
EOF` )

echo -n '{"name":"vivek","dob":"1999-11-11","hobbies":["gym","cricket"],"phoneNum":"9411358023","address":"kunj vihar\ndehradun"}' > expected.json

difference=$( diff expected.json details.json )

expectedOutput="Please enter your name Please enter your dob Please enter your hobbies Please enter your phone number Please enter your address line 1 Please enter your address line 2 Thank You!!" 

report="Failed"

if [[ ${expectedOutput} ==  ${actualOutput} && ${difference} == '' ]]
then
  report="Passed"
fi

echo $report

rm -r expected.json
