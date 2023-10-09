#!/bin/bash

# Start the server
cd server
npm start &

# Start the client
cd ../client
npm start
