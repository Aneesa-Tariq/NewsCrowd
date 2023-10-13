import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${
      props.category
    }&apiKey=295f2a36ef024a31ab66d8b998b8bd16 &page=${page}&pageSize=${
      props.pageSize
    }`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `${props.category} - NewsCrowd`;
    updateNews();
   // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${
      props.category
    }&apiKey=295f2a36ef024a31ab66d8b998b8bd16 &page=${page+1}&pageSize=${
      props.pageSize
    }`;
        setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  return (
    <div className="container" style={{margin:'100px'}}>
      <h1 className="text-center" >
        NewsCrowd - Top Headlines from {props.category}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row ">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://static.toiimg.com/thumb/imgsize-613935,msid-83989046,width-400,resizemode-4/83989046.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};
export default News;
News.defaultProps = { country: "in", pageSize: 8, category: "cricket" };
//News.PropTypes = {country: PropTypes.string,pageSize: PropTypes.number, category: PropTypes.string};
