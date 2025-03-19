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
                showPopup(data,"Account Created Successfully!")
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
                showPopup(data,"Deposit Successful!")
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
                showPopup(data,"Withdraw Successful!")
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
                showPopup(data,"Fetched data Successfully !")
                closeForm(); // Close the form after successful deposit
            })
            .catch(error => {
                console.error("Error:", error);
                alert("❌ Fetching Account failed.");
            });
    }
    document.querySelector("button[onclick='fetchAccount()']").addEventListener("click", () => fetchAccount());



// Function to Show 3D Popup with Account Details
    function showPopup(account, tag) {
        closePopup();

        const popupContainer = document.createElement("div");
        popupContainer.classList.add("popup-container");

        popupContainer.innerHTML = `
        <div class="popup">
            <h2>✅ ${tag}</h2>
            <p><strong>Account ID:</strong> ${account.id}</p>
            <p><strong>Holder Name:</strong> ${account.accountHolderName}</p>
            <p><strong>Balance:</strong> ₹${account.balance.toFixed(2)}</p>
            <button id="closePopupBtn">Close</button>
        </div>
    `;

        document.body.appendChild(popupContainer);
        document.getElementById("closePopupBtn").addEventListener("click", closePopup);
    }

// Function to Close the Popup
    function closePopup() {
        const popup = document.querySelector(".popup-container");
        if (popup) popup.remove();
    }



// Function to Fetch All Accounts and Show in Popup List
    function showAllAccounts() {
        fetch("/api/accounts") // API call to get all accounts
            .then(response => {
                if (!response.ok) throw new Error("Failed to Fetch Accounts.");
                return response.json();
            })
            .then(accounts => {
                if (accounts.length === 0) {
                    alert("❌ No Accounts Found.");
                    return;
                }
                showPopupList(accounts);
            })
            .catch(error => {
                console.error("Error:", error);
                alert("❌ Fetching Accounts failed.");
            });
    }

// Function to Show 3D Popup List of All Accounts in Grid View
    function showPopupList(accounts) {
        closePopup();

        const popupContainer = document.createElement("div");
        popupContainer.classList.add("popup-container-list");

        let accountListHTML = `
        <div class="popup_list">
            <h2>✅ Account List</h2>
            <div class="account-list">
    `;

        accounts.forEach(account => {
            accountListHTML += `
            <div class="account-card">
                <p><strong>Account ID:</strong> ${account.id}</p>
                <p><strong>Holder Name:</strong> ${account.accountHolderName}</p>
                <p><strong>Balance:</strong> ₹${account.balance.toFixed(2)}</p>
            </div>
        `;
        });

        accountListHTML += `
            </div>
            <button id="closePopupBtnList">Close</button>
        </div>
    `;

        popupContainer.innerHTML = accountListHTML;
        document.body.appendChild(popupContainer);

        // Close Button Event Listener
        document.getElementById("closePopupBtnList").addEventListener("click", closePopupList);
    }

// Function to Close the Popup
    function closePopupList() {
        const popup = document.querySelector(".popup-container-list");
        if (popup) popup.remove();
    }



    // Attach event listeners to buttons
    document.querySelector("button[onclick='createForm()']").addEventListener("click", function () {
        showForm("createAccountForm");
    });

    document.querySelector("button[onclick='getAllAccounts()']").addEventListener("click", function () {
        showAllAccounts();
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


    function openPopupBlur() {
        document.getElementById("formPopup").style.display = "block"; // Show Popup
        document.body.classList.add("popup-active"); // Add Blur Effect
    }

    function closePopupBlur() {
        document.getElementById("formPopup").style.display = "none"; // Hide Popup
        document.body.classList.remove("popup-active"); // Remove Blur Effect
    }

});
