export default function addCitiesDataToFields(data) {
  function getHTMLTemplate(value, label) {
    return `<option value="${value}">${label}</option>`;
  }

  let htmlString = '';

  for (let value in data) {
    const label = data[value];

    htmlString += getHTMLTemplate(value, label);
  }
  
  $('.cities-searchfield').html(htmlString);
}
