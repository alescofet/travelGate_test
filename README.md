# TravelGateTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Explaination

First of all I created the interfaces for the backend calls, after that I did the function that recovers all the information and mapped it into the properly normalised format. I had some problems with the asyncrony, I tried to use the forkjoin to parallelize all the calls into one and subscribe only to that but I need more time to make it work, so finally I used the third parameter of subsribe to chain all and make a "cascade", making each call to wait for the previous.

For the second part I assumed that the client will only need a breakfast meal type or even just stay, with that in mind I filtered the rooms to get only the ones with that meal types.

After launching the app you can navigate through the first part of the test(Hoteles button), the plain JSON formatted info(JSON button), and the second part of the test (Parte 2 button).
