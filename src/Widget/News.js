import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

class News extends Component {

    constructor(props) {
        super(props);
        this.state = { articles : [], ids: [], };
    }


    componentDidMount() {
        this.loadData();
        this.dataTimer = setInterval(()=> {
            this.loadData();
        },360000);
    }

    componentWillMount() {
        clearInterval(this.timer);
        clearInterval(this.dataTimer);
    }
    loadData(){
        const { articles, ids } = this.state;
        const { refreshInterval } = this.props;
        const { ApiKey, Category, Background, CardBorder } = this.props;


        fetch('https://newsapi.org/v2/top-headlines?country=fr&category='+Category+'&apiKey='+ApiKey)
            .then(resp => resp.json())
            .then(data => {
                const articles = {};
                let ids = [];

                data.articles.map(article => {
                    articles[article.url] = article;
                    ids = [ ...ids, article.url ];
                })

                this.setState({
                    articles,
                    ids,
                    currentArticle: data.articles[0].url
                })

                const nbArticles = ids.length;
                let count = 1;

                this.timer = setInterval(() => {
                    this.props.animate().then(() => {
                        this.setState({
                            currentArticle: ids[count]
                        })
                        count = count === nbArticles - 1 ? 0 : count + 1;
                    });
                }, refreshInterval || this.props.Interval);
            })
    }
    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {

        const { articles, ids, currentArticle } = this.state;

        if (ids.length <= 0) return <p>Chargement...</p>

        let publishedAt = null;
        if (articles[currentArticle].publishedAt) {
            publishedAt = new Date(articles[currentArticle].publishedAt);
            publishedAt = publishedAt.getDate() + "/" + (publishedAt.getMonth() + 1) + "/" + publishedAt.getFullYear();
        }
        const { ApiKey, Category } = this.props;
        // const img = if(articles[currentArticle].urlToImage){
        //     return <img className={"Img"} src={articles[currentArticle].urlToImage} alt={articles[currentArticle].title}/>
        // }else{
        //     return <img className={"Img"} src="logo-Digital-CAMPUS.png" alt={articles[currentArticle].title}/>
        // };
        return (
            <React.Fragment>
                <div className={"MyWidget"}>
                    <h2 style={{backgroundColor: this.props.Background}} className="text-center">Keloù {this.Capitalize(Category)}</h2>
                    <div style={{border: this.props.CardBorder}} className="card">
                        <img className="Img" src={articles[currentArticle].urlToImage} onError={(e)=>{e.target.onerror = null; e.target.src="logo-Digital-CAMPUS.png"}}/>
                            <div className="card-body">
                                <h5 className="card_title">{ articles[currentArticle].title }</h5>
                                {/*<p className="card-text">{ articles[currentArticle].description }</p>*/}
                                <div className="Date"><h6 className={""}>{ articles[currentArticle].source.name } - { publishedAt ? publishedAt : null }</h6></div>
                            </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default News;