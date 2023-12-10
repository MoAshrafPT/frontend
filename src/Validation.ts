//TODO: Create validation functions for both  log-in and sign-up forms

function validateLogin(event: React.FormEvent<HTMLInputElement>)
{
    event.preventDefault(); // prevents default html validation of the form
    //TODO: validate that email matches proper format
    const form = document.forms[0];
    const name = form['name'];
    const password = form['password'];
    if(!name || !password){
        alert("Please fill all fields");
       // return false;
    }
    
}

function validateSignup(event: React.FormEvent<HTMLInputElement>)
{
    event.preventDefault();
    //TODO: Validate that name contains no numbers, email matches proper format, date format and graduation year (member cannot be a graduate)
}

export {validateLogin,validateSignup};