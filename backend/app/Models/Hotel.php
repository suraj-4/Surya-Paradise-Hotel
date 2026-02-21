<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'address',
        'city',
        'state',
        'country',
        'zip_code',
        'phone',
        'email',
        'owner_id',
        'status',
    ];

    public function owner() {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function rooms() {
        return $this->hasMany(Room::class);
    }

    public function getTotalRoomsAttribute(){
        return $this->rooms()->count();
    }
}
