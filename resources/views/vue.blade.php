<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">
        <title>Laravel Vue</title>
    </head>
    <body>
        <div class="" id="app">
            <example-component></example-component>
        </div>
        <script src="{{ secure_asset('js/app.js')}}" defer></script>
    </body>
</html>
