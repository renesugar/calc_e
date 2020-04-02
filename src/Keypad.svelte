<script>
	import { createEventDispatcher } from 'svelte';

	let keyValue = '';

	const dispatch = createEventDispatcher();

	const keypress = () => {
		dispatch('keypress', {
			text: keyValue
		});
	};
	const select = key => () => {
		keyValue = key;
		console.log("Keypad.svelte: select is '" + key + "'");
		keypress();
	};
</script>

<style lang="postcss">
.keypad {
	display: grid;
  grid-template-columns: repeat(4, 1fr);
	grid-gap: 1px;
	padding: 0px;
}

.keypad > button {
	text-align: center;
	padding: 10px 0;
	font-weight: bold;
	font-size: 30px;
}

.zero {
	grid-area: 5 / 1 / span 1 / span 2;
}
</style>

<!-- on:tap works in svelte.native and on:click works in svelte -->
<div class="keypad darkgrey">
	<button class="btn charcoal"                on:click={select("AC")} >AC</button>
	<button class="btn charcoal"                on:click={select("+/-")} >+/-</button>
	<button class="btn charcoal fas fa-percent" on:click={select("%")} >&#xf295;</button>
	<button class="btn orange fas fa-divide"    on:click={select("/")} >&#xf529;</button>
	
	<button class="btn silver"                  on:click={select("7")} >7</button>
	<button class="btn silver"                  on:click={select("8")} >8</button>
	<button class="btn silver"                  on:click={select("9")} >9</button>
	<button class="btn orange fas fa-times"     on:click={select("x")} >&#xf00d;</button>
	
	<button class="btn silver"                  on:click={select("4")} >4</button>
	<button class="btn silver"                  on:click={select("5")} >5</button>
	<button class="btn silver"                  on:click={select("6")} >6</button>
	<button class="btn orange fas fa-minus"     on:click={select("-")} >&#xf068;</button>
	
	<button class="btn silver"                  on:click={select("1")} >1</button>
	<button class="btn silver"                  on:click={select("2")} >2</button>
	<button class="btn silver"                  on:click={select("3")} >3</button>
	<button class="btn orange fas fa-plus"      on:click={select("+")} >&#xf067;</button>
	
	<button class="btn silver zero"             on:click={select("0")} >0</button>

	<button class="btn silver"                  on:click={select(".")} >.</button>
	<button class="btn orange fas fa-equals"    on:click={select("=")} >&#xf52c;</button>
</div>