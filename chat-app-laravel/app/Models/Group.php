<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'created_by',
    ];

    // Relationship with users (a group can have many users)
    public function users()
    {
        return $this->belongsToMany(User::class, 'group_user');
    }

    // Relationship with the creator of the group
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
