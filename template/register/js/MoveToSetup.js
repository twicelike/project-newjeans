const next = document.getElementById("submitSignUpButton");
next.onclick = moveToSetup;
function moveToSetup(){
  // const email = document.querySelector('input[type="email"]').value;
  // const password = document.querySelector('input[type="password"]').value;
  

  // const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  // if(!emailPattern.test(email)){
  //   alert("email khong hop le");
  //   return;
  // }
  
  // if (password.length < 7) {
  //   alert('Mật khẩu phải có ít nhất 7 ký tự');
  //   return;
  // }

  // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;
  // if (!passwordPattern.test(password)) {
  //   alert('Mật khẩu phải có ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường và 1 chữ số');
  //   return;
  // }

  // alert('Đăng ký thành công!');
  window.location.href = "./SetUpProfile.html";
}