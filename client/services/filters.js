angular.module('pineNews')
.filter('capitalize', function() {
	return function(input){
		var finalArr = [];
		var words = input.split(' ')
		words.forEach(function(word) {
			finalArr.push(word[0].toUpperCase() + word.substring(1, word.length))
		})
		return finalArr.join(',').replace(/[,]/g, " ")
	}
})