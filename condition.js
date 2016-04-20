$(document).ready(function() {

	var control;
	var ephemeral;
	var done_with_control = false;
	var done_with_ephemeral  = false;
	var survey_completed = false;
	var second_round_of_testing = false;

	if (Math.random() <= 0.5) {
		control = true;
		ephemeral = false;
	} else {
		control = false;
		ephemeral = true;
	}

	if (control) {
		$("#header").html("Control Trial");
		$("#title").html("RS1: Control Test");
	} else if (ephemeral) {
		$("#header").html("Ephemeral Trial");
		$("#title").html("RS1: Ephemeral Test");
	}

	var word_groups = [["Braise", "Saute", "Roast", "Grill"],["Muscle", "Tendon", "Ligament", "Cartilage"],["Crawfish", "Shrimp", "Prawn", "Lobster"],["Mussel", "Oyster", "Scallop", "Abalone"],["Ceramic", "Granite", "Porcelain", "Marble"],["Blender", "Mixer", "Juicer", "Chopper"],["Fridge", "Stove", "Microwave", "Dishwasher"],["Doctor", "Physician", "Surgeon", "Nurse"],["Carpet", "Vinyl", "Laminate", "Hardwood"],["Hemlock", "Spruce", "Cedar", "Juniper"],["Happy", "Scared", "Mellow", "Angry"],["Winter", "Summer", "Spring", "Autumn"],["Arctic", "Atlantic", "Pacific", "Indian"],["Hearts", "Spades", "Diamonds", "Clubs"],["Clock", "Timepiece", "Sundial", "Watch"],["Canucks", "Flames", "Oilers", "Senators"],["Basil", "Oregano", "Thyme", "Parsley"],["Samsun", "Sanyo", "Panasonic", "Pioneer"],["Hershey", "Caramilk", "Smarties", "Eatmore"],["Tahiti", "Samoa", "Tonga", "Tuvalu"],["France", "Germany", "Spain", "England"],["Gucci", "Armani", "Versace", "Vuitton"],["Embroidery", "Crochet", "Knitting", "Sewing"],["Sardine", "Trout", "Salmon", "Whitefish"],["Bigfoot", "Sasquatch", "Minotaur", "Ogopogo"],["Flannel", "Linen", "Cotton", "Spandex"],["Scrabble", "Checkers", "Chess", "Backgammon"],["Almond", "Pecan", "Pistachio", "Walnut"],["Cheddar", "Camembert", "Gouda", "Parmesan"],["Molson", "Kokanee", "Labatt", "Coors"],["Ballroom", "Ballet", "Swing", "Hiphop"],["Beethoven", "Brahms", "Chopin", "Handel"],["Violin", "Flute", "Piano", "Percussion"],["Rhine", "Amazon", "Danube", "Yangtze"],["Penny", "Nickel", "Quarter", "Dollar"],["Purse", "Backpack", "Schoolbag", "Duffle"],["Terrier", "Bulldog", "Dalmatian", "Poodle"],["Stroll", "Saunter", "Prance", "Swagger"],["Hydrogen", "Helium", "Oxygen", "Nitrogen"],["Saturn", "Jupiter", "Venus", "Mercury"],["Sneaker", "Sandal", "Moccasin", "Loafer"],["Toyota", "Mazda", "Mercedes", "Honda"],["Termite", "Katydid", "Spider", "Ladybug"],["Coupe", "Minivan", "Sedan", "Hatchback"],["London", "Paris", "Madrid", "Berlin"],["Bahamas", "Barbados", "Jamaica", "Bermuda"],["Japan", "China", "Korea", "Singapore"],["Lipstick", "Nailpolish", "Shadow", "Blush"],["Herbal", "Rooibos", "Jasmine", "Peppermint"],["Virgo", "Taurus", "Aquarius", "Gemini"],["Chardonnay", "Merlot", "Shiraz", "Cabernet"],["Reebok", "Asics", "Adidas", "Converse"],["Tornado", "Cyclone", "Hurricane", "Storm"],["Poplar", "Birch", "Alder", "Willow"],["Spoon", "Knife", "Spatula", "Ladle"],["Lasagna", "Spaghetti", "Linguine", "Penne"],["Movie", "Theatre", "Musical", "Opera"],["Shirt", "Jacket", "Sweater", "Overcoat"],["Pencil", "Ballpoint", "Marker", "Crayon"],["House", "Apartment", "Cabin", "Cottage"],["Squirrel", "Mouse", "Hamster", "Gerbil"],["Tiger", "Leopard", "Cheetah", "Cougar"],["Parrot", "Bluebird", "Robin", "Budgie"],["Paperback", "Magazine", "Newspaper", "Journal"],["Roman", "Byzantine", "Egyptian", "Ottoman"],["Horror", "Comedy", "Drama", "Foreign"],["Hockey", "Skiing", "Curling", "Skating"],["Mountain", "Knoll", "Highland", "Foothill"],["Carrot", "Potato", "Onion", "Eggplant"],["Airplane", "Helicopter", "Blimp", "Balloon"],["Kayak", "Gondola", "Canoe", "Sailboat"],["Painting", "Sculpture", "Portrait", "Photograph"],["Soccer", "Basketball", "Baseball", "Football"]]

	var word_groups_length = word_groups.length;

	var added_groups = [];

	var menu_words = [[/*menu1*/], [/*menu2*/], [/*menu3*/]];

	// timer related variables.
	var myDate = new Date();
	var starttime = myDate.getTime();
	var endtime = myDate.getTime();

	for (var j = 1; j <= 3; j++){
		for (var i = 1; i <= 4; i++) {
			var random_index = Math.floor(word_groups_length*Math.random());
			while ($.inArray(random_index, added_groups) != -1) {
				random_index = Math.floor(word_groups_length*Math.random());
			}
			added_groups.push(random_index);
		}

		var menu_id = "#menu" + j + "dropdown";
		var index_of_words = (j-1)*4;
		var list_item_index = 0;
		for (var m = index_of_words; m <= index_of_words + 3; m++) {
			for (var n = 0; n < 4; n++) {
				if (ephemeral) {
					$(menu_id).append("<li class='menu_item fadein' " + "id=" + j + "_" + list_item_index + "><a>" + word_groups[added_groups[m]][n] + "</a></li>");
				} else {
					$(menu_id).append("<li class='menu_item' " + "id=" + j + "_" + list_item_index + "><a>" + word_groups[added_groups[m]][n] + "</a></li>");
				}
				menu_words[j-1].push(word_groups[added_groups[m]][n]);
				list_item_index++;
			}
			if (m != index_of_words + 3) {
				$(menu_id).append("<li role='presentation' class='divider'></li>");
			}
		}
	}

	// attach words to the hidden menus
	for (var mae = 0; mae <3; mae++) {
		for (var ite = 0; ite < 16; ite++) {
			var menu_ide = offset(mae);
			var menu_id_of_word = "#menu" + menu_ide + "dropdowncopy";
			if (ite%4 === 0 && ite != 0){
				$(menu_id_of_word).append("<li role='presentation' class='divider'></li>");
			}
			if (ephemeral) {
				$(menu_id_of_word).append("<li class='menu_item fadein' " + "id=" + menu_ide + "_" + ite + "copy><a>" + menu_words[mae][ite] + "</a></li>");
			} else {
				$(menu_id_of_word).append("<li class='menu_item' " + "id=" + menu_ide + "_" + ite + "copy><a>" + menu_words[mae][ite] + "</a></li>");
			}
		}
	}

	// console.log(menu_words)

	if (ephemeral) {
		for (var i = 1; i < 4; i++) {
			var rand1 = Math.floor(Math.random()*15);
			var rand2 = (rand1+ 19)%15;
			var rand3 = (rand1 + 11)%15;
			$("#" + i + "_" + rand1).removeClass("fadein");
			$("#" + i + "_" + rand2).removeClass("fadein");
			$("#" + i + "_" + rand3).removeClass("fadein");
			$("#" + i + "_" + rand1 + "copy").removeClass("fadein");
			$("#" + i + "_" + rand2 + "copy").removeClass("fadein");
			$("#" + i + "_" + rand3 + "copy").removeClass("fadein");
		}
	}

	var selected_words = [[/*menu1*/],[/*menu2*/],[/*menu3*/]];
	var selected_indices = [[], [], []];
	// randomly choose 8 words from each menu and add them to the selected_words array
	for (var ma = 0; ma < 3; ma++) {
		for (var ia = 1; ia <= 8; ia++) {
			var random_index1 = Math.floor(Math.random()*11);
			while ($.inArray(random_index1, selected_indices[ma]) != -1) {
				random_index1 = Math.floor(Math.random()*11);
			}
			selected_words[ma].push(menu_words[ma][random_index1]);
			selected_indices[ma].push(random_index1);
		}
	}

	// now that we have selected the words, we will randomly assign them the zipf distribution [15,8,5,4,3,3,2,2]
	function generateWordDistribution() {			
		var zipf = [15,8,5,4,3,3,2,2];
		var words_and_distributions = [[],[],[]];
		for (var ma = 0; ma < 3; ma++) {
			for (var iq = 0; iq < 8; iq++) {
				words_and_distributions[ma].push([selected_words[ma][iq], zipf[iq]]);
			}
		}	
		return words_and_distributions
	}


	var words_and_distributions = generateWordDistribution();

	var random_start_index = Math.round(Math.random()*7);
	var random_start_menu = Math.round(Math.random()*2);
	$("#selection").html("Menu " + (random_start_menu + 1) + " > " + words_and_distributions[random_start_menu][random_start_index][0]);
	words_and_distributions[random_start_menu][random_start_index][1] -= 1;
	var current_selection = words_and_distributions[random_start_menu][random_start_index][0];
	var current_menu;


	var number_of_trials = 0;
	var number_of_tasks = 63;
	var total_number_of_tasks = 126;
	var testing_mode = false;

	$(".menu_item").click(function(e) {	
		var target_predicted = false;
		var myString = e.target;
		var word_to_guess = current_selection;
		var correctness = (myString.text === current_selection);

		if (correctness /*&& survey_completed*/) {
			reattachFadeIn();
			myDate = new Date();
			endtime = myDate.getTime();
			var elapsed_time = endtime - starttime
			// console.log(elapsed_time + " elapsed_time");

			if (! isDistributionExhausted()) {
				data = getNewTask();
				current_menu = data[0];
				current_selection = data[1];
				myDate = new Date();
				starttime = myDate.getTime();
			}


			var random_number = Math.random();
			var current_selection_index = findWordIndex(current_selection);
			var menus = [];
			for (var ma = 0; ma < 3; ma++) {
				if (ma != current_menu) {
					menus.push(ma);
				}
			}
			if (ephemeral) {
				if (random_number <= 0.79) {
					// $(current_selection_index).removeClass(".fadein");
					var mnu = current_menu + 1;
					$("#" + mnu + "_" + current_selection_index).removeClass("fadein");
					$("#" + mnu + "_" + (current_selection_index + 19)%15).removeClass("fadein");
					$("#" + mnu + "_" + (current_selection_index+11)%15).removeClass("fadein");
					$("#" + mnu + "_" + current_selection_index + "copy").removeClass("fadein");
					$("#" + mnu + "_" + (current_selection_index + 19)%15 + "copy").removeClass("fadein");
					$("#" + mnu + "_" + (current_selection_index+11)%15 + "copy").removeClass("fadein");
					target_predicted = true;

					for (var i = 0; i < 2; i++) {
						var mnu = menus[i] + 1;
						var rand1 = Math.floor(Math.random()*15);
						var rand2 = (rand1+ 19)%15;
						var rand3 = (rand1 + 11)%15;
						$("#" + mnu + "_" + rand1).removeClass("fadein");
						$("#" + mnu + "_" + rand2).removeClass("fadein");
						$("#" + mnu + "_" + rand3).removeClass("fadein");
						$("#" + mnu + "_" + rand1+"copy").removeClass("fadein");
						$("#" + mnu + "_" + rand2+"copy").removeClass("fadein");
						$("#" + mnu + "_" + rand3+"copy").removeClass("fadein");
					}
				} else {
					for (var i = 1; i <= 3; i++) {
						var rand1 = Math.floor(Math.random()*15);
						var rand2 = (rand1+ 19)%15;
						var rand3 = (rand1 + 11)%15;
						$("#" + i + "_" + rand1).removeClass("fadein");
						$("#" + i + "_" + rand2).removeClass("fadein");
						$("#" + i + "_" + rand3).removeClass("fadein");
						$("#" + i + "_" + rand1+"copy").removeClass("fadein");
						$("#" + i + "_" + rand2+"copy").removeClass("fadein");
						$("#" + i + "_" + rand3+"copy").removeClass("fadein");
					}
				}
			} else {
				for (var i = 1; i <= 3; i++) {
					for (var j = 0; j < 16; j++) {
						var menu_item = "#" + i + "_" + j;
						$(menu_item).removeClass("fadein");
						$(menu_item + "copy").removeClass("fadein");
					}
				}
			}

			if (number_of_trials < 7 /*&& number_of_tasks === 0*/) {
				// trial mode
				number_of_trials++;
				if (second_round_of_testing) {
					$("#selection").html("Menu " + offset((current_menu)) + " > " + current_selection);
				} else {
					$("#selection").html("Menu " + (current_menu + 1) + " > " + current_selection);
				}
				$("#completed").html(number_of_trials);


			} else if (number_of_trials === 7 /*&& number_of_tasks === 0*/) {
				// enter testing mode & end of trial mode
				// restart the distribution
				number_of_trials++;
				words_and_distributions = generateWordDistribution();
				if (second_round_of_testing) {
					$("#selection").html("Menu " + offset((current_menu)) + " > " + current_selection);
				} else {
					$("#selection").html("Menu " + (current_menu + 1) + " > " + current_selection);
				}
				$("#completed").html(number_of_trials);
				$("#start_testing").removeAttr('disabled');
				$("#start_testing").removeClass("disabled_button");
				if (ephemeral) {
					$("#header").html("Ephemeral Test");
				} else if (control) {
					$("#header").html("Control Test");
				}


			} else if (number_of_trials === 8 && number_of_tasks < 125 && testing_mode) {
				// testing mode
				number_of_tasks++;
				if (second_round_of_testing) {
					$("#selection").html("Menu " + offset((current_menu)) + " > " + current_selection);
				} else {
					$("#selection").html("Menu " + (current_menu + 1) + " > " + current_selection);
				}
				$("#completed").html(number_of_tasks);

			} else if (number_of_trials === 8 && number_of_tasks === 125) {
				// done with testing and trial. See if already completed the other ephemeral mode. If yes, end experiment, else enter that mode.
				// restart the distribution
				// fix any off by one issues
				$("#selection").html("Done with the testing portion for this mode!");
				$("#completed").html(number_of_tasks+1);	
				// $("#start_testing").val("Move to next section.");
				$("#survey").removeAttr('disabled');
				$("#next").removeAttr('disabled');
				$("#next").removeClass('disabled_button');
				if (ephemeral) { 
					ephemeral = false;
					done_with_ephemeral = true;
				} else if (control) {
					control = false;
					done_with_control = true;
				}		
				if (second_round_of_testing) {
					$("#final_survey").removeAttr('disabled');
					$("#final_survey").removeClass('copy');
					$("#final_message").html("Thanks for completing the experiment! Please click on the final survey and the next section buttons. Please don't close/refresh the browser until you have copy pasted the results logged on the console into <a href='https://docs.google.com/forms/d/1YCM0Gx3qjnRZwcxy0Oh--4iFugNLLAwKAD2Y6edylP8/viewform'>this survey</a> (OPEN THIS IN A NEW PAGE OR ELSE YOU WILL LOSE THE DATA).");
				}
			}
		}

		// This is the data point format that we will log to the console:

		// condition correctness target selected time target_predicted 

		if (control && testing_mode) {
			console.log("control " + correctness + " " + word_to_guess + " " + myString.text + " " + elapsed_time + " NA");
		} else if (ephemeral && testing_mode) {
			console.log("ephemeral " + correctness + " " + word_to_guess + " " + myString.text + " " + elapsed_time + " " + target_predicted);
		}
	});

	$("#survey").click(function(e) {
		// $("#next").removeAttr('disabled');
		// if (done_with_ephemeral && !done_with_control) {
		// 	// survey of ephemeral
		// 	window.open('http://goo.gl/forms/JF8vqgtcK2', '_blank');
		// 	survey_completed = true;
		// } else if (done_with_control && !done_with_ephemeral) {
		// 	// survey of control
		// 	window.open('http://goo.gl/forms/JF8vqgtcK2', '_blank');
		// } else if (done_with_ephemeral && done_with_control) {
		// 	// final survey
		// 	window.open('http://goo.gl/forms/JF8vqgtcK2', '_blank');
		// } else if (!done_with_control && !done_with_ephemeral) {
			// demographic survey
		window.open('http://goo.gl/forms/qA6Vc4C4bC', '_blank');
		$("#survey").attr('disabled', 'disabled');
		$("#survey").addClass('disabled_button');
		$("#to_remove").html('');
		// }
		// window.open(url, '_blank');
	});

	$("#next").click(function(e) {
		second_round_of_testing = true;
		$("#next").attr('disabled', 'disabled');
		$("#next").addClass('disabled_button');
		window.open('http://goo.gl/forms/JF8vqgtcK2', '_blank');
		for (var i = 1; i <= 3; i++) {
			var menu_id = "#menu" + i + "dropdown";
			// $(menu_id).text('');
		}
		if (!(done_with_control && done_with_ephemeral)) {
			// $("#selection").html("Menu " + (current_menu + 1) + " > " + current_selection);
			$("#completed").html(0);
			$("#total").html(8);
			testing_mode = false;
			number_of_trials = 0;
			number_of_tasks = 63;
			words_and_distributions = generateWordDistribution();
			if (done_with_ephemeral) {
				// enter control mode
				control = true;
				ephemeral = false;
				$("#header").html("Control Trial");
				$("#title").html("RS1: Control Test");
				for (var i  = 1; i <= 3; i++){
					for (var j = 0; j < 16; j++) {
						var menu_item = "#" + i + "_" + j;
						$(menu_item).removeClass("fadein");
						$(menu_item + "copy").removeClass("fadein");
					}
				}

			} else if (done_with_control) {
				// enter ephemeral mode
				ephemeral = true;
				control = false;
				$("#header").html("Ephemeral Trial");
				$("#title").html("RS1: Ephemeral Test");
				reattachFadeIn();

			}
			// rearrangeMenus(ephemeral, menu_words);
			data = getNewTask();
			current_menu = data[0];
			current_selection = data[1];
			$("#selection").html("Menu " + offset(current_menu) + " > " + current_selection);
			for (var i = 1; i < 4; i ++){
				var menu = "menu" + i;
				$("#menu" + i).addClass("copy");
				$("#menu" + i + "copy").removeClass("copy");
			}
			// $("#next").addClass("copy");
		}

	});

	function offset(mae) {
		var menu_ide;
		if (mae === 0) {
			menu_ide = 2;
		} else if (mae === 1) {
			menu_ide = 3;
		} else if (mae === 2) {
			menu_ide = 1;
		}
		return menu_ide;
	}

	function rearrangeMenus(ephemeral, menu_words) {
		for (var mae = 0; mae <3; mae++) {
			for (var ite = 0; ite < 16; ite++) {
				var menu_ide = offset(mae);
				var menu_id_of_word = "#menu" + menu_ide + "dropdown";
				if (ite%4 === 0 && ite != 0){
					$(menu_id_of_word).append("<li role='presentation' class='divider'></li>");
				}
				if (ephemeral) {
					$(menu_id_of_word).append("<li class='menu_item fadein' " + "id=" + menu_ide + "_" + ite + "><a>" + menu_words[mae][ite] + "</a></li>");
				} else {
					$(menu_id_of_word).append("<li class='menu_item' " + "id=" + menu_ide + "_" + ite + "><a>" + menu_words[mae][ite] + "</a></li>");
				}
			}
		}
	}

	$("#start_testing").click(function(e) {
		data = getNewTask();
		current_menu = data[0];
		current_selection = data[1];
		if (second_round_of_testing) {
			$("#selection").html("Menu " + offset((current_menu)) + " > " + current_selection);
		} else {
			$("#selection").html("Menu " + (current_menu + 1) + " > " + current_selection);
		}
		$("#completed").html(number_of_tasks);
		$("#total").html(total_number_of_tasks);
		$("#start_testing").attr('disabled','disabled');
		$("#start_testing").addClass('disabled_button');
		testing_mode = true;
		myDate = new Date();
		starttime = myDate.getTime();
	});


	// gets a new task from the words distribution and updates the distribution accordingly
	function getNewTask() {
		var random_menu = Math.round(Math.random()*2);
		var random_word_index = Math.round(Math.random()*7);
		while(words_and_distributions[random_menu][random_word_index][1] === 0) {
			random_menu =  Math.round(Math.random()*2);
			random_word_index = Math.round(Math.random()*7);
		}
		words_and_distributions[random_menu][random_word_index][1] -= 1;
		return [random_menu, words_and_distributions[random_menu][random_word_index][0]]
	}

	// helper function to check whether all word selections have been made from the zipf distribution
	function isDistributionExhausted() {
		var bool = true;
		for (var ma = 0; ma < 3; ma++) {
			for (var it = 0; it < 8; it++) {
				if (words_and_distributions[ma][it][1] != 0) {
					bool = false;
				}
			}
		}
		return bool;
	}

	//	helper function to reattach the .fadein class to all the menus' list items.
	function reattachFadeIn() {
		for (var i = 1; i <= 3; i++) {
			for (var j = 0; j < 16; j++) {
				var menu_item = "#" + i + "_" + j;
				$(menu_item).addClass("fadein");
				$(menu_item + "copy").addClass("fadein");
			}
		}
	}

	// helper function to find the index of a word in the menu list. Returns the id of that menu index.
	function findWordIndex(word) {
		for (var i = 1; i <= 3; i++) {
			for (var j = 0; j < 16; j++) {
				var menu_item = "#" + i + "_" + j + "";
				// might be item.target.text
				if($(menu_item).text() === word) {
					// return menu_item;
					return j;
				}
			}
		}
		// return "#none";
		return -1;
	}

	$(".menu").click(function(e) {
		var fadeInSpeed = 500;
		$(".fadein").fadeOut(0, "linear");
		$(".fadein").fadeIn(fadeInSpeed, "linear");
	});

	$("#final_survey").click(function(e) {
		window.open('http://goo.gl/forms/5d6gz0zE5h', '_blank');
	})

});