import Settings from './../settings';

class ToplistService {

	saveScore(playerName,score) {
		// If the name of the player is empty, we do not save it to the toplist
		if (_.isEmpty(playerName)) {
			return;
		}

 		/**
 		 *
 		 *   Save your score using a webservice, for example
		 * 
		 *   $.post(Settings.urls.saveScore,{
 		 *  	'playerName' : playerName
 		 *  	,'score' : score
 		 *   }).done(function(data) {
 		 *   	console.log('data was saved')
		 *   });
		 *
		 **/ 
		// $.post(Settings.urls.saveScore,{
 	  // 	'playerName' : player.playerName
		// 	,'score' : score
		// 	})
		// 	.done(function(data) {
		// 	console.log('data was saved')
		// 	});
		console.log(Settings.token)
		$.ajax({
			type: "POST",
			url: "https://blackstageplay.herokuapp.com/api/game/updateScore",
			headers: {"Authorization": Settings.token},
			data: {'name':"wr",'userName':playerName, 'score':score, 'artistName':Settings.artistName},
			dataType: "json",
			success: function(res) {
				console.log(res)
			},
			error:function(err){
				console.log(err)
			}
		})		
	}

	/**
	 * Call your webservice to get the top10 player
	 * Something like this: return $.get(Settings.urls.getTop10);
	 */
	getTop10() {
		$.ajax({
			type: "POST",
			url: "https://blackstageplay.herokuapp.com/api/game/all",
			data: {gameName:"wr",artistName:Settings.artistName},
			dataType: "json",
			success: function(res) {
				res.map(res => console.log(res))
				return res
			},
			error:function(err){
				console.log(err)
			}
		})
 		// return [
 		// 	{"playerName":"AE","score":"100000"}
 		// 	,{"playerName":"AE","score":"90000"}
 		// 	,{"playerName":"AE","score":"80000"}
 		// 	,{"playerName":"AE","score":"70000"}
 		// 	,{"playerName":"AE","score":"60000"}
 		// 	,{"playerName":"AE","score":"50000"}
 		// 	,{"playerName":"AE","score":"40000"}
 		// 	,{"playerName":"AE","score":"30000"}
 		// 	,{"playerName":"AE","score":"20000"}
 		// 	,{"playerName":"AE","score":"10000"} 			
 		// ];
	}
}

export default new ToplistService();