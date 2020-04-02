import {Decimal} from 'decimal.js';

class CalcModel {
  _result: Decimal;
  _isResult: boolean;
  _isDivByZero: boolean;
  _status: string;
  _func: string;

  FN_NOP: string;
  FN_ALLCLEAR: string;
  FN_SIGN: string;
  FN_MODULO: string;
  FN_DIVIDE: string;
  FN_TIMES: string;
  FN_MINUS: string;
  FN_PLUS: string;

  constructor() {
    this._result = new Decimal(0);
    this._isResult = true;
    this._isDivByZero = false;
    this._status = "";

    this.FN_NOP      = "nop";
    this.FN_ALLCLEAR = "AC";
    this.FN_SIGN     = "+/-";
    this.FN_MODULO   = "%";
    this.FN_DIVIDE   = "/";
    this.FN_TIMES    = "x";
    this.FN_MINUS    = "-";
    this.FN_PLUS     = "+";

    this._func = this.FN_PLUS;
  }

  GetAccumulator(val) {
    let accumulator = "";
    if (val != "") {
      accumulator = val;
    } else {
      accumulator = "0";
    }
    return accumulator;
  }

  CalculateResult(val) {
    switch(this._func) {
      case this.FN_MODULO:
        if (Number(val) == 0) {
          this._isDivByZero = true;
          this.SetStatus("Divide by zero!");
        } else {
          this._result = this._result.modulo(val);
        }
        break;
      case this.FN_DIVIDE:
        if (Number(val) == 0) {
          this._isDivByZero = true;
          this.SetStatus("Divide by zero!");
        } else {
          this._result = this._result.dividedBy(val);
        }
        break;
      case this.FN_TIMES:
        this._result = this._result.times(val);
        break;
      case this.FN_PLUS:
        this._result = this._result.plus(val);
        break;
      case this.FN_MINUS:
        this._result = this._result.minus(val);
        break;
      default:
        this.SetStatus("Unknown arithmetic operation");
        this._result = new Decimal(0);
        break;
    }

    //console.log("Result is '" + this._result + "'");
    this.SetResultTrue();

    return this._result;
  }

  StoreResult(val: string) {
    this._result = new Decimal(val);
  }

  GetResult() {
    return "" + this._result.toString();
  }

  ClearAll() {
    this._result = new Decimal(0);
    this._isResult = true;
    this._isDivByZero = false;
    this._func = this.FN_PLUS;
    this._status = "";
  }

  OnModulo() {
    this._func = this.FN_MODULO;
    this._isResult = true;
  }

  OnDivide() {
    this._func = this.FN_DIVIDE;
    this._isResult = true;
  }

  OnTimes() {
    this._func = this.FN_TIMES;
    this._isResult = true;
  }

  OnMinus() {
    this._func = this.FN_MINUS;
    this._isResult = true;
  }

  OnPlus() {
    this._func = this.FN_PLUS;
    this._isResult = true;
  }

  IsDivideByZero() {
    return this._isDivByZero;
  }

  IsResult() {
    return this._isResult;
  }

  SetResultFalse() {
    this._isResult = false;
  }

  SetResultTrue() {
    this._isResult = true;
  }

  GetStatus() {
    return this._status;
  }

  SetStatus(val: string) {
    this._status = val;
  }
}

export { CalcModel };