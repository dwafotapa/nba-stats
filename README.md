# NBA stats

NBA stats is an app built with React where you can search and list NBA players.

The search input autocompletes and a dropdown unfolds as you type a player name.

Clicking on a player name will add it to a card list where each card represents a player and his stats.

Clicking on a card's pin will pin it to the top of the list and clicking again will unpin it and restore the initial card order.

Finally, dark mode and pinned players will persist on page reload.

## Demo

https://dwafotapa.github.io/nba-stats/

## Installation

Download npm packages first:
```sh
yarn
```

Run the tests:
```sh
yarn test
```

Start the dev server:
```sh
yarn start
```

Then open [http://localhost:3000/](http://localhost:3000/) and start searching!

## Technologies

- React
- TypeScript
- Jest
- React Testing Library
- Mock Service Worker

## Credits

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).