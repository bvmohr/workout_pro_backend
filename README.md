![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

# Workout Pro | Behind the Scenes

***Contributor***: Brian Mohr

## Summary
This project consists of the `Express server` that runs 'Workout Pro' application. 

### Start Guide

1. Clone the repo
```bash
git clone 
```
2. Navigate to the root of the directory and install dependencies
```bash
npm install
```
3. Start the server
```bash
npm start
```
4. Split your terminal to send `curl` requests. Register a new account in the application
```bash
curl -X POST http://localhost:8080/register \
  -H "Content-Type: application/json" \
  -d '{"username": "jonSnow", "password": "pwd123"}'
```
5. Login into the application
```bash
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"username": "jonSnow", "password": "pwd123"}'
```
6. View the workouts provided
```bash
curl -X GET http://localhost:8080/workouts -b cookies.txt
```

## Aditional Notes
