const el_body = document.getElementsByTagName("body")[0];
const el__time = document.getElementById("time");
const el__logo = document.getElementById("logo_in");
const el__section_s = document.getElementsByClassName("section");
const el__drafts= document.getElementById("drafts");
const el__links= document.getElementsByClassName("aWrapper")[0];
const el_note = document.getElementById("note");
const colors = {
	dark: "rgb(0, 0, 0)",
	lightdark: "rgb(38, 38, 38)",
	lightgreen: "rgb(38, 72, 38)",
	lightred: "rgb(72, 32, 38)"
}
let setLogoCoordinates = (sec) => {
	if (sec <= 15){
		el__logo.style.left = 5 + (sec * 0.33) + "%";
		el__logo.style.top = (sec * 0.33) + "%";
	}else if (sec <= 30){
		el__logo.style.left = ((10 + (5 - (sec * 0.33)))) + "%";
		el__logo.style.top = (sec * 0.33) + "%";
	}else if (sec <= 45){
		el__logo.style.left = ((10 + (5 - (sec * 0.33)))) + "%";
		el__logo.style.top = (10 - (-1 *(10 - sec * 0.33))) + "%";
	}else if (sec <= 60){
		el__logo.style.left = (-1 * (15 - (sec * 0.33))) + "%";
		el__logo.style.top = (10 - (-1 *(10 - sec * 0.33))) + "%";
	}
}
let getTime = () => {
	let nowTime = new Date();
	let hour = nowTime.getHours();
	let min = nowTime.getMinutes();
	let sec = nowTime.getSeconds();
	sec = sec > 9 ? sec : "0" + sec;
	min = min > 9 ? min : "0" + min;
	setLogoCoordinates(min);
	return `${hour}:${min}:${sec}`;
}
let copyFromElement = (element) => {
	text = element.innerText == "" ? element.value : element.innerText;
	navigator.clipboard.writeText(text)
	.then(() => {
		element.style.backgroundColor = colors.lightgreen;
		pageAlert("СКОПИРОВАНО");
		setTimeout(() => {
			element.style.backgroundColor = colors.lightdark;
		}, 1500);
	})
	.catch(err => {
		console.log(err);
		pageAlert("ОШИБКА КОПИРОВАНИЯ", colors.lightred);
	});
}
let updateLinks = () => {
	for (let i = 0; i < STORE.links.length; i++) {
		const element = STORE.links[i];
		let el__link = document.createElement("a");
		el__link.setAttribute("href", element.link);
		el__link.setAttribute("target", "_blank");
		el__link.className = "sectionhref";
		el__link.innerText = element.name;
		if (element.subtitle != undefined){
			el__link.innerHTML = element.name + "<br>" + element.subtitle;
		}
		if (STORE.links.length % 4 == 0)
		{
			el__links.style.gridTemplateColumns = "repeat(4, 1fr)";
		}else {
			el__links.style.gridTemplateColumns = "repeat(3, 1fr)";
		}
		el__links.appendChild(el__link);
	}
}
let pageAlert = (message, color = colors.lightgreen) => {
	let el_pageAlert = document.createElement("div");
	el_pageAlert.innerText = message;
	el_pageAlert.style.padding = "1rem 2rem";
	el_pageAlert.style.backgroundColor = color;
	el_pageAlert.style.position = "fixed";
	el_pageAlert.style.bottom = "1rem";
	el_pageAlert.style.right = "1rem";
	el_body.appendChild(el_pageAlert);
	setTimeout(() => {
		el_body.removeChild(el_pageAlert)
	}, 3000);

}
let updateDrafts = () => {
	for (let i = 0; i < STORE.drafts.length; i++) {
		const element = STORE.drafts[i];
		let el__draft_content = document.createElement("p");
		el__draft_content.innerText = element;
		el__draft_content.style.backgroundColor = colors.lightdark;
		el__draft_content.style.padding = "1rem";
		el__draft_content.style.whiteSpace = "pre-wrap";
		el__draft_content.style.cursor = "pointer";
		el__draft_content.style.userSelect = "none";
		el__draft_content.style.transitionDuration = "0.5s";
		el__draft_content.addEventListener("click", () => {
			copyFromElement(el__draft_content)
		});
		el__drafts.appendChild(el__draft_content);
	}
}
let updatePageSettings = () => {
	el__logo.style.backgroundImage = `url(${STORE.pageSettings.logo})`;
}
let updateSectionHeaders = () => {
	for (let i = 0; i < el__section_s.length; i++) {
		const element = el__section_s[i];
		let el__sectionHeader = document.createElement("div");
		el__sectionHeader.style.fontSize = "110%";
		el__sectionHeader.style.marginBottom = "2rem";
		el__sectionHeader.style.fontWeight= "bolder";
		el__sectionHeader.style.userSelect= "none";
		el__sectionHeader.innerText = element.getAttribute("header");
		element.prepend(el__sectionHeader);
	}
}
let updateSectionContent = () => {
	updateLinks();
	updateDrafts();
	updatePageSettings();
	el_note.addEventListener("dblclick", () => {
		copyFromElement(el_note);
	})
}


let updateTime = setInterval(() => {
	el__time.innerText = getTime();
}, 500);
updateSectionHeaders();
updateSectionContent();
