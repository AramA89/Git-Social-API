const { Schema, Types } = require("mongoose");
const { formatDate } = require("../utils/dateFormat");

const friendSchema = new Schema(
  {
    friendId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    friend: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 5,
      id: false,
    },
    addedAt: {
			type: Date,
			default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = friendSchema;