import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogSchema = new Schema({
  title: String,
  body: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

BlogSchema.pre('save', function(next){
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else{
    this.meta.updateAt = Date.now();
  }

  next();
});

export default mongoose.model('Blog', BlogSchema);
