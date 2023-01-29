import React from "react";
import { Button, ButtonGroup, Input } from "@marketgoo/ola";

export const FormAddNewPlayers = (props) => (
    <form onSubmit={props.handleSubmit} className="ola_ly-form">
        <h4 className="ola_panel-display">Add new players</h4>
        <div className="ola-field">
            <label htmlFor="name" className="ola_field-label">
                Player name
            </label>
            <Input
                id="name"
                name="name"
                placeholder="player name"
                onChange={props.handleChange}
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
                onChange={props.handleChange}
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
                onChange={props.handleChange}
            ></Input>
        </div>
        <div>
            <ButtonGroup>
                <Button variant="primary">Add</Button>
            </ButtonGroup>
        </div>
    </form>
);
