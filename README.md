<p align="center">
  <img width="600" height="200" src="https://beespotter.org/images/bslogo.png">
</p>

## Installation

## Development

When working ionic components that also function in the web (sqlite, storage, etc.) you can run the application in your web browser. This is the simplest option. Note the live reload option which allows changes to be made to the application without reloading the web server.

```
ionic serve --livereload
```

When working with components that cannot run in the browser but can be emulated (google maps) run the application in an emulator.

```
ionic cordova run ios --target="iPhone-X" --livereload
```

When working with mobile native components (camera) you must deploy the application to your phone for testing. You can get the output from console.log to your browser

```
ionic cordova run android
ionic cordova run ios
```

## Resources

* [Ionic Documentation](https://ionicframework.com/docs/)
* [Ionic components](https://ionicframework.com/docs/components/#overview)
* [Ionic Native](https://ionicframework.com/docs/native/)
* [Josh Morony Ionic Blog](https://www.joshmorony.com/tag/intermediate/)


## Authors

* **Chris Bell** - *Student Developer*
* **Joseph Zietlow** - *Student Developer*
* **Michael McKelvey** - *Client/Advisor*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Dr. Stahr
* Michael McKelvey
* Bee Spotter
* Miami Bee Club
