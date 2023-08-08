// Function to scrape the data from the web page
function scrapeData() {
  const businessDivs = Array.from(document.querySelectorAll('div.resultbox_textbox'));

  if (businessDivs.length === 0) {
    return null;
  }

  const data = businessDivs.map((div) => {
    const businessNameTag = div.querySelector('a');
    const businessName = businessNameTag ? businessNameTag.textContent.trim() : 'N/A';

    const ratingsDiv = div.querySelector('div.resultbox_overall.mt-4');
    const ratings = ratingsDiv ? ratingsDiv.querySelector('div').textContent.trim() : 'N/A';

    const noOfRatingsDiv = div.querySelector('div.resultbox_overall.mt-4');
    const noOfRatings = noOfRatingsDiv && noOfRatingsDiv.querySelectorAll('div').length >= 3
      ? noOfRatingsDiv.querySelectorAll('div')[2].textContent.trim() : 'N/A';

    const locationDiv = div.querySelector('div.resultbox_address.mt-6');
    const location = locationDiv ? locationDiv.textContent.trim() : 'N/A';

    const yearsInBusinessDiv = div.querySelector('div.resultbox_activity');
    const yearsInBusiness = yearsInBusinessDiv && yearsInBusinessDiv.querySelectorAll('div').length >= 3
      ? yearsInBusinessDiv.querySelectorAll('div')[2].textContent.trim() : 'N/A';

    return {
      'Business Name': businessName,
      'Ratings': ratings,
      'No of Ratings': noOfRatings,
      'Location': location,
      'Years in Business': yearsInBusiness,
    };
  });

  return data;
}

// Send the scraped data to the popup script
chrome.runtime.sendMessage({ data: scrapeData() });
