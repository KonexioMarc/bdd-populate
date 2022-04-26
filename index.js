const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/populate')

const studentSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    address: {
        type: mongoose.Types.ObjectId,
        ref: "Address"
    }
});
const StudentModel = mongoose.model('Student', studentSchema);

const addressSchema = mongoose.Schema({
    streetName: String,
    streetNumber: String,
    postCode: String,
    city: String
});
const AddressModel = mongoose.model('Address', addressSchema);

const address = new AddressModel({
    streetName: "rue de la reunion",
    streetNumber: "15",
    postCode: "75020",
    city: "Paris" 
});

// Enregistrement des données en cascade
address.save().then(function (addressSaved){
    const student = new StudentModel({
        firstName: "Jean",
        lastName: "Guo",
        address: addressSaved._id
    });
    student.save().then(studentSaved => console.log(' the student was save'))
});



// Recupération d'un etudiant
StudentModel
    .findOne({_id: "6261600bf4e9b086ec3e7dfb"}) // => retourne un objet
    .populate('address')
    .exec()
    .then(student => {
        console.log("This is", student);
    })
    .catch(err => console.error(err));
// OU
StudentModel
    .findById("6261600bf4e9b086ec3e7dfb") // => retourne un objet
    .populate('address')
    .exec()
    .then(student => {
        console.log("This is", student);
    })
    .catch(err => console.error(err));

// OU
StudentModel
    .find({ _id :"6261600bf4e9b086ec3e7dfb" }) // => retourne un array d'objet
    .populate('address')
    .exec()
    .then(student => {
        console.log("This is", student);
    })
    .catch(err => console.error(err));