(async () => {
  await axios
    .get("https://find-a-book-api.herokuapp.com/allBooks")
    .then((data) => {
      // console.log(data.data);
      addResultantData(data.data);
    });
  attachOnClick();
})();

const firebaseConfig = {
  apiKey: "AIzaSyBKTGT04A0xtXhjF0zhc7dcnJqdRehuGB8",
  authDomain: "findabook-a8541.firebaseapp.com",
  projectId: "findabook-a8541",
  storageBucket: "findabook-a8541.appspot.com",
  messagingSenderId: "820743582947",
  appId: "1:820743582947:web:5b4ae39a918588b33801d6",
};

var app = firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
  firebase
    .auth()

    .signInWithPopup(provider)
    .then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;

      var userName = user.displayName;

      localStorage.setItem("UserName", userName);
      document.querySelector("#login").textContent = "Hi " + userName;
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
    });
}

function googleSignout() {
  firebase
    .auth()
    .signOut()

    .then(
      function () {
        console.log("Signout Succesfull");
      },
      function (error) {
        console.log("Signout Failed");
      }
    );
}

function attachOnClick() {
  let item = localStorage.getItem("UserName");
  if (item == null || item == "") {
    document.querySelector("#login").textContent = "Login";

    document
      .querySelector("#login")
      .addEventListener("click", function login() {
        googleSignin();
      });
  } else {
    document.querySelector("#login").textContent = "Hi " + item;
  }
}

var bookObject = "";

function addResultantData(resObject) {
  for (let i = 0; i < resObject.length; i++) {
    addItemsToPage(resObject[i]);
  }
}

function addItemsToPage(resObject) {
  let addedTo = document.querySelector("#list");

  const ele = document.createElement("a");
  ele.classList.add("aTag");
  ele.classList.add("col");

  const innerCard = document.createElement("div");
  innerCard.classList.add("card");
  innerCard.classList.add("h-100");

  const img = document.createElement("img");
  img.src = resObject["ImageUrl"];
  img.classList.add("card-img-top");

  const innerDiv = document.createElement("div");
  innerDiv.classList.add("card-body");

  const innerH5 = document.createElement("h5");
  innerH5.classList.add("card-title");
  innerH5.textContent = resObject["BookName"];

  innerDiv.appendChild(innerH5);
  innerCard.appendChild(img);
  innerCard.appendChild(innerDiv);
  ele.appendChild(innerCard);
  ele.href = "./pageDetail.html";
  ele.addEventListener("click", async function () {
    await localStorage.setItem("BookName", resObject["BookName"]);
  });
  addedTo.appendChild(ele);
}
