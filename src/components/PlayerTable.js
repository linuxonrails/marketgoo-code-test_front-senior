import React from "react";
import { Button, Table, TableRow, TableCell } from "@marketgoo/ola";

export const PlayerTable = (props) => (
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
            {props.players !== null &&
                props.players.map((x) => (
                    <TableRow key={x.id} data-testid="player">
                        <TableCell>{x.name}</TableCell>
                        <TableCell>{x.team}</TableCell>
                        <TableCell variant="numeric">{x.score}</TableCell>
                        <TableCell>
                            <Button
                                size="small"
                                variant="destructive"
                                onClick={() => props.handleDelete(x.id)}
                            >
                                Remove
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
        </tbody>
    </Table>
);

export default PlayerTable;
