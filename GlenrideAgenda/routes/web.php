<?php

use App\Models\Category;
use App\Models\Note;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();

        $categories = $user->categories()
            ->with('projects')
            ->get();

        $notes = $user->notes()
            ->with('project.category')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('dashboard', [
            'categories' => $categories,
            'notes' => $notes,
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
