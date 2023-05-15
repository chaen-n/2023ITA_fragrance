function setNationList(){
	let nation = document.querySelector("#nations");
	nationArr.forEach(item => {
		let nationOpt = document.createElement("option");
		nationOpt.value = item.code;
		nationOpt.text = item.name;
		nation.add(nationOpt);
	});
}

function setAreaList(nationCd){
	// 옵션 초기화.
	let area = document.querySelector("#area");
	while (area.firstChild) {
		area.removeChild(area.firstChild);
	}

	let defaultOption = document.createElement("option");
	defaultOption.value = 'none';
	defaultOption.text = '지역선택';
	area.add(defaultOption);

	cityArr.forEach(item => {
		let areaOpt = document.createElement("option");
		if(nationCd == item.nation_code){
			areaOpt.value = item.code;
			areaOpt.text = item.name;
			area.add(areaOpt);
		}
	});
}

function chkValidation(){
	//등록여부
	if(!document.querySelectorAll("input[name=postYn]:checked")){
		alert("등록/대기 여부를 선택해주세요.");
		return;
	}
	//분류값
	if(!document.querySelectorAll("input[name=kinds]:checked")){
		alert("분류값을 선택해주세요.");
		return;
	}

	//이름
	if(document.getElementById("name").value == ''){
		alert("이름을 입력해주세요.");
		return;
	}

	//국가
	if(document.getElementById("nations").value == 'none'){
		alert("국가를 선택해주세요.");
		return;
	}

	//지역
	if(document.getElementById("area").value == 'none'){
		alert("지역을 선택해주세요.");
		return;
	}

	//날짜
	if(!chkValidDate(document.getElementById("date").value)){
		alert("정확한 날짜를 입력해주세요.");
		$("#date").val('');
		return;
	}

	if(document.getElementById("title").value == ''){
		alert("제목을 입력해주세요.");
		return;
	}

	if(document.getElementById("content").value == ''){
		alert("내용을 입력해주세요.");
		return;
	}

	save();
}

function save() {
	alert("저장되었습니다.");
	location.href = "./index.html";
}

// 윤년 체크
function isLeaf(year) {
	let leaf = false;
	if (year % 4 == 0) {
		leaf = true;
		if (year % 100 == 0) { leaf = false; }
		if (year % 400 == 0) { leaf = true; }
	}
	return leaf;
}

function chkValidDate(date) {
	let year = date.split("-")[0];
	let month = date.split("-")[1];
	let day = date.split("-")[2];

	let monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// 날짜가 0이면 false
	if (day == 0) return false;


	let isValid = false;
	// 윤년일때 2월은 29일 
	if (isLeaf(year)) {
		if (month == 2)
			if (day <= monthDay[month - 1] + 1) isValid = true;
		else 
			if (day <= monthDay[month - 1]) isValid = true;
	} else {
		if (day <= monthDay[month - 1]) isValid = true;
	}

	return isValid;
}
