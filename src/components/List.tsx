import React from "react";
import axios from "axios";
import { PlayerTable } from "./PlayerTable";
import { FormAddNewPlayers } from "./FormAddNewPlayers";

type Player = {
    id: number;
    name: string;
    score: number;
    team: string;
    updateAt: string;
};

type PlayerAPIResponse = {
    status: "ok";
    data: Player[];
};

type NewPlayer = {
    name: string;
    score: string;
    team: string;
};

export const List: React.FC<{}> = ({}) => {
    const [players, setPlayersTo] = React.useState<Player[]>(null);
    const [new_player, setNewPlayerTo] = React.useState<NewPlayer>(null);

    // Create an AbortController to cancel API requests:
    const controller = new AbortController();

    React.useEffect(() => {
        console.log("componentDidMount");
        axios
            .get<PlayerAPIResponse>("/players", { signal: controller.signal })
            .then((response) => {
                setPlayersTo(response.data.data);
            })
            .catch((err) => {
                if (err.name == "CanceledError") {
                    // Canceled API request: do nothing
                } else {
                    throw err;
                }
            });
    }, []);

    const componentWillUnmount = () => {
        controller.abort();
    };

    const handleChange = (event) => {
        setNewPlayerTo({
            ...new_player,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { name, team, score } = new_player;
        axios.post("/players", { name, team, score }).then(() => {
            axios.get("/players").then((response) => {
                setPlayersTo(response.data.data);
            });
        });
    };

    const handleDelete = (id) => {
        axios.delete(`/players/${id}`).then(() => {
            axios.get("/players").then((response) => {
                setPlayersTo(response.data.data);
            });
        });
    };

    console.log({ players });

    return (
        <>
            <PlayerTable players={players} handleDelete={handleDelete} />
            <br />
            <FormAddNewPlayers
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default List;
