const nextImagesSetup = document.getElementById("nextImagesSetup");
const returnImagesSetup =document.getElementById("backImagesSetup");
const nextHobbiesSetup = document.getElementById("nextHobbiesSetup");
const returnSetup = document.getElementById("backSetup");
const addImages = document.getElementById("addImages");
const addHobbies = document.getElementById("addHobbies");
const setUpProfileForm = document.getElementById("setUpProfileForm");
const setUpBasicInfo = document.getElementById("setUpBasicInfo");

nextImagesSetup.onclick = switchSetUp;
function switchSetUp() {
  setUpProfileForm.classList.add("SlideAndFadeM2L");
  // console.logerror("asd");
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

returnImagesSetup.onclick = returnToSetupImages;
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

returnSetup.onclick = returnToBasicInfo;
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

nextHobbiesSetup.onclick = nextToHobbiesSetup;
function nextToHobbiesSetup() {
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