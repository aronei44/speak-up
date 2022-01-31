<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function chatBotUserView(){
        return Inertia::render('Index');
    }
    public function chatBotAdminView(){
        return Inertia::render('Admin',[
            'chat'=>Chat::all()
        ]);
    }
    public function textToSpeech(){
        return Inertia::render('Speech');
    }
    public function location(){
        return Inertia::render('Location');
    }
}
