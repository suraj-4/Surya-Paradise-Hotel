<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class UserController extends Controller{
    public function register(Request $request){
        try{       
            $validated = $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
            ]);

            if ($validated['email'] === '' || $validated['password'] === '') {
                return response()->json([
                    'error' => 'Email and password are required'
                ], 400);
            }
             
            if (User::where('email', $validated['email'])->exists()) {
                return response()->json([
                    'error' => 'Email already exists'
                ], 409);
            }

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user, 
                'token' => $token
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors(),
            ], 422);
        }
        catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred during registration',
                'message' => $e->getMessage()
            ], 500);
        }
        
    }

    public function login(Request $request){
        try {
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'error' => 'Invalid credentials'
                ], 401);
            }

            $user = User::where('email', $request->email)->first();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user, 
                'token' => $token
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred during login',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function profile(){
        try {
            $user = Auth::user();
            return response()->json([
                'user' => $user, 
                'success' => 'User profile fetch successful!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred while fetching profile',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function forgotPassword(Request $request){
        try {
            $request->validate([
                'email' => 'required|email|exists:users,email',
            ]);

            $status = Password::sendResetLink(
                $request->only('email')
            );

            if ($status === Password::RESET_LINK_SENT) {
                return response()->json([
                    'success' => 'Password reset link sent to your email!'
                ]);
            }
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred during password reset',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function resetPassword(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
            'token' => 'required'
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = bcrypt($password);
                $user->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'success' => 'Password reset successfully!'
            ]);
        }

        return response()->json([
            'error' => 'Invalid token'
        ], 400);
    }



    public function logout(){
        try {
            $user = Auth::user();
            $user->tokens()->delete();
            return response()->json([
                'success' => 'User logout Successful!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred during logout',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
