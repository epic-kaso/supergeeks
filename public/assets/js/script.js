		$(window).load(function(){
			var $fp_wrapper = $(".featured-projects"),
				$fp_container = $(".featured-container"),
				$fp_projects = $fp_wrapper.find(">div"),
				$fp_outer = $(".featured-projects-outer");
				$footer = $("#footer"),
				$hero = $(".hero"),
				$html_body = $("html, body"),
				FPProjectsLength = $fp_projects.length,
				browserWidth = parseInt($("html, body").outerWidth()),
				browserHeight = parseInt($("html, body").outerHeight()),
				FPContainerHeight = (FPProjectsLength * browserHeight),
				$works = $(".works"),
				$work = $works.find(".work"),
				breakPoints = [],
				heroInView = false,
				footerInView = false,
				inFeatured = false,
				deltaFactor = 0;
				fpIndex = 0;

				function init() {
					$fp_wrapper.css('height', FPContainerHeight);
					$fp_container.css('height', browserHeight);
					$fp_projects.css({'height': browserHeight});
				}

				init();

				$html_body.on("mousewheel", activateMouseWheel);	

				$footer.waypoint(
					{
						offset: 'bottom-in-view',
						handler: function() {
							footerInView = true;
							heroInView = false;
							inFeatured = false;
							$html_body.on("mousewheel", activateMouseWheel);
						}
					});

				$hero.waypoint(
				{
					offset: "0%",
					handler: function() {
						inFeatured = false;
						heroInView = true;
						footerInView = false;
						$html_body.on("mousewheel", activateMouseWheel);
					}
				});

				$html_body.on('inFeatured', function(){
					heroInView = false;
					footerInView = false;
					inFeatured = true;
					$(this).on("mousewheel", function(event){
						  if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
							  if (fpIndex < FPProjectsLength) {
							  		FPSlide("next");
							  }

							 if ( $fp_container.scrollTop() == breakPoints[FPProjectsLength - 1] ) {
							 		$html_body.off("mousewheel");
							  }
						  } else {
						  		if(fpIndex < FPProjectsLength) {
						  			FPSlide("prev");
						  		}

						  		if ( $fp_container.scrollTop() == breakPoints[0] ) {
							 		$html_body.off("mousewheel");
							  }
						  }
						 deltaFactor =event.deltaFactor;
						event.preventDefault();
					});
				});
				$fp_container.waypoint (
				{
					offset: 0,
					handler: function() {
						inFeatured = true,
						heroInView = false,
						footerInView = false
					}
				});

				function activateMouseWheel(event, delta) {
					if ( event.deltaY < 0 && heroInView == true) {
							TweenMax.to($html_body, 1, {scrollTop: $fp_container.offset().top , ease:Power2.easeInOut});
							$html_body.trigger('inFeatured');
					}

					if (event.deltaY > 0 && footerInView == true) {
						TweenMax.to($html_body, 1, {scrollTop: $fp_container.offset().top, ease:Power2.easeInOut});
						$html_body.trigger('inFeatured');
					}
				}

				function createFPNav() {
					content = document.createElement("div");
					for(i = 0; i < FPProjectsLength; i++) {
						spanElement = document.createElement("span");
						textNode = document.createTextNode("");
						spanElement.appendChild(textNode);
						content.appendChild(spanElement);
						breakPoints[i] = i*browserHeight;
					}
					content.setAttribute("id", "FPnav");
					$fp_outer.append(content);
				}
				createFPNav();

				function FPSlide(direction) {
					if (direction == "next" ) {
						TweenMax.to($fp_container, 1, {scrollTop: "+="+browserHeight , ease:Power2.easeInOut});
					} else {
						TweenMax.to($fp_container, 1, {scrollTop: "-="+browserHeight , ease:Power2.easeInOut});
					}
				}
				console.log(breakPoints);

				$controls = $("#FPnav").find("span");

				$controls.each(function(){
					$(this).click(function(){
						TweenMax.to($fp_container, 1, {scrollTop: breakPoints[$(this).index()], ease:Power2.easeInOut});
					});
			 	});
			 	$work.each(function(){
			 		$(this).on("mouseover", function(){
			 			$this = $(this)
			 			$(this).addClass('reveal');
			 		});
			 	}).on("mouseleave", function(){
			 		$this = $(this)
			 		$(this).removeClass('reveal');
			 	});

			 	$("#w-thumbs > li").each(function(){
			 		$(this).hoverdir({
			 			speed: 10,
			 			easing: SteppedEase,
			 			hoverDelay: 0,

			 		});
			 	});

			 	$("#w-thumbs").isotope({
			 		columnWidth: 600, 
			 		itemSelector: "li",
			 	});

			 	$load_more = $(".load-more");
			 	$load_more.on("click", function(e){
			 		$href = $(this).attr('href');
			 		$.getJSON($href, function ( data ) {
			 			//console.log( data );

			 			items = [];
			 			$.each( data, function( key, val) {
			 				//console.log(val);
			 				items.push( "<li class='"+val.class+"'><a href=''><img src='"+val.img+"' alt='Project1'><div><h2>"+val.title+"</h2><span>"+val.description+"</span></div></a></li>" )
			 			});

			 			var $newItems = "'"+items.join("")+"'";
			 			$("#w-thumbs").append($newItems).isotope('appended', $newItems, function(){
			 				$("w-thumbs").isotope('relayout');
			 			});
			 			//console.log($newItems);
			 		});
			 		e.preventDefault();
			 	});

		});