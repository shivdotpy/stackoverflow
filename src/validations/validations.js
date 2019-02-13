const nameValidation = (value) => {
    const result = {
        required: false
    };
    if (!value) {
        result.required = true;
    }
    return result
};

const emailValidation = (value) => {
    const result = {
        required: false,
        invalid: false
    };
    if (!value) {
        result.required = true;
    } else if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        result.invalid = false
    } else {
        result.invalid = true
    }
    return result
};

const passwordValidation = (value) => {
    const result = {
        required: false,
        invalid: false
    };
    if (!value) {
        result.required = true;
    } else if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/.test(value)) {
        result.invalid = false
    } else {
        result.invalid = true
    }
    return result
};

const mobileNumberValidation = (value) => {
    const result = {
        required: false,
        invalid: false,
        lengthInvalid: false
    };

    if (!value) {
        result.required = true;
    } else if (/^\d+$/.test(value)) {
        if (value.length < 3 || value.length > 10) {
            result.lengthInvalid = true
        } else {
            result.invalid = false
        }
    } else {
        result.invalid = true
    }
    return result
};


titleValidation = (value) => {
    const result = {
        required: false
    };
    if (!value) result.required = true;

    return result
};

descriptionValidation = (value) => {
    const result = {
        required: false
    };
    if (!value) result.required = true;

    return result
};


module.exports.emailValidation = emailValidation;
module.exports.passwordValidation = passwordValidation;
module.exports.nameValidation = nameValidation;
module.exports.mobileNumberValidation = mobileNumberValidation;
module.exports.titleValidation = titleValidation;
module.exports.descriptionValidation = descriptionValidation;
