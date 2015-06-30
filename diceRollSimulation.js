/*************
* Simulate craps roll n number of times
*/

function simulate(n) {
	function roll() {return Math.floor(Math.random() * (7- 1)) + 1;}

	var diceRolls = {};

	for (var i =0; i < n; i++) { 
		var num = roll() + roll();
		(!diceRolls[num]) ? diceRolls[num] = 1 : diceRolls[num]++;
	}

	for (var key in diceRolls) { if (diceRolls.hasOwnProperty(key)) { console.log(key + " " + diceRolls[key]/n) }}

	return diceRolls;
}