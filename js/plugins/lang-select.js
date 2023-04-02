$(document).ready(function () {
	"use strict";

	function loadTranslations(lang) {
		return $.getJSON(lang + ".json");
	}

	function applyTranslations(translations) {
		$("[data-translate]").each(function () {
			var key = $(this).data("translate");
			if (translations[key]) {
				$(this).text(translations[key]);
			}
		});
	}

	function changeLanguage(lang) {
		loadTranslations(lang).done(function (translations) {
			applyTranslations(translations);
		});
	}

	$(".lang").fancySelect({
		triggerTemplate: function (optionEl) {
			return (
				'<div class="flags' +
				" " +
				optionEl.data("class") +
				'"></div>' +
				optionEl.text()
			);
		},
		optionTemplate: function (optionEl) {
			return (
				'<div class="flags' +
				" " +
				optionEl.data("class") +
				'"></div>' +
				optionEl.text()
			);
		},
	});

	$(".lang").on("change.fs", function () {
		var selectedLang = $(this).val().toLowerCase();
		changeLanguage(selectedLang);
	});

	// Загрузите переводы для языка по умолчанию при первой загрузке страницы
	var defaultLanguage = "de"; // Замените 'en' на код языка, который вы хотите использовать по умолчанию
	changeLanguage(defaultLanguage);

	// Если вы хотите сохранить выбранный язык для пользователя, вы можете использовать localStorage
	var storedLanguage = localStorage.getItem("selectedLanguage");
	if (storedLanguage) {
		changeLanguage(storedLanguage);
	}

	$(".lang").on("change.fs", function () {
		var selectedLang = $(this).val().toLowerCase();
		changeLanguage(selectedLang);
		localStorage.setItem("selectedLanguage", selectedLang);
	});
});
