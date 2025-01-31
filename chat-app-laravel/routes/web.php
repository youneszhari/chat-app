<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\MessageController;

// API Routes
Route::prefix('api')->group(function () {
    // User Management Routes
    Route::get('/getUsers', [UserController::class, 'getUsers']);
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);

    // Group Management Routes
    Route::post('/createGroup', [GroupController::class, 'createGroup']);
    Route::post('/addUserToGroup', [GroupController::class, 'addUserToGroup']);
    Route::post('/removeUserFromGroup', [GroupController::class, 'removeUserFromGroup']);

    // Message Management Routes
    Route::post('/sendMessage', [MessageController::class, 'sendMessage']);
    Route::get('/getMessages', [MessageController::class, 'getMessages']);
});