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
.filter('titleFilter', function() {
	return function(input) {
		var titles = {
			'guardian': 'The Guardian',
			'fox': 'Fox News',
			'aljazeera': 'Al Jazeera English',
			'huffingtonpost': 'Huffington Post',
			'nytimes': 'New York Times',
			'cnn': 'CNN'
		}
		return titles[input]
	}
})