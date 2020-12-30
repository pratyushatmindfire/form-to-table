console.log("Holla!")

function addtoTable()
{
	event.preventDefault();
	var albumname=document.getElementById('name').value;
	var albumprice=document.getElementById('price').value;
	var albumdesc=document.getElementById('desc').value;
	

	var albumgenreNodeList=document.getElementsByName('genre');
	var albumgenres=[];
	console.log(albumgenreNodeList);

	var targetAudienceNodeList = document.getElementsByName('targetAudience');
	var targetAudience=[];

	for(var each of targetAudienceNodeList)
	{
		if(each.checked === true)
		{
			targetAudience.push(each.value)
		}
	}

	for(var each of albumgenreNodeList)
	{
		if(each.checked === true)
		{
			albumgenres.push(each.value)
		}
	}

	targetAudience=targetAudience.toString();
	albumgenres=albumgenres.toString();

	console.log(albumname, albumprice, albumdesc, targetAudience, albumgenres)
}