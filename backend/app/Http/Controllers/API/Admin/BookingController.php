<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Exists;
use Illuminate\Validation\ValidationException;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $bookings = Booking::all();

        if(!$bookings || $bookings->isEmpty()){
            return response()->json([
                'status' => false,
                'error'=> 'No bookings found.',
            ],404);
        }

        return response()->json([
            'status' => true,
            'success'=> 'Bookings fetched successfully.',
            'allBookings' => $bookings
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id', 
                'room_id' => 'required|exists:rooms,id',
                'check_in' => 'required|date|after_or_equal:today',
                'check_out' => 'required|date|after:check_in',
                'total_guests' => 'nullable|numeric|min:1',
                'status' => 'nullable|string|in:pending,confirmed,cancelled,completed',
                'payment_status' => 'nullable|string|in:unpaid,paid,refunded',
            ]);

            // Get room
            $room = Room::findOrFail($validated['room_id']);

            // ✅ Check room status before booking
            if ($room->status === 'booked') {
                return response()->json([
                    'status' => false,
                    'error' => 'Cannot book this room. The selected room is already booked.'
                ], 403);
            }

            if ($room->status === 'maintenance') {
                return response()->json([
                    'status' => false,
                    'error' => 'Cannot book this room. The selected room is under maintenance.'
                ], 403);
            }

            // ✅ Calculate nights
            $checkIn = Carbon::parse($validated['check_in']);
            $checkOut = Carbon::parse($validated['check_out']);
            $nights = $checkIn->diffInDays($checkOut);

            if ($nights < 1) {
                return response()->json([
                    'status' => false,
                    'error' => 'Check-out date must be at least 1 day after check-in.'
                ], 422);
            }

            // ✅ Calculate total price
            $validated['total_price'] = $nights * $room->price_per_night;

            // ✅ Create booking
            $booking = Booking::create($validated);

            // ✅ Update room status (optional)
            $room->update(['status' => 'booked']);

            return response()->json([
                'status' => true,
                'success' => 'Booking created successfully',
                'booking' => $booking
            ], 201);


        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'error' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
