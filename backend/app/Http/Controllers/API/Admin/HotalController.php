<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class HotalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $hotels = Hotel::with('owner')->withCount('rooms')->get();

        if ($hotels->isEmpty()) {
            return response()->json([
                'status' => false,
                'error'=> 'No hotels found.',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'success'=> 'Hotels fetched successfully.',
            'allHotels' => $hotels
        ], 200);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(){
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        try{
            $validated = $request->validate([
                'name' => 'required|unique:hotels,name',
                'description' => 'nullable|string',
                'address' => 'nullable|string',
                'city' => 'nullable|string',
                'state' => 'nullable|string',
                'country' => 'nullable|string',
                'zip_code' => 'nullable|digits:6',
                'phone' => 'nullable|numeric|regex:/^\d{10}$/',
                'email' => 'nullable|string|email',
                'status' => 'nullable|string',
            ]);

            $validated['owner_id'] = Auth::id();

            $hotel = Hotel::create($validated);
            // ✅ Count rooms for this hotel (initially will be 0 since it's just created)
            $totalRooms = $hotel->rooms()->count();

            return response()->json([
                'status' => true,
                'success'=> 'Hotel added Successfully',
                'hotel' => $hotel,
                'total_rooms' => $totalRooms
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
     * Display the specified resource.
     */
    public function show(string $id){
        $hotel = Hotel::find($id);

        if(!$hotel){
            return response()->json([
                'status' => false,
                'error'=> 'Sorry! This ID not exist.',
            ],404);
        }

        return response()->json([
            'status' => true,
            'success'=> 'Hotel fetched successfully.',
            'hotel' => $hotel
        ],201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id){
        $hotel = Hotel::find($id);

        if(!$hotel){
            return response()->json([
                'status' => false,
                'error'=> 'Sorry! This ID not exist.',
            ],404);
        }

        return response()->json([
            'status' => true,
            'success'=> 'Hotel fetched successfully.',
            'editHotel' => $hotel
        ],201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){
        try{
            $hotel = Hotel::find($id);
            if(!$hotel){
                return response()->json([
                    'status' => false,
                    'error'=> 'Sorry! This ID not exist.',
                ],404);
            }
            $validated = $request->validate([
                'name' => 'required|unique:hotels,name,'.$hotel->id,
                'description' => 'nullable|string',
                'address' => 'nullable|string',
                'city' => 'nullable|string',
                'state' => 'nullable|string',
                'country' => 'nullable|string',
                'zip_code' => 'nullable|digits:6',
                'phone' => 'nullable|numeric|regex:/^\d{10}$/',
                'email' => 'nullable|string|email',
                'status' => 'nullable|string',
            ]);

            $validated['owner_id'] = Auth::id();

            $updatedHotel = $hotel->update($validated);

            // ✅ Count rooms for this hotel (initially will be 0 since it's just created)
            $totalRooms = $hotel->rooms()->count();

            return response()->json([
                'status' => true,
                'success'=> 'Hotel updated Successfully',
                'updatedHotel' => $updatedHotel,
                'total_rooms' => $totalRooms
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
        $hotel = Hotel::find($id);

        if(!$hotel){
            return response()->json([
                'status' => false,
                'error'=> 'Sorry! This ID not exist.',
            ],404);
        }
        $hotel->delete();
        return response()->json([
            'status' => true,
            'success'=> 'Hotel deleted successfully.',
        ],201);
    }
}
