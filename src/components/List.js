import React from "react";
import axios from "axios";
import { PlayerTable } from "./PlayerTable";
import { FormAddNewPlayers } from "./FormAddNewPlayers";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            name: null,
            team: null,
            score: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        // Create an AbortController to cancel API requests:
        this.controller = new AbortController();
    }

    componentDidMount() {
        axios
            .get("/players", { signal: this.controller.signal })
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch((err) => {
                if (err.name == "CanceledError") {
                    // Canceled API request: do nothing
                } else {
                    throw err;
                }
            });
    }

    componentWillUnmount() {
        this.controller.abort();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, team, score } = this.state;
        axios.post("/players", { name, team, score }).then(() => {
            axios.get("/players").then((response) => {
                this.setState({ data: response.data });
            });
        });
    }

    handleDelete(id) {
        axios.delete(`/players/${id}`).then(() => {
            axios.get("/players").then((response) => {
                this.setState({ data: response.data });
            });
        });
    }

    render() {
        const players = this.state.data;

        return (
            <>
                <PlayerTable
                    players={players}
                    handleDelete={this.handleDelete}
                />
                <br />
                <FormAddNewPlayers
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </>
        );
    }
}

export default List;
