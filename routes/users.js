const express = require('express');
const router = express.Router();

// login page
router.get('/login', (req, res) => {
    res.render('login')
});

// resgister page
router.get('/register',async (req, res) => await res.render('register'));

// Handle Register
router.post('/register', async(req, res) => {
   const {name, email, password, password2 } = req.body;
   let errors = [];
    
    //    Check if all input fields are entered
    if(!name || !email || !password || !password2) {
        errors.push({ message: "Please all fields are required"});
    }

    // check if password match
    if(password !== password2) {
        errors.push({message: "Password do not match!"});
    }

    // check if length of password is < 6, else alert
    if(password.length < 6) {
        errors.push({message: "Password should be atleast 6 characters!"})
    }

    // re-render the registration form if error meets any of the above issues
    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
      await  res.send('pass')
    }
})


module.exports = router; 