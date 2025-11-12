const nextImagesSetup = document.getElementById("nextImagesSetup");
const returnImagesSetup = document.getElementById("backImagesSetup");
const nextHobbiesSetup = document.getElementById("nextHobbiesSetup");
const returnSetup = document.getElementById("backSetup");
const addImages = document.getElementById("addImages");
const addHobbies = document.getElementById("addHobbies");
const setUpProfileForm = document.getElementById("setUpProfileForm");
const setUpBasicInfo = document.getElementById("setUpBasicInfo");

nextImagesSetup.onclick = switchSetUp;
nextHobbiesSetup.onclick = nextToHobbiesSetup;
returnImagesSetup.onclick = returnToSetupImages;
returnSetup.onclick = returnToBasicInfo;

function switchSetUp() {
  if (checkMissingData()) {
    setUpProfileForm.classList.add("SlideAndFadeM2L");
    setTimeout(() => {
      setUpBasicInfo.classList.add("hidden");
      setUpProfileForm.classList.remove("SlideAndFadeM2L");
      setUpProfileForm.classList.add("SlideAndAppearR2M");
    }, 490);
    setTimeout(() => {
      setUpProfileForm.classList.remove("SlideAndAppearR2M");
      addImages.classList.remove("hidden");
    }, 980);
  }
}

function returnToSetupImages() {
  setUpProfileForm.classList.add("SlideAndFadeM2R");
  setTimeout(() => {
    addHobbies.classList.add("hidden");
    setUpProfileForm.classList.remove("SlideAndFadeM2R");
    setUpProfileForm.classList.add("SlideAndAppearL2M");
  }, 490);
  setTimeout(() => {
    addImages.classList.remove("hidden");
    setUpProfileForm.classList.remove("SlideAndAppearL2M");
  }, 980);
}

function returnToBasicInfo() {
  setUpProfileForm.classList.add("SlideAndFadeM2R");
  setTimeout(() => {
    addImages.classList.add("hidden");
    setUpProfileForm.classList.remove("SlideAndFadeM2R");
    setUpProfileForm.classList.add("SlideAndAppearL2M");
  }, 490);
  setTimeout(() => {
    setUpBasicInfo.classList.remove("hidden");
    setUpProfileForm.classList.remove("SlideAndAppearL2M");
  }, 980);
}

function nextToHobbiesSetup() {
  if (checkMissingData()) {
    setUpProfileForm.classList.add("SlideAndFadeM2L");
    setTimeout(() => {
      addImages.classList.add("hidden");
      setUpProfileForm.classList.remove("SlideAndFadeM2L");
      setUpProfileForm.classList.add("SlideAndAppearR2M");
    }, 490);
    setTimeout(() => {
      addHobbies.classList.remove("hidden");
      setUpProfileForm.classList.remove("SlideAndAppearR2M");
    }, 980);
  }
}

function checkMissingData() {
  const firstName = document.querySelector('[name="firstName"]').value.trim();
  const lastName = document.querySelector('[name="lastName"]').value.trim();
  const gender = document.querySelector('[name="gender"]').value;
  const bio = document.querySelector('[name="bio"]').value.trim();
  const location = document.querySelector('[name="location"]').value;
  const education = document.querySelector('[name="educationLevel"]').value;
  const age = parseInt(document.querySelector('[name="age"]').value);
  const avatar = document.querySelector('[name="avatar"]').value;

  if (!avatar) return alert("❌ Please upload your avatar image."), false;
  if (!firstName || !lastName) return alert("❌ Please enter your first and last name."), false;
  if (!gender || gender === "hehe") return alert("❌ Please select your gender."), false;
  if (bio.length < 10) return alert("❌ Your bio must have at least 10 characters."), false;
  if (bio.length > 200) return alert("❌ Your bio must not exceed 200 characters."), false;
  if (!location) return alert("❌ Please select your location."), false;
  if (!education) return alert("❌ Please select your education level."), false;
  if (isNaN(age) || age < 18 || age > 99) return alert("❌ Age must be between 18 and 99."), false;

  alert("✅ All information looks good! Proceeding to the next step...");
  return true;
}
