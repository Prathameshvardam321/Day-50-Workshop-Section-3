let isUpdate = false;
let contact = {};
window.addEventListener('DOMContentLoaded',(event) => {
    const fullname = document.querySelector('#fullname');
    const nameError = document.querySelector('.name-error');
    fullname.addEventListener('input',function(){
        let name = document.querySelector('#fullname').value;
        if (fullname.value.length == 0) {
            nameError.textContent = "";
            return;
        }
        try {
            (new Contact()).fullName = name;
            nameError.textContent = "";
        } catch (e) {
            nameError.textContent = e;
        }
    });

    const phonenumber = document.querySelector('#phonenumber');
    const phonenumberError = document.querySelector('.phonenumber-error');
    phonenumber.addEventListener('input',function(){
        let phoneNumber = document.querySelector('#phonenumber').value;
        if (phonenumber.value.length == 0) {
            phonenumberError.textContent = "";
            return;
        }
        try {
            (new Contact()).phone = phoneNumber;
            phonenumberError.textContent = "";
        } catch (e) {
            phonenumberError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input',function(){
        let address1 = document.querySelector('#address').value;
        if (address.value.length == 0) {
            addressError.textContent = "";
            return;
        }
        try {
            (new Contact()).address = address1;
            addressError.textContent = "";
        } catch (e) {
            addressError.textContent = e;
        }
    });

    checkForUpdate();
})

const save = () => {
    try {
        let personContact = createContact();
        createAndUpdateStorage(personContact);
        window.location.replace("AddressbookHomePage.html");
    } catch(e) {
        return;
    }
}

const createContact = () => {
    let personContact = new Contact();
    try {
        personContact._fullName = getInputValueById('#fullname');
    } catch (e) {
        setTextValue('.name-error',e);
    }

    try {
        personContact._phone = getInputValueById('#phonenumber');
    } catch (e) {
        setTextValue('.phonenumber-error',e);
    }

    try {
        personContact._address = getInputValueById('#address');
    } catch (e) {
        setTextValue('.address-error',e);
    }

    personContact._city = getInputValueById('#city');
    personContact._state = getInputValueById('#state');
    personContact._zip = getInputValueById('#zip');
    alert(personContact.toString());
    return personContact;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const resetForm = () => {
    setValue('#fullname','');
    setValue('#phonenumber','');
    setValue('#address','');
    setValue('#city','Select City');
    setValue('#state','Select State');
    setValue('#zip','');
}

const setValue = (id,value) => {
    let element = document.querySelector(id);
    return element.value = value;
}

const setTextValue = (id,value) => {
    let element = document.querySelector(id);
    element.textContent = value;
}

function createAndUpdateStorage(personContact) {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
    if(contactList != undefined){
        contactList.push(personContact);
    } else {
        contactList = [personContact]
    }
    alert(contactList.toString());
    localStorage.setItem("ContactList",JSON.stringify(contactList));
}

const checkForUpdate = () => {
    const contactJson = localStorage.getItem('editContact');
    isUpdate = contactJson ? true : false;
    if(!isUpdate) return;
    contact = JSON.parse(contactJson);
    setForm();
}

const setForm = () => {
    setValue('#fullname',contact._fullName);
    setValue('#phonenumber',contact._phone);
    setValue('#address',contact._address);
    setValue('#city',contact._city);
    setValue('#state',contact._state);
    setValue('#zip',contact._zip);
}