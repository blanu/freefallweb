function hideHelp()
{
  $(this).next().hide();
  $(this).unbind("click");
  $(this).click(showHelp);
}

function hideParentHelp()
{
  var span=$(this).parents("span");
  span.hide();
  var button=span.prev();
  button.unbind("click");
  button.click(showHelp);
}

function showHelp()
{
  $(this).next().show();
  $(this).unbind("click");
  $(this).click(hideHelp);
}

function checkHelpForms()
{
  $(".helpButton").click(showHelp);
  $(".cancelButton").click(hideParentHelp);
}

$(document).ready(function() {
  checkHelpForms();
});
