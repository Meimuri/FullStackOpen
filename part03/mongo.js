const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Give password as argument");
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://michaelalcaraz:${password}@cluster0.w51nakq.mongodb.net/personApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 3) {
    Person.find({}).then((result) => {
        console.log("Phonebook: ");
        result.forEach((persons) => {
            console.log(`${persons.name} ${persons.number}`);
        });
        mongoose.connection.close();
    });
}

if (process.argv.length > 3) {
    const person = new Person({
        name: name,
        number: number,
    });
    person.save().then((result) => {
        console.log(`Added ${name} with number ${number} to phonebook`);
        mongoose.connection.close();
    });
}
