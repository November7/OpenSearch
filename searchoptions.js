/****************************************************************/


/****************************************************************/

var background = browser.extension.getBackgroundPage();


/*****************************************************************

document.getElementById("saveOptions").addEventListener("click", function() {
	while(background.searchEngines.pop());
	var sE = document.getElementById("searchEngines");
	for(var i = 1 ; i < sE.rows.length ; i++)
	{		
		background.addSearchEngine( i,
									sE.rows[i].cells[0].children[0].value,
									sE.rows[i].cells[1].children[0].value,
									sE.rows[i].cells[2].children[0].checked,
									sE.rows[i].cells[3].children[0].checked,
									(sE.rows[i].cells[4].children[0].value=="S"?0:1));
		
	}	
	background.saveOptions();	
});	

/**************************************************************************** */
(function()
{				
	for (var i = 0; i < background.searchEngines.length ; i++)
	{
		var item = background.searchEngines[i];
		$('#engs-cnt').append("<div class='draggable-item-list' data-uid='" + item.id +	"'>" + item.name + "<div><img src='ico/arrow_down_55.png' width='10px'/></div>"
													+ "<div class='edit-engs'>"
													+ "<input type='text' value='" + item.name + "'/><br/>"
													+ "<input type='text' value='" + item.url + "'/>"
													+ "</div></div>");
	}

	$('div.draggable-item-list img').click(function () {		
		$(this).parent().parent().find('div.edit-engs').toggle(300);
	})
	$('#engs-cnt').append("<div class='draggable-item-list'> --------- separator --------- </div>");

	for (var i = 0; i < background.searchGroups.length ; i++)
	{
		$('#engs-cnt').append("<div class='draggable-item-list' data-uid='"
													+ background.searchEngines[i].id
													+ "'>" + background.searchGroups[i].name
													+ "</div>");
	}
})();
	
/*****************************************************************************/


function showPage(target)
{
	if(target == undefined || target == null) return;
	var pages = document.getElementsByClassName("page");
	for(var i=0; i < pages.length ; i++) {
		pages[i].style.display = "none";
	}
	var tget = document.getElementById(target)
	if(tget) tget.style.display = "block";
}

(function () {
	var menuItems = document.getElementsByClassName("menuItem");
	for(var i=0; i < menuItems.length ; i++) {
		menuItems[i].addEventListener("click", function () {
			showPage(this.getAttribute("data-target"));		
		})
	}
})();

//////////////////////////////////

$(".droppable-list").sortable({
  revert: 150,
  placeholder: "placeholder",
  receive: function (event, ui) {
    var item = $(this).data().uiSortable.currentItem;
	if(removeDuplicate($(this),item))  item.remove();
  },
  over: function ( event, ui ) 	{
	  var item = $(this).data().uiSortable.currentItem;
	 
	if(removeDuplicate($(this),item)) 
	{
		item.addClass("protect");
		$(".placeholder").hide();
	}
  }
});

function removeDuplicate(container, item)
{
  var duplicte = 0;
  container.children().each(function() {
    if(item.attr('data-uid') !== undefined && $(this).attr('data-uid') == item.attr('data-uid')) duplicte++;
  });
  if(duplicte > 1) return 1; //item.remove();
  else return 0;
}

var __mouseStart = $.ui.draggable.prototype._mouseStart;
$.ui.draggable.prototype._mouseStart = function (e, overrideHandle, nop) {
    this._trigger("prestart", e, this._uiHash());
    __mouseStart.apply(this, [e, overrideHandle, nop]);
};

$( ".draggable-item-list" ).draggable({
	prestart: function()
	{
		$('div.edit-engs').hide();
	},
  connectToSortable: ".droppable-list",
  helper: "clone",
  revert: "false",
  revertDuration: 0
  
});
