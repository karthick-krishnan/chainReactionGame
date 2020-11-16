

class SearchComponent extends React.Component {

    constructor() {
        super();
    }
    search() {
        //filter these values

        this.setState();
    }


    render() {
        return (
            <input onChange={(e) => { this.search.bind(e) }} />
        );

    }

    mapStateToProps = () => {
        apiData: this.props.apiData
    }
}



class App extends React.Component {

    componentDidMount() {
        //dispatch acton async call
    }
    render() {
        return (
            <SearchComponent />
        )
    }

}