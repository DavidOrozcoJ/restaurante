<?php


use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('menu'); // Renderiza el archivo menu.blade.php
});