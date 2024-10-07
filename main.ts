#! /usr/bin/env node

import inquirer from "inquirer";

// Generate a random student ID
const randomNumber: number = Math.floor(10000 + Math.random() * 90000);

let myBalance: number = 0;

async function main() {
    let answer = await inquirer.prompt([
        {
            name: "students",
            type: "input",
            message: "Enter student name:",
            validate: function(value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please enter a non-empty value.";
            },
        },
        {
            name: "courses",
            type: "list",
            message: "Select the course to enroll:",
            choices: ["MS.Office", "HTML", "Typescript", "Javascript", "Python"],
        },
    ]);

    const tuitionFee: { [Key: string]: number } = {
        "MS.Office": 1000,
        "HTML": 2000,
        "Typescript": 3000,
        "Javascript": 4000,
        "Python": 5000,
    };

    console.log(`\nTuition Fees: ${tuitionFee[answer.courses]}\n`);
    console.log(`Balance: ${myBalance}\n`);

    let paymentType = await inquirer.prompt([
        {
            name: "payment",
            type: "list",
            message: "Select payment method:",
            choices: ["Bank Transfer", "Easypaisa", "Jazzcash"],
        },
        {
            name: "amount",
            type: "input",
            message: "Enter payment amount:",
            validate: function(value) {
                // Validate numeric input for amount
                const valid = !isNaN(parseFloat(value));
                return valid || "Please enter a valid number.";
            },
        },
    ]);

    console.log(`\nSelected payment method: ${paymentType.payment}\n`);

    const tuitionFees = tuitionFee[answer.courses];
    const paymentAmount = parseFloat(paymentType.amount);

    if (tuitionFees === paymentAmount) {
        console.log(`Congratulations, you have successfully enrolled in ${answer.courses}\n`);

        let ans = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: "What would you like to do next?",
                choices: ["View status", "Exit"],
            },
        ]);

        if (ans.select === "View status") {
            console.log("\n*******Status**********\n");
            console.log(`Student Name: ${answer.students}`);
            console.log(`Student ID: ${randomNumber}`);
            console.log(`Course: ${answer.courses}`);
            console.log(`Tuition Fees paid: ${paymentAmount}`);
            console.log(`Balance: ${myBalance += paymentAmount}\n`);
        } else {
            console.log("\nExiting student management system\n");
        }
    } else {
        console.log("Invalid payment amount for the selected course\n");
    }
}

// Call the main function to start the program
main();
