(async () => {
    
    await nestedCall()
})();

async function nestedCall(){

    document.querySelector(".list-group").innerHTML = ''
    
    let heading = document.createElement("h4")
    heading.textContent = "Book's Reviews"
    document.querySelector(".list-group").appendChild(heading)

    //<h4 id="bookHeading">Book's Reviews</h4>

    let bookName = localStorage.getItem("BookName");

    await axios.get('https://find-a-book-api.herokuapp.com/bookByName?bookName=' + bookName).then((data) => {
        // console.log(data.data);
        addResultantData(data.data);
        addReviewsLists(data.data["allReviews"]);
    })
}

function addResultantData(resObject){
    console.log(resObject);

    document.querySelector("#imageBook").src = resObject["ImageUrl"]
    document.querySelector("#bookHeading").textContent = resObject["BookName"]
    document.querySelector("#bookDetails").textContent = resObject["Synopsis"]
    document.querySelector("#goodReadsRating").textContent = "GoodReads Rating " + resObject["GoodReadRating"]
}

/*
{
    {
    "BookName": "IT",
    "AuthorName": "Stephen King",
    "GoodReadRating": "4.2",
    "Synopsis": "The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey. \"\"It\"\" primarily appears in the form of Pennywise the Dancing Clown to attract its preferred prey of young children.",
    "ImageUrl": "https://firebasestorage.googleapis.com/v0/b/findabook-a8541.appspot.com/o/stephen_king.jpg?alt=media&token=54edf31b-626f-4c7f-a96d-75a037a0d772",
    "averageStar": "4.5",
    "allReviews": [
        {
            "BookName": "IT",
            "ReviewAddedBy": "abhishek",
            "ReviewText": "non",
            "ReviewStar": 5
        },
        {
            "BookName": "IT",
            "ReviewAddedBy": "temp",
            "ReviewText": "temp",
            "ReviewStar": 5
        },
        {
            "BookName": "IT",
            "ReviewAddedBy": "Abhishek Mishra",
            "ReviewText": "Test Add",
            "ReviewStar": 4
        },
        {
            "BookName": "IT",
            "ReviewAddedBy": "Abhishek Mishra",
            "ReviewText": "Test Add",
            "ReviewStar": 4
        }
    ]
}
}
*/

function addReviewsLists(reviewsObjectList){
    if(reviewsObjectList.length == 0){
        // no reviews found return
        return;
    }
    for(let object = 0; object < reviewsObjectList.length; object++){
        addEachReivewElement(reviewsObjectList[object])
    }
}

function addEachReivewElement(reviewObject){
    
    console.log(reviewObject);
    
    let addTo = document.querySelector(".list-group")

    let mainDiv = document.createElement("div")
    mainDiv.classList.add("list-group-item")
    mainDiv.classList.add("list-group-item-action")
    
    let innerDiv = document.createElement("div")
    innerDiv.classList.add("d-flex")
    innerDiv.classList.add("w-100")
    innerDiv.classList.add("justify-content-between")

    let h5 = document.createElement("h5")
    h5.classList.add("mb-1")
    h5.textContent = reviewObject["ReviewAddedBy"]

    let ratingStars = document.createElement("small")
    ratingStars.classList.add("text-muted")
    ratingStars.textContent = reviewObject["ReviewStar"]

    let reviewText = document.createElement("p")
    reviewText.classList.add("mb-1")
    reviewText.textContent = reviewObject["ReviewText"]

    innerDiv.appendChild(h5)
    innerDiv.appendChild(ratingStars)
    mainDiv.appendChild(innerDiv)
    mainDiv.appendChild(reviewText)

    addTo.appendChild(mainDiv)
}