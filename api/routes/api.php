<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StepController;

Route::get('/steps', [StepController::class, 'index']);
Route::post('/steps', [StepController::class, 'store']);
