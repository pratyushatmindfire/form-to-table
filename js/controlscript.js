let seedData = '[{"s_albumname":"Evermore","s_albumprice":"1.22","s_albumdesc":"A never ending prose of love and life","s_albumaudience":"Teens","s_albumgenres":"Folk Blues","s_albumdate":"2020-12-20"},{"s_albumname":"Folklore","s_albumprice":"2.99","s_albumdesc":"Demystifying the young age of a 90s american girl","s_albumaudience":"Seniors","s_albumgenres":"Folk","s_albumdate":"2020-11-27"},{"s_albumname":"Reputation","s_albumprice":"4.00","s_albumdesc":"A tale of the snakes that try to get a little bite behind the spotlights","s_albumaudience":"Teens","s_albumgenres":"Pop","s_albumdate":"2019-11-24"},{"s_albumname":"1989","s_albumprice":"3.40","s_albumdesc":"Young, free, and colorful life of a teenagers as they grow","s_albumaudience":"Teens","s_albumgenres":"Pop Disco","s_albumdate":"2017-06-07"},{"s_albumname":"Red","s_albumprice":"1.40","s_albumdesc":"Country side feels, old cardigan, and wind in head","s_albumaudience":"Teens","s_albumgenres":"Pop Blues Disco","s_albumdate":"2016-05-20"}]';


//Function that executes when page loads, seeds default data in local storage, and seeds the frontend table
function onPageLoad()
{
  setLocalStorageArray(seedData);
  seedFrontEnd(getLocalStorageArray());
}

//Reveal pattern module to restrict direct access to state variables
//Self executing anonymous function
var pageData = (function(){
  var rowIdtoEdit = -1;
  var currentTheme = '';

  onPageLoad();
  setcurrentTheme('vivid');

  //Sets the row id to edit
  //Input - An integer 'value', which is the row id that is currently being edited
  function setrowIdtoEdit(value)
  {
    rowIdtoEdit=value;
  }

  //Returns the row id that is currently being edited
  //Output - row id that is currently being edited
  function getrowIdtoEdit()
  {
    return rowIdtoEdit;
  }

  //Sets current theme
  //Input - A string 'value', whic is the theme that has to be set
  function setcurrentTheme(value)
  {
    currentTheme=value;
  }

  //Gets current theme
  //Output - A string, which is the current theme
  function getcurrentTheme()
  {
    return currentTheme;
  }

  //Fetches a row of the table based on its class name, which is inturn determined by index
  //Input - An integer 'index', which is the index of the row to edit and is used to identify the content of row by classname
  //Output - A DOM reference, which is the row identified via 'index' argument
  function fetchTableRowByIndex(index)
  {
    return $('.row_'+index)[0];
  }

  //Returns an object with references to getters and setters, hence restricting direct access to state variables
  return {
    setrowIdtoEdit: setrowIdtoEdit,
    getrowIdtoEdit: getrowIdtoEdit,
    setcurrentTheme: setcurrentTheme,
    getcurrentTheme: getcurrentTheme,
    fetchTableRowByIndex: fetchTableRowByIndex
  }
})();


//Seeds default data to frontend table
//Input - An array 'inputData', which is the array of records to be seeded
function seedFrontEnd(inputData) {
  for (var each of inputData) {
    let {
      s_albumname: name,
      s_albumprice: price,
      s_albumdesc: desc,
      s_albumaudience: audience,
      s_albumgenres: genres,
      s_albumdate: date
    } = each;
    appendchildtoTable(name, price, desc, audience, genres, date);
  }
}

//Function that triggers on a submit or update action, and makes changes to the table
function addtoTable() {

  event.preventDefault();

  var writeMode = getWriteMode();

  //Fetch reference to DOM Nodes
  var albumname = $('#name')[0].value.trim();
  var albumprice = $('#price')[0].value.trim();
  var albumdesc = $('#desc')[0].value.trim();
  var albumreleasedate = $('#releasedate')[0].value;
  var targetAudienceNodeList = $("input[name='targetaudience']");
  var albumgenreNodeList = $("input[name='genre']");

  var targetAudience = [];
  var albumgenres = [];

  //Iterate through all radio nodelist to determine the selected one
  for (var each of targetAudienceNodeList) {
    if (each.checked === true) {
      targetAudience.push(capitalize(each.value))
    }
  }

  //Iterate through all checkbox nodelist to determine the selected ones
  for (var each of albumgenreNodeList) {
    if (each.checked === true) {
      albumgenres.push(capitalize(each.value))
    }
  }


  //Stringify the list of selected radios and checkboxes
  targetAudience = targetAudience.toString();
  albumgenres = albumgenres.join('\n').toString();


  if (submitDecision()) {
    //Update price value as per validation
    var albumprice = $('#price')[0].value.trim();

    // Call the function to append new row to table
    if (writeMode === 'Add') {
      writeToStorage(albumname, albumprice, albumdesc, targetAudience, albumgenres, albumreleasedate);
    } else {
      updateStorage(pageData.getrowIdtoEdit(), albumname, albumprice, albumdesc, targetAudience, albumgenres, albumreleasedate)
      pageData.setrowIdtoEdit(-1);
      setWriteMode("Add");
    }


    //Clear form input fields
    clearForm();
    pageData.setcurrentTheme(pageData.getcurrentTheme);
  } else {}
}


//Appends a new row to the end of the table
/*Input: 
        A string 'name', which is the album's name
        A string 'price', which is the album's price
        A string 'desc', which is the album's description
        A string 'audience', which is the album's target audience
        A string 'genres', which is the string of newline separates genres that the album falls into
        A string 'date', which is the album's release date in yyyy-mm-dd format
*/
function appendchildtoTable(name, price, desc, audience, genres, date) {
  var tableReference=$('.data-table tbody')[0];
  var rows = $('.data-table tbody tr');
  if (rows.length === 0) {
    rowcount = 0;
  } else {
    rowcount = parseInt([].slice.call(rows).pop().classList[0].replace(/\D/g, ''));
  }

  var row = tableReference.insertRow(-1);
  row.classList.add("row_" + (rowcount + 1));

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);

  cell1.classList.add('column', 'recordrow', 'albumname');
  cell2.classList.add('column', 'recordrow', 'albumprice');
  cell3.classList.add('column', 'recordrow', 'albumdesc');
  cell4.classList.add('column', 'recordrow', 'albumtargetaud');
  cell5.classList.add('column', 'recordrow', 'albumgenres');
  cell6.classList.add('column', 'recordrow', 'albumreldate');
  cell7.classList.add('column', 'recordrow', 'albumchanges');

  cell1.innerHTML = name;
  cell2.innerHTML = price;
  cell3.innerHTML = desc;
  cell4.innerHTML = audience;
  cell5.innerHTML = genres;
  cell6.innerHTML = date;
  cell7.innerHTML = '<label onclick="sendDataToForm(' + (rowcount + 1) + ')">Edit</label><br><label onclick="deleteFromStorage(' + (rowcount + 1) + ')">Delete</label';
}

//Clears the form input fields after a successful add or update record action
function clearForm() {
  $('#name')[0].value = "";
  $('#price')[0].value = "";
  $('#desc')[0].value = "";
  $('#releasedate')[0].value = "";


  for (var each of $("input[name='genre']")) {
    each.checked = false;
  }

  for (var each of $("input[name='targetaudience']")) {
    each.checked = false;
  }
}

//Capitalizes a lowercase string to Title Case
//Input - A string 'word', which is the word to capitalize
//Output - A string, which is the Title Case capitalized word
function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

//Pushes a new object to the array of records in localstorage
/*Input: 
        A string 'name', which is the album's name
        A string 'price', which is the album's price
        A string 'desc', which is the album's description
        A string 'audience', which is the album's target audience
        A string 'genres', which is the string of newline separates genres that the album falls into
        A string 'date', which is the album's release date in yyyy-mm-dd format
*/
function writeToStorage(name, price, desc, audience, genres, date) {
  var currentArray = getLocalStorageArray()
  var objectToAdd = {
    s_albumname: name,
    s_albumprice: price,
    s_albumdesc: desc,
    s_albumaudience: audience,
    s_albumgenres: genres,
    s_albumdate: date
  }
  currentArray.push(objectToAdd);
  setLocalStorageArray(JSON.stringify(currentArray));
  appendchildtoTable(name, price, desc, audience, genres, date);
}

//Updates a specific index of the array of objects in localstorage
/*Input: 
        An integer 'index', which is the index of the row to edit and is used to identify the content of row by classname
        A string 'name', which is the album's new name
        A string 'price', which is the album's new price
        A string 'desc', which is the album's new description
        A string 'audience', which is the album's new target audience
        A string 'genres', which is the new string of genres that the album falls into
        A string 'date', which is the album's new release date in yyyy-mm-dd format
*/
function updateStorage(index, name, price, desc, audience, genres, date) {
  var currentArray = getLocalStorageArray()
  var editedObject = {
    s_albumname: name,
    s_albumprice: price,
    s_albumdesc: desc,
    s_albumaudience: audience,
    s_albumgenres: genres,
    s_albumdate: date
  };

  var fetchedOriginalName = $('.data-table tbody').find('.row_'+index+' .albumname')[0].innerText;
  var indexToReplace = 0;
  for (var each of currentArray) {
    if (each.s_albumname != fetchedOriginalName) {
      indexToReplace = indexToReplace + 1;
    } else {
      break;
    }
  }


  currentArray[indexToReplace] = editedObject;
  setLocalStorageArray(JSON.stringify(currentArray));
  updateTableRow(index, name, price, desc, audience, genres, date);
}


// Validates album name as per business logic
// Output - A boolean, which implies true/false if album name is valid/invalid
function validateAlbumName() {
  var albumname = $('#name')[0].value.trim();
  var isValid = 0;
  if (albumname.length === 0) {
    isValid = 1;
  }

  if (isValid === 0) {
    $('.albumnameblock .validatormessage')[0].style.display = 'none';
    return true
  } else {
   $('.albumnameblock .validatormessage')[0].style.display = 'block';
    return false
  }
}


// Validates album price as per business logic
// Output - A boolean, which implies true/false if album price is valid/invalid
function validateAlbumPrice() {
  var isValid = 0;
  var originalpriceval = $('#price')[0].value.trim();
  price = originalpriceval.split('.')

  if (originalpriceval.trim().length == 0) {
    isValid = 1;
  }

  // Check for letters
  if (isNaN(originalpriceval)) {
    isValid = 1;
  }


  //Irregular inputs
  if (price.length < 1 || price.length > 2) {
    isValid = 1;
  }

  //Negative price
  if (price[0] < 0) {
    isValid = 1;
  }

  //No decimal input
  if (price.length == 1 && !isNaN(originalpriceval) && price[0] != "") {
    //Manipulate dom to x.00
    $('#price')[0].value = (parseInt(price[0])).toFixed(2);
  }

  // Null decimal input
  if (price.length == 2 && !isNaN(originalpriceval) && price[0] != "" && price[1] == "") {
    //Manipulate dom to x.00
    $('#price')[0].value = (parseInt(price[0])).toFixed(2);
  }

  // One decimal input
  if (price.length == 2 && !isNaN(originalpriceval) && price[0] != "" && price[1] != "" && price[1].length == 1) {
    //Manipulate dom to x.00
    $('#price')[0].value = (parseInt(price[0]) + price[1] / 10).toFixed(2);
  }

  //More than 2 decimal inpurs
  if (price[1] != undefined && !isNaN(originalpriceval) && price[1].length > 2) {
    isValid = 1;
  }

  if (isValid === 0) {
    $('.priceblock .validatormessage')[0].style.display = 'none';
    return true
  } else {
    $('.priceblock .validatormessage')[0].style.display = 'block';
    return false
  }
}


// Validates album description as per business logic
// Output - A boolean, which implies true/false if album description is valid/invalid
function validateAlbumDescription() {
  var isValid = 0;
  var desc = $('#desc')[0].value;

  if (desc.length === 0) {
    isValid = 1;
  }

  if (isValid === 0) {
    $('.albumdescription .validatormessage')[0].style.display = 'none';
    return true
  } else {
    $('.albumdescription .validatormessage')[0].style.display = 'block';
    return false
  }
}

// Validates album release date as per business logic
// Output - A boolean, which implies true/false if album release date is valid/invalid
function validateDate() {
  var isValid = 0;
  var relDate = $('#releasedate')[0].value;

  if (relDate === "") {
    isValid = 1;
  }

  if (isValid === 0) {
    $('.albumreleasedate .validatormessage')[0].style.display = 'none';
    return true;
  } else {
   $('.albumreleasedate .validatormessage')[0].style.display = 'block';

  }
  return false;
}


// Validates album target audience as per business logic
// Output - A boolean, which implies true/false if album target audience is valid/invalid
function validateTargetAudience() {
  var isValid = 1;
  var radiosNodeList = $("input[name='targetaudience']");

  for (var each of radiosNodeList) {
    if (each.checked === true) {
      isValid = 0;
    }
  }

  if (isValid === 0) {
    $('.targetaud .validatormessage')[0].style.display = 'none';
    return true
  } else {
    $('.targetaud .validatormessage')[0].style.display = 'block';
    return false
  }
}

// Validates album genres as per business logic
// Output - A boolean, which implies true/false if album genres is valid/invalid
function validateGenres() {
  var isValid = 1;
  var genresNodeList = $("input[name='genre']");

  for (var each of genresNodeList) {
    if (each.checked === true) {
      isValid = 0;
    }
  }

  if (isValid === 0) {
    $('.genres .validatormessage')[0].style.display = 'none';
    return true
  } else {
    $('.genres .validatormessage')[0].style.display = 'block';
    return false
  }
}

//Implements all the validations upon calling it, and decides whether to submit the record
//Output- A boolean, which implies true if the record should be submitted, false otherwise
function submitDecision() {
  var decision = true;

  if (!validateAlbumName()) {
    decision = false;
  }

  if (!validateAlbumPrice()) {
    decision = false;
  }

  if (!validateAlbumDescription()) {
    decision = false;
  }

  if (!validateDate()) {
    decision = false;
  }

  if (!validateTargetAudience()) {
    decision = false;
  }

  if (!validateGenres()) {
    decision = false;
  }

  return decision;
}

//Sends data from table to form by identifying the row's class name by help of index and fetching their inner texts
//Input - An integer 'index', which is used for identifying the row's class name
function sendDataToForm(index) {

  var ObjectFinder_Name = $('.data-table tbody').find('.row_'+index+' .albumname')[0].innerText;


  //New way via localstorage
  var currentArray = getLocalStorageArray()
  var objectToSendToForm = currentArray.filter(e => {
    if (e != null) {
      return e.s_albumname === ObjectFinder_Name;
    }
  })[0];

  var fetchedformFields=$('.loop-track');

  for(let eachField of fetchedformFields)
  {
    if(eachField.name==="albumname")
    {
      eachField.value=objectToSendToForm.s_albumname;
    }

    else if(eachField.name==="albumprice")
    {
      eachField.value=objectToSendToForm.s_albumprice;
    }

    else if(eachField.name==="albumdesc")
    {
      eachField.value=objectToSendToForm.s_albumdesc;
    }

    else if(eachField.name==="releasedate")
    {
      eachField.value=objectToSendToForm.s_albumdate;
    }

    else if(eachField.name==="targetaudience")
    {
      eachField.checked= capitalize(eachField.value) === objectToSendToForm.s_albumaudience;
    }

    else if(eachField.name==="genre")
    {
      genreOptions = objectToSendToForm.s_albumgenres;
      genreOptions = genreOptions.split(' ').join(',').split('\n').join(',').split(',')
      eachField.checked=genreOptions.includes(capitalize(eachField.value));
    }
  }

  setWriteMode("Update");
  pageData.setrowIdtoEdit(index);


  setTimeout(() => {
    validateAlbumName();
    validateAlbumPrice();
    validateAlbumDescription();
    validateDate();
    validateTargetAudience();
    validateGenres();
  }, 1);
}

//Updates the cells of a table row by identifying that row based on index
/*Input: 
        An integer 'index', which is the index of the row to update and is used to identify the content of row by classname
        A string 'name', which is the album's new name
        A string 'price', which is the album's new price
        A string 'desc', which is the album's new description
        A string 'audience', which is the album's new target audience
        A string 'genres', which is the new string of genres that the album falls into
        A string 'date', which is the album's new release date in yyyy-mm-dd format
*/
function updateTableRow(index, name, price, desc, audience, genres, date) {
  var cells=$('.data-table tbody').find('.row_'+index+' td');

  for(let i=1; i<arguments.length; i++)
  {
    cells[i-1].innerText=arguments[i];
  }
}

//Deletes an object from the array of objects in local storage based on an index
//Input - An integer 'index', which is the index of the row to delete and is used to identify the content of row by classname
function deleteFromStorage(index) {

  var ObjectFinder_Name = $('.data-table tbody').find('.row_'+index+' .albumname')[0].innerText;

  if (index == pageData.getrowIdtoEdit()) {
    setWriteMode("Add");
  }

  var currentArray = getLocalStorageArray()
  var objectToDelete = currentArray.filter(e => e.s_albumname === ObjectFinder_Name)[0];
  currentArray = currentArray.filter(each => each !== objectToDelete);
  setLocalStorageArray(JSON.stringify(currentArray));

  deletefromFrontend(index);
}

//Deletes a row from front end table
//Input - An integer 'index', which is the index of the row to delete and is used to identify the content of row by classname
function deletefromFrontend(index) {
  var fetchedRow = $('.data-table tbody').find('.row_'+index)[0];
  fetchedRow.remove();
  pageData.setcurrentTheme(pageData.getcurrentTheme);
}

//Changes color scheme of the page
//Input - A string 'color', which implies the color scheme that the theme has to be changed to
function changeTheme(color) {
  //Set the global variable current theme
  pageData.setcurrentTheme(color);

  //Fetch headers
  var allHeaders = $('.header');

  //Fetch formarea and tablearea
  var formareaspace = $('.formarea')[0];
  var tableareaspace = $('.tablearea')[0];

  //Fetch input area
  var inputareaspace = $('.input-box');

  //Fetch submit button
  var submitbutton = $('.submit')[0];

  //Fetch validation messages
  var validationmessages = $('.validatormessage');

  //Fetch table cells
  var tablecells = $('.column');


  if (color === 'vivid') {
    //Change header color
    for (var each of allHeaders) {
      each.classList.remove('header-black', 'header-white');
      each.classList.add('header-vivid');
    }

    //Change inputbox area colors
    for (var each of inputareaspace) {
      each.classList.remove('inputbox-gray', 'inputbox-white');
      each.classList.add('inputbox-vivid');
    }

    //Change validation messages colors
    for (var each of validationmessages) {
      each.classList.remove('validatormessage-white', 'validatormessage-blue');
      each.classList.add('validatormessage-vivid');
    }

    //Change table cell colors
    for (var each of tablecells) {
      each.classList.remove('column-gray', 'column-gray-alternate', 'column-white', 'column-white-alternate');
      each.classList.add('column-vivid');
    }


    //Change submit button color
    submitbutton.classList.remove('submit-gray', 'submit-white');
    submitbutton.classList.add('submit-vivid');

    //Change formarea color
    formareaspace.classList.remove('formarea-gray', 'formarea-white');
    formareaspace.classList.add('formarea-vivid');

    //Change tablearea color
    tableareaspace.classList.remove('tablearea-black', 'tablearea-white');
    tableareaspace.classList.add('tablearea-vivid');
  } else if (color === "dark") {
    //Change header color
    for (var each of allHeaders) {
      each.classList.remove('header-vivid', 'header-black');
      each.classList.add('header-white');
    }

    //Change inputbox area colors
    for (var each of inputareaspace) {
      each.classList.remove('inputbox-vivid', 'inputbox-white');
      each.classList.add('inputbox-gray');
    }

    //Change validation messages colors
    for (var each of validationmessages) {
      each.classList.remove('validatormessage-white', 'validatormessage-vivid');
      each.classList.add('validatormessage-blue');
    }

    //Change table cell colors
    var i = 0;
    for (var each of tablecells) {
      each.classList.remove('column-vivid', 'column-gray', 'column-gray-alternate', 'column-white', 'column-white-alternate');

      if (i % 2 == 0) {
        each.classList.add('column-gray');
      } else {
        each.classList.add('column-gray-alternate');
      }

      i = i + 1;
    }


    //Change submit button color
    submitbutton.classList.remove('submit-vivid', 'submit-white');
    submitbutton.classList.add('submit-gray');

    //Change formarea color
    formareaspace.classList.remove('formarea-vivid', 'formarea-white');
    formareaspace.classList.add('formarea-gray');

    //Change tablearea color
    tableareaspace.classList.remove('tablearea-vivid', 'tablearea-white');
    tableareaspace.classList.add('tablearea-black');
  } else if (color === "light") {
    //Change header color
    for (var each of allHeaders) {
      each.classList.remove('header-vivid', 'header-white');
      each.classList.add('header-black');
    }

    //Change inputbox area colors
    for (var each of inputareaspace) {
      each.classList.remove('inputbox-gray', 'inputbox-vivid');
      each.classList.add('inputbox-white');
    }

    //Change validation messages colors
    for (var each of validationmessages) {
      each.classList.remove('validatormessage-vivid', 'validatormessage-blue');
      each.classList.add('validatormessage-white');
    }

    //Change table cell colors
    var i = 0;
    for (var each of tablecells) {
      each.classList.remove('column-vivid', 'column-gray', 'column-gray-alternate', 'column-white', 'column-white-alternate');

      if (i % 2 != 0) {
        each.classList.add('column-white');
      } else {
        each.classList.add('column-white-alternate');
      }

      i = i + 1;
    }


    //Change submit button color
    submitbutton.classList.remove('submit-vivid', 'submit-gray');
    submitbutton.classList.add('submit-white');

    //Change formarea color
    formareaspace.classList.remove('formarea-black', 'formarea-vivid');
    formareaspace.classList.add('formarea-white');

    //Change tablearea color
    tableareaspace.classList.remove('tablearea-black', 'tablearea-vivid');
    tableareaspace.classList.add('tablearea-white');
  }
}

//Getter function for write mode
//Output - A string, which is the current write mode
function getWriteMode()
{
  return $('.submit')[0].innerText;
}

//Setter function for write mode
//Input - A string 'mode', which will override the current write mode
function setWriteMode(mode)
{
  $('.submit')[0].innerText = mode;
}

//Getter for local storage array
//Output - Returns an array, which is the array of objects in local storage
function getLocalStorageArray()
{
  return JSON.parse(localStorage.getItem('tableStorage'));
}

//Setter function for write mode
//Input - An array 'newData', which will override the current array of objects in local storage
function setLocalStorageArray(newData)
{
   localStorage.setItem('tableStorage', newData);
}