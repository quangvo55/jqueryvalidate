/*
Example 1 - Validate field is not empty: 
<input type="text" id="txtInput" />
Javascript: $("#txtInput").csValidate(); 

Example 2 - Validate field is not empty and matchs regex: 
<input type="text" id="txtTelephone" />
Javascript: $("#txtTelephone").csValidate(/^[0-9]{10}$/); 

Password Example - Validates both password and password match fields are not empty, passes regex pattern, and matches:
<input type="password" id="txtPassword" />
<input type="password" id="txtPasswordMatch" />
Javascript: $("#txtPassword").csValidatePassword("txtPasswordMatch", /^(\w|[!@#$%-_]){4,30}/); 

Clear Validators Example:
Javascript: $(document).csClearValidators();
*/
jQuery.fn.extend({
    csValidate: function (regexPattern) {
        var value = this.val();
        var errorMsg = this.siblings('span.Validator');
        errorMsg && errorMsg.remove();

        if (csIsNullOrEmpty(value)) {
            this.after("<span class='Validator'><- This field is required!</span>");
            return false;
        } else if (regexPattern !== null && regexPattern !== undefined) {
            var regexPassed = regexPattern.test(value);
            if (!regexPassed) {
                this.after("<span class='Validator'><- This value appears to be invalid!</span>");
                return false;
            }
        }

        return true;
    },
    csValidatePassword: function (matchingFieldId, regexPattern) {
        var password = this.val();
        var errorMsg = this.siblings('span.Validator');
        errorMsg && errorMsg.remove();

        if (csIsNullOrEmpty(password)) {
            this.after("<span class='Validator'><- This field is required!</span>");
            return false;
        }

        if (regexPattern !== null && regexPattern !== undefined) {
            var regexPassed = regexPattern.test(password);
            if (!regexPassed) {
                this.after("<span class='Validator'><- This value appears to be invalid!</span>");
                return false;
            }
        }

        if (matchingFieldId !== null) {
            var matchFieldElement = $("#" + matchingFieldId);
            var pwErrorMsg = matchFieldElement.siblings('span.Validator');
            pwErrorMsg && pwErrorMsg.remove();

            var matchingPassword = matchFieldElement.val();
            if (csIsNullOrEmpty(matchingPassword)) {
                matchFieldElement.after("<span class='Validator'><- This field is required!</span>");
                return false;
            }

            if (password !== matchingPassword) {
                matchFieldElement.after("<span class='Validator'><- Your passwords do not match!</span>");
                return false;
            }
        }
        return true;
    },
    //remove all validators message on page
    csClearValidators : function() {
        var errorMsgs = this.find('span.Validator');
        $(errorMsgs).each(function(i, e) {
            $(e).remove();
        });
    }
});