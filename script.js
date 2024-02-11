const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('Author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// show loading
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//hide loading
function complete(){
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//show new quotes
function newQuote(){
   loading();
    //Pick a random quote from apiQuotes arry
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  
  //check if Auther field is blank and replace it with 'Unkown'    
  if(!quote.author){
    authorText.textContent = 'Unknown'
  }else{
    authorText.textContent = quote.author;
  }

  //check Quote lenght to determine stying
  if(quote.text.length > 120){
    quoteText.classList.add('long-quote');
  }else{
    quoteText.classList.remove('long-quote');
  }

  // Set Quote, the hide loader
    quoteText.textContent = quote.text;
    complete();
}


// Get Quotes From API
async function getQuotes(){
    loading();
    const apiUrl ='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
       const response = await fetch(apiUrl);
       apiQuotes = await response.json();
       newQuote();
    }catch(error){
     //Catch Error Here
        
    }
}

//Tweet Quotes
 function tweetQuote(){
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - 
                ${authorText.textContent}`;
   window.open(twitterUrl, '_blank');
  }

  // Event Listeners
  newQuoteBtn.addEventListener('click', newQuote);
  twitterBtn.addEventListener('click', tweetQuote);

//On Load 
 getQuotes();

