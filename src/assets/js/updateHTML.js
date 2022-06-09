//Updates the HTML for the video searchers
const updateHTML = (data) => {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<div class="videoCardSearched" id=${data[i].id}>
                        <div class="videoCardSearched__image">
                            <img src="${data[i].thumbnail}">
                        </div>
                        <div class="videoCardSearched__VideoInfo">
                            <h3>${data[i].title}</h3>
                            <div>
                                <ul>
                                    <li>${data[i].channelTitle}</li>
                                    <li>${data[i].publishedWeeksAgo()}</li>
                                </ul>
                            </div>
                            <p>${data[i].description}</p>
                        </div>
                    </div>
                 `;
  }

  return html;
};

export default updateHTML;
