jQuery('.mm-prev-btn').hide();

var x;
var count;
var current;
var percent;
var z = [];

init();
getCurrentSlide();
goToNext();
goToPrev();
getCount();
buildStatus();
deliverStatus();
submitData();
goBack();
const animateBox = document.querySelector('.mm-survey-bottom');

function transition(frame) {

	animateBox.style.animation = ` ${frame} .5s ease`
	animateBox.addEventListener('animationend', () => {
		animateBox.style.animation = ``
	})
}

function init() {

	jQuery('.mm-survey-container .mm-survey-page').each(function () {

		var item;
		var page;

		item = jQuery(this);
		page = item.data('page');

		item.addClass('mm-page-' + page);
		//item.html(page);

	});

}

function getCount() {

	count = jQuery('.mm-survey-page').length;
	return count;

}

function goToNext() {

	jQuery('.mm-next-btn').on('click', function () {
		goToSlide(x);
		getCount();
		current = x + 1;
		var g = current / count;
		buildProgress(g);
		var y = (count + 1);
		getButtons();
		jQuery('.mm-survey-page').removeClass('active');
		jQuery('.mm-page-' + current).addClass('active');
		getCurrentSlide();
		checkStatus();
		transition('next');
		if (jQuery('.mm-page-' + count).hasClass('active')) {
			if (jQuery('.mm-page-' + count).hasClass('pass')) {
				jQuery('.mm-finish-btn').addClass('active');
			} else {
				jQuery('.mm-page-' + count + ' .mm-survery-content .mm-survey-item').on('click', function () {
					jQuery('.mm-finish-btn').addClass('active');
				});
			}
		} else {
			jQuery('.mm-finish-btn').removeClass('active');
			if (jQuery('.mm-page-' + current).hasClass('pass')) {
				jQuery('.mm-survey-container').addClass('good');
				jQuery('.mm-survey').addClass('okay');
			} else {
				jQuery('.mm-survey-container').removeClass('good');
				jQuery('.mm-survey').removeClass('okay');
			}
		}
		buttonConfig();
	});

}

function goToPrev() {

	jQuery('.mm-prev-btn').on('click', function () {
		goToSlide(x);
		getCount();
		current = (x - 1);
		var g = current / count;
		buildProgress(g);
		var y = count;
		getButtons();
		jQuery('.mm-survey-page').removeClass('active');
		jQuery('.mm-page-' + current).addClass('active');
		getCurrentSlide();
		checkStatus();
		transition('previous');
		jQuery('.mm-finish-btn').removeClass('active');
		if (jQuery('.mm-page-' + current).hasClass('pass')) {
			jQuery('.mm-survey-container').addClass('good');
			jQuery('.mm-survey').addClass('okay');
		} else {
			jQuery('.mm-survey-container').removeClass('good');
			jQuery('.mm-survey').removeClass('okay');
		}
		buttonConfig();
	});

}

function buildProgress(g) {

	if (g > 1) {
		g = g - 1;
	} else if (g === 0) {
		g = 1;
	}
	g = g * 100;
	jQuery('.mm-survey-progress-bar').css({
		'width': g + '%'
	});

}

function goToSlide(x) {

	return x;

}

function getCurrentSlide() {

	jQuery('.mm-survey-page').each(function () {
		jQuery("#questCount").text((x + "") + " / 22");
		var item;

		item = jQuery(this);

		if (jQuery(item).hasClass('active')) {
			x = item.data('page');
		} else {

		}

		return x;

	});

}

function getButtons() {

	if (current === 0) {
		current = y;
	}
	if (current === count) {
		jQuery('.mm-next-btn').hide();
	} else if (current === 1) {
		jQuery('.mm-prev-btn').hide();
	} else {
		jQuery('.mm-next-btn').show();
		jQuery('.mm-prev-btn').show();
	}

}

jQuery('.mm-survey-q li input').each(function () {

	var item;
	item = jQuery(this);

	jQuery(item).on('click', function () {
		if (jQuery('input:checked').length > 0) {
			// console.log(item.val());
			jQuery('label').parent().removeClass('active');
			item.closest('li').addClass('active');
		} else {
			//
		}
	});

});

percent = (x / count) * 100;
jQuery('.mm-survey-progress-bar').css({
	'width': percent + '%'
});

function checkStatus() {
	jQuery('.mm-survery-content .mm-survey-item').on('click', function () {
		var item;
		item = jQuery(this);
		item.closest('.mm-survey-page').addClass('pass');
	});
}

function buildStatus() {
	jQuery('.mm-survery-content .mm-survey-item input').on('click', function () {
		var item;
		item = jQuery(this);
		item.addClass('bingo');
		item.closest('.mm-survey-page').addClass('pass');
		jQuery('.mm-survey-container').addClass('good');
	});
}

function deliverStatus() {
	jQuery('.mm-survey-item').on('click', function () {
		if (jQuery('.mm-survey-container').hasClass('good')) {
			jQuery('.mm-survey').addClass('okay');
		} else {
			jQuery('.mm-survey').removeClass('okay');
		}
		buttonConfig();
	});
}

function lastPage() {
	if (jQuery('.mm-next-btn').hasClass('cool')) {
		alert('cool');
	}
}

function buttonConfig() {
	if (jQuery('.mm-survey').hasClass('okay')) {
		jQuery('.mm-next-btn button').prop('disabled', false);
	} else {
		jQuery('.mm-next-btn button').prop('disabled', true);
	}
}



function goBack() {
	jQuery('.mm-back-btn').on('click', function () {
		jQuery('.mm-survey-bottom').slideDown();
		jQuery('.mm-survey-results').slideUp();
	});
}


const resMsg = document.querySelectorAll('.mm-survey-results p');




function Results() {

	var radios = document.querySelectorAll('[type="radio"]');
	var nbr = document.querySelectorAll('[type="number"]');
	var checked = [];
	var val = [];

	for (let i = 0; i < radios.length; i++) {

		if (radios[i].checked) {

			checked.push(radios[i].value)
		}
	}


	for (let i = 0; i < nbr.length; i++) {

		val.push(nbr[i].value)

	}

	// if(checked[0]==="Oui"&&checked[1]==="Oui"&&val[0]>37)
	// {
	// 	resMsg[0].innerText="oui";
	// }
	// else
	// {
	// 	resMsg[0].innerText="Non"
	// }
	if (((checked[0] === 'Oui' || checked[1] === 'Oui') && (checked[3] === 'Oui' || checked[1] === 'Oui') && (checked[2] === 'Oui' || checked[0] === 'Oui') && checked[4] === 'Oui') && (checked[9] === 'Non' && checked[10] === 'Non' && checked[11] === 'Non' && checked[12] === 'Non' && checked[13] === 'Non' && checked[14] === 'Non' && (checked[15] === 'Non' || checked[15] === 'Homme') && checked[16] === 'Non' && checked[17] === 'Non' && val[1] < 50)) {

		resMsg[0].innerText = 'Nous vous conseillons de rester à votre domicile et de contacter votre médecin' +
			' en cas d’apparition de nouveaux symptômes. Vous pourrez aussi utiliser à nouv' +
			'eau l’application pour réévaluer vos symptômes'
			resMsg[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
			'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
			resMsg[0].style.fontWeight = 'bold'
			resMsg[0].style.color = '#369D53'
	}




	if (((checked[0] === 'Oui' || checked[1] === 'Oui') && (checked[3] === 'Oui' || checked[1] === 'Oui') && (checked[2] === 'Oui' || checked[0] === 'Oui') && checked[4] === 'Oui') && ((checked[9] === 'Non' && checked[10] === 'Non' && checked[11] === 'Non' && checked[12] === 'Non' && checked[13] === 'Non' && checked[14] === 'Non' && (checked[15] === 'Non' || checked[15] === 'Homme') && checked[16] === 'Non' && checked[17] === 'Non' && val[1] > 50) || ((val[0] >= 39) || (checked[5] === 'Oui') || (checked[8] === ' Fatigué(e)') || (checked[8] === 'Très fatigué')))) {

		resMsg[0].innerText = "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domi" +
			"cile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes p" +
			"our s’alimenter ou boire pendant plus de 24h apparaissent."
			resMsg[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
			'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
			resMsg[0].style.fontWeight = 'bold'
			resMsg[0].style.color = '#369D53'
	}



	if (((checked[0] === 'Oui' || checked[1] === 'Oui') && (checked[3] === 'Oui' || checked[1] === 'Oui') && (checked[2] === 'Oui' || checked[0] === 'Oui') && checked[4] === 'Oui') && ((checked[9] === 'Oui' || checked[10] === 'Oui' || checked[11] === 'Oui' || checked[12] === 'Oui' || checked[13] === 'Oui' || checked[14] === 'Oui' || checked[15] === 'Oui' || checked[16] === 'Oui' || checked[17] === 'Oui') && (checked[5] === 'Non' && checked[6] === 'Non' && checked[12] === 'Non' && checked[8] === 'Assez bien' && checked[8] === 'Bien'))) {

		resMsg[0].innerText = "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domi" +
			"cile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes p" +
			"our s’alimenter ou boire pendant plus de 24h apparaissent."
			resMsg[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
			'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
			resMsg[0].style.fontWeight = 'bold'
			resMsg[0].style.color = '#369D53'
	}



	if (((checked[0] === 'Oui' || checked[1] === 'Oui') && (checked[3] === 'Oui' || checked[1] === 'Oui') && (checked[2] === 'Oui' || checked[0] === 'Oui') && checked[4] === 'Oui') && (checked[9] === 'Oui' || checked[10] === 'Oui' || checked[11] === 'Oui' || checked[12] === 'Oui' || checked[13] === 'Oui' || checked[14] === 'Oui' || checked[15] === 'Oui' || checked[16] === 'Oui' || checked[17] === 'Oui') && (val[0] >= 39 || checked[5] === 'Oui' || checked[8] === 'Très fatigué' || checked[8] === 'Fatigué(e)')) {

		resMsg[0].innerText = "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domi" +
			"cile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes p" +
			"our s’alimenter ou boire pendant plus de 24h apparaissent."
			resMsg[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
			'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
			resMsg[0].style.fontWeight = 'bold'
			resMsg[0].style.color = '#369D53'
	}




	if (((checked[0] === 'Oui' && checked[1] === 'Oui') && (checked[2] === 'Oui' && checked[3] === 'Oui') && (checked[3] === 'Oui' && checked[4] === 'Oui') && (checked[5] === 'Oui' && checked[6] === 'Oui')  && ((val[0] >= 39 && checked[5] === 'Oui') || (val[0] >= 39 && checked[8] === 'Fatigué(e)') || (val[0] >= 39 && checked[8] === 'Très fatigué') || (checked[5] === 'Oui' && checked[8] === 'Fatigué(e)') || (checked[5] === 'Oui' && checked[8] === 'Très fatigué'))))
	{

		resMsg[0].innerText = "Appelez le 141"
		resMsg[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
			'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
			resMsg[0].style.color = '#FF0000'
			resMsg[0].style.fontSize = '35px'
			resMsg[0].style.fontWeight = 'bold'

	}



	if (((checked[0] === 'Oui' && checked[1] === 'Oui') && (checked[9] === 'Non' && checked[10] === 'Non' && checked[11] === 'Non' && checked[12] === 'Non' && checked[13] === 'Non' && checked[14] === 'Non' && (checked[15] === 'Non' || checked[15] === 'Homme') && checked[16] === 'Non' && checked[17] === 'Non')) && (checked[5] === 'Non' && checked[6] === 'Non' && checked[12] === 'Non' && checked[8] === 'Assez bien' && checked[8] === 'Bien') || ((val[0] >= 39 || checked['Q7'] === 'Oui' || checked['Q10'] === 'Très fatigué' || checked['Q10'] === 'Fatigué(e)') && val['Q2'] <= 35, 4 && checked['Q17'] === 'Non' && checked['Q8'] === 'Non')) {

		resMsg[0].innerText = "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domi" +
			"cile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes p" +
			"our s’alimenter ou boire pendant plus de 24h apparaissent."
			resMsg[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
			'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
			resMsg[0].style.fontWeight = 'bold'
			resMsg[0].style.color = '#369D53'
	}


	if ((checked[0] === 'Oui' && checked[1] === 'Oui') && (checked[9] === 'Oui' || checked[10] === 'Oui' || checked[11] === 'Oui' || checked[12] === 'Oui' || checked[13] === 'Oui' || checked[14] === 'Oui' || checked[15] === 'Oui' || checked[16] === 'Oui' || checked[17] === 'Oui') && checked[5] === 'Non' && checked[6] === 'Non' && checked[12] === 'Non' && checked[8] === 'Assez bien' && checked[8] === 'Bien') {

		resMsg[0].innerText = "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domi" +
			"cile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes p" +
			"our s’alimenter ou boire pendant plus de 24h apparaissent."
			resMsg[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
			'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
			resMsg[0].style.fontWeight = 'bold'
			resMsg[0].style.color = '#369D53'

	}


	if ((checked[0] === 'Oui' && checked[1] === 'Oui') && (checked[9] === 'Oui' || checked[10] === 'Oui' || checked[11] === 'Oui' || checked[12] === 'Oui' || checked[13] === 'Oui' || checked[14] === 'Oui' || checked[15] === 'Oui' || checked[16] === 'Oui' || checked[17] === 'Oui') && (val[0] >= 39 || checked[5] === 'Oui' || checked[8] === 'Très fatigué' || checked[8] === 'Fatigué(e)')) {

		resMsg[0].innerText = "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domi" +
			"cile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes p" +
			"our s’alimenter ou boire pendant plus de 24h apparaissent."
			resMsg[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
			'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
			resMsg[0].style.fontWeight = 'bold'
			resMsg[0].style.color = '#369D53'
	}



	if (((checked[0] === 'Oui' && checked[1] === 'Oui') && (checked[9] === 'Oui' || checked[10] === 'Oui' || checked[11] === 'Oui' || checked[12] === 'Oui' || checked[13] === 'Oui' || checked[14] === 'Oui' || checked[15] === 'Oui' || checked[16] === 'Oui' || checked[17] === 'Oui')) && ((val[0] >= 39 && checked[5] === 'Oui') || (val[0] >= 39 && checked[8] === 'Fatigué(e)') || (val[0] >= 39 && checked[8] === 'Très fatigué') || (checked[5] === 'Oui' && checked[8] === 'Fatigué(e)') || (checked[5] === 'Oui' && checked[8] === 'Très fatigué'))) {

		resMsg[0].innerText = "Appelez le 141"
		resMsg[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
			'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
			resMsg[0].style.color = '#FF0000'
			resMsg[0].style.fontSize = '35px'
			resMsg[0].style.fontWeight = 'bold'
	}


	if ((checked[0] === 'Oui' || checked[1] === 'Oui' || checked[3] === 'Oui' || checked[2] === 'Oui') && (checked[5] === 'Non' && checked[6] === 'Non' && checked[12] === 'Non' && checked[8] === 'Assez bien' && checked[8] === 'Bien')) {

		resMsg[0].innerText = 'Votre situation ne relève probablement pas du Covid-19.' +
			'Consultez votre médecin au moindre doute.'
			resMsg[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
			'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
			resMsg[0].style.fontWeight = 'bold'
			resMsg[0].style.fontWeight = 'bold'
			resMsg[0].style.color = '#369D53'

	}



	if ((checked[0] === 'Oui' || checked[1] === 'Oui' || checked[3] === 'Oui' || checked[2] === 'Oui') && ((checked[9] === 'Oui' || checked[10] === 'Oui' || checked[11] === 'Oui' || checked[12] === 'Oui' || checked[13] === 'Oui' || checked[14] === 'Oui' || checked[15] === 'Oui' || checked[16] === 'Oui' || checked[17] === 'Oui') || (checked[5] === 'oui' && checked[6] === 'oui' && checked[12] === 'oui' && checked[8] === 'Très fatigué' && checked[8] === 'Fatigué(e)'))) {

		resMsg[0].innerText = 'Votre situation ne relève probablement pas du Covid-19.' +
			'Un avis médical est recommandé. Au moindre doute, appelez le 141.'
			resMsg[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
			'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
			resMsg[0].style.fontWeight = 'bold'
			resMsg[0].style.fontWeight = 'bold'
			resMsg[0].style.color = '#369D53'
	}


	if ((checked[0] === 'Non') && (checked[1] === 'Non') && (checked[2] === 'Non') && (checked[3] === 'Non') && (checked[4] === 'Non')) {

		resMsg[0].innerText = 'Votre situation ne relève probablement pas du Covid-19.' +
			'N’hésitez pas à contacter votre médecin en cas de doute.' + 'Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation.' + 'Pour toute information concernant le Covid-19 allez vers la page d’accueil.'
			resMsg[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
			'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
			resMsg[0].style.fontWeight = 'bold'
			resMsg[0].style.fontWeight = 'bold'
			resMsg[0].style.color = '#369D53'


	}
}

function submitData() {
	jQuery('.mm-finish-btn').on('click', function () {
		Results();
		jQuery('.mm-survey-bottom').slideUp();
		jQuery('.mm-survey-results').slideDown();
	});
}