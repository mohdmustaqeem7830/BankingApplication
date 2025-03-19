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

        const accountData = { amount: parseFloat(depositAmmount) };

        fetch(`/api/accounts/${depositId}/deposit`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(accountData)
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to deposit.");
                return response.json();
            })
            .then(data => {
                alert(`✅ Deposit Successful!\nAccount ID: ${data.id}\nBalance: ${data.balance}`);
                closeForm(); // Close the form after successful deposit
            })
            .catch(error => {
                console.error("Error:", error);
                alert("❌ Deposit failed.");
            });
    }


    document.querySelector("button[onclick='deposit()']").addEventListener("click", () => deposit());

    //Function for Withdraw


    function withdraw() {
        const withdrawId = document.getElementById("withdrawId").value;
        const withdrawAmmount = document.getElementById("withdrawAmmount").value;

        if (!withdrawId || !withdrawAmmount) {
            alert("Please enter all the Field.");
            return;
        }

        const accountData = { amount: parseFloat(withdrawAmmount) };

        fetch(`/api/accounts/${withdrawId}/withdraw`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(accountData)
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to Withdraw.");
                return response.json();
            })
            .then(data => {
                alert(`✅ Withdraw Successful!\nAccount ID: ${data.id}\nBalance: ${data.balance}`);
                closeForm(); // Close the form after successful deposit
            })
            .catch(error => {
                console.error("Error:", error);
                alert("❌ Withdraw failed.");
            });
    }


    document.querySelector("button[onclick='withdraw()']").addEventListener("click", () => withdraw());
    //Function for delete


    function deleteAccount() {
        const deleteId = document.getElementById("deleteId").value;

        if (!deleteId) {
            alert("Please enter the Id.");
            return;
        }

        fetch(`/api/accounts/${deleteId}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to delete account.");
                alert("✅ Account Deleted Successfully!");
                closeForm(); // Close the form after successful deletion
            })
            .catch(error => {
                console.error("Error:", error);
                alert("❌ Failed to delete account.");
            });
    }

    document.querySelector("button[onclick='deletAccount()']").addEventListener("click", () => deleteAccount());

    //Function for FetchAccount


    function fetchAccount() {
        const accountId = document.getElementById("accountId").value;

        if (!accountId) {
            alert("Please enter the Id.");
            return;
        }

        fetch(`/api/accounts/${accountId}`, {
            method: "GET"
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to Fetch Account.");
                return response.json();
            })
            .then(data => {
                alert(`✅ Fetching Account Successful!\nAccount ID: ${data.id}\nBalance: ${data.balance}`);
                closeForm(); // Close the form after successful deposit
            })
            .catch(error => {
                console.error("Error:", error);
                alert("❌ Fetching Account failed.");
            });
    }


    document.querySelector("button[onclick='fetchAccount()']").addEventListener("click", () => fetchAccount());


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
