<script>
  import { onMount } from 'svelte';
  import { CalcModel } from './CalcModel';
	import Keypad from './Keypad.svelte';

  let calculatorScreen;
  let calculatorScreenFontSize;

	let value = "0";
	$: view = value;

	let FN_NOP      = "nop";
	let FN_ALLCLEAR = "AC";
	let FN_SIGN     = "+/-";
  let FN_MODULO   = "%";
  let FN_DIVIDE   = "/";
  let FN_TIMES    = "x";
  let FN_MINUS    = "-";
	let FN_PLUS     = "+";

	let calculator = new CalcModel();

	function handleKeydown(event) {
    if (event.code == 'KeyC' && (event.ctrlKey || event.metaKey)) {
      navigator.clipboard.writeText(value)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        // This can happen if the user denies clipboard permissions:
        console.error('Could not copy text: ', err);
      });
    } else if (event.code == 'KeyV' && (event.ctrlKey || event.metaKey)) {
      navigator.clipboard.readText()
      .then(text => {
        value = text;
        console.log('Pasted content: ', text);
      })
      .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
      });
    }

    console.log("handleKeydown is '" + event.detail.text + "'");
  }

	function UpdateDisplay(val) {
    value = val;

    // NOTE: 15 is the number of digits that fit in the
    // calculator screen for the chosen font.
    if (val.length > 15) {
      let fontSize = Math.floor((15 * calculatorScreenFontSize)/val.length);
      console.log("UpdateDisplay: fontSize is '" + fontSize.toString() + "'");
      document.body.style.setProperty('--calc-screen-font-size', fontSize.toString() + 'px');
    } else {
      document.body.style.setProperty('--calc-screen-font-size', calculatorScreenFontSize.toString() + 'px');
    }
	}

  function onTapSign() {
		let accumulator = calculator.GetAccumulator(value);

		if (accumulator == "0") {
				; // do nothing
		} else if (accumulator == "0.0") {
				; // do nothing
		} else if (accumulator.startsWith("-")) {
				accumulator = accumulator.substring(1);
		} else {
				accumulator = "-" + accumulator;
		}
		UpdateDisplay(accumulator);
	}

	function onDigit(digit) {
		let accumulator = (calculator.IsResult() ? "" : calculator.GetAccumulator(value));
		calculator.SetResultFalse();

		if (accumulator == "0") {
			accumulator = "" + digit;
		} else {
			accumulator = ("" + accumulator) + digit;
		}
		UpdateDisplay(accumulator);
	}
	
	function onDecimal() {
		let accumulator = (calculator.IsResult() ? "0" : calculator.GetAccumulator(value));
		calculator.SetResultFalse();

		if (accumulator.indexOf(".") == -1) {
				accumulator = ("" + accumulator) + ".";
		}
		UpdateDisplay(accumulator);
	}
		
	function onEquals() {
  	let accumulator = calculator.GetAccumulator(value);
  	calculator.CalculateResult(accumulator);
  	calculator.SetResultTrue();

		let status = calculator.GetStatus();

		if (status != "") {
			UpdateDisplay("0");
			calculator.SetStatus("");
			alert(`${status}`);
		}
		else {
			UpdateDisplay(calculator.GetResult());
		}
	}

	function handleKeypress(event) {
		if (event.detail.text == FN_ALLCLEAR) {
      calculator.ClearAll();
      value = "0";
      
      calculatorScreen.style.setProperty('font-size', calculatorScreenFontSize.toString());
		}
		else if (event.detail.text == FN_SIGN) {
			onTapSign();
		}
		else if (event.detail.text == FN_MODULO) {
			calculator.StoreResult(value);
			calculator.OnModulo();
		}
		else if (event.detail.text == FN_DIVIDE) {
			calculator.StoreResult(value);
			calculator.OnDivide();
		}
		else if (event.detail.text == FN_TIMES) {
			calculator.StoreResult(value);
			calculator.OnTimes();
		}
		else if (event.detail.text == FN_MINUS) {
			calculator.StoreResult(value);
			calculator.OnMinus();
		}
		else if (event.detail.text == FN_PLUS) {
			calculator.StoreResult(value);
			calculator.OnPlus();
		}
		else if (event.detail.text == "0") {
			onDigit("0");
		}
		else if (event.detail.text == "1") {
			onDigit("1");
		}
		else if (event.detail.text == "2") {
			onDigit("2");
		}
		else if (event.detail.text == "3") {
			onDigit("3");
		}
		else if (event.detail.text == "4") {
			onDigit("4");
		}
		else if (event.detail.text == "5") {
			onDigit("5");
		}
		else if (event.detail.text == "6") {
			onDigit("6");
		}
		else if (event.detail.text == "7") {
			onDigit("7");
		}
		else if (event.detail.text == "8") {
			onDigit("8");
		}
		else if (event.detail.text == "9") {
			onDigit("9");
		}
		else if (event.detail.text == ".") {
			onDecimal();
		}
		else if (event.detail.text == "=") {
			onEquals();
		}

		console.log("handleKeypress is '" + event.detail.text + "'");
	}

	onMount(() => {
    calculatorScreen = document.querySelector(".calculator-screen");
    calculatorScreenFontSize = parseInt(window.getComputedStyle(calculatorScreen).getPropertyValue('font-size'));
  });
</script>

<style lang="postcss">

.calculator-screen {
  grid-row: 1 / auto;
  background-color: #575757;
  color: white;
  font-size: var(--calc-screen-font-size);
  text-align: right;
  height: 100px;
  width: 300px;
  resize: none;
  overflow: hidden;
}

.calculator-keypad {
  grid-row: 2 / auto;
}

.calculator {
  display: grid;
  grid-gap: 2px;
  grid-template-columns: auto;
  grid-template-rows: auto;
  background-color: #575757;
  color: white;
}

</style>

<svelte:window on:keydown={handleKeydown}/>

<div class="calculator" >
	<div class="calculator-screen" >{view}</div>
	<Keypad class="calculator-keypad" on:keypress={handleKeypress} />
</div>