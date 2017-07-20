
let searchResults;
let nextGridItem;
let nextGridContentDiv;
let nextItemContentDiv;
let nextItemIngredientsDiv;
let nextItemThumbnail;
let nextItemHeading;
let ingredientArr = [];
let ingredientItem;
let headingDiv;
let thumbnailDiv;
let itemLink;
let itemLinkDiv;
let searchString;

document.querySelector("#searchBox").onkeydown = function(e){
   if(e.keyCode == 13){
     document.querySelector("#gridList").innerHTML = ""
     searchString = document.querySelector("#searchBox").value
     fetch("http://www.recipepuppy.com/api/?q=" + searchString).then(
       function(response) {
         response.json().then((data) => {
           searchResults = data['results']
           displayResults(searchResults)
         })


       },
       function(error) {
         console.log(error)
       }
     );

     function displayResults(searchResults) {
       let display = document.querySelector("#searchResults")

       let nextItem;
       console.log(searchResults)
       Object.keys(searchResults).forEach((key) => {
         console.log(searchResults[key].title)

         // needed for structure of gridList
         nextGridItem = document.createElement("li");
         nextGridContentDiv = document.createElement("div");

         // the cards each recipe item is inside of
         nextItemContentDiv = document.createElement("div");
         nextItemContentDiv.classList.add("itemContent")

         // flexbox to contain list of ingredients
         nextItemIngredientsDiv = document.createElement("div");


         // flex to contain recipe name
         headingDiv = document.createElement("div")
         headingDiv.classList.add("headingDiv")

         // recipe name
         nextItemHeading = document.createElement("h4")
         nextItemHeading.appendChild( document.createTextNode(searchResults[key].title) )
         nextItemHeading.classList.add("itemHeading")
         headingDiv.appendChild(nextItemHeading)
         nextItemContentDiv.appendChild(headingDiv)

         if(searchResults[key].thumbnail) {
           thumbnailDiv = document.createElement("div")
           thumbnailDiv.classList.add("thumbnailDiv")

           nextItemThumbnail = document.createElement("img");
           nextItemThumbnail.classList.add("itemThumbnail")
           nextItemThumbnail.src = searchResults[key].thumbnail
           thumbnailDiv.appendChild(nextItemThumbnail)
           nextItemContentDiv.appendChild(thumbnailDiv)

         } else {
           thumbnailDiv = document.createElement("div")
           thumbnailDiv.classList.add("thumbnailDiv")

           nextItemThumbnail = document.createElement("div");
           nextItemThumbnail.style.backgroundColor = "#CCCCCC";
           nextItemThumbnail.style.width = "107px";
           nextItemThumbnail.style.height = "80px";
           thumbnailDiv.appendChild(nextItemThumbnail)
           nextItemContentDiv.appendChild(thumbnailDiv)
         }


         ingredientArr = searchResults[key].ingredients.split(", ")

         ingredientArr.forEach((nextIngredient) => {
           ingredientItem = document.createElement("span")
           ingredientItem.appendChild(document.createTextNode(nextIngredient))
           ingredientItem.classList.add("ingredientSpan")
           nextItemIngredientsDiv.appendChild(ingredientItem)

         })

         itemLinkDiv = document.createElement("div")
         itemLinkDiv.classList.add("itemLinkDiv")
         itemLink =  document.createElement("a")
         //itemLink.classList.add("itemLink")
         itemLink.href = searchResults[key].href
         itemLink.innerText = "Recipe"

         //nextItemIngredientsDiv.appendChild( document.createTextNode(searchResults[key].href) )
         nextItemIngredientsDiv.classList.add("itemIngredients")
         nextItemContentDiv.appendChild(nextItemIngredientsDiv)
         nextGridContentDiv.appendChild(nextItemContentDiv)

         itemLinkDiv.appendChild(itemLink)
         nextGridContentDiv.appendChild(itemLinkDiv)

         nextGridItem.appendChild(nextGridContentDiv);
         document.getElementById("gridList").appendChild(nextGridItem);


       })


     }

   }
};
