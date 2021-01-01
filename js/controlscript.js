console.log("Holla!")

function addtoTable()
{
	event.preventDefault();

	//Fetch reference to DOM Nodes
	var albumname=document.getElementById('name').value.trim();
	var albumprice=document.getElementById('price').value.trim();
	var albumdesc=document.getElementById('desc').value.trim();
	var targetAudienceNodeList = document.getElementsByName('targetAudience');
	var albumgenreNodeList=document.getElementsByName('genre');
	var albumreleasedate = document.getElementById('releasedate').value;

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

	//Call the function to append new row to table
	appendchildtoTable(albumname, albumprice, albumdesc, targetAudience, albumgenres, albumreleasedate);

	//Clear the input fields
	clearDOM();
}

function appendchildtoTable(name, price, desc, audience, genres, date)
{
	var tableReference = document.getElementsByClassName('data-table')[0].getElementsByTagName('tbody')[0];
	var row = tableReference.insertRow(-1);

	var cell1=row.insertCell(0);
	var cell2=row.insertCell(1);
	var cell3=row.insertCell(2);
	var cell4=row.insertCell(3);
	var cell5=row.insertCell(4);
	var cell6=row.insertCell(5);

	cell1.classList.add('column', 'recordrow', 'albumname');
	cell2.classList.add('column', 'recordrow', 'albumprice');
	cell3.classList.add('column', 'recordrow', 'albumdesc');
	cell4.classList.add('column', 'recordrow', 'albumtargetaud');
	cell5.classList.add('column', 'recordrow', 'albumgenres');
	cell6.classList.add('column', 'recordrow', 'albumreldate');

	cell1.innerHTML=name;
	cell2.innerHTML=price;
	cell3.innerHTML=desc;
	cell4.innerHTML=audience;
	cell5.innerHTML=genres;
	cell6.innerHTML=date;
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

	if(flag===0){return true}
	else {return false}
}

function validateAlbumPrice()
{
	var flag=0;
	var originalpriceval=document.getElementById('price').value.trim();
    price=originalpriceval.split('.')
    console.log(price)
    
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
    
    if(flag===0){return true}
    else {return false}
}

function validateAlbumDescription()
{
	var flag=0;
	var desc=document.getElementById('desc').value;

	if(desc.length===0)
	{
		flag=1;
	}

	if(flag===0){return true}
    else {return false}
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

	if(flag===0){return true}
    else {return false}
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

	if(flag===0){return true}
    else {return false}
}