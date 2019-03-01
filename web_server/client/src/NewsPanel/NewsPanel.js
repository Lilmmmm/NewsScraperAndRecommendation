import './NewsPanel.css';

import React from 'react';

import NewsCard from '../NewsCard/NewsCard'

class NewsPanel extends React.Component {
  constructor() {
    super();
    this.state = { news: null};
  }

  componentDidMount() {
    this.loadMoreNews();
  }

  loadMoreNews(e) {
    this.setState({
      news: [
            {'url': 'http://us.cnn.com/2017/02/15/politics/andrew-puzder-failed-nomination/index.html',
             'title': "Inside Andrew Puzder's failed nomination",
             'description': "In the end, Andrew Puzder had too much baggage",
             'source': 'cnn',
             'urlToImage': 'https://assets.dmagstatic.com/wp-content/uploads/2019/01/iStock-871070868-1024x683.jpg',
             'digest': "3RjuEmoJo2601syZbU70HA==\n",
             'reason': "Recommend"
            }
            ]
    });
  }

  renderNews() {
    var news_list = this.state.news.map(function(news) {
      return (
        <a className='list-group-item' key={news.digest} href="#">
          <NewsCard news={news} />
        </a>
      );
    });

    return (
      <div className="container-floid">
        <div className='list-group'>
          {news_list}
        </div>
      </div>
    );
  }

  render() {
    if (this.state.news) {
      return (
        <div>
          {this.renderNews()}
        </div>
      );
    } else {
      return (
        <div>
          <div id='msg-app-loading'>
            Loading
          </div>
        </div>
      );
    }
  }
}

export default NewsPanel;
