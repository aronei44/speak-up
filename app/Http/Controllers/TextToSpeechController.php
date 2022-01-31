<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TextToSpeechController extends Controller
{
    public function convert(Request $request){
        $txt = htmlspecialchars($request->text);
        $txt = rawurlencode($txt);
        $html = file_get_contents("https://translate.google.com/translate_tts?ie=UTF-8&client=gtx&q=".$txt."&tl=id-ID");
        $player = "<audio controls='controls' autoplay><source src='data:audio/mpeg;base64,".base64_encode($html)."'</audio>";
        return response()->json([
            'message'=>'success',
            'data'=>$player
        ],200);
    }
}
