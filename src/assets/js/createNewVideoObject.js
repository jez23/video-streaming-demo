import globalObject from "./globalObject.js";

function createNewVideoObject(data, array) {
  if (data.hasOwnProperty("items") && array === globalObject.videoTrending) {
    for (let i = 0; i < data.items.length; i++) {
      array[i] = new Video(
        data.items[i].id,
        data.items[i].snippet.title,
        data.items[i].snippet.description,
        data.items[i].snippet.thumbnails.medium.url,
        data.items[i].snippet.channelTitle,
        data.items[i].snippet.publishedAt
      );
    }
  } else if (
    data.hasOwnProperty("items") &&
    array === globalObject.videoSearchResult
  ) {
    for (let i = 0; i < data.items.length; i++) {
      array[i] = new Video(
        data.items[i].id.videoId,
        data.items[i].snippet.title,
        data.items[i].snippet.description,
        data.items[i].snippet.thumbnails.medium.url,
        data.items[i].snippet.channelTitle,
        data.items[i].snippet.publishedAt
      );
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      array[i] = new Video(
        data[i].id,
        data[i].title,
        data[i].description,
        data[i].thumbnail,
        data[i].channelTitle,
        data[i].publishedAt
      );
    }
  }
  return array;
}

//Makes new objects for all the JSON videos
class Video {
  constructor(id, title, description, thumbnail, channelTitle, publishedAt) {
    (this.id = id),
      (this.title = title),
      (this.description = description),
      (this.thumbnail = thumbnail),
      (this.channelTitle = channelTitle),
      (this.publishedAt = new Date(publishedAt));
  }
  publishedWeeksAgo() {
    const publishedYear = this.publishedAt.getFullYear();
    const publishedMonth = this.publishedAt.getMonth();
    const publishedDay = this.publishedAt.getDay();
    const publishedHour = this.publishedAt.getHours();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDay();
    const currentHour = new Date().getHours();
    if (publishedDay === currentDay)
      return `${currentHour - publishedHour} hours ago`;
    if (currentMonth === publishedMonth)
      return `${currentDay - publishedDay} days ago`;
    if (publishedYear === currentYear)
      return `${currentMonth - publishedMonth} months ago`;
    return `${currentYear - publishedYear} years ago`;
  }
}

export default createNewVideoObject;
