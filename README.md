# Adventure Capitalist

## Overview and acknowledgments
This is a test project to showcase the creation process and organization of a HTML5 game.

### Tools
To build this application, the following tools and utilities have been used:  
 
* Phaser 3 as a main framework to work with WebGL.
* Typescript 3.8.2, due to the advanced type checking, better readability and maintainability, better structure...
* TSLint as a codestyle checker. Even though ESLint provides a plugin to work with Typescript, some rules can't be implemented, and I wanted to provide the whole list of rules that make code organized and clean (check ```tslint.json```).
* Webpack as a bundler and module loader, since it's the industry standard for building, bundling and handling module loading in frontend applications and in anything that works in the browser in general.
* Phaser 3, Webpack 4 and Typescript [boilerplate project by Pavle Goloskokovic](https://github.com/pavle-goloskokovic/phaser3-webpack4-typescript-boilerplate). The reasons for using this specific combination are provided in the next section.
* Express to setup the server for the application.
* Husky to implement Git Hooks to check the code style before pushing to the repository.  

### Graphic resources
For this project, the following graphic resources have been used:

* Convenience store icon by [Freepik](https://www.flaticon.es/autores/freepik).
* Wayne Enterprises icon by  [Batman Wiki Fandom](https://batman.fandom.com/wiki/Batman).
* Pawn shop icon by [Eucalyp](https://www.flaticon.es/autores/eucalyp).
* Car dealership icon by [Eucalyp](https://www.flaticon.es/autores/eucalyp). 
* Construction company icon by [mynamepong](https://www.flaticon.es/autores/mynamepong).
* Tech hub icon by [Freepik](https://www.flaticon.es/autores/Freepik).
* Upgrade icon by [srip](https://www.flaticon.es/autores/srip).
* Acquire icon by [Kiranshastry](https://www.flaticon.es/autores/Kiranshastry).
* Stock market icon by  [Freepik](https://www.flaticon.es/autores/Freepik).
* Stock market icon by  [Enrico Zammit Lonardelli](https://www.pngfind.com/mpng/xmoJxR_created-and-maintained-by-enrico-zammit-lonardelli-logo/).

### Hosted application
https://my-adventure-capitalist.herokuapp.com/

## Technical approach
On this section the details about the technical approach followed for the specific requirements as well as transversal mechanisms are provided.

#### Startup flow
* The ```game.ts``` file establishes the main configuration for the game, and loads the scenes.
* The first scene that's loaded is ```preloader```. This one is in charge of loading all the
necessary assets. Some are dynamically loaded based on the configuration set in ```business.config.ts```,
that will be explained later.
* ```preloader``` loads the ```game``` scene, which is the main game scene, that sets up all the UI
and the logic or entities that will be used.

#### Project structure and purpose

The main directory of the project is ```ts``` where the Typscript code is. The rest of the folders
are considered to be self-descriptive by their names.

##### ```config``` folder
This directory hosts the configuration files that shape the graphic interface, the business properties
and the game itself.

* ```business.config.ts``` sets all the properties and interfaces that configure the businesses, as
well as their values when applicable.

* ```gui.config.ts``` is in charge of the properties to lay out the elements in the interface: spaces,
positions, colors, styles... This way there's a single point of configuration for dynamically set elements
or those who are common.

* ```game.config.ts``` sets properties that are game related and do not belong in any of the aforementioned
files.

#### ```interfaces``` folder
Here there are two files:

* ```common.interface.ts``` for defining types that are used in different places in the code and are
not scoped to one specific entity.
* ```BusinessOperations.interface.ts``` defines an interface that the Businesses implement to be sure
they all provide their own implementation of the necessary methods.

#### ```scenes``` folder
Here live all the scenes of the game.

#### ```services``` folder
For common utilities or classic services. Just one is present at the moment, but it would be the place
for more to come.

#### ```classes``` folder
Here are placed all the models of the game. ```BaseBusiness``` is the superclass of the rest, which
extend from them. More about this in the **Logic general architecture** section.

#### Logic general arquitecture


##### Web components like approach
A sort of web-components-like approach has been followed. Of course taking into account 
the differences of HTML elements with the underlying tools of a HTML game, but trying to 
create entities that are responsible for their on UI elements and logic.

The ```game``` scene is treated as if it were a mediator component, handling the logic of the game,
as well as the data and the interface elements, and creating instances of the businesses. This
instantiation is direct since tehre is not dependency injection, but it is all based on the ```business.config.ts```
file. This data is *"bound"* to the ```BaseBusiness``` instnce.

On the other hand, the ```BaseBusiness``` model is used as a self-managed component. It contains all
the logic to be able to handle the requirements of a business. Also there are subclasses for each subtype
of business. Even though at the moment there's one for each, only two are necessary for the purpose of
this project and have their own logic. The rest are present to show what the structure would be like only.

More information about the specific functionality of the subtypes of business is provided in **Extra functionality**.

The ```game``` scene makes use of the ```BaseBusiness``` model creating a list of instances that is
used for then binding the UI information needed (coming from the config file) or data, whether it is
for restoring the game state, create a brand new one, etc.

The ```update``` lifecycle callback of the scene calls the instances ```update``` method, which based
on the property values, updates the instance state, and hence the UI accordingly.


##### Scalability and maintainability
To make the application easy to grown and maintain, several mechanisms are in place:

* The config files make it really easy to customize the look and parameters of the game.
* The layout of the application is fairly dynamic. Based on the config files the elements are autoplaced,
autospaced and styled. Of course it all depends on the general game size and the limitations of an HTML5 game.
* The `bussiness.config.ts` file makes it easy to change or scale the businesses.
* From a code perspective, the general flow of *config => scene => model* makes it easy to add logic
to the specific place without having to couple elements unnecessarily.

More information about possible enhancements is provided in the **Improvements** section. 

##### Interfaces
Several custom types have been defined for the coding experience to be better, and having a more secure type checking
in combination with Typescript. They are the following:

* BusinessInfo
* BusinessOperations
* GraphicStats
* GraphicOperations
* GameState
* BusinessState

##### Requirements and extra functionality
All the previous section give information about the technical approach towards fulfilling the provided specs. There still are two
points to cover:

* The idle game feature has been implemente by using **local storage**. It is well known to the author the limitations of this
approach, like the clearing of the storage in mobile devices depending on the operating system, memory resources, etc, but it
aims to display the implementation to follow should the app use a backend API or a different solution.

* There is extra functionality on the app, which consists on special operations for some businesses. 
This operations are particular to every business, hence they're implemented in the subclasses of the
BaseBusiness model. For now the specific parameters of those operations are hosted in the classes
themselves but they could be factored out to the configuration files too. The subclasses follow the 
same flow for updating themselves and the scene as the base class. 


#### Code style
The project has been built following the principles below:
* The Angular style guide, which among others, include these style rules (implemented through TSLint):
  * Class properties placement depending on visibility.
  * Getters and setters placement.
  * Class methods placement depending on visibility.
  * Spacing (new lines) between assigments and other expressions/statements, `const` declarations...
  * Spacing in curly brackets, objects...
  * Usage of multi-line destructuring and imports...
  * ...

* The Angularjs commit convention. Please check the commit history for specific samples.: *type(scope): subject*.


## Improvements
The following would be considered improvements:

* Adding a loading scene, help scene, menus scenes...
* Constant files.
* Utilities for graphics to use as services.
* Further decoupling of scene presentation code and logic. 
* Make BaseBusiness "component" fully dynamic.
* Web components approach for graphic elements like progress bar.
* Scenes for upgrades and managers
* Localization and i18n.
* Add sounds. 
* Different multipliers for different business.
* Create a basic dependency injection tool.

## Basic user manual
The help scene explains how to play the game. The extra functionality is "surprise" feature, but as
 the help states, it is enabled by upgrading the businesses. At some point an extra icon will show up 
 and some elements will be highlighted to show which attributes of the business are affected by the 
 special operation: 
 
 * The Tech Hub can be opened to the stock market, which will make the profit to be multiplied 
 by a decimal number between 0 and 2.
 * Wayne Enterprises might receive a call from certain superhero which will affect the price of the
 company but also the benefits.
