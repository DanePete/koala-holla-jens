console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  
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
  
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}
