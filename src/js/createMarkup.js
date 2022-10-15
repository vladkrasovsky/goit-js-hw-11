export function createMarkup(photos) {
  if (!photos) return;

  return photos.reduce(
    (
      acc,
      { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    ) => {
      return (
        acc +
        /*html*/ `
      <div class="col-sm-6 col-lg-4 col-xl-3 photo-card">
        <img
          src="${webformatURL}"
          alt=""
          loading="lazy"
          height="300"
        />
        <div class="info">
          <p class="info-item" title="Likes">
            <!-- <b>Likes</b> -->
            <svg width="14" height="14">
              <use href="./images/icons.svg#heart" />
            </svg>
            ${likes}
          </p>
          <p class="info-item" title="Views">
            <!-- <b>Views</b> -->
            <svg width="14" height="14">
              <use href="./images/icons.svg#eye" />
            </svg>
            ${views}
          </p>
          <p class="info-item" title="Comments">
            <!-- <b>Comments</b> -->
            <svg width="14" height="14">
              <use href="./images/icons.svg#bubbles" />
            </svg>
            ${comments}
          </p>
          <p class="info-item" title="Downloads">
            <!-- <b>Downloads</b> -->
            <svg width="14" height="14">
              <use href="./images/icons.svg#box-add" />
            </svg>
            ${downloads}
          </p>
        </div>
      </div>`
      );
    },
    ''
  );
}
