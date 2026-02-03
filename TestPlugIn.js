/*:
 * @plugindesc Simple Dialog Selector Plugin
 * @author Jaiden Kettleson
 *
 * @param Enable Dialog System
 * @type boolean
 * @default false
 *
 * @param Text Game Variable
 * @type variable
 * @default 1
 *
 * @param Dialog List
 * @type text[]
 * @default ["Hello, \\P[0]"]
 *
 * @param Default Dialog
 * @type text
 * @default Hello, \\P[0]
 */

(function () {

    const params = PluginManager.parameters("TestPlugIn");

    const enableDialogSystem = params["Enable Dialog System"] === "true";
    const textVariableId = Number(params["Text Game Variable"]);
    const dialogList = JSON.parse(params["Dialog List"] || "[]");
    const defaultDialog = params["Default Dialog"];

    Game_System.prototype.setDialogSystemEnabled = function(enabled) {
        this._dialogSystemEnabled = !!enabled;
    };

    Game_System.prototype.isDialogSystemEnabled = function() {
        return this._dialogSystemEnabled === true;
    };

    Game_System.prototype.setDialogVariable = function(index) {
        const text = dialogList[index] !== undefined
            ? dialogList[index]
            : defaultDialog;

        $gameVariables.setValue(textVariableId, text);
    };

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this.setDialogSystemEnabled(enableDialogSystem);
    };

    const _pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _pluginCommand.call(this, command, args);

        if (command === "Tutorial.DialogSelector") {
            switch (args[0]) {
                case "Enable":
                    $gameSystem.setDialogSystemEnabled(args[1] === "true");
                    break;

                case "GetDialog":
                    $gameSystem.setDialogVariable(Number(args[1]));
                    break;
            }
        }
    };

})();