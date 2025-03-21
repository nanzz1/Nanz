#!/bin/bash

echo "Menginstal dependensi yang dibutuhkan..."
pkg update -y && pkg upgrade -y
pkg install nodejs -y
pkg install npm -y

echo "Menginstal paket Node.js..."
npm install axios chalk form-data fs path readline-sync
echo "izinkan untuk menyimpan session"
termux-setup-storage

echo "✅ Instalasi selesai! Menjalankan script..."
node ddos.js
