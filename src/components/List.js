import React from "react";
import axios from "axios";
import { Button } from "@marketgoo/ola";

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
                <table>
                    <thead>
                        <tr>
                            <td>Player</td>
                            <td>Team</td>
                            <td>Score</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody data-testid="players">
                        {players &&
                            players.data.map((x) => (
                                <tr key={x.id} data-testid="player">
                                    <td>{x.name}</td>
                                    <td>{x.team}</td>
                                    <td>{x.score}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                this.handleDelete(x.id)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <h4>Add new players</h4>
                    <label htmlFor="name" style={{ display: "none" }}>
                        Player name
                    </label>
                    <input
                        id="name"
                        name="name"
                        placeholder="player name"
                        onChange={this.handleChange}
                    ></input>
                    <label htmlFor="team" style={{ display: "none" }}>
                        Team name
                    </label>
                    <input
                        id="team"
                        name="team"
                        placeholder="team name"
                        onChange={this.handleChange}
                    ></input>
                    <label htmlFor="score" style={{ display: "none" }}>
                        Team score
                    </label>
                    <input
                        id="score"
                        name="score"
                        placeholder="team score"
                        onChange={this.handleChange}
                    ></input>
                    <Button variant="primary">Add</Button>
                </form>
            </>
        );
    }
}

export default List;
