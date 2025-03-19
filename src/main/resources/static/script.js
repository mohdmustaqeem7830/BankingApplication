document.addEventListener("DOMContentLoaded", function () {
    // Function to show the popup form
    function showForm(formId) {
        document.getElementById(formId).style.display = "block";
    }

    // Function to close all popup forms
    function closeForm() {
        document.querySelectorAll(".form-popup").forEach(form => {
            form.style.display = "none";
        });
    }


// Function to create an account
    function submitAccount() {
        const accountHolderName = document.getElementById("accountHolderName").value;
        const initialBalance = document.getElementById("initialBalance").value;

        if (!accountHolderName || !initialBalance) {
            alert("Please enter all details.");
            return;
        }

        const accountData = {
            accountHolderName: accountHolderName,
            balance: parseFloat(initialBalance)
        };

        fetch("/api/accounts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(accountData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to create account.");
                }
                return response.json();
            })
            .then(data => {
                alert("✅ Account Created Successfully!\nAccount ID: " + data.id);
                closeForm(); // Close the form after successful account creation
            })
            .catch(error => {
                console.error("Error:", error);
                alert("❌ Account creation failed.");
            });
    }

    document.querySelector("button[onclick='submitAccount()']").addEventListener("click", () => submitAccount());



    //Function for Deposit
    function deposit() {
        const depositId = document.getElementById("depositId").value;
        const depositAmmount = document.getElementById("depositAmmount").value;

        if (!depositId || !depositAmmount) {
            alert("Please enter all the Field.");
            return;
        }

        const accountData = {
            depositId: depositId,
            depositAmmount: parseFloat(depositAmmount)
        };

        fetch("/{id}/deposit", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(accountData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to Deposit.");
                }
                return response.json();
            })
            .then(data => {
                alert("✅ Deposit Successfully!\nAccount ID: " + data.id+"\nBalance : " + data.balance);
                closeForm(); // Close the form after successful account creation
            })
            .catch(error => {
                console.error("Error:", error);
                alert("❌ Deposition failed.");
            });
    }


    document.querySelector("button[onclick='deposit()']").addEventListener("click", () => deposit());

    //Function for Withdraw
    //Function for delete
    //Function for FetchAccount

    // Attach event listeners to buttons
    document.querySelector("button[onclick='createForm()']").addEventListener("click", function () {
        showForm("createAccountForm");
    });

    document.querySelector("button[onclick='getAllAccounts()']").addEventListener("click", function () {
        showForm("fetchAllAccount");
    });

    document.querySelector("button[onclick='fetchAccountForm()']").addEventListener("click", function () {
        showForm("fetchAccount");
    });

    document.querySelector("button[onclick='depositform()']").addEventListener("click", function () {
        showForm("deposit");
    });

    document.querySelector("button[onclick='withdrawform()']").addEventListener("click", function () {
        showForm("withdraw");
    });

    document.querySelector("button[onclick='deleteAccountform()']").addEventListener("click", function () {
        showForm("deleteAccount");
    });

    // Close buttons functionality
    document.querySelectorAll(".close-btn").forEach(button => {
        button.addEventListener("click", closeForm);
    });
});
