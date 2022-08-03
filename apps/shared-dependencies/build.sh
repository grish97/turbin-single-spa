#!/bin/bash

# create directory
mkdir dist

# copy files to dist directory
cp ./importmap.dev.json ./importmap.prod.json ./dist

# All right
echo "Successfully build"