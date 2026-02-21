<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $rooms = Room::all();

        if(!$rooms || $rooms->isEmpty()){
            return response()->json([
                'status' => false,
                'error'=> 'No rooms found.',
            ],404);
        }

        return response()->json([
            'status' => true,
            'success'=> 'Rooms fetched successfully.',
            'allRoom' => $rooms
        ],201);
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
        try{
            $validated = $request->validate([
                'hotel_id' => 'required|exists:hotels,id',
                'name' => 'required|unique:rooms,name',
                'description' => 'nullable|string',
                'price_per_night' => 'nullable|numeric',
                'capacity' => 'nullable|numeric',
                'amenity_name' => 'nullable|string',
                'amenity_icon' => 'nullable|string',
                'status' => 'nullable|string',
                'image_url' => 'nullable|image|mimes:jpg,jpeg,png,svg,webp|max:2048',
            ]);

            // ✅ Check if hotel is active
            $hotel = Hotel::findOrFail($validated['hotel_id']);

            if ($hotel->status !== 'active') {
                return response()->json([
                    'status' => false,
                    'error' => 'Cannot add room. The selected hotel is inactive.'
                ], 403); // 403 Forbidden
            }

            // ✅ Handle image upload
            if ($request->hasFile('image_url')) {
                $path = $request->file('image_url')->store('uploads/rooms', 'public');
                $validated['image_url'] = $path;
            }

            // ✅ Create the room
            $room = Room::create($validated);

            return response()->json([
                'status' => true,
                'success'=> 'Room added successfully',
                'room' => $room
            ], 201);


        }catch(ValidationException $e){
            $errors = $e->errors();

            if(isset($errors['name'])){
                return response()->json([
                    'status' => false,
                    'error'=> 'This value already exist',
                    'errors' => $errors
                ],409);
            };

            return response()->json([
                'status' => false,
                'error'=> 'Validation failed',
                'errors' => $errors
            ],402);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id){
        $room = Room::find($id);

        if(!$room){
            return response()->json([
                'status' => false,
                'error'=> 'Sorry! This ID not exist.',
            ],404);
        }

        return response()->json([
            'status' => true,
            'success'=> 'Room fetched successfully.',
            'room' => $room
        ],201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id){
        $room = Room::find($id);

        if(!$room){
            return response()->json([
                'status' => false,
                'error'=> 'Sorry! This ID not exist.',
            ],404);
        }

        return response()->json([
            'status' => true,
            'success'=> 'Room fetched successfully.',
            'editRoom' => $room
        ],201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){
        try{
            $room = Room::find($id);
            if(!$room){
                return response()->json([
                    'status' => false,
                    'error'=> 'Sorry! This ID not exist.',
                ],404);
            }
            $validated = $request->validate([
                'hotel_id' => 'required|exists:hotels,id',
                'name' => 'required|unique:rooms,name,'.$room->id,
                'description' => 'nullable|string',
                'price_per_night' => 'nullable|numeric',
                'capacity' => 'nullable|numeric',
                'amenity_name' => 'nullable|string',
                'amenity_icon' => 'nullable|string',
                'status' => 'nullable|string',
                'image_url' => 'nullable|image|mimes:jpg,jpeg,png,svg,webp|max:2048',
            ]);

            // ✅ Check if hotel is active
            $hotel = Hotel::findOrFail($validated['hotel_id']);

            if ($hotel->status !== 'active') {
                return response()->json([
                    'status' => false,
                    'error' => 'Cannot add room. The selected hotel is inactive.'
                ], 403); // 403 Forbidden
            }

            if ($request->hasFile('image_url')) {
                // Optional: delete old image
                if ($room->image_url && Storage::disk('public')->exists($room->image_url)) {
                    Storage::disk('public')->delete($room->image_url);
                }

                $path = $request->file('image_url')->store('uploads/rooms', 'public');
                $validated['image_url'] = $path;
            }

            $updatedRoom = $room->update($validated);

            return response()->json([
                'status' => true,
                'success'=> 'Room updated Successfully',
                'updatedRoom' => $updatedRoom
            ]);

        }catch(ValidationException $e){
            $errors = $e->errors();

            if(isset($errors['name'])){
                return response()->json([
                    'status' => false,
                    'error'=> 'This value already exist',
                    'errors' => $errors
                ],409);
            };

            return response()->json([
                'status' => false,
                'error'=> 'Validation failed',
                'errors' => $errors
            ],402);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id){
        $room = Room::find($id);

        if(!$room){
            return response()->json([
                'status' => false,
                'error'=> 'Sorry! This ID not exist.',
            ],404);
        }
        $room->delete();
        return response()->json([
            'status' => true,
            'success'=> 'Room deleted successfully.',
        ],201);
    }
}
