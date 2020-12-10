import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

class RandomQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.handleClick();
  }
  handleClick() {
    const Data =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
    fetch(Data)
      .then((res) => res.json())
      .then((data) => {
        let quoteArray = data.quotes;
        let randomIndex = Math.floor(Math.random() * data.quotes.length);
        let randomQuote = quoteArray[randomIndex];

        this.setState({
          quote: randomQuote.quote,
          author: randomQuote.author,
        });
      });
  }
  render() {
    return (
      <div id="wrapper-block">
        <div id="quote-box">
          <blockquote id="text">{this.state.quote}</blockquote>

          <p id="author">{this.state.author}</p>
          <button
            id="new-quote"
            className="btn btn-secondary"
            onClick={this.handleClick}
          >
            New Quote
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text="${this.state.quote}" - ${this.state.author}`}
            id="tweet-quote"
            className="btn btn-social-icon btn-twitter"
          >
            <i className="fa fa-twitter"></i>
          </a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<RandomQuote />, document.getElementById("root"));
