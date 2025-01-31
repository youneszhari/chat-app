<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Get all users
    /* public function getUsers()
    {
        $users = User::all();

        return response()->json($users, 200);
    } */

    // Get all users except the current user
    public function getUsers(Request $request)
    {
        $currentUserId = $request->query('user_id'); // Get user_id from query parameters
        $users = User::where('id', '!=', $currentUserId)->get();

        return response()->json($users, 200);
    }


    // Register a new user
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'username' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    // Login a user
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json(['message' => 'Login successful', 'user' => $user], 200);
    }

    // Logout a user
    public function logout(Request $request)
    {
        return response()->json(['message' => 'Logout successful'], 200);
    }


}