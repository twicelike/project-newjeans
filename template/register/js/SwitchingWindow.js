const nextSetup = document.getElementById("nextSetup");
const returnSetup = document.getElementById("backSetup");
const addImages = document.getElementById("addImages");
const setUpProfileForm = document.getElementById("setUpProfileForm");
const setUpBasicInfo = document.getElementById("setUpBasicInfo");

nextSetup.onclick = switchSetUp;
function switchSetUp() {
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