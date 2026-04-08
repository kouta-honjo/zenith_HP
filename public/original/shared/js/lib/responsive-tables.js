// console.log(mdlib.SP_WIDTH);
var responsive_table_change_width = 999;


$(document).ready(function() {
	switched = false;
	updateTables = function() {
		var width = window.innerWidth;
		if ((width <= responsive_table_change_width) && !switched ){
			switched = true;
			var is_init = false;
			$("table.responsive").each(function(i, element) {
				if( $(this).closest('.table-wrapper').length === 0 ) {
					splitTable($(element));
					is_init = true;
				}
			});
			if(is_init) {
				$( '.responsive').show();
				$(window).trigger('init_responsive_tables');
			}
			return true;
		}
		else if (switched && (width > responsive_table_change_width)) {
			switched = false;
			$("table.responsive").each(function(i, element) {
				if($(element).closest('.responsive_table_area-pc').length == 0) {
					unsplitTable($(element));
				}
			});
		} else {
			var is_init = false;
			$(".responsive_table_area-pc table.responsive").each(function(i, element) {
				if( $(this).closest('.table-wrapper').length === 0 ) {
					splitTable($(element));
					is_init = true;
				}
			});
			if(is_init) {
				$( '.responsive').show();
				$(window).trigger('init_responsive_tables');
			}
			return true;
		}
	};

	$(window).on("redraw",function(){switched=false;updateTables();}); // An event to listen for
	$(window).on("resize", updateTables);
	$(window).on("start_sp change_to_sp", function() {
		setResponsiveTableMask();
		$(window).trigger('redraw');
	});


	function splitTable(original)
	{
		// console.log('splitTable');
		original.wrap("<div class='table-wrapper' />");

		var copy = original.clone();
		// copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");

		// copy.find("th[rowspan]").removeAttr( 'rowspan' );
		copy.find( 'tr' ).each( function() {
			var th_check = false;
			if( $( this ).find( "th" ).length === 0 ) {
			 // $( this ).hide();
			}
		} );
		copy.removeClass("responsive");

		original.closest(".table-wrapper").append(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");

		setCellHeights(original, copy);
	}

	function unsplitTable(original) {
		original.closest(".table-wrapper").find(".pinned").remove();
		original.unwrap();
		original.unwrap();
	}

	function setCellHeights(original, copy) {
		var tr = original.find('tr'),
				tr_copy = copy.find('tr'),
				heights = [];

		tr.each(function (index) {
			var self = $(this),
					tx = self.find('th, td');

			tx.each(function () {
				var height = $(this).outerHeight(true);
				heights[index] = heights[index] || 0;
				if (height > heights[index]) heights[index] = height;
			});

		});

		tr_copy.each(function (index) {
			// $(this).height(heights[index]);
		});
	}


	// responsive table 対応
	var setResponsiveTableMask = function() {
		var $table = $( 'table.responsive');
		// console.log('here');

		$table.addClass('responsive-all');

		var eventtype = mdlib.ua.Mobile ? 'touchstart' : 'click';
		if ( $table.length > 0 ) {
			$table.each(function(i, table) {
				var $_table = $(table);
				$area = $_table.closest( '.responsive_table_area' );
				if ($area.length === 0) {
					var classname = 'responsive_table_area';
					if ($_table.hasClass('responsive-all')) {
						classname += ' responsive_table_area-all';
					}
					if ($_table.closest('.table-wrapper').length > 0) {
						$_table = $_table.closest('.table-wrapper');
					}
					$_table.wrap( '<div class="' + classname + '"></div>' );
					$area = $_table.closest( '.responsive_table_area' );
				}
				if ($area.find('.responsive_table_mask').length === 0) {
					$area.prepend( '<div class="responsive_table_mask"></div><div class="responsive_table_mask shadow"></div>' );
					$area.bind( eventtype, function() {
						$( this ).find( '.responsive_table_mask' ).fadeOut('slow', function() {
					  		$( this ).remove();
						});
					} );
				}
			});
		}
	}
});
