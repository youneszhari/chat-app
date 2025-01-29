<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    // Create a new group
    public function createGroup(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'created_by' => 'required|exists:users,id',
        ]);

        $group = Group::create([
            'name' => $request->name,
            'created_by' => $request->created_by,
        ]);

        return response()->json(['message' => 'Group created successfully', 'group' => $group], 201);
    }

    // Add a user to a group
    public function addUserToGroup(Request $request)
    {
        $request->validate([
            'group_id' => 'required|exists:groups,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $group = Group::find($request->group_id);
        $group->users()->attach($request->user_id);

        return response()->json(['message' => 'User added to group successfully'], 200);
    }

    // Remove a user from a group
    public function removeUserFromGroup(Request $request)
    {
        $request->validate([
            'group_id' => 'required|exists:groups,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $group = Group::find($request->group_id);
        $group->users()->detach($request->user_id);

        return response()->json(['message' => 'User removed from group successfully'], 200);
    }
}
