import React from 'react';
import './index.css';

const SignIn = () => {
    return (
        
      <div className=' mainDiv ml-4'>
              <form id="contact" action="" method="post">
          <h6>Colorlib Contact Form</h6>
          <fieldset>
            <input placeholder=" Email" type="email" tabindex="2" required />
          </fieldset>
          <fieldset>
            <input placeholder="Nom" type="text" tabindex="1" required autofocus />
          </fieldset>
          <fieldset>
            <input placeholder="Prenom" type="text" tabindex="3" required />
          </fieldset>
          <fieldset>
            <input placeholder="Password" type="password" tabindex="4" required />
          </fieldset>
          <fieldset>
            <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
          </fieldset>
        </form>
      </div>

    )
}

export default SignIn
