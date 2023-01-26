This is a refactor exercise and his goal is to overall improve the proposed app. It shows a list of players with data about their team and their league score and we want you to propose solutions and implement them in order to improve the architecture, testability and UX. It's intentionally crappy so you can shine bright :)

## Requirements

There are some mandatory constraints you have to attend:

- Update the management of the state using REDUX and use a library for the management of the requests (like redux thunk or sagas)
- Use our component library Ola to build the interface [https://github.com/marketgoo/Ola](https://github.com/marketgoo/Ola)
- Improve how the user interacts with the form in the way you like. Feel free to add improvements.
- Add a testing library of your choice and use it to test what you think it's relevant.

## Notes

- The app contains an api that allows you to get the players, add new ones and delete them.
- The score of every player is updated every 5 seconds.
- A socket channel emits a message with the players and their updated scores.
- Any request to the api will always take an average of 2 seconds to respond.
- You can install any extra library that is needed without making api changes. (ex: Postcss libraries or for testing)

## Install

- Donwload repository
- ~~npm i ( node v12 required )~~

- `curl https://get.volta.sh | bash`

    > Install Volta from https://volta.sh/ <br />
    > Don't worry about the required node version in this project. Volta select the required version automatically.

    > **Advantage:** Every developer will uses the same required version of node in this project without changes.
    > In others proyects Volta will use other versions of node if it is required.
    >
    > Previously... we had forced the node version in the project with:
    >
    > ```bash
    > $ volta pin node@12
    > success: pinned node@12.22.12 (with npm@6.14.16) in package.json
    > ```

- `npm ci`

    > Use `npm ci` not `npm i` when its possible.
    >
    > **Advantage:** New minor updates may break the app :-/ Use `ci` instead of `i`. All updates should be controlled & revised by the team.
    > New minor updates may break the app! :-/

## Run app locally

- webpack -p
- npm start
- go to localhost:3000

## API REST

- **GET /players** return all players saved

```json
{
    "status": "ok",
    "data": [
        {
            "id":1,
            "name":"Peter",
            "team":"Pandas",
            "score":5,
            "createdAt":"2020-05-28 11:32:54.506 +00:00",
            "updatedAt":"2020-05-28 11:32:54.506 +00:00"
        },
        {
            "id":2,
            "name":"Jhon",
            "team":"Cobrakay",
            "score":8,
            "createdAt":"2020-05-28 11:32:54.507 +00:00",
            "updatedAt":"2020-05-28 11:32:54.507 +00:00"
        }
    ]
}
```

- **POST /players** Save player data and return player saved

```json
{
    "status": "ok",
    "data": {
        "name": "saved-name",
        "team": "saved-team",
        "score": "saved-score"
    }
}
```

- **DELETE /players/{id}** Delete a player.

```json
{
    "status": "ok"
}
```

