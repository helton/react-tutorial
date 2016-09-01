class CommentBox extends React.Component {
    constructor (props) {
        super(props);
        this.state = { data: [] };
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    loadCommentsFromServer() {
        $.ajax({
            url: this.props.getAllCommentsUrl,
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({data: data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.getAllCommentsUrl, status, err.toString());
            }
        });
    }

    handleCommentSubmit(comment) {
        $.ajax({
            url: this.props.addCommentUrl,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: (data) => {
                this.setState({data: data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.addCommentUrl, status, err.toString());
            }
        });
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
}

class CommentList extends React.Component {
    render() {
        let commentNodes = this.props.data.map(comment => {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            )            
        })
        return (            
            <div className="commentList">
                {commentNodes}
            </div>
        )        
    }
}

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {author: '', text: ''};
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAuthorChange(event) {
        this.setState({author: event.target.value});
    }

    handleTextChange(event) {
        this.setState({text: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let author = this.state.author.trim();
        let text = this.state.text.trim();
        if (!author || !text) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Your name" 
                    value={this.state.author} 
                    onChange={this.handleAuthorChange}/>
                <br />
                <input type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange}/>
                <input type="submit" value="Post" />
            </form>
        )        
    }
}

class Comment extends React.Component {
    rawMarkup() {
        let md = new Remarkable();
        let rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    }

    render() {        
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        )
    }
}

ReactDOM.render(
    <CommentBox getAllCommentsUrl="/api/comments/get-all" addCommentUrl="/api/comments/add" pollInterval={10000}/>,
    document.getElementById("content")
);