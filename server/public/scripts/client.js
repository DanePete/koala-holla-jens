console.log( 'js' );

let koalas = [];

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  
  $(document).on('click', '#transfer', updateKoala);
  $('#viewKoalas').on('click', '#delete', deleteKoala)
  console.log('our values', getValues());
}); // end doc ready

function setupClickListeners() {

  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: getValues().name,
      age: getValues().age,
      gender: getValues().gender,
      readyForTransfer: getValues().ready,
      notes: getValues().notes,
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getValues() {
  let name = $('#nameIn').val();
  let age = $('#ageIn').val();
  let gender = $('#genderIn').val();
  let readyForTransfer = $('#readyForTransferIn').val();
  let notes = $('#notesIn').val();

  return {name: name, age: age, gender: gender, ready: readyForTransfer, notes: notes};
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function(response){
    koalas = response;
    set();
    console.log('response', response);
  }).catch(function(error){
    console.log('error in client', error);
  })
} // end getKoalas

function set(){
  $('#viewKoalas').empty();

  for (let i = 0; i < koalas.length; i += 1) {
    let koala = koalas[i];
    console.log(koala);
    
    // For each book, append a new row to our table
    $('#viewKoalas').append(`
      <tr data-id=${koala.id} data-ready=${koala.ready_to_transfer}>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td><button id="transfer" class="btn btn-warning">Ready for Transfer</button></td>
        <td><button id="delete" class="btn btn-warning">DELETE</button></td>
      </tr>
    `);
  }
}

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
   
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: getValues()
  }).then( function (response) {
    console.log('send status', response );
    getKoalas(); 
  }).catch(function (err){
    console.log('error', err);
    
  });
 
}

/**
 * Update Koala Function
 * Updates our ready_to_transfer cell in the database
 */
function updateKoala() {
  let id = $(this).closest('tr').data('id');
  let isTransfered = $(this).closest('tr').data('ready');
  
  if(isTransfered === true || isTransfered === null) {
    isTransfered = false;
  } else if(isTransfered === false ) {
    isTransfered = true;
  }

  $.ajax({
    url: `/koalas/${id}`,
    type: 'PUT',
    data: {transferData: isTransfered}
  }).then(function(response) {
    getKoalas(); 
  }).catch(function(error){
    console.log('error in GET', error);
  });

}

function deleteKoala(){
  let koalaID = $(this).closest('tr').data('id')
  console.log( 'testing ID', koalaID);
  $.ajax({
      type: 'DELETE', 
      url: `/koalas/${koalaID}`
  }).then(function(res){
    console.log('delete is working 🙀');
    getKoalas()
    
  })
}
