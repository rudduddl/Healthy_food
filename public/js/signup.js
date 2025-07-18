/*변수 선언*/

var id = document.querySelector("#id");

var pw1 = document.querySelector("#pswd1");
var pwMsg = document.querySelector("#alertTxt");

var pw2 = document.querySelector("#pswd2");
var pwMsgArea = document.querySelector(".int_pass");

var userName = document.querySelector("#name");

var yy = document.querySelector("#yy");
var mm = document.querySelector("#mm");
var dd = document.querySelector("#dd");

var gender = document.querySelector("#gender");

var email = document.querySelector("#email");

var mobile = document.querySelector("#mobile");

var error = document.querySelectorAll(".error_next_box");

let signupBools = {
  id: false,
  pw1: false,
  pw2: false,
  userName: false,
  yy: false,
  mm: false,
  dd: false,
  date: false,
  gender: false,
  email: false,
  mobile: false,
};

let signupBtn = document.querySelector("#btnJoin");

/*이벤트 핸들러 연결*/

id.addEventListener("focusout", checkId);
pw1.addEventListener("focusout", checkPw);
pw2.addEventListener("focusout", comparePw);
userName.addEventListener("focusout", checkName);
yy.addEventListener("focusout", isBirthCompleted);
mm.addEventListener("focusout", isBirthCompleted);
dd.addEventListener("focusout", isBirthCompleted);
gender.addEventListener("focusout", function () {
  if (gender.value === "성별") {
    error[5].style.display = "block";
  } else {
    error[5].style.display = "none";
    signupBools["gender"] = true;
  }
});

email.addEventListener("focusout", isEmailCorrect);
mobile.addEventListener("focusout", checkPhoneNum);

signupBtn.addEventListener("click", canSignup);

/*콜백 함수*/

function canSignup() {
  let isCanSignup = false;
  for (let key in signupBools) {
    if (key != "email" && signupBools[key] === false) {
      isCanSignup = true;
      break;
    }
  }
  console.log(`canSignup ${!isCanSignup}`);
  signupBtn.disabled = isCanSignup;
}

function checkId() {
  var idPattern = /[a-zA-Z0-9_-]{5,20}/;
  if (id.value === "") {
    error[0].innerHTML = "필수 정보입니다.";
    error[0].style.display = "block";
    signupBools["id"] = false;
  } else if (!idPattern.test(id.value)) {
    error[0].innerHTML =
      "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
    error[0].style.display = "block";
    signupBools["id"] = false;
  } else {
    error[0].innerHTML = "멋진 아이디네요!";
    error[0].style.color = "#000000";
    error[0].style.display = "block";
    signupBools["id"] = true;
  }
  canSignup();
}

function checkPw() {
  var pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
  if (pw1.value === "") {
    error[1].innerHTML = "필수 정보입니다.";
    error[1].style.display = "block";
    signupBools["pw1"] = false;
  } else if (!pwPattern.test(pw1.value)) {
    error[1].innerHTML = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
    pwMsg.innerHTML = "사용불가";
    pwMsgArea.style.paddingRight = "93px";
    error[1].style.display = "block";
    signupBools["pw1"] = false;
    pwMsg.style.display = "block";
  } else {
    error[1].style.display = "none";
    pwMsg.innerHTML = "안전";
    pwMsg.style.display = "block";
    pwMsg.style.color = "#03c75a";
    signupBools["pw1"] = true;
  }
  canSignup();
}

function comparePw() {
  if (pw2.value === pw1.value && pw2.value != "") {
    error[2].style.display = "none";
    signupBools["pw2"] = true;
  } else if (pw2.value !== pw1.value) {
    error[2].innerHTML = "비밀번호가 일치하지 않습니다.";
    error[2].style.display = "block";
    signupBools["pw2"] = false;
  }

  if (pw2.value === "") {
    error[2].innerHTML = "필수 정보입니다.";
    error[2].style.display = "block";
    signupBools["pw2"] = false;
  }
  canSignup();
}

function checkName() {
  var namePattern = /[a-zA-Z가-힣]/;
  if (userName.value === "") {
    error[3].innerHTML = "필수 정보입니다.";
    error[3].style.display = "block";
    signupBools["userName"] = false;
  } else if (
    !namePattern.test(userName.value) ||
    userName.value.indexOf(" ") > -1
  ) {
    error[3].innerHTML =
      "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)";
    error[3].style.display = "block";
    signupBools["userName"] = false;
  } else {
    error[3].style.display = "none";
    signupBools["userName"] = true;
  }
  canSignup();
}

function isBirthCompleted() {
  var yearPattern = /[0-9]{4}/;

  if (!yearPattern.test(yy.value)) {
    error[4].innerHTML = "태어난 년도 4자리를 정확하게 입력하세요.";
    error[4].style.display = "block";
    signupBools["yy"] = false;
  } else {
    signupBools["yy"] = true;
    isMonthSelected();
  }

  function isMonthSelected() {
    if (mm.value === "월") {
      error[4].innerHTML = "태어난 월을 선택하세요.";
      signupBools["mm"] = false;
    } else {
      signupBools["mm"] = true;
      isDateCompleted();
    }
  }

  function isDateCompleted() {
    if (dd.value === "") {
      error[4].innerHTML = "태어난 일(날짜) 2자리를 정확하게 입력하세요.";
      signupBools["dd"] = false;
    } else {
      signupBools["dd"] = true;
      isBirthRight();
    }
  }
  canSignup();
}

function isBirthRight() {
  var datePattern = /\d{1,2}/;
  if (
    !datePattern.test(dd.value) ||
    Number(dd.value) < 1 ||
    Number(dd.value) > 31
  ) {
    error[4].innerHTML = "생년월일을 다시 확인해주세요.";
    signupBools["dd"] = false;
  } else {
    checkAge();
  }
}

function checkAge() {
  if (Number(yy.value) < 1920) {
    error[4].innerHTML = "정말이세요?";
    error[4].style.display = "block";
    signupBools["date"] = false;
  } else if (Number(yy.value) > 2020) {
    error[4].innerHTML = "미래에서 오셨군요. ^^";
    error[4].style.display = "block";
    signupBools["date"] = false;
  } else {
    error[4].style.display = "none";
    signupBools["date"] = true;
  }
}

function isEmailCorrect() {
  var emailPattern = /[a-z0-9]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/;

  if (email.value === "") {
    error[6].style.display = "none";
    signupBools["email"] = false;
  } else if (!emailPattern.test(email.value)) {
    error[6].style.display = "block";
    signupBools["email"] = false;
  } else {
    error[6].style.display = "none";
    signupBools["email"] = true;
  }
  canSignup();
}

function checkPhoneNum() {
  var isPhoneNum = /([01]{2})([01679]{1})([0-9]{3,4})([0-9]{4})/;

  if (mobile.value === "") {
    error[7].innerHTML = "필수 정보입니다.";
    error[7].style.display = "block";
    signupBools["mobile"] = false;
  } else if (!isPhoneNum.test(mobile.value)) {
    error[7].innerHTML = "형식에 맞지 않는 번호입니다.";
    error[7].style.display = "block";
    signupBools["mobile"] = false;
  } else {
    error[7].style.display = "none";
    signupBools["mobile"] = true;
  }
  canSignup();
}
