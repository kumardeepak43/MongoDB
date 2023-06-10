const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://localhost:27017/Accenture", { useNewUrlparser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("connection sucessfull...."))
    .catch((err) => console.log(err));


const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        mixlength: [2, "minimum 2letters"],
        minlength: 30
    },
    ctype: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["frontEnd", "Backend", "database"]
    },
    videos: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("videos count should not be negative")
            }
        },
        validate: {
            validator: function (value) {
                return value.length < 0
            },
            message: "videos count should not be negative"
        }
    },

    author: String,
    email:{
       type : String,
       required: true,
       unique : true,
       validate(value){
        if(validator.isEmail(value)){
            throw new Error("Email is inValid");
        }
       }
    } ,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})


const Playlist = new mongoose.model("Playlist", playlistSchema);

const createDocument = async () => {
    try {
        const jsPlaylist = new Playlist({
            name: "Java",
            ctype: "UIUX",
            videos: -4,
            author: "Er.Deepak",
            active: true
        })

        const mongoPlaylist = new Playlist({
            name: "MongoDB",
            ctype: "Database",
            videos: 65,
            author: "Deepak",
            email: "er.deepak96jatav@mail.com",
            active: true
        })

        const mongoosePlaylist = new Playlist({
            name: "Mongoose JS",
            ctype: "Database",
            videos: 10,
            author: "Deepak",
            active: true
        })

        const cssPlaylist = new Playlist({
            name: "CSS styling",
            ctype: "Styling",
            videos: 10,
            author: "Deepak",
            active: true
        })

        const result = await Playlist.insertMany([mongoosePlaylist,])
            .select({ name: 1 })
            .limit(1);
        console.log(result);
    } catch (err) {
        console.log(err);
    }

}

createDocument();

const getDocument = async () => {
    const result = await Playlist
        .find({ author: "Er.Deepak Lankesh" })
        .select({ name: 1 })
        .sort("name : -1");
    // .countDocuments();
    // .limit(1);
    console.log(result);
}

// getDocument();

const updateDocument = async (_id) => {
    try {

        const result = await Playlist.findByIdAndUpdate({ _id }, {
            $set: {
                name: " Express js"
            }
        }, {
            new: true,
            useFindAndModify: false
        });
        console.log(result);

    } catch (err) {
        console.log(err);
    }


}

// updateDocument("647b06fe5159956c7fac03b0");


// Delete the document 


const deleteDocument = async (_id) => {
    try {
        const result = await Playlist.findByIdAndDelete({ _id });
        console.log(result);
    } catch (err) {
        console.log(err);
    }

}



// deleteDocument("647b05e91471636be64ba260")














