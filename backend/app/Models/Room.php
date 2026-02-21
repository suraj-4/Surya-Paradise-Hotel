<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model{
    use HasFactory;

    protected $fillable = [
        'hotel_id',
        'name',
        'image_url',
        'description',
        'price_per_night',
        'capacity',
        'amenity_name',
        'amenity_icon',
        'status'
    ];

    public function hotel() {
        return $this->belongsTo(Hotel::class);
    }

    public function bookings() {
        return $this->hasMany(Booking::class);
    }

    public function rooms(){
        return $this->hasMany(Room::class, 'hotel_id');
    }

}
