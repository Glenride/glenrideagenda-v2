<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->prefix('api')->group(function () {
    // Categories
    Route::apiResource('categories', CategoryController::class)->except(['show']);
    Route::post('categories/{category}/restore', [CategoryController::class, 'restore'])
        ->withTrashed();

    // Projects
    Route::apiResource('projects', ProjectController::class)->except(['show']);
    Route::post('projects/{project}/restore', [ProjectController::class, 'restore'])
        ->withTrashed();

    // Notes
    Route::apiResource('notes', NoteController::class);
    Route::post('notes/{note}/restore', [NoteController::class, 'restore'])
        ->withTrashed();
    Route::post('notes/{note}/toggle-agenda', [NoteController::class, 'toggleAgenda']);
});
