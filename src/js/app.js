var dropdown = document.getElementById('dropdown'),
	drop_trigger = dropdown.getElementsByClassName('btn')[0],
	modal_trigger = document.getElementsByClassName('modal-trigger'),
	modals = document.querySelectorAll('.modal'),
	body = document.getElementsByTagName('body')[0],
	lang = 0;

function remove_class(class_str, class_name) {
	var mc_arr = class_str.split(' ');
	for (var i = 0; i < mc_arr.length; i++) {
		mc_arr[i] = mc_arr[i].trim();
		if (mc_arr[i] == class_name) {delete mc_arr[i]; break;}
	}
	class_str = mc_arr.join(' ');
	return class_str;
}
function close_modal() {
	var modal = document.querySelector('.modal.in');
	modal.className = remove_class(modal.className, 'in');
	body.className = remove_class(body.className, 'modal-open');
	modal.setAttribute('style','');
}
function has_class(class_str, class_name) {
	var mc_arr = class_str.split(' ');
	for (var i = 0; i < mc_arr.length; i++) {
		mc_arr[i] = mc_arr[i].trim();
		if (mc_arr[i] == class_name) {return true;;}
	}
	return false;
}
function element_animation() {
	var movable = document.querySelectorAll('.movable');
	var window_height = window.innerHeight;
	for (var i = movable.length - 1; i >= 0; i--) {
		var coord =  movable[i].getBoundingClientRect();
		if ( coord.top < (window_height - window_height/3) ) {
			movable[i].className = ( remove_class(movable[i].className, "movable") );
		}
	}
	if (movable.length < 1) window.removeEventListener("scroll", element_animation);
}
function animate_scrooll( time, top) {
	var start = Date.now(),
		step = 20*(window.pageYOffset - top)/time;

	var timer = setInterval(function() {
		var timePassed = Date.now() - start;

		window.scrollBy(0,-step);

		// if (timePassed >= time) {
		if (window.pageYOffset <= top) {
			clearInterval(timer);
			return;
		}
	}, 20);
}
for (var i = modal_trigger.length - 1; i >= 0; i--) {
	modal_trigger[i].onclick = function(event) {
		event.preventDefault();
		var id = this.getAttribute('href');
		console.log(id);
		var  elem = document.getElementById(id);
			elem_class = elem.className;
		elem.setAttribute('style','visibility: visible;');
		body.className = 'modal-open';
		elem.className = elem_class + ' in';
		event.stopPropagation();
		elem.querySelector('.close').onclick = function() { close_modal(); };
	}
};

for (var i = modals.length - 1; i >= 0; i--) {
	modals[i].onclick = function(e) {
		var target = e.target;
		if ( has_class(e.target.className, "modal") ) {
			close_modal();
		}
	};
}
drop_trigger.onclick  = function(event) {
	event.preventDefault();
	if (lang != 1) {
		this.closest('.dropdown').className = 'dropdown open';
		lang = 1;
		event.stopPropagation();
	}
	document.onclick = function () {
		lang = 0;
		dropdown.className = 'dropdown';
	}
};

var head_plus =  document.getElementById('head-plus-wrap').querySelectorAll('.head-plus'),
	k = 0;
var timerId = setInterval( function() {
	head_plus[k].className = 'head-plus ';
	if (k == 2) {
		k=0;
	} else {
		k++;
	}
	head_plus[k].className = 'head-plus  in';

}, 1000);

// element_animation();
window.addEventListener("scroll", element_animation);

document.getElementById('anchor-list').onclick = function (e) {
	e.preventDefault();
	var elem =  document.querySelector( e.target.getAttribute('href') );

	var top = elem.getBoundingClientRect().top + pageYOffset;

	animate_scrooll(2000, top);

}
