/*:
* @plugindesc This is my first Plugin
* @author Jaiden Kettleson
*
*
* @param Settings
* @text Contains all of the main plugin settings
*
*
* @param Enable Dialog System
* @desc When enabled, turns on the dialog system
* @type boolean
* @default false
* @on Enable
* @off Disable
* @parent Settings
*
*
* @param Text Game Variable
* @desc Assigns a game variable to be used to store dialog text
* @type variable
* @default 1
* @parent Settings
*
*
* @param Dialog Settings
* @text Contains all of the dialog settings
*
*
* @param Dialog List
* @desc list that stores all of the selectable dialog
* @type text[]
* @default ["Hello, \\P[0]"]
* @parent Dialog Settings
*
*
* @param Default Dialog
* @desc The dialog returned when an invalid value is used in the GetDialog plugIn command
* @type text[]
* @default Hello, \\P[0]
*
*
* @help
* for more information on how to use this plugIn, please see the 
* GitHub page:
* https://github.com/Jaiden-kett/TestPlugIn
*/


var tutorial_DialogSelectorParams = PlugInManager.parameters("TestPlugIn");
var enableDialogSystem = (tutorial_DialogSelectorParams("Enable Dialog System") === "true");
var textVariableId = parseInt(tutorial_DialogSelectorParams("Text Variable"));
var dialogList = JSON.parse(tutorial_DialogSelectorParams["Dialog List"]);
var defaultDialog = tutorial_DialogSelectorParams("Default Dialog");


var tutorialDialogSelectorGameInterpreter_pluginCommand = Game_Intrepreter.prototype.tutorialDialogSelectorGameInterpreter_pluginCommand;


Game_Intrepreter.prototype.PlugInManager = function(command, args){
    let matches = [];
    if(command === "Tutorial.DialogSelector"){
        for(let arg of args){
            command += " " + args;
        }
        if(command.match(/Tutorial.DialogSelector[ ]Enable Dialog System[ ](?:(\w+)|(\d+)) /)){
            matches = (/Tutorial.DialogSelector[ ]Enable Dialog System[ ](?:(\w+)|(\d+)) /).exec(command)|| [];
            if(matches.length > 1){
                $gameSystem.toggleDialogSystem(matches(1))
            }
        } else if(command.match(/Tutorial.DialogSelector[ ]GetDialog[ ](\d+)/).exec(command) || []);
        if(matches.length > 1){
            $gameSystem.setDialogVariable(matches(1));
        }
    } else{
        tutorialDialogSelectorGameInterpreter_pluginCommand.call(this, args);
    }
}


Game_System.prototype.toggleDialogSystem = function(dialogSystemEnabled){
    let bSystemEnabled = false;
    if(dialogSystemEnabled.constructor == String){
        dialogSystemEnabled = dialogSystemEnabled.toLocaleLowerCase();
    }
    switch(dialogSystemEnabled){
        case 1:
        case "true":
            bSystemEnabled = true;
            break;
        default:
            break;
    }
    this.bDialogSystemEnabled = dialogSystemEnabled;
}


Game_System.prototype.isDialogSystemEnabled = function() {
    return this.bDialogSystemEnabled == true;
}
$gameSystem.isDialogSystemEnabled(enableDialogSystem);


Game_system.prototype.setDialogVariable = function(index){
    if(dialogList.length == 0 || dialogList.length <= index){
        $gameVariables.setValue(textVariableId, defaultDialog);
    } else {
        $gameVariables.setValue(textVariableId, dialogList(index));
    }
}