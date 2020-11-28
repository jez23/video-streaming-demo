//Updates the HTML for the video searchers
const updateTrendingHTML = (data) => {

    let html = '';
    for(let i = 0; i < data.length; i++){
            html += `
                        <div class="videoCard__VideoInfo" id=${data[i].id}>
                            <div class="videoCard__VideoInfo__thumbnail">
                                <img src="${data[i].thumbnail}">
                            </div>
                            <div class="videoCard__VideoInfo__summary">
                                <div>
                                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                </div>
                                <div>
                                    <div>
                                        <p>${data[i].title}</p>
                                    </div>
                                    <div>
                                        <p>${data[i].channelTitle}</p>
                                    </div>
                                    <div>
                                        <p>${data[i].publishedWeeksAgo()}</p>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    `
    }
    
    return html;
    }

    export default updateTrendingHTML;