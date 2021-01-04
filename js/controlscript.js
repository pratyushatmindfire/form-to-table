console.log("JS Connected!")
var rowIdtoEdit=-1;

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



	console.log(albumname, albumprice, albumdesc, targetAudience, albumgenres, albumreleasedate)

	if(submitDecision())
	{
		//Update price value as per validation
		var albumprice=document.getElementById('price').value.trim();

		// Call the function to append new row to table
		if(writeMode==='Submit')
		{
			appendchildtoTable(albumname, albumprice, albumdesc, targetAudience, albumgenres, albumreleasedate);
		}

		else
		{
			updateTableRow(rowIdtoEdit, albumname, albumprice, albumdesc, targetAudience, albumgenres, albumreleasedate);
			rowIdtoEdit=-1;
			document.getElementsByClassName('submit')[0].innerText="Submit";
		}
		

		//Clear form input fields
		clearDOM();
	}

	

	else
	{
		console.log("Check invalid inputs!")
	}
}

function appendchildtoTable(name, price, desc, audience, genres, date)
{
	var tableReference = document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0];
	var rowcount=document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
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
	cell7.innerHTML='<label onclick="sendDataToForm('+(rowcount+1)+')">Edit</label><br><label onclick="deleteDataFromForm('+(rowcount+1)+')">Delete</label';
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
		document.querySelector('.albumnameblock #validatorMessage').style.display='none';
		return true
	}
	else 
	{
		document.querySelector('.albumnameblock #validatorMessage').style.display='block';
		return false
	}
}

function validateAlbumPrice()
{
	var flag=0;
	var originalpriceval=document.getElementById('price').value.trim();
    price=originalpriceval.split('.')
    console.log(price)

    if(originalpriceval.trim().length==0)
    {
    	flag=1;
    }
    
    // Check for letters
    if (isNaN(originalpriceval))
    {
        console.log("Price match", originalpriceval.replace('.', ''))
        flag=1;
    }

    
    
    //Irregular inputs
    if(price.length<1 || price.length>2)
    {
        console.log("Irregular Inps")
        flag=1;
    }
    
    //Negative price
    if(price[0]<0)
    {
        console.log("Negative price")
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
    	console.log("More than 2 decimal inputs");
    	flag=1;
    }
    
    if(flag===0)
    {
    	document.querySelector('.priceblock #validatorMessage').style.display='none';
    	return true
    }
    else 
    {
    	document.querySelector('.priceblock #validatorMessage').style.display='block';
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
		document.querySelector('.albumdescription #validatorMessage').style.display='none';
		return true
	}
    else 
    {
    	document.querySelector('.albumdescription #validatorMessage').style.display='block';
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
		document.querySelector('.albumreleasedate #validatorMessage').style.display='none';
		return true;
	}
    else 
    {
    	document.querySelector('.albumreleasedate #validatorMessage').style.display='block';
    	
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
		document.querySelector('.targetaud #validatorMessage').style.display='none';
		return true
	}
    else 
    {
    	document.querySelector('.targetaud #validatorMessage').style.display='block';
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
		document.querySelector('.genres #validatorMessage').style.display='none';
		return true
	}
    else 
    {
    	document.querySelector('.genres #validatorMessage').style.display='block';
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

function sendDataToForm(id)
{
	console.log(id);
	var fetchedRow = document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0].getElementsByClassName('row_'+id)[0];
	document.getElementById('name').value=fetchedRow.getElementsByTagName('td')[0].innerText;
	document.getElementById('price').value=fetchedRow.getElementsByTagName('td')[1].innerText;
	document.getElementById('desc').value=fetchedRow.getElementsByTagName('td')[2].innerText;
	document.getElementById('releasedate').value=fetchedRow.getElementsByTagName('td')[5].innerText;

	document.getElementsByClassName('submit')[0].innerText="Update";

	for (var each of document.getElementsByName('targetAudience'))
	{
		each.checked=(capitalize(each.value)===fetchedRow.getElementsByTagName('td')[3].innerText)
	}

	for (var each of document.getElementsByName('genre'))
	{
		console.log(fetchedRow.getElementsByTagName('td')[4].innerText.split(/\n/))
		each.checked=fetchedRow.getElementsByTagName('td')[4].innerText.split(/\n/).includes(capitalize(each.value))
	}

	rowIdtoEdit=id;
}

function updateTableRow(id, name, price, desc, audience, genres, date)
{
	console.log(id);
	var fetchedRow = document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0].getElementsByClassName('row_'+id)[0];
	fetchedRow.getElementsByTagName('td')[0].innerText=name;
	fetchedRow.getElementsByTagName('td')[1].innerText=price;
	fetchedRow.getElementsByTagName('td')[2].innerText=desc;
	fetchedRow.getElementsByTagName('td')[5].innerText=date;
	fetchedRow.getElementsByTagName('td')[3].innerText=audience;
	fetchedRow.getElementsByTagName('td')[4].innerText=genres;
}

function deleteDataFromForm(id)
{
	console.log(id);
	var fetchedRow = document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0].getElementsByClassName('row_'+id)[0];
	fetchedRow.remove();
}	