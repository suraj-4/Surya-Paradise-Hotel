<?php

use App\Http\Controllers\API\Admin\BookingController;
use App\Http\Controllers\API\Admin\HotalController;
use App\Http\Controllers\API\Admin\RoomController;
use App\Http\Controllers\API\Admin\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(UserController::class)->prefix('users')->name('users.')->group(function () {
    Route::post('/register', 'register')->name('register');
    Route::post('/login', 'login')->name('login');
    Route::post('/forgot-password', 'forgotPassword')->name('forgotPassword');
    Route::post('/reset-password', 'resetPassword')->name('resetPassword');
});

Route::controller(UserController::class)->prefix('users')->name('users.')->middleware('auth:sanctum')->group(function () {
    Route::get('/profile', 'profile')->name('profile');
    Route::get('/logout', 'logout')->name('logout');
});

Route::prefix('admin')->name('admin.')->middleware('auth:sanctum')->group(function () {

    //Hotel API Routes
    Route::controller(HotalController::class)->prefix('hotel')->name('hotel.')->group(function () {
        Route::get('/', 'index')->name('list');
        Route::post('/add', 'store')->name('add');
        Route::get('/show/{id}', 'show')->name('show');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::put('/update/{id}', 'update')->name('update');
        Route::delete('/delete/{id}', 'destroy')->name('delete');
    });

    //Room API Routes
    Route::controller(RoomController::class)->prefix('room')->name('room.')->group(function () {
        Route::get('/', 'index')->name('list');
        Route::post('/add', 'store')->name('add');
        Route::get('/show/{id}', 'show')->name('show');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::put('/update/{id}', 'update')->name('update');
        Route::delete('/delete/{id}', 'destroy')->name('delete');
    });

    //Booking API Routes
    Route::controller(BookingController::class)->prefix('booking')->name('booking.')->group(function () {
        Route::get('/', 'index')->name('list');
        Route::post('/add', 'store')->name('add');
        Route::get('/show/{id}', 'show')->name('show');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::put('/update/{id}', 'update')->name('update');
        Route::delete('/delete/{id}', 'destroy')->name('delete');
    });

});
