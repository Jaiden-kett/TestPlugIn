/*:
* @plugindesc This is the first PlugIn
* @author Jaiden Kettleson
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
* #desc Assigns a game variable to be used to store dialog text
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
*
* https://github.com/Jaiden-kett/TestPlugIn
*/

var tutorial_DialogSelectorParams = PlugInManager.parameters("TestPlugIn");
var enableDialogSystem = (tutorial_DialogSelectorParams("Enable Dialog System") === "true");
var textVariableId = parseInt(tutorial_DialogSelectorParams("Text Variable"));
var dialogList = JSON.parse(tutorial_DialogSelectorParams["Dialog List"]);
var defaultDialog = tutorial_DialogSelectorParams("Default Dialog");