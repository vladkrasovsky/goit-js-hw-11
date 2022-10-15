export function createMarkup(photos) {
  if (!photos) return;

  return photos.reduce((acc, photo) => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = photo;

    return (
      acc +
      `<a href="${largeImageURL}" class="col-sm-6 col-lg-4 col-xl-3 photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" height="300" />
        <div class="info">
          <p class="info-item" title="Likes"><b>Likes</b>${likes}</p>
          <p class="info-item" title="Views"><b>Views</b>${views}</p>
          <p class="info-item" title="Comments"><b>Comments</b>${comments}</p>
          <p class="info-item" title="Downloads"><b>Downloads</b>${downloads}</p>
        </div>
      </a>`
    );
  }, '');
}
