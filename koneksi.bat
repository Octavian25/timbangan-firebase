@echo off
title Timbangan Elektronik V.1
echo -----------------------------------------
echo *** Selamat datang di Timbangan Elektronik V.1 ***
echo *** Tekan CTRL + C untuk stop koneksi ***
echo -----------------------------------------

echo Mohon Masukan Port COM Sesuai Timbangan :
set /p hasil=
echo -----------------------------------------
echo *** 1. Google Chrome ***
echo *** 2. Mozilla Firefox ***
echo -----------------------------------------
echo Mohon Pilih Browser (1/2) :
set /p browser=
if %browser% == 1 goto chrome
if %browser% == 2 goto mozilla
:chrome
cls
start chrome http://localhost:4000/
node index.js %hasil%
pause
:mozilla
cls
start firefox http://localhost:4000/
node index.js %hasil%
pause
test&cls
