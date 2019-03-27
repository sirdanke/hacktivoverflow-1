const mongoose = require('mongoose')
const Schema = mongoose.Schema
const axios = require('axios')

const tagSchema = new Schema({
        name : String,
        job : [Object]
})

tagSchema.pre('save',function (next){
        axios
            .get(`https://jobs.github.com/positions.json?description=${this.name}`)
            .then(({data})=>{                 
                    this.job = data.slice(0,5)
                    next()
            })
            .catch(({response})=> {
                    err = response
                    next(err)
            })
})

const Tags = mongoose.model('Tags', tagSchema)
module.exports = Tags