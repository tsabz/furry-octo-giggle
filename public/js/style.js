$(() => {
  //dynamically update text fields in input type text
  M.updateTextFields();


  //dynamically change text area for edit form
  $('#edit-textarea').val('New Text');
  M.textareaAutoResize($('#edit-textarea'));
})