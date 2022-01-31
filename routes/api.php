<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\TextToSpeechController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/answer',[ChatController::class,'answer']);
Route::post('/question/{chat}',[ChatController::class,'admin']);
Route::delete('/question/{chat}',[ChatController::class,'destroy']);
Route::post('/speech',[TextToSpeechController::class,'convert']);
