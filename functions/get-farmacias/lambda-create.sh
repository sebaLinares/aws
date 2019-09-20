#!/bin/bash

aws lambda create-function \
    --function-name "get-farmacias-to-view" \
    --runtime "nodejs10.x" \
    --role "arn:aws:iam::706409155387:role/usuario-farmacia-de-turno-chile" \
    --handler "./index.handler" \
    --timeout 5 \
    --zip-file "fileb://./get-farmacias.zip" \
    --region "us-east-2"
