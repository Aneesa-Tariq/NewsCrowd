import React  from "react";

  const NewsItem=(props)=> {
    let { title, description, imageUrl, newsUrl, author, date, source } =
     props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}...{" "}
              <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                {source.name}
                <span className="visually-hidden">unread messages</span>
              </span>
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown Author"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark btn-sm"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
