import { rest } from 'msw'
import { BALLDONTLIE_API__PLAYERS_ENDPOINT } from '../constants'

export const handlers = [
  rest.get(BALLDONTLIE_API__PLAYERS_ENDPOINT, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          { id: 1, first_name: 'Michael', last_name: 'Jordan' },
          { id: 2, first_name: 'Michael', last_name: 'Jackson' },
          { id: 3, first_name: 'Michel', last_name: 'Patoulatchi' },
        ]
      })
    )
  }),
]