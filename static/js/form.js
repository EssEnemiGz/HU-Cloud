'use strict';

// Global const

const REGISTER_OPTION = 'register';
const LOGIN_OPTION = 'login';

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const form = params.get('form');

// Displays

const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');

function change(){
	registerForm.classList.toggle('show');
	loginForm.classList.toggle('show');
};

// Visibility

if (form === REGISTER_OPTION){
	// Pass
} else if (form === LOGIN_OPTION){
	registerForm.classList.toggle('show');
	loginForm.classList.toggle('show');
};

// Generate profile picture
function picture(username){
	// Obtener la primera letra del nombre de usuario
	const firstLetter = username.charAt(0).toUpperCase();

	// Crear un elemento canvas
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	const canvasSize = 100; // Tamaño del canvas

	// Establecer el tamaño del canvas
	canvas.width = canvasSize;
	canvas.height = canvasSize;

	// Establecer el fondo y el estilo del texto
	context.fillStyle = '#062554'; // Color de fondo
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.font = '50px Arial'; // Tamaño y fuente del texto
	context.fillStyle = '#ffffff'; // Color del texto
	context.textAlign = 'center';
	context.textBaseline = 'middle';

	// Colocar la primera letra del nombre de usuario en el canvas
	context.fillText(firstLetter, canvas.width / 2, canvas.height / 2);

	// Convertir el canvas a una imagen en formato base64
	const dataURL = canvas.toDataURL('image/png');
	return dataURL
}

// Forms 

async function send(data, option, username){
	let response, url, restore;

	if (option === REGISTER_OPTION){
		url = 'https://hu-cloud-backend.vercel.app/register/verify';
	}else{
		url = 'https://hu-cloud-backend.vercel.app/login/verify';
	};

	data['picture'] = picture(username);
	data = JSON.stringify(data);
	response = await fetch(url, { method:"POST", headers:{"Content-Type":"application/json", "Accept":"application/json", mode:"cors", credentials:"include"} , body:data });
	restore = await response.json()

	console.log(restore['url']);
	if (response.ok){
		window.location.href = restore['url'];
		return 200;
	} else {
		return response.status;
	};
};

function register(){
	let username, password, email, confirmation;
	username = document.querySelector(".register .username").value 
	password = document.querySelector(".register .password").value 
	confirmation = document.querySelector(".register .confirm").value
	email = document.querySelector(".register .email").value
 
	let json = {
		'username':username,
		'password':password,
		'confirm':confirmation,
		'email':email	
	}

	if ( username.length < 3  &&  password.length < 8 ){ // CREATE A ERROR MENSAJE
		return "ERROR";
	} else if (password !== confirmation){
		return "ERROR";
	};

	send(json, REGISTER_OPTION, username);
	return 0;
}

function login(){
	let username, password, email;
	username = document.querySelector(".login .username").value 
	password = document.querySelector(".login .password").value 
 
	let json ={
		'username':username,
		'password':password,
		'email':email	
	}

	send(json, LOGIN_OPTION, username);
	return 0;
}

