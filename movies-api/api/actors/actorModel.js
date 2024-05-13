import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const ActorSchema = new Schema({
    adult: { type: Boolean },
    id: { type: Number, required: true, unique: true },
    gender: { type: Number },
    known_for_department: { type: String },
    first_air_date: { type: String },
    name: { type: String },
    popularity: { type: Number },
    profile_path: { type: String },
    cast_id: { type: Number },
    character: { type: String },
    credit_id: { type: String },
    order: { type: Number },
});

ActorSchema.statics.findByActorDBId = function (id) {
    return this.findOne({ id });
};

export default mongoose.model('Actors', ActorSchema);