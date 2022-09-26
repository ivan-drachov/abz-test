import React, {useState} from 'react';
import axios from "axios";
import * as FormData  from 'form-data';

export default function SignupForm() {
    const [email, setEmailValue] = useState("");
    const [password, setPasswordValue] = useState("");
    const [full_name, setFullNameValue] = useState("");
    const [phone, setPhoneValue] = useState("+380671234567");
    const [image, setImageValue] = useState(undefined);
    const [position_id, setPositionValue] = useState(3);
    
  return (
    <div>
        <div class="mb-3">
            <label  class="form-label">Email address</label>
            <input type="email" class="form-control" id="emailInput" placeholder="name@example.com" onChange={e => setEmailValue(e.target.value)} value={email}/>
        </div>
        <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" id="passwordInput" onChange={e => setPasswordValue(e.target.value)} value={password}/>
        </div>
        <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" id="nameInput" placeholder="Vasya Pupkin" onChange={e => setFullNameValue(e.target.value)} value={full_name}/>
        </div>
        <div class="mb-3">
            <label class="form-label">Phone</label>
            <input type="text" class="form-control" id="phoneInput" placeholder="+380671234567" onChange={e => setPhoneValue(e.target.value)} value={phone}/>
        </div>
        <div class="mb-3">
            <label class="form-label">Position_ID</label>
            <input type="text" class="form-control" id="positionInput" placeholder="3" onChange={e => setPositionValue(e.target.value)} value={position_id}/>
        </div>
        <div class="input-group mb-3">
            <input type="file" class="form-control" id="inputGroupFile02" onChange={e => setImageValue(e.target.value)} value={image}/>
            <label class="input-group-text">Photo</label>
        </div>
        <div class="mb-3">
            <button type="button" class="btn btn-primary"
                 onClick={async () => {
                    let formData = new FormData();
                    formData.append("image", image);
                    formData.append("email", email);
                    formData.append("phone", phone);
                    formData.append("password", password);
                    formData.append("position_id", position_id);
                    formData.append("name", full_name);
                    //const user = {email, password, name: full_name, image:formData, phone, position_id}
                    try {
                      await axios.post('http://127.0.0.1:5000/auth/signup', formData, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      })
                      .then(response => console.log(response.data.id) )
                      .catch(error => {
                          //element.parentElement.innerHTML = `Error: ${error.message}`;
                          console.error('There was an error!', error);
                      });
                    } catch (e) {
                      console.log("Sending error", e);
                    }
                  }}
            
            >Register new user</button>
        </div>
    </div>
  )
}
