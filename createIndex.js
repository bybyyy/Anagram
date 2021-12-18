const fs = require('fs');
	let dictionary = fs.readFileSync("./smallDictionary.txt");

// Think about your components:
// first you sort each work to
// get a alphanumerical word, and
// then you sort each word against
// each other words alphanumerical word

console.log("Hey!");

function swap(arr, a, b){
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

function QSort(array){
	if (array.length <= 1){
		return array;
	}

	let pivot = array[array.length-1];
	let LArray = [];
	let RArray = [];
	let position = -1;

	//if the array at index i is smaller than pivot point, swap i and position +1
	for (let i = 0; i < array.length-1; i++){
		if(array[i] < pivot){
			position = position + 1;
			swap(array, i, position);
		}
	}
    position++;
	swap(array, position, array.length-1);

	//add the left and right side of the pivot to the respective array
	for (let a = 0; a < position; a++){
		LArray.push(array[a]);
	}
	for (let b = position+1; b < array.length; b++){
		RArray.push(array[b]);
	}
	//recurive, call the left and right side of the pivot
	LArray = QSort(LArray);
	RArray = QSort(RArray);
	return [...LArray, pivot, ...RArray];
}

dictionary = dictionary.toString().replace(/ /g, '').split('\n');

for (let i = 0; i < dictionary.length; i++) {
	var original = dictionary[i];
	dictionary[i] = QSort(dictionary[i].split('')).join('') + '|' + original;
}

dictionary = QSort(dictionary)
let data = '';
for(let i = 0 ; i < dictionary.length ; i++) {
	data += dictionary[i] + '\n';
}
console.log(data)
fs.writeFile('myAnagrams.txt', data, (err) => {
	// In case of a error throw err.
	if (err) throw err;
})




