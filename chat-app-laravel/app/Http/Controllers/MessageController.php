<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MessageController extends Controller
{
    // Middleware URL (replace with your middleware URL)
    private $middlewareUrl = 'http://localhost:8080/chat-app-middleware/api/middleware';

    // Send a message
    public function sendMessage(Request $request)
    {
        $request->validate([
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required', // Can be a user ID or group ID
            'content' => 'required|string',
        ]);

        // Forward the request to the middleware
        $response = Http::post("$this->middlewareUrl/sendMessage", [
            'sender_id' => $request->sender_id,
            'receiver_id' => $request->receiver_id,
            'content' => $request->content,
        ]);

        return response()->json($response->json(), $response->status());
    }

    // Retrieve messages
    public function getMessages(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'receiver_id' => 'required', // Can be a user ID or group ID
        ]);

        // Forward the request to the middleware
        $response = Http::get("$this->middlewareUrl/getMessages", [
            'user_id' => $request->user_id,
            'receiver_id' => $request->receiver_id,
        ]);

        return response()->json($response->json(), $response->status());
    }
}