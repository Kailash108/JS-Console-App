const fs = require("fs");
const ps = require('prompt-sync')
const prompt = ps()
const users = require("./jsonData/user.json");
const userLaptopDetails = require('./jsonData/userDetails.json')

//functional Part
function isExists(user,pass){
	exists = 0
	if(user && pass){
		for(i in users){
			if(users[i].email == user && users[i].pass == pass){
				exists = 1
			}
		}
	}
	else if(!pass){
		for(i in users){
			if(users[i].email == user){
				exists = 1
			}
		}
	}
	if(exists == 1){
		return true
	}
	else{
		return false
	}
}

function addUser(user){
    users.push(user);
    fs.writeFile("./jsonData/user.json", JSON.stringify(users), err => {
        if (err) throw err; 
        console.log("User Has Been Registered!!");
    });
}

function deleteUser(userID){
	if(users.length > userID-1){
		users.splice(userID-1)
    	fs.writeFile("./jsonData/user.json", JSON.stringify(users), err => {
        	if (err) throw err; 
        	console.log("User Data Has Been Deleted!!");
    	});
	}
	else{
		console.log('No User with this ID!!!')
	}
}

function addUserLaptopDetails(LaptopDetails){
    userLaptopDetails.push(LaptopDetails)
    fs.writeFile('./jsonData/userDetails.json', JSON.stringify(userLaptopDetails), err => {
        if(err){ throw err } 
        else{ console.log("User's Laptop Details Have Been Added") }
    })
}

function mergeData(){	
    let mergedList = []
	for(i in users){
		var string = users[i].email.split(/[0-9]|@/)[0]
		var strUpr = string.charAt(0).toUpperCase() + string.slice(1)
		let tempObj = {
			id: users[i].id,
			name: strUpr,
			email: users[i].email
		}
		for(j in userLaptopDetails){
			if(users[i].id == userLaptopDetails[j].id){
				tempObj.processor = userLaptopDetails[j].processor
				tempObj.ram = userLaptopDetails[j].ram
				tempObj.os = userLaptopDetails[j].os
				tempObj.bit = Number(userLaptopDetails[j].bit)
				tempObj.company = userLaptopDetails[j].company
				tempObj.price = Number(userLaptopDetails[j].price)
				mergedList.push(tempObj)            
			}
		}
	}
	fs.writeFile('./jsonData/mergedData.json', JSON.stringify(mergedList), err => {
		if(err){ throw err } 
		else{ console.log('Data Has Been Merged Succesfully!!') }
	})
}

//Main Code
console.log('----------WELCOME TO THE CONSOLE BASED JAVASCRIPT CRUD APPLICATION----------')
console.log('0. Exit\n1. Add User Details\n2. Add User\n3. Delete User\n4. Merge Data\n5. Check User')
let choice = prompt('Enter Your Choice: ')
if(choice==0){
	console.log('You have quitted the application')
}
else if(choice == 1){
    var email = prompt('Email?? ')
    var pass = prompt('Pass?? ')
    var id
    for(i in users){
        if(users[i].email == email){
            id = users[i].id
        }
    }
    if(isExists(email, pass)){
        console.log('You are logged In')
        let LaptopDetails = {
            id: id,
            processor: prompt("Enter the processor you are having: "),
            ram: prompt("Enter the storage of your RAM(Input => X-GB): "),
            os: prompt("Enter the OS you are using: "),
            bit: prompt('Enter which bit OS you are using(Input => Number()): '),
            company: prompt('Brand name of your laptop: '),
            price: prompt('Enter the cost(Input => Number): ')
        }
        addUserLaptopDetails(LaptopDetails)
    }
    else{
        console.log("User Doesn't Exists")
        choice = prompt('Press 2 to Add User (or) 0 to exit the application: ')
    }
}
else if(choice == 2){
    let user = {
        id: (users.length)+1,
        email: prompt('Enter Your Email: '),
        pass: prompt('Enter Your Password: ')
    }; 
    addUser(user)
}
else if(choice == 3){
    var user = prompt('Enter the User Id: ')
    deleteUser(user)
}
else if(choice == 4){
    mergeData()
}
else if(choice == 5){
	let userID = prompt('Enter the email of the user: ')
	isExists(userID) ? console.log('User Exists!!') : console.log("User Doesn't Exists!!")
}
else{
	console.log('Give The Proper Input')
}