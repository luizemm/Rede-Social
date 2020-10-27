export class Callback {
    constructor(successFunction : any, errorFunction : any){
        this.successFunction = successFunction;
        this.errorFunction = errorFunction;
    };

    successFunction() : void {};
    errorFunction(msg : String) : void {};
}