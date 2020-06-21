$(() => {
  //dynamically update text fields in input type text
  Materialize.updateTextFields();


  //dynamically change text area for edit form
  $('#edit-textarea').val('New Text');
  Materialize.textareaAutoResize($('#edit-textarea'));

  //make card tabs work
  $('.tabs').tabs();

})