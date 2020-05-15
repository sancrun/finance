jQuery( function($) {
	
	
	
	/* ------------------------------------------------------------------------------------ */

    /* VARIABLES */
    
    /* ------------------------------------------------------------------------------------ */

	var $body = $("body");
	
	

	/* ------------------------------------------------------------------------------------ */
	
    /* DOCUMENT LOAD */
    
    /* ------------------------------------------------------------------------------------ */
    
	$( function() {
		
		
		
		/* ------------------------------------------ */
		/* Stick Footer */
		
			content_height = $('.site-inner').outerHeight();
		
			function stick_footer() {
				
				var $content			= $('.site-inner'),
					$wrapper			= $('.site-container'),
					win_height			= $(window).outerHeight(),
					negative_height		= $wrapper.outerHeight() - $content.outerHeight(),
					page_height    		= negative_height + content_height,
					new_height			= win_height - negative_height;
				
				if ( win_height > page_height ) {
					
					$content.css('min-height', new_height+'px');
					
				}
				
			}
			
			$(window).load(function() {
				stick_footer();
			});
			
			$(window).resize(function() {
				stick_footer();
			});
		
		
		
		/* ------------------------------------------ */
		/* Dashboard */
		
			function the_dashboard() {
				
				var screen_width 		= $(window).width(),
					$dash_portfolios	= $('.dash-portfolios');
				
				if ( screen_width > 859 ) {
					
					$dash_portfolios.removeClass('dash-mobile').addClass('dash-desktop');
					
				} else {
					
					$dash_portfolios.removeClass('dash-desktop').addClass('dash-mobile');
					
					$dash_portfolios.find('equal-height').css({height: 'auto'});
					
				}
				
			}
			
			$(window).load(function() {
				the_dashboard();
			});
			
			
			$(window).resize(function() {
				the_dashboard();
			});
		
			/* Dash Desktop */
			
				$(document).on('click', ".dash-desktop ul.tabs li", function() {
					
					if ( !$(this).hasClass('gate') ) {
					
						var tab_id = $(this).attr('data-tab');
						
						$('.dash-desktop .tab-content .tab-inner').fadeOut();
				
						$('.dash-desktop ul.tabs li').removeClass('active');
						$('.dash-desktop .tab-content').removeClass('active');
						$('.dash-desktop .tab-content a i').removeClass("fa-minus-circle").addClass("fa-plus-circle"); // Mobile
				
						$(".dash-desktop #"+tab_id+' .tab-inner').fadeIn(400);
						
						$(this).addClass('active');
						$(".dash-desktop #"+tab_id).addClass('active');
						$('.dash-desktop #'+tab_id+' a i').removeClass("fa-plus-circle").addClass("fa-minus-circle"); // Mobile
						
						var new_height = $("#"+tab_id).outerHeight() + $(this).parent().outerHeight();
						
						$(this).closest('.dash-portfolios .dash-desktop').css({height: new_height+'px'});
						
						equalheight('.equal-height');
					
					}
					 
				});
				
			/* Dash Mobile */
				
				$(document).on('click', ".dash-mobile .tab-content > a", function() {
					
					if ( !$(this).hasClass('gate') ) {
						
						$(this).closest('.dash-mobile').find('i').removeClass("fa-minus-circle").addClass("fa-plus-circle");
					
						if( $(this).parent().hasClass('active') ) {
							$(this).siblings('.tab-inner').slideUp(200, function() {
								$(this).parent().removeClass("active");
							});
						} else {
							$(".dash-mobile .tab-content > a").parent().removeClass("active");
							$('.dash-mobile .tab-inner').slideUp(200);
							$(this).siblings('.tab-inner').slideDown(200, function() {
								$(this).parent().addClass("active");
							});
							$(this).find("i").removeClass("fa-plus-circle").addClass("fa-minus-circle");
						}
						
						equalheight('.equal-height');
						
						// Desktop
						var tab_id = $(this).parent().attr('id');
						$('.dash-mobile ul.tabs li').removeClass('active');
						$('.dash-mobile ul.tabs li[data-tab="'+tab_id+'"]').addClass('active');
					
					}
					
				});
				
				
				
		/* ------------------------------------------ */
		/* Popup */
		
			//-----> OPEN
			$('[data-popup-open]').on('click', function(e)  {
				
				e.preventDefault();
				
				if ( $(window).width() < 450 && $(this).attr('data-popup-open') == 'popup-visitor' ) {
					
					window.open(loginDash, '_self');
					//https://prudent2.wpengine.com/login.html?redirect_to=https://prudent2.wpengine.com/dashboard.html
					
				} else {
				
					var targeted_popup_class = $(this).attr('data-popup-open');
					$('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
					$('[data-popup="' + targeted_popup_class + '"]').addClass('animated pulse');
					
					$('[data-popup="' + targeted_popup_class + '"] .scrollbar-outer').scrollbar();
					
					adjust_the_popup();
				
				}
		
			});
		
			//-----> CLOSE
			$('[data-popup-close]').on('click', function(e)  {
				
				e.preventDefault();
				
				var targeted_popup_class = $(this).attr('data-popup-close');
				$('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
				
			});
			
			//-----> CLICKOUT
			$('.popup-clickout').click( function() {
				
				if ( !$body.hasClass('visitor-popup') ) {
					$('.popup').fadeOut(350);
				}
				
			});
			
			//-----> ESCAPE
		    $(document).keyup( function(e) {
			    
			    if (e.keyCode == 27) {
				    
			        if ( !$body.hasClass('visitor-popup') ) {
						$('.popup').fadeOut(350);
					}
			        
			    }
			    
		    });
		    
		    //-----> ADJUST
			function adjust_the_popup() {
				
				$('.popup').each( function() {
					
					var $the_popup 	= $(this),
						window_height 	= $(window).height(),
						inner_height	= window_height * .80;
						
					$the_popup.find('.popup-inner').css({"max-height": inner_height+"px"});
					
					var popup_height 	= inner_height - 60;
					
					$the_popup.find('.popup-content').css({"max-height": popup_height+"px"});
					
				});
				
			}
			
			if ( $body.hasClass('visitor-popup') ) {
				
				$('[data-popup-open="popup-visitor"]').trigger('click');
				
				$('.site-inner, .site-footer, .hero-section').addClass('blur-it');
				
			}
			
			
			
		/* ------------------------------------------ */
		/* Dropdown */
		
			function dropdown() {
				
				$(window).click(function() {
					$('.dropdown').removeClass('open');
					$('.dropdown').find('button i').removeClass('fa-caret-up').addClass('fa-caret-down');
				});
				
				$('.dropdown').each( function() {
					
					var $this = $(this);
					
					$(this).click( function(event) {
						event.stopPropagation();
					});
					
					$(this).find('button').on('click', function() {
						
						if ( $(this).parent().hasClass('open') ) {
							$(this).parent().removeClass('open');
							$(this).find('i').removeClass('fa-caret-up').addClass('fa-caret-down');
						} else {
							$(this).parent().addClass('open');
							$(this).find('i').removeClass('fa-caret-down').addClass('fa-caret-up');
						}
						
					});
					
					$(this).find('a').on('click', function() {
						
						$(this).closest('.dropdown').removeClass('open');
						$(this).closest('.dropdown').find('button i').removeClass('fa-caret-up').addClass('fa-caret-down');
						
					});
					
				});
				
			} dropdown();
			
			
			
		/* ------------------------------------------ */
		/* Sub Tier Nav Adjust */
		
			function sub_tier_nav() {
				
				var	width_btn  = $('.js .genesis-nav-menu .menu-item.boxed').outerWidth(),
					width_pad  = parseInt($(".js .genesis-nav-menu .menu-item:first-child a").css("padding-right")),
					nav_adjust = width_btn + width_pad;
				
				$('.sub-tier-nav').css({marginRight: nav_adjust+'px'});
				
			} sub_tier_nav();
			
			
			
		/* ------------------------------------------ */
		/* Custom Select */
			
			$('select.custom-select').each(function() {
				
				var $this = $(this),
					numberOfOptions = $(this).children('option').length;
			
				$this.addClass('select-hidden');
				$this.wrap('<div class="select"></div>');
				$this.after('<div class="select-styled"></div>');
			
				var $styledSelect = $this.next('div.select-styled');
				$styledSelect.text($this.children('option').eq(0).text());
			
				var $list = $('<ul />', {
					'class': 'select-options'
				}).insertAfter($styledSelect);
			
				for (var i = 0; i < numberOfOptions; i++) {
					$('<li />', {
						text: $this.children('option').eq(i).text(),
						rel: $this.children('option').eq(i).val()
					}).appendTo($list);
				}
			
				var $listItems = $list.children('li');
			
				$styledSelect.click(function(e) {
					e.stopPropagation();
					$('div.select-styled.active').not(this).each(function() {
						$(this).removeClass('active').next('ul.select-options').hide();
					});
					$(this).toggleClass('active').next('ul.select-options').slideToggle(100, 'linear');
				});
			
				$listItems.click(function(e) {
					e.stopPropagation();
					$styledSelect.text($(this).text()).removeClass('active');
					$this.val($(this).attr('rel'));
					$list.hide();
				});
			
				$(document).click(function() {
					$styledSelect.removeClass('active');
					$list.hide();
				});
			
			});
			
			
			
		/* ------------------------------------------ */
		/* Panels */
		
			$(document).on('click', ".panels .toggle", function(e) {
				
			  	e.preventDefault();
			  
			    var $this = $(this);
			    
			    $(this).closest('.panels').find('.toggle i').removeClass("fa-minus-circle").addClass("fa-plus-circle");
			  
			    if ($this.next().hasClass('show')) {
			        $this.next().stop().removeClass('show');
			        $this.next().stop().slideUp(350);
			    } else {
			        $this.parent().parent().find('li .panel-inner').stop().removeClass('show');
			        $this.parent().parent().find('li .panel-inner').stop().slideUp(350);
			        $this.next().stop().toggleClass('show');
			        $this.next().stop().slideToggle(350);
			        $this.find("i").removeClass("fa-plus-circle").addClass("fa-minus-circle");
			    }

			});
				
			function mobile_panels() {
				
				var screen_width 		= $(window).width(),
					$mobile_panels		= $('.mobile-panels');
				
				if ( screen_width < 860 ) {
					
					$mobile_panels.addClass('panels');
					
				} else {
					
					$mobile_panels.removeClass('panels');
					
					$mobile_panels.find('.panel-inner').show().css({height: 'auto'});
					
				}
				
			} mobile_panels();
			
			$(window).resize(function() {
				
				mobile_panels();
				
			});
			
		
		
		/* ------------------------------------------ */
		/* Accordion */
			
			$('.accordion .trigger').click( function() {
				
				if ( !$(this).hasClass('gate') ) {
					
					if( $(this).hasClass('active') ) {
						$(this).removeClass('active');
						$(this).find('i').removeClass('fa-arrow-up').addClass('fa-arrow-down');
						$(this).next().stop().slideUp(200);
					} else {
						$(this).addClass('active');
						$(this).find('i').removeClass('fa-arrow-down').addClass('fa-arrow-up');
						$(this).next().stop().slideDown(200);
					}
				
				}
				
			});



		/* ------------------------------------------ */
		/* Equal Height */
		
			equalheight = function(container) {
				
				var currentTallest = 0,
					currentRowStart = 0,
					rowDivs = new Array(),
					$el,
					topPosition = 0;
					
				$(container).each( function() {
					
					$el = $(this);
					
					if ( $el.hasClass('no-equal-m') && $(window).width() < 860 ) {
						
						$el.height('auto');
						
					} else {
					
						$($el).height('auto');
						$($el).find('.equal-child').height('auto')
						topPostion = $el.position().top;
						
						$el.find('.col-button').removeClass('stick');
						
						if (currentRowStart != topPostion) {
							
							for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
								
								rowDivs[currentDiv].height(currentTallest);
								
							}
							
							rowDivs.length = 0; // empty the array
							currentRowStart = topPostion;
							currentTallest = $el.height();
							rowDivs.push($el);
							
						} else {
							
							rowDivs.push($el);
							currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
							
						}
						
						for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
							
							rowDivs[currentDiv].height(currentTallest);
							rowDivs[currentDiv].find('.equal-child').height(currentTallest);
							
						}
						
						$el.find('.col-button').not('.no-stick').addClass('stick');
					
					}
					
				});
				
			}
			
			$(window).load(function() {
				equalheight('.equal-height');
			});
			
			
			$(window).resize(function(){
				equalheight('.equal-height');
			});
			
			
			
		/* ------------------------------------------ */
		/* Tooltips */
		
			function tooltipster() {
			
				$('.tipit').tooltipster({
					animation: 'grow',
					delay: 0,
					side: 'top',
					theme: 'tooltipster-borderless'
				});
				
				$('.tipit-click').tooltipster({
					animation: 'grow',
					delay: 0,
					trigger: 'click',
					side: 'top',
					maxWidth: 1100,
					theme: 'tooltipster-borderless'
				});
			
			} tooltipster();
			
			

		/* ------------------------------------------ */
		/* Post Type Archives */
		
			// IF - is archive page template.
			if ( $body.hasClass('page-template-page-archive') ) {
				
				function ajax_archives() {
					
					var $archive_filter 	= $('.archive-filter'),
						$archive_wrapper 	= $(".archive-wrapper"),
						$archive_populate 	= $(".archive-populate"),
						archive_url			= $archive_filter.data('archive-url'),
						archive_date		= $archive_filter.data('archive-date'),
						current_year		= $archive_filter.data('current-year'),
						latest_month		= $archive_filter.data('latest-month');
						
					if ( $archive_filter.find('.archive-select.year').length ) {
						var select_year		= $archive_filter.find('.archive-select.year').val().split('/')[4];
					}
					
					$archive_wrapper.animate({
						height: 20
					}, 200);
				
					$archive_populate.empty().html('<div style="text-align: center; padding: 30px;"><img src="https://digwp.com/wp-content/themes/wp/img/load2.gif" class="loader" /></div>');
				
					if ( archive_date == 'yearly' ) {
						
						var the_url = archive_url + select_year;
						
					} else {
						
						var select_month	= $archive_filter.find('.archive-select.month').val(),
							the_url 		= archive_url + select_year + '/' + select_month;
							
						if ( select_year < current_year ) {
							$archive_filter.find('option').prop("disabled", false);
						} else {
							$archive_filter.find('option.future-month').prop("disabled", true);
							if ( select_month > latest_month ) {
								$archive_filter.find('option').prop("selected", false);
								$archive_filter.find('option.latest-month').prop("selected", true);
								var the_url = archive_url + select_year + '/' + latest_month;
							}
						}
						
					}
					
					jQuery.ajax({
					
						url: the_url,
						dataType: "html",
						type: "POST",
						success: function(data) {
							$archive_populate.html($('.archives-load', $(data)));
							
							$archive_wrapper.animate({
								height: $(".archives-load").height()
							}, 200);
							
							equalheight('.equal-height');
							tooltipster();
						
						}
						
					});
	
				} ajax_archives();
	
				$(".archive-filter select").change(function() {
					
					ajax_archives();
						
				});
				
			// IF - is post type archive template.
			} else if ( $body.hasClass('post-type-archive') ) {
	
				var $archive_filter 	= $('.archive-filter'),
					$archive_year		= $archive_filter.find('.archive-select.year'),
					$archive_month		= $archive_filter.find('.archive-select.month'),
					$filter_future		= $archive_filter.find('.filter-future'),
					data_url			= $archive_filter.attr('data-url'),
					data_year			= $archive_filter.attr('data-year'),
					data_type			= $archive_filter.attr('data-type'),
					data_current_year	= $archive_filter.attr('data-current-year'),
					data_current_month	= $archive_filter.attr('data-current-month'),
					url_year			= window.location.href.split("/")[4];
					
				$archive_year.find('option[value="'+data_year+'"]').prop("selected", true);
				
				// IF - archive includes monthly option.
				if ( data_type == 'monthly' ) {
					
					var data_month		= $archive_filter.attr('data-month'),
						url_month		= window.location.href.split("/")[5],
						url_root		= window.location.protocol + '//' + window.location.href.split("/")[2] + '/' + window.location.href.split("/")[3];
					
					$archive_month.find('option[value="'+data_month+'"]').prop("selected", true);
					
					// IF - selected year is older than current year.
					if ( data_year < data_current_year ) {
						
						$archive_month.find('option').prop("disabled", false);
						
						// IF - future month in current year is selected. This is a fallback for on "change" check.
						if ( url_year == data_current_year && url_month > data_current_month && $body.hasClass('archive-no-results') ) {
							document.location.href	= url_root + '/' + data_current_year + '/' + data_current_month + '/';
						}
						
					}
					
				}
				
				function GetMonthName(monthNumber) {
					var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
					return months[monthNumber - 1];
				}
				
				var archive_year_val	= $archive_year.val(),
					archive_mon_val		= $archive_month.val();
				
				$(".archive-filter select").change(function() {
					
					var selected_year 	= $archive_year.val(),
						selected_month	= $archive_month.val();
					
					// IF - year dropdown exists.
					if ( $archive_year.length ) {
						var append_url	= selected_year + '/';
					}
					
					// IF - month dropdown exists.
					if ( $archive_month.length ) {
						var append_url	= append_url + selected_month + '/';
					}
					
					// IF - future month in current year is selected
					if ( selected_year == data_current_year && selected_month > data_current_month ) {
						
						$archive_filter.find('option').prop("selected", false);
						
						$archive_year.find('option[value="'+archive_year_val+'"]').prop("selected", true);
						$archive_month.find('option[value="'+archive_mon_val+'"]').prop("selected", true);
						
						$filter_future.slideDown(200).find('span').text(GetMonthName(selected_month)+' '+selected_year);
						
						setTimeout( function() {
						    $filter_future.slideUp(200).find('span');
					    }, 5000);
						
						return;
					
					} else {
					
						document.location.href	= data_url + append_url;
					
					}
					
				});

			}
			
			
			
		/* ------------------------------------------ */
		/* Window Resize */
		
			function loading_indicator() {
				
				$('.archive-wrapper').empty().html('<div style="text-align: center; padding: 30px;"><img src="https://digwp.com/wp-content/themes/wp/img/load2.gif" class="loader" /></div>');
				
			}
		
			$(".archive-menu a").click( function() {
				loading_indicator();
			});
		
			$(".archive-filter select").change(function() {
				loading_indicator();
			});
			
			
			
		/* ------------------------------------------ */
		/* Window Resize */
			
			$(window).on("resize", function() {
		
			    adjust_the_popup();
			    sub_tier_nav();
			    
			});
			


	});
	
	
	
});