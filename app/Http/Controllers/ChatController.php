<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function answer(Request $request){
        // return $request->question;
        $answer = Chat::firstWhere('question','like','%'.$request->question.'%');

        if(!$answer){
            $answer = Chat::create([
                'question'=>$request->question,
                'faq'=>1
            ]);
            $code = 201;
        }else{
            $faq = $answer->faq+1;
            $answer->update([
                'faq'=>$faq
            ]);
            $code = 200;
        }
        return response()->json([
            'message'=>'success',
            'data'=>$answer
        ],$code);
    }
    public function admin(Request $request, Chat $chat){
        try {
            $chat->update([
                'answer'=>$request->answer
            ]);
            return redirect('/admin');
        } catch (\Throwable $th) {
            return response()->json([
                'message'=>"can't Update Answer"
            ],400);
        }

    }
    public function destroy(Chat $chat){
        try {
            $chat->delete();
            return redirect('/admin');
        } catch (\Throwable $th) {
            return response()->json([
                'message'=>"can't Delete Answer"
            ],400);
        }
    }
}
