import React from "react";
import axios from "axios";
import {
    Button,
    ButtonGroup,
    Input,
    Table,
    TableRow,
    TableCell,
} from "@marketgoo/ola";

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
                <Table responsive>
                    <thead>
                        <TableRow>
                            <TableCell header>Player</TableCell>
                            <TableCell header>Team</TableCell>
                            <TableCell header variant="numeric">
                                Score
                            </TableCell>
                            <TableCell header>Actions</TableCell>
                        </TableRow>
                    </thead>
                    <tbody data-testid="players">
                        {players &&
                            players.data.map((x) => (
                                <TableRow key={x.id} data-testid="player">
                                    <TableCell>{x.name}</TableCell>
                                    <TableCell>{x.team}</TableCell>
                                    <TableCell variant="numeric">
                                        {x.score}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="destructive"
                                            onClick={() =>
                                                this.handleDelete(x.id)
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </tbody>
                </Table>
                <br />
                <form onSubmit={this.handleSubmit} className="ola_ly-form">
                    <h4 className="ola_panel-display">Add new players</h4>
                    <div className="ola-field">
                        <label htmlFor="name" className="ola_field-label">
                            Player name
                        </label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="player name"
                            onChange={this.handleChange}
                        ></Input>
                    </div>
                    <div className="ola-field">
                        <label htmlFor="team" className="ola_field-label">
                            Team name
                        </label>
                        <Input
                            id="team"
                            name="team"
                            placeholder="team name"
                            onChange={this.handleChange}
                        ></Input>
                    </div>
                    <div className="ola-field">
                        <label htmlFor="score" className="ola_field-label">
                            Team score
                        </label>
                        <Input
                            id="score"
                            name="score"
                            placeholder="team score"
                            onChange={this.handleChange}
                        ></Input>
                    </div>
                    <div>
                        <ButtonGroup>
                            <Button variant="primary">Add</Button>
                        </ButtonGroup>
                    </div>
                </form>
            </>
        );
    }
}

export default List;
