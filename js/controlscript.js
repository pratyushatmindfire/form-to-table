console.log("JS Connected!")
var rowIdtoEdit=-1;
var currentTheme='';
let seedData = '[{"s_albumname":"Evermore","s_albumprice":"1.22","s_albumdesc":"A never ending prose of love and life","s_albumaudience":"Teens","s_albumgenres":"Folk Blues","s_albumdate":"2020-12-20"},{"s_albumname":"Folklore","s_albumprice":"2.99","s_albumdesc":"Demystifying the young age of a 90s american girl","s_albumaudience":"Seniors","s_albumgenres":"Folk","s_albumdate":"2020-11-27"},{"s_albumname":"Reputation","s_albumprice":"4.00","s_albumdesc":"A tale of the snakes that try to get a little bite behind the spotlights","s_albumaudience":"Teens","s_albumgenres":"Pop","s_albumdate":"2019-11-24"},{"s_albumname":"1989","s_albumprice":"3.40","s_albumdesc":"Young, free, and ccolorful life of a teenagers as they grow","s_albumaudience":"Teens","s_albumgenres":"Pop Disco","s_albumdate":"2017-06-07"},{"s_albumname":"Red","s_albumprice":"1.40","s_albumdesc":"Country side feels, old cardigan, and wind in head","s_albumaudience":"Teens","s_albumgenres":"Pop Blues Disco","s_albumdate":"2016-05-20"}]';
localStorage.setItem('tableStorage', seedData);

let renderData=JSON.parse(localStorage.getItem('tableStorage'));
seedFrontEnd(renderData);
changeTheme('vivid');


function seedFrontEnd(inputData)
{
	for(var each of inputData)
	{
		let {s_albumname: name, s_albumprice: price, s_albumdesc: desc, s_albumaudience: audience, s_albumgenres: genres, s_albumdate: date}=each;
		appendchildtoTable(name, price, desc, audience, genres, date);
	}
}

function addtoTable()
{

	event.preventDefault();

	var writeMode=document.getElementsByClassName('submit')[0].innerText;

	//Fetch reference to DOM Nodes
	var albumname=document.getElementById('name').value.trim();
	var albumprice=document.getElementById('price').value.trim();
	var albumdesc=document.getElementById('desc').value.trim();
	var albumreleasedate = document.getElementById('releasedate').value;
	var targetAudienceNodeList = document.getElementsByName('targetAudience');
	var albumgenreNodeList=document.getElementsByName('genre');

	var targetAudience=[];
	var albumgenres=[];

	//Iterate through all radio nodelist to determine the selected one
	for(var each of targetAudienceNodeList)
	{
		if(each.checked === true)
		{
			targetAudience.push(capitalize(each.value))
		}
	}

	//Iterate through all checkbox nodelist to determine the selected ones
	for(var each of albumgenreNodeList)
	{
		if(each.checked === true)
		{
			albumgenres.push(capitalize(each.value))
		}
	}


	//Stringify the list of selected radios and checkboxes
	targetAudience=targetAudience.toString();
	albumgenres=albumgenres.join('\n').toString();



	

	if(submitDecision())
	{
		//Update price value as per validation
		var albumprice=document.getElementById('price').value.trim();

		// Call the function to append new row to table
		if(writeMode==='Add')
		{
			writeToStorage(albumname, albumprice, albumdesc, targetAudience, albumgenres, albumreleasedate);
		}

		else
		{
			updateStorage(rowIdtoEdit, albumname, albumprice, albumdesc, targetAudience, albumgenres, albumreleasedate)
			rowIdtoEdit=-1;
			document.getElementsByClassName('submit')[0].innerText="Add";
		}
		

		//Clear form input fields
		clearDOM();
		changeTheme(currentTheme);
	}

	

	else
	{
	}
}

function appendchildtoTable(name, price, desc, audience, genres, date)
{
	var tableReference = document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0];
	var rows=document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	if(rows.length===0)
	{
		rowcount=0;
	}

	else
	{
		rowcount=parseInt([].slice.call(rows).pop().classList[0].replace(/\D/g,''));
	}
	
	// var rowcount=document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
	var row = tableReference.insertRow(-1);
	row.classList.add("row_"+(rowcount+1));

	var cell1=row.insertCell(0);
	var cell2=row.insertCell(1);
	var cell3=row.insertCell(2);
	var cell4=row.insertCell(3);
	var cell5=row.insertCell(4);
	var cell6=row.insertCell(5);
	var cell7=row.insertCell(6);

	cell1.classList.add('column', 'recordrow', 'albumname');
	cell2.classList.add('column', 'recordrow', 'albumprice');
	cell3.classList.add('column', 'recordrow', 'albumdesc');
	cell4.classList.add('column', 'recordrow', 'albumtargetaud');
	cell5.classList.add('column', 'recordrow', 'albumgenres');
	cell6.classList.add('column', 'recordrow', 'albumreldate');
	cell7.classList.add('column', 'recordrow', 'albumchanges');

	cell1.innerHTML=name;
	cell2.innerHTML=price;
	cell3.innerHTML=desc;
	cell4.innerHTML=audience;
	cell5.innerHTML=genres;
	cell6.innerHTML=date;
	cell7.innerHTML='<label onclick="sendDataToForm('+(rowcount+1)+')">Edit</label><br><label onclick="deleteFromStorage('+(rowcount+1)+')">Delete</label';
}

function clearDOM()
{
	document.getElementById('name').value="";
	document.getElementById('price').value="";
	document.getElementById('desc').value="";
	document.getElementById('releasedate').value="";




	for(var each of document.getElementsByName('genre'))
	{
		each.checked = false;
	}

	for(var each of document.getElementsByName('targetAudience'))
	{
		each.checked = false;
	}
}

function capitalize(word)
{
	const lower = word.toLowerCase();
	return word.charAt(0).toUpperCase() + lower.slice(1);
}

function writeToStorage(name, price, desc, audience, genres, date)
{
	var currentArray=JSON.parse(localStorage.getItem('tableStorage'));
	var objectToAdd={s_albumname: name, s_albumprice: price, s_albumdesc: desc, s_albumaudience: audience, s_albumgenres: genres, s_albumdate: date}
	currentArray.push(objectToAdd);
	localStorage.setItem('tableStorage', JSON.stringify(currentArray));
	appendchildtoTable(name, price, desc, audience, genres, date);
}

function updateStorage(index, name, price, desc, audience, genres, date)
{
	var currentArray=JSON.parse(localStorage.getItem('tableStorage'));
	var editedObject={s_albumname: name, s_albumprice: price, s_albumdesc: desc, s_albumaudience: audience, s_albumgenres: genres, s_albumdate: date};
	
	var fetchedRow=document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0].getElementsByClassName('row_'+index)[0];
	var fetchedOriginalName=fetchedRow.getElementsByClassName('albumname')[0].innerText;
	var indexToReplace=0;
	for (var each of currentArray)
	{
		if(each.s_albumname!=fetchedOriginalName)
		{ 
			indexToReplace=indexToReplace+1; 
		}
		else
		{
			break;
		}
	}

	
	currentArray[indexToReplace]=editedObject;
	localStorage.setItem('tableStorage', JSON.stringify(currentArray));
	updateTableRow(index, name, price, desc, audience, genres, date);
}



// Raw JS Validators

function validateAlbumName()
{
	var albumname=document.getElementById('name').value.trim();
	var flag=0;
	if(albumname.length === 0)
	{
		flag=1;
	}

	if(flag===0)
	{
		document.querySelector('.albumnameblock .validatorMessage').style.display='none';
		return true
	}
	else 
	{
		document.querySelector('.albumnameblock .validatorMessage').style.display='block';
		return false
	}
}

function validateAlbumPrice()
{
	var flag=0;
	var originalpriceval=document.getElementById('price').value.trim();
    price=originalpriceval.split('.')

    if(originalpriceval.trim().length==0)
    {
    	flag=1;
    }
    
    // Check for letters
    if (isNaN(originalpriceval))
    {
        flag=1;
    }

    
    
    //Irregular inputs
    if(price.length<1 || price.length>2)
    {
        flag=1;
    }
    
    //Negative price
    if(price[0]<0)
    {
        flag=1;
    }
    
    //No decimal input
    if(price.length==1 && !isNaN(originalpriceval) && price[0]!="")
    {
        //Manipulate dom to x.00
        document.getElementById('price').value=(parseInt(price[0])).toFixed(2);
    }

    // Null decimal input
    if(price.length==2 && !isNaN(originalpriceval) && price[0]!="" && price[1]=="")
    {
    	//Manipulate dom to x.00
        document.getElementById('price').value=(parseInt(price[0])).toFixed(2);
    }

    // One decimal input
    if(price.length==2 && !isNaN(originalpriceval) && price[0]!="" && price[1]!="" && price[1].length==1)
    {
    	//Manipulate dom to x.00
        document.getElementById('price').value=(parseInt(price[0])+price[1]/10).toFixed(2);
    }

    //More than 2 decimal inpurs
    if(price[1]!=undefined && !isNaN(originalpriceval) && price[1].length>2)
    {
    	flag=1;
    }
    
    if(flag===0)
    {
    	document.querySelector('.priceblock .validatorMessage').style.display='none';
    	return true
    }
    else 
    {
    	document.querySelector('.priceblock .validatorMessage').style.display='block';
    	return false
    }
}

function validateAlbumDescription()
{
	var flag=0;
	var desc=document.getElementById('desc').value;

	if(desc.length===0)
	{
		flag=1;
	}

	if(flag===0)
	{
		document.querySelector('.albumdescription .validatorMessage').style.display='none';
		return true
	}
    else 
    {
    	document.querySelector('.albumdescription .validatorMessage').style.display='block';
    	return false
    }
}

function validateDate()
{
	var flag=0;
	var relDate = document.getElementById('releasedate').value;

	if(relDate==="")
	{
		flag=1;
	}

	if(flag===0)
	{
		document.querySelector('.albumreleasedate .validatorMessage').style.display='none';
		return true;
	}
    else 
    {
    	document.querySelector('.albumreleasedate .validatorMessage').style.display='block';
    	
    }
    return false;
}

function validateTargetAudience()
{
	var flag=1;
	var radiosNodeList = document.getElementsByName('targetAudience');

	for(var each of radiosNodeList)
	{
		if(each.checked === true)
		{
			flag=0;
		}
	}

	if(flag===0)
	{
		document.querySelector('.targetaud .validatorMessage').style.display='none';
		return true
	}
    else 
    {
    	document.querySelector('.targetaud .validatorMessage').style.display='block';
    	return false
    }
}

function validateGenres()
{
	var flag=1;
	var checkboxNodeList=document.getElementsByName('genre');

	for(var each of checkboxNodeList)
	{
		if(each.checked === true)
		{
			flag=0;
		}
	}

	if(flag===0)
	{
		document.querySelector('.genres .validatorMessage').style.display='none';
		return true
	}
    else 
    {
    	document.querySelector('.genres .validatorMessage').style.display='block';
    	return false
    }
}

function submitDecision()
{
	var decision = true;

	if(!validateAlbumName())
	{
		decision=false;
	}

	if(!validateAlbumPrice())
	{
		decision=false;
	}

	if(!validateAlbumDescription())
	{
		decision=false;
	}

	if(!validateDate())
	{
		decision=false;
	}

	if(!validateTargetAudience())
	{
		decision=false;
	}

	if(!validateGenres())
	{
		decision=false;
	}

	return decision;
}





function sendDataToForm(index)
{
	//Old way via DOM
	var fetchedRow = document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0].getElementsByClassName('row_'+index)[0];
	var ObjectFinder_Name=fetchedRow.getElementsByTagName('td')[0].innerText;

	// document.getElementById('price').value=fetchedRow.getElementsByTagName('td')[1].innerText;
	// document.getElementById('desc').value=fetchedRow.getElementsByTagName('td')[2].innerText;
	// document.getElementById('releasedate').value=fetchedRow.getElementsByTagName('td')[5].innerText;

	// document.getElementsByClassName('submit')[0].innerText="Update";

	// for (var each of document.getElementsByName('targetAudience'))
	// {
	// 	each.checked=capitalize(each.value)===fetchedRow.getElementsByTagName('td')[3].innerText
	// }

	// for (var each of document.getElementsByName('genre'))
	// {
	// 	options=fetchedRow.getElementsByTagName('td')[4].innerText.toString();
	// 	options=options.split(' ').join(',').split('\n').join(',').split(',')
	// 	each.checked=options.includes(capitalize(each.value))
	// }


	//New way via localstorage
	var currentArray=JSON.parse(localStorage.getItem('tableStorage'));
	var objectToSendToForm=currentArray.filter(e=> {if(e!=null){return e.s_albumname===ObjectFinder_Name;}})[0];

	document.getElementById('name').value=objectToSendToForm.s_albumname;
	document.getElementById('price').value=objectToSendToForm.s_albumprice;
	document.getElementById('desc').value=objectToSendToForm.s_albumdesc;
	document.getElementById('releasedate').value=objectToSendToForm.s_albumdate;

	for (var each of document.getElementsByName('targetAudience'))
	{
		each.checked=capitalize(each.value)===objectToSendToForm.s_albumaudience
	}

	genreOptions=objectToSendToForm.s_albumgenres;
	genreOptions=genreOptions.split(' ').join(',').split('\n').join(',').split(',')

	for (var each of document.getElementsByName('genre'))
	{
		each.checked=genreOptions.includes(capitalize(each.value))
	}


	document.getElementsByClassName('submit')[0].innerText="Update";
	rowIdtoEdit=index;


	setTimeout(() => {
	validateAlbumName();
	validateAlbumPrice();
	validateAlbumDescription();
	validateDate();
	validateTargetAudience();
	validateGenres();
}, 1);
}

function updateTableRow(id, name, price, desc, audience, genres, date)
{
	var fetchedRow = document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0].getElementsByClassName('row_'+id)[0];
	fetchedRow.getElementsByTagName('td')[0].innerText=name;
	fetchedRow.getElementsByTagName('td')[1].innerText=price;
	fetchedRow.getElementsByTagName('td')[2].innerText=desc;
	fetchedRow.getElementsByTagName('td')[5].innerText=date;
	fetchedRow.getElementsByTagName('td')[3].innerText=audience;
	fetchedRow.getElementsByTagName('td')[4].innerText=genres;
}

function deleteFromStorage(index)
{
	
	var fetchedRow = document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0].getElementsByClassName('row_'+index)[0];
	var ObjectFinder_Name=fetchedRow.getElementsByTagName('td')[0].innerText;

	if(index==rowIdtoEdit)
	{
		document.getElementsByClassName('submit')[0].innerText='Add';
	}

	var currentArray=JSON.parse(localStorage.getItem('tableStorage'));
	var objectToDelete=currentArray.filter(e=> e.s_albumname===ObjectFinder_Name)[0];
	currentArray = currentArray.filter(each => each !== objectToDelete);
	localStorage.setItem('tableStorage', JSON.stringify(currentArray));

	deletefromFrontend(index);
}

function deletefromFrontend(id)
{
	var fetchedRow = document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0].getElementsByClassName('row_'+id)[0];
	fetchedRow.remove();
	changeTheme(currentTheme);
}


//Theme function
function changeTheme(color)
{
	//Set the global variable current theme
	currentTheme=color;

	//Fetch headers
	var allHeaders=document.getElementsByClassName('header');

	//Fetch formarea and tablearea
	var formareaspace=document.getElementsByClassName('formarea')[0];
	var tableareaspace=document.getElementsByClassName('tablearea')[0];

	//Fetch input area
	var inputareaspace=document.getElementsByClassName('input-box');

	//Fetch submit button
	var submitbutton=document.getElementsByClassName('submit')[0];

	//Fetch validation messages
	var validationmessages=document.getElementsByClassName('validatorMessage');

	//Fetch table cells
	var tablecells=document.getElementsByClassName('column');


	if(color==='vivid')
	{
		//Change header color
		for(var each of allHeaders)
		{
			each.classList.remove('header-black', 'header-white');
			each.classList.add('header-vivid');
		}

		//Change inputbox area colors
		for(var each of inputareaspace)
		{
			each.classList.remove('inputbox-gray', 'inputbox-white');
			each.classList.add('inputbox-vivid');
		}

		//Change validation messages colors
		for(var each of validationmessages)
		{
			each.classList.remove('validatorMessage-white', 'validatorMessage-blue');
			each.classList.add('validatorMessage-vivid');
		}

		//Change table cell colors
		for(var each of tablecells)
		{
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
	}

	else if(color==="dark")
	{
		//Change header color
		for(var each of allHeaders)
		{
			each.classList.remove('header-vivid', 'header-black');
			each.classList.add('header-white');
		}

		//Change inputbox area colors
		for(var each of inputareaspace)
		{
			each.classList.remove('inputbox-vivid', 'inputbox-white');
			each.classList.add('inputbox-gray');
		}

		//Change validation messages colors
		for(var each of validationmessages)
		{
			each.classList.remove('validatorMessage-white', 'validatorMessage-vivid');
			each.classList.add('validatorMessage-blue');
		}

		//Change table cell colors
		var i=0;
		for(var each of tablecells)
		{
			each.classList.remove('column-vivid', 'column-gray', 'column-gray-alternate', 'column-white', 'column-white-alternate');
			
			if(i%2==0)
			{
				each.classList.add('column-gray');
			}

			else
			{
				each.classList.add('column-gray-alternate');
			}

			i=i+1;
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
	}

	else if(color==="light")
	{
		//Change header color
		for(var each of allHeaders)
		{
			each.classList.remove('header-vivid', 'header-white');
			each.classList.add('header-black');
		}

		//Change inputbox area colors
		for(var each of inputareaspace)
		{
			each.classList.remove('inputbox-gray', 'inputbox-vivid');
			each.classList.add('inputbox-white');
		}

		//Change validation messages colors
		for(var each of validationmessages)
		{
			each.classList.remove('validatorMessage-vivid', 'validatorMessage-blue');
			each.classList.add('validatorMessage-white');
		}

		//Change table cell colors
		var i=0;
		for(var each of tablecells)
		{
			each.classList.remove('column-vivid', 'column-gray', 'column-gray-alternate', 'column-white', 'column-white-alternate');
			
			if(i%2!=0)
			{
				each.classList.add('column-white');
			}

			else
			{
				each.classList.add('column-white-alternate');
			}

			i=i+1;
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