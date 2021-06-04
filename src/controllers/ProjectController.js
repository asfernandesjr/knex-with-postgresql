const knex = require('../database')

module.exports = {
    async index(req, res, next) {
        try {
            const { user_id } = req.query
            
            const query = knex('projects')

            if(user_id){
                query
                .where({ user_id })
                .join('users', 'users.id', '=', 'projects.user_id')
                .select('projects.*', 'users.username')
            }

            const results = await query;

            return res.json(results)
        } catch(error) {
            next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { title, user_id } = req.body

            await knex('projects').insert({
              title,
              user_id
            })

            return res.status(201).send()
        } catch(error) {
            next(error)
        }
    },
    // PUT
    async update(req, res, next) {
        try {
            const { title, user_id } = req.body
            const { id } = req.params

            
            await knex('projects')
            .update({ title, user_id })
            .where({ id })

            return res.status(200).send()

        } catch(error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { id } = req.params

            await knex('projects')
            .where({ id })
            .del()

            return res.status(200).send()
        } catch(error) {
            next(error)
        }
    }
}