console.log("Holla!")

function addtoTable()
{
	event.preventDefault();

	//Fetch reference to DOM Nodes
	var albumname=document.getElementById('name').value;
	var albumprice=document.getElementById('price').value;
	var albumdesc=document.getElementById('desc').value;
	var albumgenreNodeList=document.getElementsByName('genre');
	var targetAudienceNodeList = document.getElementsByName('targetAudience');
	


	var albumgenres=[];
	var targetAudience=[];

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



	console.log(albumname, albumprice, albumdesc, targetAudience, albumgenres)

	//Call the function to append new row to table
	appendchildtoTable(albumname, albumprice, albumdesc, targetAudience, albumgenres);

	//Clear the input fields
	clearDOM();
}

function appendchildtoTable(name, price, desc, audience, genres)
{
	var tableReference = document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0];
	var row = tableReference.insertRow(-1);

	var cell1=row.insertCell(0);
	var cell2=row.insertCell(1);
	var cell3=row.insertCell(2);
	var cell4=row.insertCell(3);
	var cell5=row.insertCell(4);

	cell1.classList.add('column', 'recordrow', 'albumname');
	cell2.classList.add('column', 'recordrow', 'albumprice');
	cell3.classList.add('column', 'recordrow', 'albumdesc');
	cell4.classList.add('column', 'recordrow', 'albumtargetaud');
	cell5.classList.add('column', 'recordrow', 'albumgenres');

	cell1.innerHTML=name;
	cell2.innerHTML=price;
	cell3.innerHTML=desc;
	cell4.innerHTML=audience;
	cell5.innerHTML=genres;
}

function clearDOM()
{
	document.getElementById('name').value="";
	document.getElementById('price').value="";
	document.getElementById('desc').value="";


	for(var each of document.getElementsByName('genre'))
	{
		console.log("Each=", each);
		each.checked = false;
	}

	for(var each of document.getElementsByName('targetAudience'))
	{
		console.log("Each=", each);
		each.checked = false;
	}
}

function capitalize(word)
{
	const lower = word.toLowerCase();
	return word.charAt(0).toUpperCase() + lower.slice(1);
}