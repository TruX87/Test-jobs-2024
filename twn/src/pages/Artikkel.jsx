import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../css/Artikkel.css";

function Artikkel() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const defaultId = "972d2b8a";
  const url = `https://midaiganes.irw.ee/api/list/${id || defaultId}`;

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setArticle(data || {});
      })
      .catch(err => {
        setError(err.message);
      });
  }, [url]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className='artikkel'>
      <h1>{article.title}</h1>
      <div
        className="intro"
        dangerouslySetInnerHTML={{ __html: article.intro }}
      />
      {article.image && (
        <img
          className="artikkel_image"
          src={article.image.large}
          alt={article.image.alt}
          title={article.image.title}
        />
      )}
      <div
        className="body"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
      <div className="tags">
        {article.tags?.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      {/* {article.image && (
        <img
          src={article.image.medium}
          alt={article.image.alt}
          title={article.image.title}
        />
      )}
      <div>{article.title}</div> */}
    </div>
  );
}

export default Artikkel