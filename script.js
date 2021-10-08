//Creating a simple webpage and generating quotes from anime
//Input box will allow you to type the name of an anime and generate some quotes

const ANIME_QUOTES_URL = "https://animechan.vercel.app/api/quotes";

//Async/Await function with fetch that tells JS that the data will be retrieved to be rendered on the webpage,
//but that there is no guarantee that it will arrive, or set time in which it will arrive
const getQuotes = async (titleAnime) => {
  const response = await fetch(`${ANIME_QUOTES_URL}/anime?title=${titleAnime}`);
  const data = await response.json(); //2 steps to retrieving data from server
  console.log(data);
  return data;
};

//Add event listener for the button which will trigger the API and return anime quotes for the title that is input
const quoteButton = document.querySelector(".clickAnime");
quoteButton.addEventListener("click", async (e) => {
  //
  const inputAnime = document.querySelector("#inputAnime");
  const titleAnime = inputAnime.value; //Here the input value (anime title) typed by the user will be
  //appended to API URL in order to find quotes for that anime title
  if (titleAnime === "") {
    //If no user input, then alert
    alert("Please enter a valid anime title");
    return;
  } //Enter an anime title
  //inputAnime to return quotes for the right title
  //
  //get anime title with quotes
  const animeArr = await getQuotes(titleAnime);
  console.log("animeSeries");
  //Create li elements for each title
  const animeSearchItems = animeArr.map((anime) => {
    const animeElement = document.createElement("li");
    const animeText = `${anime.character} quote: ${[anime.quote]}`;
    const animeTextNode = document.createTextNode(animeText);

    animeElement.appendChild(animeTextNode);
    return animeElement;
  });

  //Attach the li elements to ul element in HTML file

  const animeSeries = document.querySelector("#animeSeries");
  const append = (parent) => (child) => parent.appendChild(child);
  animeSearchItems.forEach(append(animeSeries));
});
